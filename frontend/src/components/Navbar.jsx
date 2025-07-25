import React from "react";

const Navbar=()=>{
return(
       <header className="w-full py-6 px-10 flex justify-between items-center bg-zinc-950/80 shadow-lg">
                <h1 className="text-3xl font-extrabold tracking-tight text-blue-400 drop-shadow-lg">
                    YTNotes
                </h1>
                <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-300 hover:text-blue-400 transition"
                >
                    GitHub
                </a>
            </header>
)
}
export default Navbar;