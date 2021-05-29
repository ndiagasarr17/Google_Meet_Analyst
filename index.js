const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const con = require('./db');
require('dotenv').config();
//const conn= require('db.js');
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/admin.reports.audit.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.error('Error loading client secret file', err);

  // Authorize a client with the loaded credentials, then call the
  // Reports API.
  authorize(JSON.parse(content), infoMeet);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.web;
  const oauth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oauth2Client, callback);
    oauth2Client.credentials = JSON.parse(token);
    callback(oauth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oauth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
    if (err) return console.warn(`Token not stored to ${TOKEN_PATH}`, err);
    console.log(`Token stored to ${TOKEN_PATH}`);
  });
}

/**
 * Lists the last 10 login events for the domain.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function findByName(parameters, fieldName) {
    for (const param of parameters) {
        if (param.name === fieldName) {
          if (param.intValue) return param.intValue
            return param.value
        }
        console.log(param);
    }
}

function infoMeet(auth) {
  const service = google.admin({version: 'reports_v1', auth});
  service.activities.list({
    userKey: 'all',
    applicationName: 'meet',
    eventName:'call_ended',
    maxResults: 1,
  }, (err, res) => {
    if (err) return console.error('The API returned an error:', err.message);
    const activities = res.data.items;
    if (activities.length) {
      console.log('INFOS MEET:');
      activities.forEach((activity) => {
        
        const meet_Code=findByName(activity.events[0].parameters,'meeting_code');
        const calend_id=findByName(activity.events[0].parameters,'calendar_event_id');
        const vid_sc=findByName(activity.events[0].parameters,'video_send_seconds');

        //const presence=findByName(activity.events[0].parameters,'endpoint_id');
        const duree=findByName(activity.events[0].parameters,'duration_seconds');
       const device = findByName(activity.events[0].parameters,'device_type');
        const email=findByName(activity.events[0].parameters,'identifier');
        const location=findByName(activity.events[0].parameters,'location_region');
        

        //insertion pour notre table MeetSeance

        const sql = "INSERT IGNORE INTO MeetSeance(id,heureDebut,heureFin,partageEcran) VALUES ('"+meet_Code+"','"+calend_id+"',33,'"+vid_sc+"')";
         con.query(sql, function (err, result) {
          
          if (err) {
          console.error('error connecting: ' + err.stack);
          return ;
          }
          console.log("record inserted successfully");
        });
        const sql2 = "INSERT INTO MeetUsers(PresenceM,terminalType,email,region) VALUES ('"+duree+"','"+device+"','"+email+"','"+location+"')";
        con.query(sql2, function (err, result2) {
          
              if (err) {
              console.error('error connecting: ' + err.stack);
              return;
              }
          console.log("record inserted successfully");
        });
      
         });

         //email a envoyer au participant par nodemailer
         var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

var mailOptions = {
  from: 'ndiagasarr@esp.sn',
  to: 'ndiaga199929@gmail.com',
  subject: 'TEST MESSAGERIE',
  text: 'MWAHIBOU HT1 2019 EMOJI JOYYYEUU'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});  

    } else {
      console.log('No infos found.');
    }
   });
}