import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { 
  Sparkles, Calendar, MapPin, Clock, Palette, Play, Pause,
  Download, ChevronLeft, Mic, Link as LinkIcon, 
  Trophy, Building2, Megaphone, QrCode 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react"; 

export default function PosterGenerator() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
    tagline: "",
    time: "",
    theme_color: "#7c3aed",
    tone: "formal",
    target_audience: "students",
    call_to_action: "Register Now",
    // New Advanced Fields
    registration_link: "",
    organization_name: "",
    prizes: "",
    contact_info: ""
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    try {
      const response = await axios.post("http://localhost:8000/api/poster/generate-poster", formData);
      setResult(response.data);
    } catch (error) {
      alert(error.response?.data?.detail || "Failed to generate poster.");
    } finally {
      setLoading(false);
    }
  };

  const handlePlayPause = () => {
    if (!audioRef.current && result?.announcement_audio) {
      audioRef.current = new Audio(result.announcement_audio);
      audioRef.current.addEventListener('ended', () => setIsPlaying(false));
    }

    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 flex flex-col md:flex-row">
      
      {/* --- LEFT SIDEBAR: CONFIGURATION --- */}
      <div className="w-full md:w-[400px] bg-slate-900/50 border-r border-slate-800 p-6 overflow-y-auto h-screen custom-scrollbar">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
        >
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform"/> Back
        </button>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Core Details */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-purple-400">
              <Sparkles size={18}/>
              <p className="text-xs font-bold uppercase tracking-widest">Event Identity</p>
            </div>
            <div className="space-y-3">
              <div className="relative">
                <Building2 className="absolute left-3 top-3.5 text-slate-500" size={16}/>
                <input type="text" name="organization_name" placeholder="Hosting Organization (e.g. Google DSC)" value={formData.organization_name} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-purple-500 outline-none" />
              </div>
              <input type="text" name="title" placeholder="Event Title" value={formData.title} onChange={handleChange} required className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none" />
              <textarea name="description" placeholder="Description..." value={formData.description} onChange={handleChange} required rows="2" className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none resize-none" />
            </div>
          </section>

          {/* Section 2: Logistics */}
          <section className="space-y-4">
             <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Time & Place</p>
             <div className="grid grid-cols-2 gap-3">
                <input type="date" name="date" placeholder="March 15" value={formData.date} onChange={handleChange} className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm outline-none" />
                <input type="time" name="time" placeholder="10:00 AM" value={formData.time} onChange={handleChange} className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm outline-none" />
             </div>
             <input type="text" name="venue" placeholder="Venue Location" value={formData.venue} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm outline-none" />
          </section>

          {/* Section 3: Marketing & Reach (NEW) */}
          <section className="space-y-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Marketing & Conversion</p>
            <div className="space-y-3">
              <div className="relative">
                <LinkIcon className="absolute left-3 top-3.5 text-slate-500" size={16}/>
                <input type="url" name="registration_link" placeholder="Registration URL (for QR)" value={formData.registration_link} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="relative">
                <Trophy className="absolute left-3 top-3.5 text-slate-500" size={16}/>
                <input type="text" name="prizes" placeholder="Incentives (e.g. Win $500, Certificates)" value={formData.prizes} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm outline-none" />
              </div>
              <div className="relative">
                <Megaphone className="absolute left-3 top-3.5 text-slate-500" size={16}/>
                <input type="text" name="contact_info" placeholder="Contact Info (e.g. +91 987...)" value={formData.contact_info} onChange={handleChange} className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm outline-none" />
              </div>
            </div>
          </section>

          {/* Section 4: Design Style */}
          <section className="space-y-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Branding Style</p>
            <div className="flex items-center gap-4 bg-slate-800 p-3 rounded-xl border border-slate-700">
              <Palette className="text-slate-500" size={20} />
              <input type="color" name="theme_color" value={formData.theme_color} onChange={handleChange} className="w-10 h-10 rounded cursor-pointer bg-transparent" />
              <select name="tone" value={formData.tone} onChange={handleChange} className="flex-1 bg-transparent text-sm outline-none">
                <option value="formal">Formal</option>
                <option value="fun">Fun</option>
                <option value="technical">Tech</option>
              </select>
            </div>
          </section>

          <button type="submit" disabled={loading} className="w-full py-4 bg-linear-to-r from-purple-600 to-blue-600 rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2">
            {loading ? "Designing..." : "Create Campaign Assets"}
          </button>
        </form>
      </div>

      {/* --- RIGHT SIDE: CANVAS PREVIEW --- */}
      <div className="flex-1 bg-[#020617] p-8 flex flex-col items-center justify-center relative overflow-y-auto">
        {result ? (
          <div className="w-full max-w-6xl z-10 space-y-8 animate-in fade-in zoom-in duration-500">
             {/* Main Content Grid */}
             <div className="grid lg:grid-cols-5 gap-8">
               {/* Poster Column */}
               <div className="lg:col-span-3 space-y-4">
                  <div className="bg-slate-900 border border-slate-700 p-2 rounded-2xl shadow-2xl relative group">
                    <img src={result.poster_url} className="w-full rounded-xl" alt="Poster" />
                    {/* Dynamic QR Overlay */}
                    {formData.registration_link && (
                      <div className="absolute bottom-6 right-6 p-2 bg-white rounded-lg shadow-xl">
                        <QRCodeSVG value={formData.registration_link} size={60} />
                      </div>
                    )}
                  </div>
                  <a href={result.poster_url} download className="block w-full text-center bg-slate-800 py-3 rounded-xl border border-slate-700 font-bold hover:bg-slate-700 transition-colors">
                    <Download className="inline-block mr-2" size={18}/> Download High-Res Poster
                  </a>
               </div>

               {/* Multimodal Column */}
               <div className="lg:col-span-2 space-y-4">
                  <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl backdrop-blur-xl">
                    <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Mic size={14}/> AI Voice Script</p>
                    <p className="text-sm italic text-slate-300">"{result.announcement_script}"</p>
                    <div className="space-y-3 mt-6">
                      <button 
                        onClick={handlePlayPause} 
                        className="w-full py-3 bg-purple-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-purple-700 transition-colors"
                      >
                        {isPlaying ? (
                          <>
                            <Pause size={16} fill="white"/> Pause
                          </>
                        ) : (
                          <>
                            <Play size={16} fill="white"/> {audioRef.current ? 'Resume' : 'Listen'}
                          </>
                        )}
                      </button>
                      <a 
                        href={result.announcement_audio} 
                        download 
                        className="block w-full text-center bg-slate-700 py-3 rounded-xl border border-slate-600 font-bold hover:bg-slate-600 transition-colors"
                      >
                        <Download className="inline-block mr-2" size={16}/> Download Audio
                      </a>
                    </div>
                  </div>
                  
                  {/* Live QR Module */}
                  <div className="bg-blue-600/10 border border-blue-500/20 p-6 rounded-2xl flex flex-col items-center">
                    <QrCode size={24} className="text-blue-400 mb-2"/>
                    <p className="text-[10px] text-blue-300 uppercase font-bold mb-4">Live Registration QR</p>
                    <div className="bg-white p-3 rounded-xl shadow-lg">
                      <QRCodeSVG value={formData.registration_link || "https://campus-ai.edu"} size={120} />
                    </div>
                    <p className="text-[10px] text-slate-500 mt-4 text-center px-4 italic">Embedded automatically in generated poster.</p>
                  </div>
               </div>
             </div>

             {/* Marketing Content Section */}
             {result.marketing && (
               <div className="grid lg:grid-cols-3 gap-6 mt-8">
                 {/* Taglines */}
                 <div className="bg-linear-to-br from-purple-900/40 to-slate-900/40 border border-purple-500/30 p-6 rounded-2xl">
                   <h3 className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                     <Sparkles size={16}/> Taglines
                   </h3>
                   <ul className="space-y-3">
                     {result.marketing.taglines?.map((tagline, idx) => (
                       <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                         <span className="text-purple-400 font-bold">{idx + 1}.</span>
                         <span>{tagline}</span>
                       </li>
                     ))}
                   </ul>
                 </div>

                 {/* Captions */}
                 <div className="bg-linear-to-br from-blue-900/40 to-slate-900/40 border border-blue-500/30 p-6 rounded-2xl">
                   <h3 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                     <Megaphone size={16}/> Social Captions
                   </h3>
                   <div className="space-y-4">
                     {result.marketing.short_caption && (
                       <div>
                         <p className="text-xs text-slate-500 mb-1">Short:</p>
                         <p className="text-sm text-slate-300">{result.marketing.short_caption}</p>
                       </div>
                     )}
                     {result.marketing.detailed_caption && (
                       <div>
                         <p className="text-xs text-slate-500 mb-1">Detailed:</p>
                         <p className="text-sm text-slate-300">{result.marketing.detailed_caption}</p>
                       </div>
                     )}
                   </div>
                 </div>

                 {/* Hashtags */}
                 <div className="bg-linear-to-br from-pink-900/40 to-slate-900/40 border border-pink-500/30 p-6 rounded-2xl">
                   <h3 className="text-sm font-bold text-pink-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                     <LinkIcon size={16}/> Instagram Hashtags
                   </h3>
                   <div className="flex flex-wrap gap-2">
                     {result.marketing.hashtags?.map((tag, idx) => (
                       <span key={idx} className="bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full text-xs font-medium">
                         {tag}
                       </span>
                     ))}
                   </div>
                 </div>
               </div>
             )}
          </div>
        ) : (
          <div className="text-center">
            <div className="w-24 h-24 bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Sparkles className="text-slate-700" size={40} />
            </div>
            <h2 className="text-xl font-bold text-slate-400">Campaign Preview Studio</h2>
            <p className="text-slate-600 text-sm mt-2 max-w-xs">Your event branding, QR codes, and AI announcements will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}