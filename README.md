# safari-extension-cors
Testing CORS scenarios with Safari

Open side popup, then attempt to do a callout to REST endpoint to determine if org is sandbox fails with CORS error.

popup.js which imports the inspector.js makes the callout.

Origin safari-web-extension://ef9405e2-6a19-4e28-8d23-1884e5283d76 is not allowed by Access-Control-Allow-Origin. Status code: 200

/services/data/v59.0/query/?q=SELECT+IsSandbox,+InstanceName+FROM+Organization&cache=0.9779774791278361 due to access control checks.
