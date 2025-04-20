'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Footer from '@/components/Footer';


export default function Home() {
  const [note, setNote] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);
  // Save note to local storage on change
useEffect(() => {
  const saved = localStorage.getItem('textnote');
  if (saved) setNote(saved);
}, []);

useEffect(() => {
  localStorage.setItem('textnote', note);
}, [note]);


  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        setNote(transcript);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const handleStart = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleStop = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <>
    <div className="flex justify-center gap-[95px] items-center min-h-screen bg-gradient-main">
      <img
      className='rounded-full drop-shadow-md'
        src="/logo.webp" // Place the downloaded image in the public folder
        alt="Voice Notes Logo"
        width={300}
        height={300}
        
      />
        <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-main text-blue-800 font-sans">

  <h1 className="text-5xl font-bold mb-2 text-white drop-shadow-md">🎤 TextNotes</h1>
  <p className="mb-6 text-lg text-white/90">Real-time speech to organized text notes</p>

  <div className="w-full max-w-xl bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-xl">
    <textarea
      className="w-full h-60 p-4 border rounded-lg resize-none focus:outline-none"
      value={note}
      readOnly
    />

    <div className="flex flex-wrap gap-3 mt-5">

            {/* Start/Stop Buttons */}
  {!isRecording ? (
    <button
      onClick={handleStart}
      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
    >
      Start Recording
    </button>
  ) : (
    <button
      onClick={handleStop}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Stop Recording
    </button>
  )}

  {/* Copy Button */}
  <button
    onClick={() => navigator.clipboard.writeText(note)}
    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
  >
    Copy
  </button>

  {/* Clear Button */}
  <button
    onClick={() => setNote('')}
    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
  >
    Clear
  </button>

        </div>
      </div>
    </main>
    </div>
    <Footer/>
    </>
  );
}
