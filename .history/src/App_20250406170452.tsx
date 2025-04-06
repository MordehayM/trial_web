import React, { useEffect, useState, useRef } from 'react';
import { AudioWaveform as Waveform, Github, Volume2 } from 'lucide-react';


interface Example {
  id: string;
  maskedText: string;
  InpaintedText: string;
  targetText: string;
  maskedAudio: string;
  InpaintedAudio: string;
  targetAudio: string;
  maskedSpectrogram: string;
  InpaintedSpectrogram: string;
  targetSpectrogram: string;
}

interface ExamplesData {
  "0.25sec": Example[];
  "0.5sec": Example[];
  "1sec": Example[];
}



function AudioPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <div className="flex flex-col gap-2 items-start">
      {/* Audio element with visible controls */}
      <audio ref={audioRef} src={src} controls className="w-full">
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

function ExampleCard({ example }: { example: Example }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Masked Signal */}
        <div className="md:col-span-3 space-y-4">
          <div className="flex items-center gap-2">
            <Waveform className="w-5 h-5 text-red-500" />
            <h3 className="font-semibold text-gray-800">Masked Signal</h3>
          </div>
          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{example.maskedText}</p>
          <AudioPlayer src={example.maskedAudio} />
          <img 
            src={example.maskedSpectrogram} 
            alt="Masked Spectrogram" 
            className="w-full shadow-sm"
          />
        </div>

        {/* Inpainted Signal */}
        <div className="md:col-span-3 space-y-4">
          <div className="flex items-center gap-2">
            <Waveform className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold text-gray-800">Inpainted Signal</h3>
          </div>
          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{example.InpaintedText}</p>
          <AudioPlayer src={example.InpaintedAudio} />
          <img 
            src={example.InpaintedSpectrogram} 
            alt="Inpainted Spectrogram" 
            className="w-full rounded-lg shadow-sm"
          />
        </div>

        {/* Target Signal */}
        <div className="md:col-span-3 space-y-4">
          <div className="flex items-center gap-2">
            <Waveform className="w-5 h-5 text-green-500" />
            <h3 className="font-semibold text-gray-800">Target Signal</h3>
          </div>
          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{example.targetText}</p>
          <AudioPlayer src={example.targetAudio} />
          <img 
            src={example.targetSpectrogram} 
            alt="Target Spectrogram" 
            className="w-full rounded-lg shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}

function ExampleSection({ title, examples }: { title: string; examples: Example[] }) {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Gap Duration: {title}
      </h2>
      {examples.map((example) => (
        <ExampleCard key={example.id} example={example} />
      ))}
    </section>
  );
}

function App() {
  const [examples, setExamples] = useState<ExamplesData | null>(null);

  useEffect(() => {
    fetch('/public/data/examples.json')
      .then(response => response.json())
      .then(data => setExamples(data))
      .catch(error => console.error('Error loading examples:', error));
  }, []);

  if (!examples) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading examples...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Speech Inpainting</h1>
              <p className="mt-1 text-gray-600">Reconstructing masked speech signals with deep learning</p>
            </div>
            <a
              href="https://github.com/yourusername/speech-inpainting"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>View on GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Project Description */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">About the Project</h2>
          <p className="text-gray-600">
            This project demonstrates the capabilities of our speech inpainting model. 
            Below are examples showing how the model reconstructs masked portions of speech signals, 
            comparing the masked input, model output, and ground truth target. Examples are organized 
            by gap duration (0.25, 0.5, and 1 second) to showcase the model's performance across 
            different masking intervals.
          </p>
        </section>

        {/* Examples Sections */}
        <ExampleSection title="0.25 seconds" examples={examples["0.25sec"]} />
        <ExampleSection title="0.5 seconds" examples={examples["0.5sec"]} />
        <ExampleSection title="1 second" examples={examples["1sec"]} />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600">
            © 2024 Speech Inpainting Project. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;