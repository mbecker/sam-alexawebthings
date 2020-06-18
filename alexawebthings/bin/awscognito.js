
// Use the third party module to start the cmd process 'aws'
const shell = require('shelljs');


const jwt = "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjdjZTk2YjUxLWFhZDMtNGU3Ny1iY2Q0LWE2MTI5OTU2NDEyZiJ9.eyJyb2xlIjoidXNlcl90b2tlbiIsImlhdCI6MTU5MTEwOTQ0MywiaXNzIjoiaHR0cHM6Ly9naW5zaGVpbS5tb3ppbGxhLWlvdC5vcmcifQ.Ghnj-bx7QOPB3qZnm5_yi8JYkTvIScTFP69FJiQVs8mvEQpYXhUfg99MPq0d2TnypKza_-jwh9i-59RoV80FNg";
const jwts = [
    jwt.slice(0,250),
    jwt.slice(250,jwt.length)
]

let attributes = '';
for (let index = 0; index < jwts.length; index++) {
    attributes += `Name="custom:webthingsJWT${index}",Value="${jwts[index]}" `
}
console.log(attributes);

const awsCognitoCmd = `aws cognito-idp admin-update-user-attributes --user-pool-id eu-west-1_tdLOTcvy6 --username 05415a91-c1c9-43e0-aa13-92847660784c --user-attributes ${attributes}`;

shell.exec(awsCognitoCmd, function(code, stdout, stderr) {
    console.log('Exit code:', code);
    console.log('Program output:', stdout);
    console.log('Program stderr:', stderr);
  });