import { useState } from "react";
import axios from "axios";

export default function PosterGenerator() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
    tagline: "",
    time: "",
    theme_color: "#2980b9",
    tone: "formal",
    target_audience: "general public",
    call_to_action: "Register Now",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/poster/generate-poster",
        formData
      );

      setResult(response.data);
    } catch (error) {
      console.error("Error generating poster:", error);
      alert(
        error.response?.data?.detail ||
          "Failed to generate poster. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const playAnnouncement = () => {
    if (result?.announcement_audio) {
      const audio = new window.Audio(result.announcement_audio);
      audio.play().catch((err) => {
        console.error("Audio playback failed:", err);
        alert("Failed to play audio");
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          🎨 Event Poster Generator
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">
              Event Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Tech Conference 2026"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Innovation Meets Excellence"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Brief description of the event..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Date *
                  </label>
                  <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="March 15, 2026"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Time *
                  </label>
                  <input
                    type="text"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="10:00 AM - 5:00 PM"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Venue *
                </label>
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Main Auditorium, Building A"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Theme Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    name="theme_color"
                    value={formData.theme_color}
                    onChange={handleChange}
                    className="w-16 h-10 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.theme_color}
                    onChange={(e) =>
                      setFormData({ ...formData, theme_color: e.target.value })
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="#2980b9"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Tone
                  </label>
                  <select
                    name="tone"
                    value={formData.tone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="formal">Formal</option>
                    <option value="fun">Fun</option>
                    <option value="technical">Technical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Target Audience
                  </label>
                  <select
                    name="target_audience"
                    value={formData.target_audience}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="students">Students</option>
                    <option value="developers">Developers</option>
                    <option value="faculty">Faculty</option>
                    <option value="general public">General Public</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Call to Action
                </label>
                <input
                  type="text"
                  name="call_to_action"
                  value={formData.call_to_action}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Register Now"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg text-white font-bold text-lg ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Generating..." : "🎨 Generate Poster & Announcement"}
              </button>
            </form>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Preview</h2>

            {loading && (
              <div className="flex flex-col items-center justify-center h-96">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
                <p className="mt-4 text-gray-600">Creating your poster...</p>
              </div>
            )}

            {result && !loading && (
              <div className="space-y-4">
                {/* Poster Image */}
                <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={result.poster_url}
                    alt="Generated Poster"
                    className="w-full"
                  />
                </div>

                {/* Download Button */}
                <a
                  href={result.poster_url}
                  download
                  className="block w-full py-2 bg-green-600 hover:bg-green-700 text-white text-center font-bold rounded-lg"
                >
                  📥 Download Poster
                </a>

                {/* Announcement Section */}
                <div className="border-t pt-4">
                  <h3 className="font-bold text-lg mb-2">
                    Voice Announcement:
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg mb-3">
                    <p className="text-sm text-gray-700 whitespace-pre-line">
                      {result.announcement_script}
                    </p>
                  </div>

                  <button
                    onClick={playAnnouncement}
                    className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg"
                  >
                    🔊 Play Announcement
                  </button>

                  <a
                    href={result.announcement_audio}
                    download
                    className="block w-full mt-2 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-center font-bold rounded-lg"
                  >
                    📥 Download Audio
                  </a>
                </div>
              </div>
            )}

            {!result && !loading && (
              <div className="flex items-center justify-center h-96 text-gray-400">
                <div className="text-center">
                  <p className="text-xl mb-2">👈</p>
                  <p>Fill out the form to generate your poster</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
