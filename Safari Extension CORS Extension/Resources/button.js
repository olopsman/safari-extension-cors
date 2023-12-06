"use strict";
// browser.runtime.sendMessage({ greeting: "hello" }).then((response) => {
//     console.log("Received response: ", response);
// });
// sfdcBody = normal Salesforce page
// ApexCSIPage = Developer Console
// auraLoadingBox = Lightning / Salesforce1
if (document.querySelector("body.sfdcBody, body.ApexCSIPage, #auraLoadingBox") || location.host.endsWith("visualforce.com")) {
    // We are in a Salesforce org
    browser.runtime.sendMessage({message: "getSfHost", url: location.href}, sfHost => {
        console.log('#### button', sfHost);

        browser.runtime.sendMessage({ message: "hello" }).then((response) => {
            console.log("Received hello response: ", response);
        });

        let paramKey = "access_token";
        //call a new promise
        let message = browser.runtime.sendMessage({ message: "getSession" , sfHost}).then((response) => {
            return response;
        });
        
        console.log("## message response: ", message);

   });
}
