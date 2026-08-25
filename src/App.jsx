import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Globe, Calendar, Wrench, Bell, Settings, 
  Palette, Search, Moon, Sun, Volume2, Maximize2, Play, 
  RotateCcw, Pause, CheckCircle2, Clock, Hourglass, NotebookPen
} from 'lucide-react';
import './App.css';

export default function App() {
  const [time, setTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(false);
  
  // Stopwatch States
  const [swTime, setSwTime] = useState(0);
  const [swRunning, setSwRunning] = useState(false);

  // Clock Ticker
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
    <div className="min-h-screen flex flex-col justify-between p-3 select-none">
      
      {/* 1. TOP NAVBAR */}
      <header className="glass-panel px-6 py-3 flex items-center justify-between neon-border-purple mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🇮🇳</span>
          <div>
            <h1 className="text-xl font-bold font-tech tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-green-400">
              भारत CLOCK
            </h1>
            <p className="text-[10px] text-gray-400">Made in India ❤️</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <button className="flex items-center gap-2 text-cyan-400 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30">
            <LayoutDashboard size={16} /> Home
          </button>
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition">
            <Globe size={16} /> World Clock
          </button>
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition">
            <Calendar size={16} /> Calendar
          </button>
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition">
            <Wrench size={16} /> Tools
          </button>
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition">
            <Bell size={16} /> Alarm
          </button>
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition">
            <Settings size={16} /> Settings
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 text-gray-300">
            <Search size={16} />
          </button>
          <button className="p-2 rounded-lg bg-slate-800/60 text-cyan-400 border border-cyan-500/20">
            <Moon size={16} />
          </button>
          <span className="text-xs px-2 py-1 rounded bg-slate-800 border border-white/10 text-gray-300">EN ▾</span>
        </div>
      </header>

      {/* 2. BODY LAYOUT */}
      <div className="dashboard-grid flex-1">
        
        {/* LEFT SIDEBAR */}
        <aside className="glass-panel flex flex-col items-center justify-between py-6 neon-border-cyan">
          <div className="flex flex-col items-center gap-6">
            <button className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/40 shadow-lg shadow-cyan-500/20"><LayoutDashboard size={20} /></button>
            <button className="p-3 text-gray-400 hover:text-purple-400 transition"><Globe size={20} /></button>
            <button className="p-3 text-gray-400 hover:text-pink-400 transition"><Calendar size={20} /></button>
            <button className="p-3 text-gray-400 hover:text-blue-400 transition"><Wrench size={20} /></button>
            <button className="p-3 text-gray-400 hover:text-red-400 transition"><Bell size={20} /></button>
            <button className="p-3 text-gray-400 hover:text-yellow-400 transition"><Settings size={20} /></button>
            <button className="p-3 text-gray-400 hover:text-green-400 transition"><Palette size={20} /></button>
          </div>

          <div className="text-[10px] flex flex-col items-center text-green-400 font-tech">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse mb-1"></span>
            LIVE
          </div>
        </aside>

        {/* MAIN DASHBOARD */}
        <div className="flex flex-col gap-4">
          
          {/* TOP SECTION */}
          <div className="main-content-grid">
            
            {/* HERO CARD - DIGITAL CLOCK */}
            <div className="glass-panel p-6 neon-border-cyan flex flex-col justify-between relative overflow-hidden">
              <div className="flex justify-between items-center text-xs text-cyan-400 font-tech">
                <span className="tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span> INDIA STANDARD TIME (UTC +5:30)
                </span>
                <span className="px-2 py-0.5 rounded-full bg-green-950 border border-green-500/40 text-green-400 text-[10px]">● LIVE</span>
              </div>

              {/* CLOCK DIGITS */}
              <div className="my-4 flex items-baseline gap-2">
                <span className="font-digital text-7xl font-bold tracking-wider neon-text-pink">
                  {formattedHours}:{formattedMinutes}
                </span>
                <span className="font-digital text-6xl font-bold neon-text-green">
                  :{formattedSeconds}
                </span>
                {!is24Hour && (
                  <span className="font-digital text-2xl text-cyan-400 ml-2">{ampm}</span>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-gray-300 font-tech border-t border-white/10 pt-3">
                <span>📍 NEW DELHI, INDIA</span>
                <span>TUESDAY, 25 AUGUST 2026</span>
                
                {/* 12H / 24H Toggle */}
                <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10">
                  <button onClick={() => setIs24Hour(false)} className={`px-2 py-0.5 rounded ${!is24Hour ? 'bg-purple-600 text-white' : 'text-gray-400'}`}>12H</button>
                  <button onClick={() => setIs24Hour(true)} className={`px-2 py-0.5 rounded ${is24Hour ? 'bg-purple-600 text-white' : 'text-gray-400'}`}>24H</button>
                </div>
              </div>
            </div>

            {/* CALENDAR MINI WIDGET */}
            <div className="glass-panel p-4 neon-border-purple flex flex-col justify-between">
              <div className="flex justify-between items-center text-xs font-tech text-purple-300 mb-2">
                <span className="flex items-center gap-1"><Calendar size={14} /> CALENDAR</span>
                <span>AUGUST 2026</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-gray-400 font-tech">
                <span className="text-red-400">SUN</span><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>
                <span className="p-1">26</span><span className="p-1">27</span><span className="p-1">28</span><span className="p-1">29</span><span className="p-1">30</span><span className="p-1">31</span><span className="p-1">1</span>
                <span className="p-1">2</span><span className="p-1">3</span><span className="p-1">4</span><span className="p-1">5</span><span className="p-1">6</span><span className="p-1">7</span><span className="p-1">8</span>
                <span className="p-1">9</span><span className="p-1">10</span><span className="p-1">11</span><span className="p-1">12</span><span className="p-1">13</span><span className="p-1">14</span><span className="p-1">15</span>
                <span className="p-1">16</span><span className="p-1">17</span><span className="p-1">18</span><span className="p-1">19</span><span className="p-1">20</span><span className="p-1">21</span><span className="p-1">22</span>
                <span className="p-1">23</span><span className="p-1">24</span>
                <span className="p-1 bg-green-500/20 text-green-300 border border-green-400 rounded-md font-bold">25</span>
                <span className="p-1">26</span><span className="p-1">27</span><span className="p-1">28</span><span className="p-1">29</span>
              </div>
              <div className="text-[11px] text-gray-400 mt-2 border-t border-white/10 pt-2 flex justify-between">
                <span>No events today</span>
                <span className="text-cyan-400 cursor-pointer">+ Add</span>
              </div>
            </div>

          </div>

          {/* MIDDLE SECTION */}
          <div className="middle-row-grid">
            
            {/* WEATHER */}
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
              <div className="flex justify-between text-[9px] text-gray-400 border-t border-white/10 pt-2">
                <span>WED: 32°</span>
                <span>THU: 31°</span>
                <span>FRI: 30°</span>
                <span>SAT: 31°</span>
              </div>
            </div>

            {/* WORLD CLOCK */}
            <div className="glass-panel p-4 neon-border-green flex flex-col justify-between">
              <div className="flex justify-between items-center text-xs text-green-400 mb-2 font-tech">
                <span>🌐 WORLD CLOCK</span>
                <span className="text-[10px] text-gray-400">+ Add City</span>
              </div>
              <div className="flex flex-col gap-1.5 text-xs">
                <div className="flex justify-between items-center bg-white/5 p-1.5 rounded">
                  <span>🇺🇸 New York, USA</span>
                  <span className="font-digital text-cyan-300">11:15 PM</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 p-1.5 rounded">
                  <span>🇬🇧 London, UK</span>
                  <span className="font-digital text-purple-300">04:15 AM</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 p-1.5 rounded">
                  <span>🇯🇵 Tokyo, Japan</span>
                  <span className="font-digital text-pink-300">12:15 PM</span>
                </div>
              </div>
            </div>

            {/* QUICK TOOLS */}
            <div className="glass-panel p-4 neon-border-purple">
              <div className="text-xs text-purple-300 mb-2 font-tech">🛠️ TOOLS</div>
              <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                <div className="p-2 rounded bg-cyan-950/30 border border-cyan-500/30 text-cyan-300 flex flex-col items-center gap-1 cursor-pointer hover:scale-105 transition"><Clock size={16} />Stopwatch</div>
                <div className="p-2 rounded bg-amber-950/30 border border-amber-500/30 text-amber-300 flex flex-col items-center gap-1 cursor-pointer hover:scale-105 transition"><Hourglass size={16} />Timer</div>
                <div className="p-2 rounded bg-blue-950/30 border border-blue-500/30 text-blue-300 flex flex-col items-center gap-1 cursor-pointer hover:scale-105 transition"><Bell size={16} />Alarm</div>
                <div className="p-2 rounded bg-pink-950/30 border border-pink-500/30 text-pink-300 flex flex-col items-center gap-1 cursor-pointer hover:scale-105 transition"><RotateCcw size={16} />Countdown</div>
                <div className="p-2 rounded bg-red-950/30 border border-red-500/30 text-red-300 flex flex-col items-center gap-1 cursor-pointer hover:scale-105 transition">🍅 Pomodoro</div>
                <div className="p-2 rounded bg-yellow-950/30 border border-yellow-500/30 text-yellow-300 flex flex-col items-center gap-1 cursor-pointer hover:scale-105 transition"><NotebookPen size={16} />Notes</div>
              </div>
            </div>

          </div>

          {/* BOTTOM SECTION */}
          <div className="bottom-row-grid">
            
            {/* STOPWATCH */}
            <div className="glass-panel p-4 neon-border-cyan flex flex-col justify-between">
              <div className="text-xs text-cyan-400 font-tech">⏱️ STOPWATCH</div>
              <div className="text-center my-2">
                <span className="font-digital text-2xl text-cyan-300 tracking-wider">
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

            {/* COUNTDOWN TIMER */}
            <div className="glass-panel p-4 neon-border-purple flex flex-col justify-between">
              <div className="text-xs text-purple-400 font-tech">⏳ TIMER</div>
              <div className="flex justify-around items-center my-2">
                <span className="font-digital text-2xl text-purple-300">00:25:00</span>
                <span className="text-[10px] px-2 py-1 bg-purple-500/20 border border-purple-500 rounded-full text-purple-300">25:00</span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-1 rounded text-xs bg-orange-500/20 text-orange-300 border border-orange-500">Start</button>
                <button className="px-3 py-1 rounded text-xs bg-slate-700/40 text-gray-300 border border-white/10">Reset</button>
              </div>
            </div>

            {/* ALARM */}
            <div className="glass-panel p-4 neon-border-green flex flex-col justify-between">
              <div className="flex justify-between items-center text-xs text-green-400 font-tech">
                <span>🔔 ALARM</span>
                <span className="text-[10px] cursor-pointer">+ Add</span>
              </div>
              <div className="flex items-center justify-between bg-white/5 p-2 rounded">
                <div>
                  <p className="font-digital text-sm text-green-300">07:00 AM</p>
                  <p className="text-[9px] text-gray-400">Daily</p>
                </div>
                <input type="checkbox" defaultChecked className="toggle-checkbox accent-green-400 w-4 h-4 cursor-pointer" />
              </div>
              <div className="flex items-center justify-between bg-white/5 p-2 rounded">
                <div>
                  <p className="font-digital text-sm text-gray-300">08:30 AM</p>
                  <p className="text-[9px] text-gray-400">Mon, Tue, Wed</p>
                </div>
                <input type="checkbox" className="toggle-checkbox accent-green-400 w-4 h-4 cursor-pointer" />
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* 4. FOOTER */}
      <footer className="glass-panel px-6 py-2 flex items-center justify-between text-xs text-gray-400 mt-3">
        <span>© 2026 Bharat Clock. All rights reserved. 🇮🇳</span>
        <span className="text-yellow-400/90 font-tech italic">"समय सबसे कीमती दौलत है, इसे सही दिशा में निवेश करें।"</span>
        <span>Made with ❤️ in India</span>
      </footer>

    </div>
  );
}
