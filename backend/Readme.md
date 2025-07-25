# YouTube Video to Notes AI (Backend)
## Features:
- takes the YouTube video URL from user👆
- click on the generate button🔼
- without page reload it creates note📚
## 🧠Under The Hood!
1. 🎥we take the youtube url from user
2. 🔨extract the video id
3. 📄get the video transcript with YouTubeTranscriptApi
(Transcript is the subtitles that yutube stores with timestamps)
4. 📙we then turn the transcript into a full paragraph
5. 🤖then we send it to a LLM Model with the prompt to make  a precise note out of it with API key
6. ✨then we get the generated note and display it or render it using React axios api
---
## First get the Free Api key
https://openrouter.ai/deepseek/deepseek-r1:free/api
- create a .env file and store the api key
```
DEEPSEEK_API_KEY=your-api-key
```
---
- now start with the developement
## Create a Virtual Enviornment
- go into your project folder
```
cd <folder-name>
```
```
pythom -m venv venv
venv/Scripts/activate
```
- You'll see a ```venv``` folder inside your project folder 
---
##  install necessary packages 
```
pip install requests
pip install python_dotenv
pip install flask
pip install youtube_transcript_api
pip install markdown # for rendering the generated notes in the html with style
```
## your Project Directory looks like this
```
YTNotes
  - backend
    - app.py
    - utils
       - notes.py
       - transcript.py

  - venv
  - frontend
```
### inside ```transcript.py``` 
  - import packages
  ```
  from youtube_transcript_api import YouTubeTranscriptApi, NoTranscriptFound,VideoUnavailable
import time
import random
  ```
  - get the video id
  ```
  def get_video_id(url):
    if "youtube.com/watch?v=" in url:
        return url.split("v=")[1].split("&")[0]
    elif "youtu.be/" in url:
        return url.split("youtu.be/")[1].split("?")[0]
    else:
        raise ValueError("Invalid YouTube URL")
  ```
  - fetch the transcript/subtitle
  ```
  yt_api=YouTubeTranscriptApi()

  delayed_time=random.uniform(5.0,10.0)
def fetch_transcript(video_id):
    try:

        transcript = yt_api.fetch(video_id)
        # Collect all text parts into a single string without timestamps
        full_text = " ".join(entry.text.strip() for entry in transcript if entry.text.strip())

        return full_text if full_text else "Transcript is empty or unavailable."
    except NoTranscriptFound:
        return f"Transcript not available for video ID: {video_id}"
    except VideoUnavailable:
        return f"Video with ID {video_id} is unavailable."
    except Exception as e:
        return f"Error fetching transcript: {str(e)}"
    finally:
        time.sleep(delayed_time)
 ```
### inside ```notes.py```
- import packages
```
from dotenv import load_dotenv
import os
import requests
```
- set the  ```api key```
```
load_dotenv()
api_key=os.getenv("DEEPSEEK_API_KEY")
```
- generate notes
```
def generate_notes(topic: str) -> str:
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type":"application/json"
    }
    prompt =(
        "You are a helpful assistant. Summarize the following transcript into clear, structured notes:\n\n"
        f"{topic}\n\n"
        "Use bullet points, highlight key ideas, and keep it concise."
    )
    payload =(
        {
            "model": "deepseek/deepseek-r1:free",
            "messages": [
                {"role": "user", "content": prompt}
            ]
        }
    )
    response= requests.post(url, headers=headers, json=payload)
    if response.status_code == 200:
        content=response.json()["choices"][0]["message"]["content"]
        return content
    else:
        return f"Error {response.status_code}:{response.text}"

    
```
### inside ```main.py```
- import dependencies
```
from flask import request, jsonify,Flask
from flask_cors import CORS
from utils.notes import generate_notes
from utils.trns import fetch_transcript, get_video_id
from dotenv import load_dotenv
import markdown
```
```
load_dotenv()
app = Flask(__name__)
CORS(app)
```
- return the jsonify generated notes for the frontend
```
@app.route('/generate_notes', methods=['POST'])
def generate_notes_api():
    data = request.get_json()
    url= data.get('youtube_url')
    video_id= get_video_id(url)

    
    
    transcript=fetch_transcript(video_id)
    notes=generate_notes(transcript)
    html_notes=markdown.markdown(notes,extensions=["fenced_code", "tables"])
    # save to mongodb

    return jsonify({"html_notes": html_notes})

```
- run app in debug mode
```
if __name__=="__main__":
    app.run(debug=True) 
```
