import React from 'react';
import { useNavigate } from 'react-router-dom';
import Middle  from './Middle';
import Navbar from './Navbar';
import Promote from './Promote';
import Footer from './Footer';

const Landinpage = () => {
    // const navigate = useNavigate();

    // const handleGenerateClick = () => {
    //     navigate('/generate');
    // };
     const navigate = useNavigate();

    const handleGenerateClick = () => {
        navigate(
            '/generate',);
    };

    return (
        <div className="flex flex-col gap-40 min-h-screen w-screen bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-white">
     <Navbar/>
            <main className="flex flex-1 flex-col md:flex-row w-full">
                <section className="flex flex-col justify-center items-start w-full md:w-1/2 px-10 py-16">
                    <h2 className="text-5xl font-bold mb-6 leading-tight drop-shadow-lg">
                        YouTube Video<br />To Notes Generator
                    </h2>
                    <p className="text-lg mb-8 text-zinc-300">
                        Instantly convert any YouTube video into clear, structured notes. <br />
                        <span className="text-blue-400 font-semibold">100% Free. No sign-up required.</span>
                    </p>
                    <button
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold shadow-lg transition"
                       onClick={handleGenerateClick}
                    >
                        Generate Notes
                    </button>
                </section>
                <section className="flex justify-center items-center w-full md:w-1/2 p-8">
                    <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-blue-700 bg-zinc-900/60">
                        <img
                            src="https://www.freecodecamp.org/news/content/images/2023/01/YouTube-Notes-Generator.png"
                            alt="YouTube Notes Generator"
                            className="w-[420px] h-[320px] object-cover"
                        />
                    </div>
                </section>
            </main>
            <Middle/>
     <Promote/>
    <Footer/>
        </div>
    );
};

export default Landinpage;