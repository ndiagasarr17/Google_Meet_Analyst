const https = require('https');

https.get('https://www.googleapis.com/admin/reports/v1/activity/users/all/applications/meet?eventName=call_ended&maxResults=10&access_token=ya29.a0AfH6SMDRchI9i8-IC-NPBXN7cm6x0ZIsZbMa2tsfS6bzpygntisWq_Q4-5DKMbFzbkcSbFWHdvNTm1HRGhFd97pqgDfl4L8PNfOEuJz3vy0yNW1IheLXvQ1H54YTMlXK1E3eXB2ab4A80uLYYp18_G4clexuAyUbK0M', (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data).explanation);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});