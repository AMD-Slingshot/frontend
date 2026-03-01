import { useState } from "react";
import axios from "axios";

export default function Audio() {
  const [listening, setListening] = useState(false);
  const [userText, setUserText] = useState("");
  const [aiReply, setAiReply] = useState("");
  const [loading, setLoading] = useState(false);

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();
    setListening(true);

    recognition.onresult = async (event) => {
      const text = event.results[0][0].transcript;
      setUserText(text);
      setListening(false);
      sendToBackend(text);
    };

    recognition.onerror = () => {
      setListening(false);
    };
  };

  const sendToBackend = async (text) => {
    try {
      setLoading(true);
      setAiReply(""); // Clear previous reply

      const res = await axios.post("http://localhost:8000/chat", {
        message: text,
        return_audio: true  // Request audio from backend
      });

      const reply = res.data.reply;
      setAiReply(reply);

      // Play audio from backend if available
      if (res.data.audio_url) {
        const audioPlayer = new window.Audio(res.data.audio_url);
        audioPlayer.play().catch(err => {
          console.error("Audio playback failed:", err);
          // Fallback to browser TTS if audio fails
          const speech = new SpeechSynthesisUtterance(reply);
          speech.lang = "en-US";
          window.speechSynthesis.speak(speech);
        });
      } else {
        // Fallback to browser TTS if no audio URL
        const speech = new SpeechSynthesisUtterance(reply);
        speech.lang = "en-US";
        window.speechSynthesis.speak(speech);
      }

    } catch (error) {
      console.error(error);
      
      // Display specific error message from backend
      let errorMessage = "Error connecting to backend";
      
      if (error.response) {
        // Backend responded with an error
        errorMessage = error.response.data.detail || `Server error: ${error.response.status}`;
      } else if (error.request) {
        // Request was made but no response
        errorMessage = "No response from server. Make sure the backend is running.";
      }
      
      setAiReply(`❌ Error: ${errorMessage}`);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h2 className="text-3xl font-bold mb-6">🎤 Voice Assistant</h2>

      <button
        onClick={startListening}
        className={`px-6 py-3 rounded-lg text-white text-lg ${
          listening ? "bg-red-600" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {listening ? "Listening..." : "Start Talking"}
      </button>

      {loading && <p className="mt-4 text-gray-600">Processing...</p>}

      {userText && (
        <div className="mt-6 bg-white shadow-md p-4 rounded-lg w-full max-w-md">
          <p className="font-semibold">You:</p>
          <p>{userText}</p>
        </div>
      )}

      {aiReply && (
        <div className="mt-4 bg-blue-100 shadow-md p-4 rounded-lg w-full max-w-md">
          <p className="font-semibold">AI:</p>
          <p>{aiReply}</p>
        </div>
      )}
    </div>
  );
}