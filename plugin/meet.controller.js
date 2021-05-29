const fs = require('fs');
const {google} = require('googleapis');
const TOKEN_PATH = 'token.json'


function authorize(callback) {
	const oauth2Client = new google.auth.OAuth2(
	//client_id
	"64776004749-v86cb9iima7aut47sfvb5vpcpge61dij.apps.googleusercontent.com",
	//client_secret
 	"SnH-SDr-qhuX1xtXcReXUy4M",
 	//redirect_uri
 	["http://localhost:3000/meet"]);

	// Check if we have previously stored a token.
	fs.readFile(TOKEN_PATH, (err, token) => {
	if (err) return getNewToken(oauth2Client,callback);
	oauth2Client.credentials = JSON.parse(token);
	console.log("e") 
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
function getNewToken(oauth2Client,callback) {
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
function getAllMeetsf(auth) {

	const service = google.admin({version: 'reports_v1', auth});
	let results,conf_id="NZyaD7-tIjSyiGBE6J8HAKII";
  service.activities.list({
    userKey: 'all',
    applicationName: 'meet',
    parameters: "conference_id",
    maxResults: 100,
  },(err, res) => 
	{
    	if(err)
    		console.log(`The API returned an error: ${err.message}`)
   		fs.writeFile('response.json', JSON.stringify(res.data.items), (err) => {
    		if (err) console.warn('merde');
   			console.log('cool');
  		});
    
	})

}
exports.getAllMeets = (req,res,next)=>{

	try{
		authorize(getAllMeetsf);
		fs.readFile('response.json', (err, content) => {
		  res.status(200).send(content)
		});
	}
	catch(e)
	{
		res.status(400).json({error: e})
	}
	
}
