import React, { useState, useEffect, useRef } from 'react';
import './App.css';

export default function App() {
  // Live Clock & Date
  const [time, setTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('cyberpunk'); // 'cyberpunk' | 'matrix' | 'gold'

  // Stopwatch States
  const [swTime, setSwTime] = useState(0);
  const [swRunning, setSwRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  // Timer States
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [timerInitial, setTimerInitial] = useState(25 * 60);
  const [timerRunning, setTimerRunning] = useState(false);

  // Modals & Storage
  const [activeModal, setActiveModal] = useState(null);
  const [notes, setNotes] = useState(() => localStorage.getItem('bharat_clock_notes') || 'Aaj ke tasks:\n1. Project Dashboard Finalized\n2. Neon UI Live Tested');
  const [alarms, setAlarms] = useState([
    { id: 1, time: '07:00 AM', label: 'Daily Alarm', enabled: true },
    { id: 2, time: '08:30 AM', label: 'Meeting Alert', enabled: false }
  ]);

  // Audio Beep Generator using Web Audio API
  const playBeep = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {
      console.log('Audio Context Error:', e);
    }
  };

  // Live Main Clock Update
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Stopwatch Ticker
  useEffect(() => {
    let int = null;
    if (swRunning) {
      int = setInterval(() => setSwTime((prev) => prev + 10), 10);
    }
    return () => clearInterval(int);
  }, [swRunning]);

  // Timer Countdown Ticker
  useEffect(() => {
    let int = null;
    if (timerRunning && timerSeconds > 0) {
      int = setInterval(() => setTimerSeconds((prev) => prev - 1), 1000);
    } else if (timerSeconds === 0 && timerRunning) {
      setTimerRunning(false);
      playBeep();
      alert('⏰ Timer Time Over!');
    }
    return () => clearInterval(int);
  }, [timerRunning, timerSeconds]);

  // Save notes to LocalStorage
  const handleNotesChange = (val) => {
    setNotes(val);
    localStorage.setItem('bharat_clock_notes', val);
  };

  // Full-screen Toggle
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Format Helpers
  const getFormattedSW = () => {
    const ms = String(Math.floor((swTime % 1000) / 10)).padStart(2, '0');
    const sec = String(Math.floor((swTime / 1000) % 60)).padStart(2, '0');
    const min = String(Math.floor((swTime / 60000) % 60)).padStart(2, '0');
    return `${min}:${sec}.${ms}`;
  };

  const getFormattedTimer = () => {
    const min = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
    const sec = String(timerSeconds % 60).padStart(2, '0');
    return `${min}:${sec}`;
  };

  const addLap = () => {
    if (swRunning && swTime > 0) {
      setLaps([getFormattedSW(), ...laps.slice(0, 4)]);
    }
  };

  const hours = time.getHours();
  const formattedHours = is24Hour ? String(hours).padStart(2, '0') : String(hours % 12 || 12).padStart(2, '0');
  const formattedMinutes = String(time.getMinutes()).padStart(2, '0');
  const formattedSeconds = String(time.getSeconds()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // World Clock Calculations
  const getTimeInZone = (offset) => {
    const d = new Date(time.getTime() + (offset * 60 - time.getTimezoneOffset()) * 60000);
    let h = d.getHours();
    const m = String(d.getMinutes()).padStart(2, '0');
    const ap = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${String(h).padStart(2, '0')}:${m} ${ap}`;
  };

  return (
    <div className={`app-container theme-${currentTheme}`} style={{ minHeight: '100vh', backgroundColor: '#050711', color: '#fff', padding: '14px', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' }}>
      
      {/* 1. TOP NAVBAR */}
      <header className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '26px' }}>🇮🇳</span>
          <div>
            <h1 className="font-tech" style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: '#00f0ff', letterSpacing: '1px' }}>भारत CLOCK</h1>
            <span style={{ fontSize: '10px', color: '#94a3b8' }}>Made in India ❤️</span>
          </div>
        </div>

        {/* Global Controls */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {/* Theme Cycler */}
          <button 
            onClick={() => {
              const themes = ['cyberpunk', 'matrix', 'gold'];
              const next = themes[(themes.indexOf(currentTheme) + 1) % themes.length];
              setCurrentTheme(next);
            }} 
            style={{ padding: '6px 12px', background: '#1e293b', border: '1px solid #38bdf8', color: '#38bdf8', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}>
            🎨 Theme: {currentTheme.toUpperCase()}
          </button>

          {/* Full Screen Mode */}
          <button 
            onClick={toggleFullScreen}
            style={{ padding: '6px 12px', background: '#1e293b', border: '1px solid #64748b', color: '#f8fafc', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}>
            ⛶ Fullscreen
          </button>

          {/* 12H/24H Switch */}
          <button 
            onClick={() => setIs24Hour(!is24Hour)} 
            style={{ padding: '6px 14px', background: '#312e81', border: '1px solid #818cf8', color: '#e0e7ff', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}>
            {is24Hour ? '24H' : '12H'}
          </button>
        </div>
      </header>

      {/* 2. MAIN DASHBOARD GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
        
        {/* HERO CLOCK WITH ASHOKA CHAKRA WATERMARK */}
        <div className="glass-panel neon-border-cyan" style={{ gridColumn: 'span 2', padding: '24px', position: 'relative', overflow: 'hidden' }}>
          {/* Glowing Vector Chakra in Background */}
          <svg style={{ position: 'absolute', right: '-40px', bottom: '-40px', width: '220px', height: '220px', opacity: '0.08', pointerEvents: 'none', fill: '#00f0ff' }} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="#00f0ff" strokeWidth="2" fill="none" />
            <circle cx="50" cy="50" r="8" fill="#00f0ff" />
            {[...Array(24)].map((_, i) => (
              <line key={i} x1="50" y1="50" x2={50 + 42 * Math.cos((i * 15 * Math.PI) / 180)} y2={50 + 42 * Math.sin((i * 15 * Math.PI) / 180)} stroke="#00f0ff" strokeWidth="1.5" />
            ))}
          </svg>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#00f0ff' }}>
            <span>⚡ INDIA STANDARD TIME (UTC +5:30)</span>
            <span style={{ background: '#052e16', border: '1px solid #22c55e', color: '#4ade80', padding: '2px 8px', borderRadius: '12px', fontSize: '11px' }}>● LIVE</span>
          </div>

          <div style={{ margin: '20px 0', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span className="font-digital neon-text-pink" style={{ fontSize: '70px', fontWeight: '900', letterSpacing: '2px' }}>
              {formattedHours}:{formattedMinutes}
            </span>
            <span className="font-digital neon-text-green" style={{ fontSize: '55px', fontWeight: 'bold' }}>
              :{formattedSeconds}
            </span>
            {!is24Hour && <span className="font-digital" style={{ fontSize: '24px', color: '#00f0ff', marginLeft: '10px' }}>{ampm}</span>}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px', fontSize: '13px', color: '#cbd5e1' }}>
            <span>📍 NEW DELHI, INDIA</span>
            <span>TUESDAY, 25 AUGUST 2026</span>
          </div>
        </div>

        {/* CALENDAR */}
        <div className="glass-panel neon-border-purple" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#c084fc', marginBottom: '10px' }}>
            <span>📅 CALENDAR</span>
            <span>AUGUST 2026</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', fontSize: '11px', color: '#94a3b8' }}>
            <span style={{ color: '#f87171' }}>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
            <span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span><span>1</span>
            <span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span>
            <span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span>
            <span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span>
            <span>23</span><span>24</span>
            <span style={{ background: '#22c55e33', border: '1px solid #4ade80', color: '#4ade80', borderRadius: '4px', fontWeight: 'bold' }}>25</span>
            <span>26</span><span>27</span><span>28</span><span>29</span>
          </div>
        </div>

        {/* WEATHER WIDGET */}
        <div className="glass-panel neon-border-cyan" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#facc15' }}>
            <span>☀️ WEATHER</span>
            <span style={{ color: '#94a3b8' }}>New Delhi, IN</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '14px 0' }}>
            <span className="font-digital" style={{ fontSize: '38px', color: '#fef08a' }}>28°C</span>
            <div style={{ fontSize: '11px', color: '#94a3b8', textAlign: 'right', lineHeight: '1.6' }}>
              <div>Humidity: 58%</div>
              <div>Wind: 12 km/h</div>
              <div>Clear Sky</div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', fontSize: '10px', color: '#94a3b8' }}>
            <span>WED: 32°</span><span>THU: 31°</span><span>FRI: 30°</span><span>SAT: 31°</span>
          </div>
        </div>

        {/* WORLD CLOCK (LIVE REAL-TIME) */}
        <div className="glass-panel neon-border-green" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#4ade80', marginBottom: '10px' }}>
            <span>🌐 WORLD CLOCK</span>
            <span style={{ fontSize: '10px', color: '#94a3b8' }}>Live Zones</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.04)', padding: '6px 8px', borderRadius: '6px' }}>
              <span>🇺🇸 New York (EDT)</span>
              <span className="font-digital" style={{ color: '#67e8f9' }}>{getTimeInZone(-240)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.04)', padding: '6px 8px', borderRadius: '6px' }}>
              <span>🇬🇧 London (BST)</span>
              <span className="font-digital" style={{ color: '#c084fc' }}>{getTimeInZone(60)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.04)', padding: '6px 8px', borderRadius: '6px' }}>
              <span>🇯🇵 Tokyo (JST)</span>
              <span className="font-digital" style={{ color: '#f472b6' }}>{getTimeInZone(540)}</span>
            </div>
          </div>
        </div>

        {/* QUICK TOOLS HUB */}
        <div className="glass-panel neon-border-purple" style={{ padding: '18px' }}>
          <div style={{ fontSize: '13px', color: '#c084fc', marginBottom: '10px' }}>🛠️ TOOLS (Click to Run)</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', fontSize: '11px', textAlign: 'center' }}>
            <button 
              onClick={() => { setSwRunning(!swRunning); }} 
              style={{ padding: '10px 4px', background: '#083344', border: '1px solid #06b6d4', color: '#67e8f9', borderRadius: '8px', cursor: 'pointer' }}>
              ⏱️ {swRunning ? 'Pause SW' : 'Start SW'}
            </button>

            <button 
              onClick={() => { setTimerRunning(!timerRunning); }} 
              style={{ padding: '10px 4px', background: '#451a03', border: '1px solid #f59e0b', color: '#fde68a', borderRadius: '8px', cursor: 'pointer' }}>
              ⏳ {timerRunning ? 'Pause TR' : 'Start TR'}
            </button>

            <button 
              onClick={() => setActiveModal('notes')} 
              style={{ padding: '10px 4px', background: '#3b0764', border: '1px solid #a855f7', color: '#e9d5ff', borderRadius: '8px', cursor: 'pointer' }}>
              📝 Notes
            </button>

            <button 
              onClick={() => { setTimerRunning(false); setTimerSeconds(25 * 60); setTimerRunning(true); playBeep(); }} 
              style={{ padding: '10px 4px', background: '#450a0a', border: '1px solid #ef4444', color: '#fca5a5', borderRadius: '8px', cursor: 'pointer' }}>
              🍅 Pomodoro
            </button>

            <button 
              onClick={() => setActiveModal('countdown')} 
              style={{ padding: '10px 4px', background: '#500724', border: '1px solid #ec4899', color: '#fbcfe8', borderRadius: '8px', cursor: 'pointer' }}>
              🔄 Count Set
            </button>

            <button 
              onClick={() => setActiveModal('alarm')} 
              style={{ padding: '10px 4px', background: '#022c22', border: '1px solid #10b981', color: '#a7f3d0', borderRadius: '8px', cursor: 'pointer' }}>
              🔔 Add Alarm
            </button>
          </div>
        </div>

        {/* ADVANCED STOPWATCH WITH LAPS */}
        <div className="glass-panel neon-border-cyan" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#00f0ff', marginBottom: '8px' }}>
            <span>⏱️ STOPWATCH</span>
            <span style={{ fontSize: '10px', color: '#94a3b8' }}>Lap Tracker</span>
          </div>
          <div className="font-digital" style={{ fontSize: '28px', color: '#67e8f9', textAlign: 'center', margin: '8px 0' }}>
            {getFormattedSW()}
          </div>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
            <button 
              onClick={() => setSwRunning(!swRunning)} 
              style={{ flex: 1, padding: '8px', background: swRunning ? '#7f1d1d' : '#14532d', border: `1px solid ${swRunning ? '#ef4444' : '#22c55e'}`, color: '#fff', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
              {swRunning ? 'Pause' : 'Start'}
            </button>
            <button 
              onClick={addLap} 
              disabled={!swRunning}
              style={{ padding: '8px 12px', background: '#075985', border: '1px solid #0284c7', color: '#fff', borderRadius: '6px', cursor: swRunning ? 'pointer' : 'not-allowed', opacity: swRunning ? 1 : 0.5 }}>
              Lap
            </button>
            <button 
              onClick={() => { setSwRunning(false); setSwTime(0); setLaps([]); }} 
              style={{ padding: '8px 12px', background: '#334155', border: '1px solid #64748b', color: '#fff', borderRadius: '6px', cursor: 'pointer' }}>
              Reset
            </button>
          </div>
          {laps.length > 0 && (
            <div style={{ maxHeight: '60px', overflowY: 'auto', fontSize: '11px', color: '#94a3b8', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '4px' }}>
              {laps.map((lap, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 4px' }}>
                  <span>Lap {laps.length - i}</span>
                  <span className="font-digital" style={{ color: '#38bdf8' }}>{lap}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* TIMER WITH AUDIO BEEPS */}
        <div className="glass-panel neon-border-purple" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: '#c084fc' }}>
            <span>⏳ TIMER</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button onClick={() => { setTimerRunning(false); setTimerSeconds(15 * 60); }} style={{ padding: '2px 6px', fontSize: '10px', background: '#581c87', border: '1px solid #a855f7', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}>15m</button>
              <button onClick={() => { setTimerRunning(false); setTimerSeconds(25 * 60); }} style={{ padding: '2px 6px', fontSize: '10px', background: '#581c87', border: '1px solid #a855f7', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}>25m</button>
              <button onClick={() => { setTimerRunning(false); setTimerSeconds(30 * 60); }} style={{ padding: '2px 6px', fontSize: '10px', background: '#581c87', border: '1px solid #a855f7', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}>30m</button>
            </div>
          </div>

          <div className="font-digital" style={{ fontSize: '28px', color: '#e9d5ff', textAlign: 'center', margin: '10px 0' }}>
            {getFormattedTimer()}
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => { setTimerRunning(!timerRunning); playBeep(); }} 
              style={{ flex: 1, padding: '8px', background: timerRunning ? '#7c2d12' : '#c2410c', border: '1px solid #fb923c', color: '#fff', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
              {timerRunning ? 'Pause' : 'Start'}
            </button>
            <button 
              onClick={() => { setTimerRunning(false); setTimerSeconds(25 * 60); }} 
              style={{ padding: '8px 16px', background: '#334155', border: '1px solid #64748b', color: '#fff', borderRadius: '6px', cursor: 'pointer' }}>
              Reset
            </button>
          </div>
        </div>

        {/* ALARM MANAGER */}
        <div className="glass-panel neon-border-green" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#4ade80', marginBottom: '8px' }}>
            <span>🔔 ALARM</span>
            <span onClick={() => setActiveModal('alarm')} style={{ cursor: 'pointer', textDecoration: 'underline' }}>+ Add</span>
          </div>
          {alarms.map((al) => (
            <div key={al.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '6px 10px', borderRadius: '6px', marginBottom:
