"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, Mic, MicOff, Trash2 } from "lucide-react";
import { analyzeText, SpamAnalysis } from "@/utils/spamWords";
import { SpamAnalysisDisplay } from "./spam-analysis";

// Supprimer l'import de env qui n'existe pas
// Définir l'URL de l'API directement
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

declare global {
  class SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onstart: () => void;
    onend: () => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
    onresult: (event: SpeechRecognitionEvent) => void;
    start: () => void;
    stop: () => void;
  }
  
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

export function SpamChecker() {
  const [email, setEmail] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [spamScore, setSpamScore] = useState<number | null>(null);
  const [spamAnalysis, setSpamAnalysis] = useState<SpamAnalysis | null>(null);

  useEffect(() => {
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        const recognition = recognitionRef.current;
        
        // Configurer en anglais
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        // Vérifier si la langue anglaise est disponible
        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error('Speech recognition error:', event.error);
          if (event.error === 'language-not-supported') {
            setError("English voice recognition is not available. Please check your browser settings.");
          } else {
            setError("Voice recognition error. Please try again.");
          }
          setIsListening(false);
        };

        recognition.onstart = () => {
          console.log('Voice recognition started in English');
          setIsListening(true);
          setError(null);
        };

        recognition.onend = () => {
          console.log('Voice recognition ended');
          setIsListening(false);
        };

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          const results = Array.from(event.results);
          const transcript = results
            .map(result => {
              const text = (result as unknown as SpeechRecognitionResult)[0].transcript;
              return text.trim();
            })
            .join(' ');
          
          setEmail(transcript);
        };
      } else {
        setError("Voice recognition is not supported by your browser. Please use Chrome or Edge.");
      }
    } catch (error) {
      console.error('Speech recognition setup error:', error);
      setError("Voice recognition is not available in your browser.");
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (isListening) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setRecordingTime(0);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isListening]);

  const startListening = () => {
    try {
      if (recognitionRef.current) {
        // Reset error before starting
        setError(null);
        recognitionRef.current.start();
      }
    } catch (error) {
      console.error('Start recognition error:', error);
      setError("Error starting voice recognition. Please use Chrome or Edge.");
    }
  };

  const stopListening = () => {
    try {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    } catch (error) {
      console.error('Stop recognition error:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const cancelRecording = () => {
    stopListening();
    setEmail('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);
    setSpamAnalysis(null);

    if (!email.trim()) {
      setError("Please enter some text to check");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: email }),
      });

      if (!response.ok) {
        throw new Error("Failed to check spam");
      }

      const data = await response.json();
      setResult(data);

      const spamProbability = data.probability || 0;
      setSpamScore(spamProbability);

      const analysis = analyzeText(email);
      setSpamAnalysis(analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="relative">
        <Textarea
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Paste your email here or hold the microphone button to dictate..."
          className="min-h-[200px] bg-zinc-900/50 border-zinc-800 focus:border-zinc-700 text-white placeholder:text-zinc-500 resize-none p-6 text-lg leading-relaxed rounded-2xl"
        />
        
        {isListening ? (
          <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-zinc-900/90 backdrop-blur-sm rounded-full p-2 pr-4">
            <Button
              onClick={cancelRecording}
              className="h-8 w-8 rounded-full bg-red-500/20 hover:bg-red-500/30 p-0 flex items-center justify-center"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="text-xs text-white/70 tabular-nums">
                {formatTime(recordingTime)}
            </div>
              <div className="w-24 h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-white/20 animate-[recording_2s_ease-in-out_infinite]" />
          </div>
              <Button
                onClick={stopListening}
                className="h-8 w-8 rounded-full bg-red-500 hover:bg-red-600 p-0 flex items-center justify-center"
              >
                <MicOff className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : (
          <Button
            onMouseDown={startListening}
            onMouseUp={stopListening}
            onMouseLeave={stopListening}
            onTouchStart={startListening}
            onTouchEnd={stopListening}
            className="absolute bottom-4 right-4 rounded-full w-10 h-10 p-0 bg-gradient-to-r from-red-400 to-purple-500 hover:opacity-90 transition-opacity flex items-center justify-center"
          >
            <Mic className="w-5 h-5" />
          </Button>
        )}
          </div>

      <div className="flex flex-col gap-6">
        <div className="flex justify-center">
          <Button
            onClick={handleSubmit}
            disabled={!email || isLoading}
            className="group px-12 bg-gradient-to-r from-red-400 to-purple-500 text-base font-normal tracking-wide rounded-full py-2.5 flex items-center gap-2 hover:opacity-95 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
          >
            <svg 
              className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
              />
            </svg>
            <span className="group-hover:translate-x-0.5 transition-transform duration-300">
              {isLoading ? (
              <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Analyzing...</span>
              </div>
              ) : (
                "Check Spam"
              )}
            </span>
          </Button>
        </div>

        {spamScore !== null && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                <span className="text-sm text-white/70">Ham</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-white/70">Spam</span>
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
              </div>
              </div>
            
            <div className="relative h-1.5">
              <div className="absolute inset-0 w-full bg-white/5 rounded-full">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-400 to-red-400"
                  style={{ width: '100%' }}
                />
              </div>
              <div 
                className="absolute top-1/2 -translate-y-1/2 h-5 w-5 bg-white rounded-full shadow-md"
                style={{ left: `${spamScore * 100}%` }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-900/90 backdrop-blur-sm px-2 py-1 rounded shadow-lg">
                  <span className="text-xs font-medium text-white">{Math.round(spamScore * 100)}%</span>
          </div>
              </div>
              </div>
            </div>
          )}
      </div>

      {error && (
        <Card className="p-4 bg-red-50 border-red-200 mt-4">
          <p className="text-red-600">{error}</p>
      </Card>
      )}

      {(spamAnalysis || result) && (
        <SpamAnalysisDisplay analysis={spamAnalysis!} mlResult={result} />
      )}
    </div>
  );
}
