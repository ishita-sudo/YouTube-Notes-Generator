import React from "react";
import NotesDisplay from "./NotesDisplay";
import NotesForm from "./NotesForm";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useState } from "react";


function Generate() {
   const [notes,setNotes]=useState("");

  return (
    <>
<Navbar/>
    <div className="flex flex-col items-center align-start justify-items-start gap-10 min-h-screen w-screen bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-white">
      <NotesForm setNotes={setNotes}/>
      <NotesDisplay notes={notes} className="bg-black p-5 text-white"/>
    </div>
      <Footer/>
    </>
      
  )
}

export default Generate