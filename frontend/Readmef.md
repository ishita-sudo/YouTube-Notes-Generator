# YouTube video to Notes (Frontend)
### install vite+react
```
npm create vite@latest -y
npm i
npm run dev
```
- also install axios through which we'll fetch the generated notes from backend
```
npm i axios
```
- folder structure

YTNotes
 - frontend
    - src
      - Components
      - App.jsx
      - services
         - api.js
### inside ```api.js```
```
import axios from 'axios';

export const generateNotes=async (youtube_url)=>{
const response = await axios.post("http://127.0.0.1:5000/generate_notes", { youtube_url },
    {headers:{"Content-Type":"application/json"}}
);
    return response.data.html_notes;
}
```
- Componnents
     
     - NotesForm.js
     - NotesDisplay.js
### inside ```NotesForm.jsx```
```
import { generateNotes } from "../services/api";
```
```
    
      const handleGenerateNotes=async (e)=>{
        e.preventDefault();
        try{
          const generateNotesResponse=await generateNotes(youtubeUrl);
          setNotes(generateNotesResponse);
        }
        catch(error){
          console.error("Error generating notes:",error);
          setNotes("Failed to generate notes. Please try again");
        }
      };
```
- on submit request the notes generation
```
        <form onSubmit={handleGenerateNotes} 
            value={youtubeUrl}
            onChange={e=> setYoutubeUrl(e.target.value)}
             />
              <button
                       type="submit"
                    >
                        Generate 
                    </button>
            </form>
```
### inside ```NotesDisplay.jsx```
- display the notes
```
import React from "react";


const NotesDisplay =({notes})=>{
 
    return (
        <div>

        <div dangerouslySetInnerHTML={{__html:notes}} className="markdown-body"/>
        <button

                       
                    >
                        Generate Notes
                    </button>
        </div>
    )
}
export default NotesDisplay;
```
 
