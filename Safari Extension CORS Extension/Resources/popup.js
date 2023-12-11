//import { sfConn, apiVersion } from "./inspector.js";

{
  parent.postMessage({insextInitRequest: true}, "*");
  addEventListener("message", function initResponseHandler(e) {
    if (e.source == parent && e.data.insextInitResponse) {
      removeEventListener("message", initResponseHandler);
      init(e.data);
    }
  });
}

function init({sfHost, inDevConsole, inLightning, inInspector}) {
    console.log("####");
    

    chrome.runtime.sendMessage({message: "getSfHost", url: location.href}, sfHost => {
      if (sfHost) {
          chrome.runtime.sendMessage({message: "getSession", url: location.href}, sfSession => {
            if (sfSession) {
                browser.runtime.sendMessage({ message: "startFunc" });
            }
          });
      }
    });
}

 
