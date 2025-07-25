import React, { useState, useEffect } from 'react';

const placeholderText = "Enter YouTube Video URL!";

const Promote = () => {
    const [placeholder, setPlaceholder] = useState("");
    useEffect(() => {
        let i = 0;
        let forward = true;
        const interval = setInterval(() => {
            if (forward) {
                setPlaceholder(placeholderText.slice(0, i + 1));
                i++;
                if (i === placeholderText.length) {
                    forward = false;
                    setTimeout(() => {}, 700); // pause at end
                }
            } else {
                setPlaceholder(placeholderText.slice(0, i - 1));
                i--;
                if (i === 0) {
                    forward = true;
                }
            }
        }, 70);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full  h-[80vh] flex flex-col  bg-gradient-to-r from-blue-500 to-purple-500 items-center justify-center mt-20 gap-30">
            <h1 className="text-white text-5xl font-bold text-center">
                Enter any YouTube video link to generate structured notes
            </h1>
            <div className='border-2 border-blue-300 rounded-lg p-2 flex items-center justify-center gap-4'>

            <input
                type="text"
                placeholder={placeholder}
                className="px-4 py-2 rounded-lg w-96 text-xl"
            />
                <button
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold shadow-lg transition"
                       
                    >
                        Generate 
                    </button>
            </div>
        </div>
    );
};

export default Promote;