import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-10">Campus AI Dashboard</h1>

      <div className="grid grid-cols-2 gap-6">
        <button className="p-6 bg-gray-300 rounded-lg cursor-not-allowed">
          Text
        </button>

        <button
          onClick={() => navigate("/poster")}
          className="p-6 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          🎨 Poster Generator
        </button>

        <button
          onClick={() => navigate("/audio")}
          className="p-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          🎤 Audio Assistant
        </button>

        <button className="p-6 bg-gray-300 rounded-lg cursor-not-allowed">
          Code
        </button>
      </div>
    </div>
  );
}