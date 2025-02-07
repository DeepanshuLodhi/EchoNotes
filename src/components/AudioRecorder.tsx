

// import { useState, useEffect, useRef } from "react";
// import toast from "react-hot-toast";

// interface AudioRecorderProps {
//   onTranscription: (text: string) => void;
// }

// declare global {
//   interface Window {
//     SpeechRecognition: new () => SpeechRecognition;
//     webkitSpeechRecognition: new () => SpeechRecognition;
//   }
// }

// export default function AudioRecorder({ onTranscription }: AudioRecorderProps) {
//   const [isRecording, setIsRecording] = useState(false);
//   const [timer, setTimer] = useState(60);
//   const recognitionRef = useRef<SpeechRecognition | null>(null);
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);
//   const transcriptionRef = useRef<string>("");

//   useEffect(() => {
//     return () => {
//       stopRecording();
//     };
//   }, []);

//   const startRecording = () => {
//     try {
//       const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
//       if (!SpeechRecognitionAPI) {
//         toast.error("Speech recognition is not supported in this browser.");
//         return;
//       }

//       const recognition = new SpeechRecognitionAPI();
//       recognition.lang = "en-US";
//       recognition.continuous = true;
//       recognition.interimResults = false;
//       recognitionRef.current = recognition;
//       transcriptionRef.current = ""; // Reset transcription storage

//       recognition.onresult = (event: SpeechRecognitionEvent) => {
//         for (let i = event.resultIndex; i < event.results.length; i++) {
//           if (event.results[i].isFinal) {
//             transcriptionRef.current += event.results[i][0].transcript + " ";
//           }
//         }
//       };

//       recognition.onend = () => {
//         finalizeTranscription();
//       };

//       recognition.onerror = (event) => {
//         console.error("Speech recognition error:", event.error);
//         toast.error("Speech recognition error occurred.");
//         stopRecording();
//       };

//       recognition.start();
//       setIsRecording(true);
//       setTimer(60);

//       intervalRef.current = setInterval(() => {
//         setTimer((prev) => {
//           if (prev <= 1) {
//             stopRecording();
//             return 60;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//     } catch (error) {
//       console.error("Error accessing microphone:", error);
//       toast.error("Unable to access microphone.");
//     }
//   };

//   const stopRecording = () => {
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//     }
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//     }
//     setIsRecording(false);
//     setTimer(60);
//   };

//   const finalizeTranscription = () => {
//     const finalText = transcriptionRef.current.trim() || "No speech detected";
//     onTranscription(finalText);
//   };

//   return (
//     <button
//       onClick={isRecording ? stopRecording : startRecording}
//       className={`px-4 py-2 rounded-full flex items-center space-x-2 ${
//         isRecording ? "bg-red-500" : "bg-blue-500"
//       } text-white hover:opacity-90`}
//     >
//       {isRecording ? (
//         <>
//           <span className="animate-pulse">●</span>
//           <span>Stop Recording ({timer}s)</span>
//         </>
//       ) : (
//         "Start Recording"
//       )}
//     </button>
//   );
// }

import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

interface AudioRecorderProps {
  onTranscription: (text: string) => void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

export default function AudioRecorder({ onTranscription }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(60);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const transcriptionRef = useRef<string>("");

  useEffect(() => {
    return () => {
      stopRecording();
    };
  }, []);

  const startRecording = () => {
    try {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognitionAPI) {
        toast.error("Speech recognition is not supported in this browser.");
        return;
      }

      const recognition = new SpeechRecognitionAPI();
      recognition.lang = "en-US";
      recognition.continuous = true;
      recognition.interimResults = false;
      recognitionRef.current = recognition;
      transcriptionRef.current = ""; // Reset transcription storage

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            transcriptionRef.current += event.results[i][0].transcript + " ";
          }
        }
      };

      recognition.onend = () => {
        finalizeTranscription();
      };

      recognition.onerror = (event: Event & { error?: string }) => {
        console.error("Speech recognition error:", event.error);
        toast.error("Speech recognition error occurred.");
        stopRecording();
      };

      recognition.start();
      setIsRecording(true);
      setTimer(60);

      intervalRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            stopRecording();
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast.error("Unable to access microphone.");
    }
  };

  const stopRecording = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
    setTimer(60);
  };

  const finalizeTranscription = () => {
    const finalText = transcriptionRef.current.trim() || "No speech detected";
    onTranscription(finalText);
  };

  return (
    <button
      onClick={isRecording ? stopRecording : startRecording}
      className={`px-4 py-2 rounded-full flex items-center space-x-2 ${
        isRecording ? "bg-red-500" : "bg-blue-500"
      } text-white hover:opacity-90`}
    >
      {isRecording ? (
        <>
          <span className="animate-pulse">●</span>
          <span>Stop Recording ({timer}s)</span>
        </>
      ) : (
        "Start Recording"
      )}
    </button>
  );
}
