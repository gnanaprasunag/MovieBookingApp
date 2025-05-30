import { useState, useRef } from 'react';

const NoteTaker = () => {
  
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  // Initialize SpeechRecognition instance
  const startListening = () => {
    if (!recognitionRef.current) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        const currentTranscript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join('');

        setTranscript(currentTranscript);
      };

      recognition.onend = () => {
        console.log('Speech recognition stopped.');
      };
      console.log("recognition",recognition)
      recognitionRef.current = recognition;
    }

    recognitionRef.current.start();
    setIsListening(true);
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };
console.log("transcript",transcript)
  return (
    <div>
      <h1>Voice-to-Text Note Taker</h1>
      <button onClick={startListening} disabled={isListening}>
        Start Talking
      </button>
      <button onClick={stopListening} disabled={!isListening}>
        Stop Talking
      </button>
      <textarea
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        rows="4"
        cols="50"
      />
      {transcript && <h2>{transcript}</h2>}
    </div>
  );
};

export default NoteTaker;
