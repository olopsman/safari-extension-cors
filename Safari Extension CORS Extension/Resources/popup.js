
let h = React.createElement;

{
  parent.postMessage({insextInitRequest: true}, "*");
  addEventListener("message", function initResponseHandler(e) {
    if (e.source == parent && e.data.insextInitResponse) {
      removeEventListener("message", initResponseHandler);
        console.log("e.data", e.data);
      init(e.data);
    }
  });
}

function init({sfHost, inDevConsole, inLightning, inInspector}) {
    let addonVersion = browser.runtime.getManifest().version;
    console.log("## location.href", location.href);
    //get the sfHost from sessionStorage    
    // chrome.storage.session.setAccessLevel({ accessLevel: 'TRUSTED_AND_UNTRUSTED_CONTEXTS' });
    chrome.storage.session.get(["sfhost"]).then((result) => {
      console.log("popup value currently is " + result.sfhost);
      if(result.sfHost !== null) {
          chrome.runtime.sendMessage({message: "getSession", sfHost: result.sfHost}, sfSession => {
          if (sfSession) {
            console.log("#### sfSession" , sfSession);
              ReactDOM.render(h(App, {
                sfHost,
                inDevConsole,
                inLightning,
                inInspector,
                addonVersion,
              }), document.getElementById("root"));
          }
        });
      }
    });
}

class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        isInSetup: false,
        contextUrl: null,
        apiVersionInput: apiVersion
        };
        this.onContextUrlMessage = this.onContextUrlMessage.bind(this);
        this.onShortcutKey = this.onShortcutKey.bind(this);
        this.onChangeApi = this.onChangeApi.bind(this);
    }
    onContextUrlMessage(e) {
        if (e.source == parent && e.data.insextUpdateRecordId) {
            let {locationHref} = e.data;
            this.setState({
            isInSetup: locationHref.includes("/lightning/setup/"),
            contextUrl: locationHref
            });
        }
    }

    componentDidMount() {
      addEventListener("message", this.onContextUrlMessage);
      addEventListener("keydown", this.onShortcutKey);
      parent.postMessage({insextLoaded: true}, "*");
    }

    render() {
        let {
            sfHost,
            inDevConsole,
            inLightning,
            inInspector,
            addonVersion
        } = this.props;
        let {isInSetup, contextUrl, apiVersionInput} = this.state;
        let clientId = localStorage.getItem(sfHost + "_clientId");
        let orgInstance = this.getOrgInstance(sfHost);
        let hostArg = new URLSearchParams();
        hostArg.set("host", sfHost);
        let linkInNewTab = localStorage.getItem("openLinksInNewTab");
        let linkTarget = inDevConsole || linkInNewTab ? "_blank" : "_top";
        let browser = navigator.userAgent.includes("Chrome") ? "chrome" : "moz";
        return (
          h("div", {},
                h("div", {className: "slds-grid slds-theme_shade slds-p-vertical_x-small slds-border_bottom"},
                  h("div", {className: "header-logo"},
                    h("div", {className: "header-icon slds-icon_container"},
                      h("svg", {className: "slds-icon", viewBox: "0 0 24 24"},
                        h("path", {
                          d: `
                          M11 9c-.5 0-1-.5-1-1s.5-1 1-1 1 .5 1 1-.5 1-1 1z
                          m1 5.8c0 .2-.1.3-.3.3h-1.4c-.2 0-.3-.1-.3-.3v-4.6c0-.2.1-.3.3-.3h1.4c.2.0.3.1.3.3z
                          M11 3.8c-4 0-7.2 3.2-7.2 7.2s3.2 7.2 7.2 7.2s7.2-3.2 7.2-7.2s-3.2-7.2-7.2-7.2z
                          m0 12.5c-2.9 0-5.3-2.4-5.3-5.3s2.4-5.3 5.3-5.3s5.3 2.4 5.3 5.3-2.4 5.3-5.3 5.3z
                          M 17.6 15.9c-.2-.2-.3-.2-.5 0l-1.4 1.4c-.2.2-.2.3 0 .5l4 4c.2.2.3.2.5 0l1.4-1.4c.2-.2.2-.3 0-.5z
                          `})
                      )
                    ),
                    "Salesforce Inspector Reloaded"
                  )
                )
            )
        );
    }
}
