import React from "react";
import { useState } from "react";
import { generateNotes } from "../services/api";


const NotesForm=({setNotes})=>{
      const [youtubeUrl,setYoutubeUrl]=useState("");

    
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
    
    return(
      
        <form onSubmit={handleGenerateNotes} className="flex flex-col items-center justify-center gap-10 rounded-lg   w-[80vw] bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-white">
            <label htmlFor="youtube_url"></label>
            <input type="text" className="youtube-url-input rounded-lg border-blue-500 border-2 p-3 w-full md:w-[50vw] lg:w-[40vw] xl:w-[30vw] text-lg bg-zinc-800 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={youtubeUrl}
            onChange={e=> setYoutubeUrl(e.target.value)}
             />
              <button
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold shadow-lg transition"
                       type="submit"
                    >
                        Generate 
                    </button>
            </form>
   
    )

}
export default NotesForm;