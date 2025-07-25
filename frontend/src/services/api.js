import axios from 'axios';

export const generateNotes=async (youtube_url)=>{
const response = await axios.post("http://127.0.0.1:5000/generate_notes", { youtube_url },
    {headers:{"Content-Type":"application/json"}}
);
    return response.data.html_notes;
}