import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Globe, Calendar, Wrench, Bell, Settings, 
  Palette, Search, Moon, Clock, Hourglass, NotebookPen, RotateCcw
} from 'lucide-react';
import './App.css';

export default function App() {
  const [time, setTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(false);
  
  // Stopwatch States
  const [swTime, setSwTime] = useState(0);
  const [swRunning, setSwRunning] = useState(false);

  // Live Clock Ticker
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Stopwatch Ticker
  useEffect(() => {
    let interval;
    if (swRunning) {
      interval = setInterval(() => setSwTime((prev) => prev + 10), 10);
    }
    return () => clearInterval(interval);
  }, [swRunning]);

  const formatStopwatch = () => {
    const ms = `00${swTime % 1000}`.slice(-3);
    const sec = `0${Math.floor((swTime / 1000) % 60)}`.slice(-2);
    const min = `0${Math.floor((swTime / 60000) % 60)}`.slice(-2);
    const hr = `0${Math.floor(swTime / 3600000)}`.slice(-2);
    return `${hr}:${min}:${sec}.${ms}`;
  };

  const hours = time.getHours();
  const formattedHours = is24Hour ? `0${hours}`.slice(-2) : `0${hours % 12 || 12}`.slice(-2);
  const formattedMinutes = `0${time.getMinutes()}`.slice(-2);
  const formattedSeconds = `0${time.getSeconds()}`.slice(-2);
  const ampm = hours >= 12 ? 'PM' : 'AM';

  return (
    <div className="min-h-screen bg-[#050711] text-white flex flex-col justify-between p-3 select-none">
      
      {/* 1. TOP NAVBAR */}
      <header className="glass-panel px-6 py-2.5 flex items-center justify-between neon-border-purple mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🇮🇳</span>
          <div>
            <h1 className="text-lg font-bold font-tech tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-green-400">
              भारत CLOCK
            </h1>
            <p className="text-[10px] text-gray-400">Made in India ❤️</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <button className="flex items-center gap-2 text-cyan-400 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30">
            <LayoutDashboard size={15} /> Home
          </button>
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition">
            <Globe size={15} /> World Clock
          </button>
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition">
            <Calendar size={15} /> Calendar
          </button>
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition">
            <Wrench size={15} /> Tools
          </button>
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition">
            <Bell size={15} /> Alarm
          </button>
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition">
            <Settings size={15} /> Settings
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg bg-slate-800/60 text-gray-300"><Search size={15} /></button>
          <button className="p-2 rounded-lg bg-slate-800/60 text-cyan-400 border border-cyan-500/20"><Moon size={15} /></button>
          <span className="text-xs px-2 py-1 rounded bg-slate-800 border border-white/10 text-gray-300">EN ▾</span>
        </div>
      </header>

      {/* 2. BODY LAYOUT */}
      <div className="flex gap-3 flex-1">
        
        {/* LEFT SIDEBAR */}
        <aside className="glass-panel hidden md:flex flex-col items-center justify-between py-4 px-2 neon-border-cyan w-16">
          <div className="flex flex-col items-center gap-5">
            <button className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/40"><LayoutDashboard size={18} /></button>
            <button className="p-2 text-gray-400 hover:text-purple-400"><Globe size={18} /></button>
            <button className="p-2 text-gray-400 hover:text-pink-400"><Calendar size={18} /></button>
            <button className="p-2 text-gray-400 hover:text-blue-400"><Wrench size={18} /></button>
            <button className="p-2 text-gray-400 hover:text-red-400"><Bell size={18} /></button>
            <button className="p-2 text-gray-400 hover:text-yellow-400"><Settings size={18} /></button>
            <button className="p-2 text-gray-400 hover:text-green-400"><Palette size={18} /></button>
          </div>
          <div className="text-[9px] flex flex-col items-center text-green-400 font-tech">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse mb-1"></span>
            LIVE
          </div>
        </aside>

        {/* MAIN 3-COLUMN DASHBOARD */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
          
          {/* TOP-LEFT & MID: BIG CLOCK (Spans 2 cols) */}
          <div className="glass-panel p-5 neon-border-cyan md:col-span-2 flex flex-col justify-between">
            <div className="flex justify-between items-center text-xs text-cyan-400 font-tech">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span> INDIA STANDARD TIME (UTC +5:30)
              </span>
              <span className="px-2 py-0.5 rounded bg-green-950/80 border border-green-500/40 text-green-400 text-[10px]">● LIVE</span>
            </div>

            <div className="my-3 flex items-baseline gap-1">
              <span className="font-digital text-6xl md:text-7xl font-bold tracking-wider neon-text-pink">
                {formattedHours}:{formattedMinutes}
              </span>
              <span className="font-digital text-5xl md:text-6xl font-bold neon-text-green">
                :{formattedSeconds}
              </span>
              {!is24Hour && (
                <span className="font-digital text-xl text-cyan-400 ml-2">{ampm}</span>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-300 font-tech border-t border-white/10 pt-2">
              <span>📍 NEW DELHI, INDIA</span>
              <span>TUESDAY, 25 AUGUST 2026</span>
              <div className="flex items-center gap-1 bg-black/40 p-1 rounded border border-white/10">
                <button onClick={() => setIs24Hour(false)} className={`px-2 py-0.5 rounded text-xs ${!is24Hour ? 'bg-purple-600 text-white' : 'text-gray-400'}`}>12H</button>
                <button onClick={() => setIs24Hour(true)} className={`px-2 py-0.5 rounded text-xs ${is24Hour ? 'bg-purple-600 text-white' : 'text-gray-400'}`}>24H</button>
              </div>
            </div>
          </div>

          {/* TOP-RIGHT: CALENDAR (1 col) */}
          <div className="glass-panel p-4 neon-border-purple flex flex-col justify-between">
            <div className="flex justify-between items-center text-xs font-tech text-purple-300 mb-1">
              <span className="flex items-center gap-1"><Calendar size={13} /> CALENDAR</span>
              <span>AUGUST 2026</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-gray-400 font-tech">
              <span className="text-red-400">S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
              <span className="p-0.5">26</span><span className="p-0.5">27</span><span className="p-0.5">28</span><span className="p-0.5">29</span><span className="p-0.5">30</span><span className="p-0.5">31</span><span className="p-0.5">1</span>
              <span className="p-0.5">2</span><span className="p-0.5">3</span><span className="p-0.5">4</span><span className="p-0.5">5</span><span className="p-0.5">6</span><span className="p-0.5">7</span><span className="p-0.5">8</span>
              <span className="p-0.5">9</span><span className="p-0.5">10</span><span className="p-0.5">11</span><span className="p-0.5">12</span><span className="p-0.5">13</span><span className="p-0.5">14</span><span className="p-0.5">15</span>
              <span className="p-0.5">16</span><span className="p-0.5">17</span><span className="p-0.5">18</span><span className="p-0.5">19</span><span className="p-0.5">20</span><span className="p-0.5">21</span><span className="p-0.5">22</span>
              <span className="p-0.5">23</span><span className="p-0.5">24</span>
              <span className="p-0.5 bg-green-500/20 text-green-300 border border-green-400 rounded font-bold">25</span>
              <span className="p-0.5">26</span><span className="p-0.5">27</span><span className="p-0.5">28</span><span className="p-0.5">29</span>
            </div>
            <div className="text-[10px] text-gray-400 border-t border-white/10 pt-1.5 flex justify-between">
              <span>No events today</span>
              <span className="text-cyan-400 cursor-pointer">+ Add</span>
            </div>
          </div>

          {/* ROW 2: WEATHER */}
          <div className="glass-panel p-4 neon-border-cyan flex flex-col justify-between">
            <div className="flex justify-between items-center text-xs text-yellow-400">
              <span>☀️ WEATHER</span>
              <span className="text-gray-400 text-[10px]">New Delhi</span>
            </div>
            <div className="flex items-center justify-between my-2">
              <span className="text-4xl font-digital text-yellow-300">28°C</span>
              <div className="text-[10px] text-gray-400 text-right">
                <p>Humidity: 58%</p>
                <p>Wind: 12 km/h</p>
                <p>Clear Sky</p>
              </div>
            </div>
            <div className="flex justify-between text-[9px] text-gray-400 border-t border-white/10 pt-1.5">
              <span>WED: 32°</span><span>THU: 31°</span><span>FRI: 30°</span><span>SAT: 31°</span>
            </div>
          </div>

          {/* ROW 2: WORLD CLOCK */}
          <div className="glass-panel p-4 neon-border-green flex flex-col justify-between">
            <div className="flex justify-between items-center text-xs text-green-400 mb-1 font-tech">
              <span>🌐 WORLD CLOCK</span>
              <span className="text-[10px] text-gray-400">+ Add City</span>
            </div>
            <div className="flex flex-col gap-1.5 text-xs">
              <div className="flex justify-between items-center bg-white/5 p-1 rounded">
                <span>🇺🇸 New York</span>
                <span className="font-digital text-cyan-300">11:15 PM</span>
              </div>
              <div className="flex justify-between items-center bg-white/5 p-1 rounded">
                <span>🇬🇧 London</span>
                <span className="font-digital text-purple-300">04:15 AM</span>
              </div>
              <div className="flex justify-between items-center bg-white/5 p-1 rounded">
                <span>🇯🇵 Tokyo</span>
                <span className="font-digital text-pink-300">12:15 PM</span>
              </div>
            </div>
          </div>

          {/* ROW 2: TOOLS */}
          <div className="glass-panel p-4 neon-border-purple flex flex-col justify-between">
            <div className="text-xs text-purple-300 mb-1 font-tech">🛠️ TOOLS</div>
            <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
              <div className="p-1.5 rounded bg-cyan-950/30 border border-cyan-500/30 text-cyan-300 flex flex-col items-center"><Clock size={14} />Stopwatch</div>
              <div className="p-1.5 rounded bg-amber-950/30 border border-amber-500/30 text-amber-300 flex flex-col items-center"><Hourglass size={14} />Timer</div>
              <div className="p-1.5 rounded bg-blue-950/30 border border-blue-500/30 text-blue-300 flex flex-col items-center"><Bell size={14} />Alarm</div>
              <div className="p-1.5 rounded bg-pink-950/30 border border-pink-500/30 text-pink-300 flex flex-col items-center"><RotateCcw size={14} />Count</div>
              <div className="p-1.5 rounded bg-red-950/30 border border-red-500/30 text-red-300 flex flex-col items-center">🍅 Pomo</div>
              <div className="p-1.5 rounded bg-yellow-950/30 border border-yellow-500/30 text-yellow-300 flex flex-col items-center"><NotebookPen size={14} />Notes</div>
            </div>
          </div>

          {/* ROW 3: STOPWATCH */}
          <div className="glass-panel p-4 neon-border-cyan flex flex-col justify-between">
            <div className="text-xs text-cyan-400 font-tech">⏱️ STOPWATCH</div>
            <div className="text-center my-2">
              <span className="font-digital text-xl text-cyan-300 tracking-wider">
                {formatStopwatch()}
              </span>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setSwRunning(!swRunning)} 
                className={`flex-1 py-1 rounded text-xs font-semibold ${swRunning ? 'bg-red-500/20 text-red-300 border border-red-500' : 'bg-green-500/20 text-green-300 border border-green-500'}`}
              >
                {swRunning ? 'Pause' : 'Start'}
              </button>
              <button 
                onClick={() => { setSwRunning(false); setSwTime(0); }} 
                className="px-3 py-1 rounded text-xs bg-slate-700/40 text-gray-300 border border-white/10"
              >
                Reset
              </button>
            </div>
          </div>

          {/* ROW 3: TIMER */}
          <div className="glass-panel p-4 neon-border-purple flex flex-col justify-between">
            <div className="text-xs text-purple-400 font-tech">⏳ TIMER</div>
            <div className="flex justify-around items-center my-2">
              <span className="font-digital text-xl text-purple-300">00:25:00</span>
              <span className="text-[10px] px-2 py-0.5 bg-purple-500/20 border border-purple-500 rounded-full text-purple-300">25:00</span>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-1 rounded text-xs bg-orange-500/20 text-orange-300 border border-orange-500">Start</button>
              <button className="px-3 py-1 rounded text-xs bg-slate-700/40 text-gray-300 border border-white/10">Reset</button>
            </div>
          </div>

          {/* ROW 3: ALARM */}
          <div className="glass-panel p-4 neon-border-green flex flex-col justify-between">
            <div className="flex justify-between items-center text-xs text-green-400 font-tech">
              <span>🔔 ALARM</span>
              <span className="text-[10px] cursor-pointer">+ Add</span>
            </div>
            <div className="flex items-center justify-between bg-white/5 p-1.5 rounded">
              <div>
                <p className="font-digital text-xs text-green-300">07:00 AM</p>
                <p className="text-[9px] text-gray-400">Daily</p>
              </div>
              <input type="checkbox" defaultChecked className="accent-green-400 w-3.5 h-3.5" />
            </div>
            <div className="flex items-center justify-between bg-white/5 p-1.5 rounded">
              <div>
                <p className="font-digital text-xs text-gray-300">08:30 AM</p>
                <p className="text-[9px] text-gray-400">Mon, Tue, Wed</p>
              </div>
              <input type="checkbox" className="accent-green-400 w-3.5 h-3.5" />
            </div>
          </div>

        </div>

      </div>

      {/* 4. FOOTER */}
      <footer className="glass-panel px-6 py-2 flex items-center justify-between text-xs text-gray-400 mt-3">
        <span>© 2026 Bharat Clock. All rights reserved. 🇮🇳</span>
        <span className="text-yellow-400/90 font-tech italic text-[11px]">"समय सबसे कीमती दौलत है, इसे सही दिशा में निवेश करें।"</span>
        <span>Made with ❤️ in India</span>
      </footer>

    </div>
  );
}
