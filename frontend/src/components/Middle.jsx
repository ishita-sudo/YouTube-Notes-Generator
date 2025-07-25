import React, { useRef, useState, useEffect } from 'react';

const steps = [
    {
        step: "step 1",
        description: "Enter the YouTube video URL in the input field and click 'Generate Notes'."
    },
    {
        step: "step 2",
        description: "Wait for the notes to be generated. This may take a few seconds depending on the video length."
    },
    {
        step: "step 3",
        description: "Once generated, the notes will be displayed below the input field in a structured format."
    },
    {
        step: "step 4",
        description: "You can copy the notes or use them directly for your study purposes."
    }
];

const images = [
    "src1", "src2", "src3", "src4"
];

const Middle = () => {
    const [activeStep, setActiveStep] = useState(0);
    const imgRefs = useRef([]);

useEffect(() => {
    const handleScroll = () => {
        const offsets = imgRefs.current.map(ref => {
            if (!ref) return Number.POSITIVE_INFINITY;
            const rect = ref.getBoundingClientRect();
            // Adjust this value: higher fraction = highlight stays longer
            return Math.abs(rect.top - window.innerHeight / 2.5);
        });
        const minIndex = offsets.indexOf(Math.min(...offsets));
        setActiveStep(minIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
}, []);

    return (
        <div className='flex items-start justify-center gap-20 w-full p-4 h-[240vh]'>
            <section className='left sticky top-0 left-0 w-full md:w-1/2 pt-10 '>
                <div className='flex flex-col gap-4'>
                    {steps.map((item, index) => (
                        <div
                            key={index}
                            className={`p-4 bg-zinc-800 rounded-lg mb-4 transition-all duration-300 ${
                                activeStep === index
                                    ? "ring-4 ring-blue-400 scale-105 bg-zinc-900 shadow-xl"
                                    : ""
                            }`}
                        >
                            <h3 className="text-lg font-semibold text-blue-400">{item.step}</h3>
                            <p className="text-zinc-300">{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section className='right w-full md:w-1/2 pt-10'>
                {images.map((src, index) => (
                    <div
                        key={index}
                        className="p-4 h-[60vh] rounded-lg mb-8 flex items-center justify-center"
                        ref={el => (imgRefs.current[index] = el)}
                    >
                        <img
                            src={src}
                            alt={`src ${index + 1}`}
                            className="w-full rounded-lg shadow-lg border-4 border-blue-700 object-cover h-full"
                        />
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Middle;