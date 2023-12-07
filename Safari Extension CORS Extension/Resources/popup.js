import { sfConn, apiVersion } from "./inspector.js";

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
    sfConn.getSession(sfHost).then(() => {
        
        console.log('### popup', sfConn);
        
    });
}
