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
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append("Authorization", "Bearer " + sfConn.sessionId);
            
        fetch("https://genesisenergy--uat.sandbox.my.salesforce.com/services/data/v59/query/?q=SELECT+IsSandbox,+InstanceName+FROM+Organization")
        .then(response =>{
            console.log("### Success 2 - Sandbox", response)
        })
        .catch(error=>{
            console.log("Fail 2", error)
        })
           
        
    });
}

 
