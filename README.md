# YTSummaryGen

YTSummaryGen is a web application that generates summaries of YouTube video transcripts using Google's Generative Language API.

## Features

* **YouTube URL Input:** Users can input a YouTube video URL.
* **Transcript Extraction:** The application extracts the transcript from the provided video.
* **AI-Powered Summarization:** Utilizes Google's Generative Language API to generate a concise summary of the transcript.
* **Error Handling:** Provides user-friendly error messages for invalid URLs or inaccessible transcripts.
* **Simple Web Interface:** Easy-to-use interface built with Express.js and EJS.

## Technologies Used

* **Node.js:** Backend runtime environment.
* **Express.js:** Web application framework.
* **youtube-transcript:** Library for extracting YouTube video transcripts.
* **body-parser:** Middleware for parsing request bodies.
* **Google Generative Language API:** For text summarization.
* **EJS:** Templating engine.

## Prerequisites

* Node.js and npm installed.
* Google Developer Console account.
* Google PALM2 API key.

## Setup

1.  **Clone the Repository:**

    ```bash
    git clone <repository_url>
    cd YTSummaryGen
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

3.  **Configure API Key:**

    * Obtain a Google PALM2 API key from your Google developer console .
    * Replace `"Your API Key"` with your API key in the `app.js` file.

4.  **Run the Application:**

    ```bash
    node index.js
    ```

5.  **Access the Application:**

    * Open your web browser and navigate to `http://localhost:8080`.

## Code Overview

* `index.js`: Main application file.
    * Handles routing, transcript extraction, and summarization.
    * Uses Express.js for web server functionality.
    * Integrates with the `youtube-transcript` and Google Generative Language API.
* `views/index.ejs`: EJS template for the web interface.
    * Simple form for URL input and displays the summary.
* `styles/style.css`: Basic css file.

### Key Code Snippets

* **YouTube URL Validation:**

    ```javascript
    function validateUrl(url) {
        let urlRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
        // ...
    }
    ```

* **Transcript Extraction:**

    ```javascript
    let texts = await YoutubeTranscript.fetchTranscript(req.body.url);
    ```


## Usage

1.  Enter a valid YouTube video URL in the input field.
2.  Click the "Get Summary" button.
3.  The application will display the generated summary below the input field.

## Error Handling

* The application checks for valid YouTube URLs.
* It handles cases where transcripts are not available.
* Displays user friendly error messages.

## Future Improvements

* Implement a loading indicator while the summary is being generated.
* Add options to customize the summary length or style.
* Improve the user interface with more advanced features.
* Add more robust error handling.
* Implement a way to save the generated summaries.
* Add a copy to clipboard button.
