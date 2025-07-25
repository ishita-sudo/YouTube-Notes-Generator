import React from "react";


const NotesDisplay =({notes})=>{
 
    return (
        <div>

        <div dangerouslySetInnerHTML={{__html:notes}} className="markdown-body"/>
        <button
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold shadow-lg transition"
                       
                    >
                        Generate Notes
                    </button>
        </div>
    )
}
export default NotesDisplay;