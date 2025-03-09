const express = require('express');
const { YoutubeTranscript } = require('youtube-transcript');
const bodyParser = require('body-parser');
const { TextServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");



function validateUrl(url) {
    let urlRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    if (urlRegex.test(url)) {
        console.log("Valid url");
        return true;
    } else {
        console.log("Invalid url");
        return false;
    }
}


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use('/styles', express.static('styles'));


app.get('/', (req, res) => {
    res.render('index', {data: ""}); 

    req.on('close', () => {
        console.log("Request closed");
    });
})


app.post('/getsummary', async (req, res) => {
    console.log(req.body.url);
    if (!validateUrl(req.body.url)) {
        res.render('index', {data: "Invalid url: Please enter a valid youtube url"});
        return;
    }

    // get transcript
    try {
      let texts = await YoutubeTranscript.fetchTranscript(req.body.url);
      let content = "";
      texts.forEach(text => {
          content += text.text + " ";
      });

      //console.log(content);

      // get summary
      const MODEL_NAME = "models/text-bison-001";
      const API_KEY = "Add API Key Here";

      const client = new TextServiceClient({
      authClient: new GoogleAuth().fromAPIKey(API_KEY),
    });

    const promptString = `Summarize this Youtube Transcript and detail some relevant context. Text: ${content}`;
    const stopSequences = [];
    console.log(promptString);

let result = await client.generateText({
    // required, which model to use to generate the result
    model: MODEL_NAME,
    // optional, 0.0 always uses the highest-probability result
    temperature: 0.6,
    // optional, how many candidate results to generate
    candidateCount: 1,
    // optional, number of most probable tokens to consider for generation
    topK: 40,
    // optional, for nucleus sampling decoding strategy
    topP: 0.95,
    // optional, maximum number of output tokens to generate
    maxOutputTokens: 1024,
    // optional, sequences at which to stop model generation
    stopSequences: stopSequences,
    // optional, safety settings
    safetySettings: [{"category":"HARM_CATEGORY_DEROGATORY","threshold":"BLOCK_LOW_AND_ABOVE"},{"category":"HARM_CATEGORY_TOXICITY","threshold":"BLOCK_LOW_AND_ABOVE"},{"category":"HARM_CATEGORY_VIOLENCE","threshold":"BLOCK_MEDIUM_AND_ABOVE"},{"category":"HARM_CATEGORY_SEXUAL","threshold":"BLOCK_MEDIUM_AND_ABOVE"},{"category":"HARM_CATEGORY_MEDICAL","threshold":"BLOCK_MEDIUM_AND_ABOVE"},{"category":"HARM_CATEGORY_DANGEROUS","threshold":"BLOCK_MEDIUM_AND_ABOVE"}],
    prompt: {
      text: promptString,
    },
  });

console.log(JSON.stringify(result, null, 2));
let summary = result[0]['candidates'][0]['output'];


    res.render('index', {data: summary});



    } catch (error) {
      console.log("Error: " + error+"\nNO TRANSCRIPT FOUND");
      res.render('index', {data: "🚨 : Trouble accessing/summarizing transcripts on this Video."});
      return;
    }
   
});


app.listen(8080, () => {
    console.log('Server is running on port 8080');
});