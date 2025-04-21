'use client';

import { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Footer from '@/components/Footer';

export default function Home() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();
  const [notes, setNotes] = useState([]);

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('speakeasy-notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('speakeasy-notes', JSON.stringify(notes));
  }, [notes]);

  const handleRecord = () => {
    if (!listening) {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
    } else {
      SpeechRecognition.stopListening();
      if (transcript.trim()) {
        setNotes((prevNotes) => [...prevNotes, transcript]);
      }
      resetTranscript();
    }
  };

  const handleCopy = () => {
    if (transcript) {
      navigator.clipboard.writeText(transcript);
      alert('Copied to clipboard!');
    }
  };

  const handleClear = () => {
    resetTranscript();
    setNotes([]);
    localStorage.removeItem('speakeasy-notes');
  };

  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white p-8">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
          🎤 SpeakEasy 2.0
        </h1>

        {/* Animated Mic Container */}
        <div className="relative flex items-center justify-center mb-8">
          {/* Pulsing Ring Animation */}
          {listening && (
            <div className="absolute w-24 h-24 bg-red-500/20 rounded-full animate-ping" />
          )}

          {/* Mic Button with Animation */}
          <button
            onClick={handleRecord}
            className={`relative z-10 flex items-center justify-center w-20 h-20 rounded-full transition-all duration-300 ${
              listening 
                ? 'bg-red-600 hover:bg-red-700 scale-110' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {/* Mic Icon SVG */}
            <svg
              className={`w-12 h-12 transition-colors ${
                listening ? 'text-red-200 animate-pulse' : 'text-green-200'
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
          </button>

          {/* Sound Wave Dots Animation */}
          {listening && (
            <div className="absolute -bottom-8 flex items-center space-x-1.5">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
          )}
        </div>
        {/* Transcription Display */}
        <div className="mt-10 text-center text-xl font-mono bg-gray-700 p-4 rounded-lg w-full max-w-2xl min-h-[4rem] relative">
          {listening ? '🎙️ Listening...' : transcript || 'Your transcription will appear here.'}
          
          {/* Copy Button */}
          {transcript && (
            <button
              onClick={handleCopy}
              className="absolute top-2 right-2 p-1 hover:bg-gray-600 rounded-md transition-colors"
              title="Copy transcription"
            >
              📋
            </button>
          )}
        </div>

        {/* Notes Section */}
        <div className="mt-8 w-full max-w-2xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Saved Notes</h2>
            {notes.length > 0 && (
              <button
                onClick={handleClear}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Clear All
              </button>
            )}
          </div>
          
          <ul>
            {notes.map((note, index) => (
              <li 
                key={index} 
                className="bg-gray-800 p-4 rounded-lg mb-2 text-white flex justify-between items-center"
              >
                <span>{note}</span>
                <button
                  onClick={() => navigator.clipboard.writeText(note)}
                  className="ml-4 p-1 hover:bg-gray-700 rounded-md transition-colors"
                  title="Copy note"
                >
                  📋
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  )
}