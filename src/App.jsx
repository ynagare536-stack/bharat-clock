import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [time, setTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(false);

  // Stopwatch States
  const [swTime, setSwTime] = useState(0);
  const [swRunning, setSwRunning] = useState(false);

  // Timer States
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [timerRunning, setTimerRunning] = useState(false);

  // Modals
  const [activeModal, setActiveModal] = useState(null);
  const [notes, setNotes] = useState('🔥 Goals 2026:\n- Bharat Clock UI Pro\n- Super Smooth Features');
  const [alarms, setAlarms] = useState([
    { id: 1, time: '07:00 AM', label: 'Daily', enabled: true },
    { id: 2, time: '08:30 AM', label: 'Mon, Tue, Wed, Thu, Fri', enabled: false }
  ]);

  // Live Clock
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Stopwatch
  useEffect(() => {
    let int = null;
    if (swRunning) int = setInterval(() => setSwTime((p) => p + 10), 10);
    return () => clearInterval(int);
  }, [swRunning]);

  // Timer
  useEffect(() => {
    let int = null;
    if (timerRunning && timerSeconds > 0) {
      int = setInterval(() => setTimerSeconds((p) => p - 1), 1000);
    } else if (timerSeconds === 0 && timerRunning) {
      setTimerRunning(false);
      alert('⏰ Timer Finished!');
    }
    return () => clearInterval(int);
  }, [timerRunning, timerSeconds]);

  const formatSW = () => {
    const ms = String(Math.floor((swTime % 1000) / 10)).padStart(2, '0');
    const sec = String(Math.floor((swTime / 1000) % 60)).padStart(2, '0');
    const min = String(Math.floor((swTime / 60000) % 60)).padStart(2, '0');
    const hr = String(Math.floor(swTime / 3600000)).padStart(2, '0');
    return `${hr}:${min}:${sec}.${ms}`;
  };

  const formatTR = (secTotal) => {
    const hr = String(Math.floor(secTotal / 3600)).padStart(2, '0');
    const min = String(Math.floor((secTotal % 3600) / 60)).padStart(2, '0');
    const sec = String(secTotal % 60).padStart(2, '0');
    return `${hr}:${min}:${sec}`;
  };

  const hours = time.getHours();
  const formattedHours = is24Hour ? String(hours).padStart(2, '0') : String(hours % 12 || 12).padStart(2, '0');
  const formattedMinutes = String(time.getMinutes()).padStart(2, '0');
  const formattedSeconds = String(time.getSeconds()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '14px', boxSizing: 'border-box' }}>
      
      {/* 1. TOP HEADER NAVIGATION */}
      <header className="neon-panel border-neon-purple" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 24px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '28px' }}>🇮🇳</span>
          <div>
            <h1 className="font-tech" style={{ fontSize: '22px', fontWeight: 'bold', margin: 0, letterSpacing: '1.5px', background: 'linear-gradient(90deg, #f97316, #ffffff, #22c55e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              भारत CLOCK
            </h1>
            <span style={{ fontSize: '10px', color: '#94a3b8' }}>Made in India ❤️</span>
          </div>
        </div>

        <nav style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button style={{ padding: '6px 14px', borderRadius: '20px', background: 'rgba(0, 240, 255, 0.1)', border: '1px solid #00f0ff', color: '#00f0ff', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>⌂ Home</button>
          <button onClick={() => alert('World Clock active')} style={{ padding: '6px 12px', borderRadius: '20px', background: 'transparent', border: '1px solid transparent', color: '#94a3b8', fontSize: '12px', cursor: 'pointer' }}>🌐 World Clock</button>
          <button onClick={() => alert('Calendar active')} style={{ padding: '6px 12px', borderRadius: '20px', background: 'transparent', border: '1px solid transparent', color: '#94a3b8', fontSize: '12px', cursor: 'pointer' }}>📅 Calendar</button>
          <button onClick={() => setActiveModal('notes')} style={{ padding: '6px 12px', borderRadius: '20px', background: 'transparent', border: '1px solid transparent', color: '#94a3b8', fontSize: '12px', cursor: 'pointer' }}>🛠️ Tools</button>
        </nav>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button onClick={() => setIs24Hour(!is24Hour)} style={{ padding: '5px 12px', borderRadius: '8px', background: '#1e1b4b', border: '1px solid #6366f1', color: '#c7d2fe', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
            {is24Hour ? '24H' : '12H'}
          </button>
          <span style={{ fontSize: '11px', color: '#cbd5e1', background: 'rgba(255,255,255,0.06)', padding: '5px 10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>EN ▾</span>
        </div>
      </header>

      {/* 2. MAIN DASHBOARD LAYOUT (Sidebar + Main Grid) */}
      <div style={{ display: 'flex', gap: '14px', flex: 1 }}>
        
        {/* LEFT VERTICAL CYBER SIDEBAR */}
        <aside className="neon-panel border-neon-cyan" style={{ width: '68px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'rgba(0,240,255,0.15)', border: '1px solid #00f0ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00f0ff', cursor: 'pointer' }}>⊞</div>
            <div onClick={() => alert('World Clock')} style={{ width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', cursor: 'pointer' }}>🌐</div>
            <div onClick={() => alert('Calendar')} style={{ width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', cursor: 'pointer' }}>📅</div>
            <div onClick={() => setActiveModal('notes')} style={{ width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', cursor: 'pointer' }}>🛠️</div>
            <div onClick={() => setActiveModal('alarm')} style={{ width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', cursor: 'pointer' }}>🔔</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }}></span>
            <span className="font-tech" style={{ fontSize: '9px', color: '#4ade80' }}>ONLINE</span>
          </div>
        </aside>

        {/* 3x3 CYBER DASHBOARD GRID */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '14px' }}>
          
          {/* TOP-LEFT: HERO DIGITAL CLOCK WITH NEON VECTOR ART */}
          <div className="neon-panel border-neon-cyan" style={{ padding: '22px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '230px' }}>
            
            {/* Background Neon Indian Monuments & Ashoka Chakra */}
            <div style={{ position: 'absolute', right: '15px', top: '15px', pointerEvents: 'none', opacity: 0.18 }}>
              <svg className="animate-spin-slow" width="130" height="130" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="46" stroke="#00f0ff" strokeWidth="2" fill="none" />
                <circle cx="50" cy="50" r="8" fill="#00f0ff" />
                {[...Array(24)].map((_, i) => (
                  <line key={i} x1="50" y1="50" x2={50 + 44 * Math.cos((i * 15 * Math.PI) / 180)} y2={50 + 44 * Math.sin((i * 15 * Math.PI) / 180)} stroke="#00f0ff" strokeWidth="1.5" />
                ))}
              </svg>
            </div>

            {/* Neon Monuments Outline Silhouette (India Gate / Taj wireframe) */}
            <div style={{ position: 'absolute', bottom: '38px', right: '20px', opacity: 0.12, pointerEvents: 'none' }}>
              <svg width="220" height="60" viewBox="0 0 220 60" fill="none" stroke="#00f0ff" strokeWidth="1.5">
                <path d="M10 60 V35 H25 V20 H35 V60 M60 60 V15 H90 V60 M120 60 V25 Q135 10 150 25 V60 M175 60 V30 H195 V60" />
              </svg>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="font-tech" style={{ fontSize: '13px', color: '#00f0ff', letterSpacing: '1px' }}>
                ⚡ INDIA STANDARD TIME <span style={{ color: '#94a3b8' }}>UTC +5:30</span>
              </span>
              <span style={{ background: '#052e16', border: '1px solid #22c55e', color: '#4ade80', padding: '2px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 'bold' }}>● LIVE</span>
            </div>

            {/* Glowing Big Digits */}
            <div style={{ margin: '14px 0', display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span className="font-digital glow-pink" style={{ fontSize: '76px', fontWeight: '900', letterSpacing: '3px' }}>
                {formattedHours}:{formattedMinutes}
              </span>
              <span className="font-digital glow-green" style={{ fontSize: '62px', fontWeight: '900' }}>
                :{formattedSeconds}
              </span>
              {!is24Hour && <span className="font-digital glow-cyan" style={{ fontSize: '24px', marginLeft: '12px' }}>{ampm}</span>}
            </div>

            {/* Bottom Card Meta */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '10px', fontSize: '12px', color: '#cbd5e1' }}>
              <span className="font-tech" style={{ fontSize: '14px' }}>📍 New Delhi, India</span>
              <span className="font-tech" style={{ color: '#94a3b8', letterSpacing: '1px' }}>TUESDAY, 25 AUGUST 2026</span>
              <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.5)', padding: '3px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <button onClick={() => setIs24Hour(false)} style={{ padding: '2px 8px', background: !is24Hour ? '#9333ea' : 'transparent', border: 'none', color: '#fff', borderRadius: '4px', fontSize: '10px', cursor: 'pointer' }}>12H</button>
                <button onClick={() => setIs24Hour(true)} style={{ padding: '2px 8px', background: is24Hour ? '#9333ea' : 'transparent', border: 'none', color: '#fff', borderRadius: '4px', fontSize: '10px', cursor: 'pointer' }}>24H</button>
              </div>
            </div>
          </div>

          {/* TOP-RIGHT: CALENDAR */}
          <div className="neon-panel border-neon-purple" style={{ padding: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#c084fc', marginBottom: '8px' }}>
              <span className="font-tech" style={{ fontWeight: 'bold' }}>📅 CALENDAR</span>
              <span className="font-tech">AUGUST 2026</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', fontSize: '11px', color: '#94a3b8' }}>
              <span style={{ color: '#f87171' }}>SUN</span><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>
              <span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span><span>1</span>
              <span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span>
              <span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span>
              <span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span>
              <span>23</span><span>24</span>
              <span style={{ background: 'rgba(34, 197, 94, 0.25)', border: '1px solid #4ade80', color: '#4ade80', borderRadius: '6px', fontWeight: 'bold', boxShadow: '0 0 8px rgba(74, 222, 128, 0.4)' }}>25</span>
              <span>26</span><span>27</span><span>28</span><span>29</span>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8' }}>
              <span>25 AUGUST 2026</span>
              <span style={{ color: '#00f0ff' }}>No events today</span>
            </div>
          </div>

          {/* MIDDLE ROW (Weather + World Clock + Tools Hub) */}
          <div style={{ gridColumn: 'span 2', display: 'grid', gridTemplateColumns: '1fr 1.2fr 1fr', gap: '14px' }}>
            
            {/* WEATHER */}
            <div className="neon-panel border-neon-cyan" style={{ padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#fbbf24' }}>
                <span className="font-tech" style={{ fontWeight: 'bold' }}>☀️ WEATHER</span>
                <span style={{ color: '#94a3b8', fontSize: '10px' }}>📍 New Delhi</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0' }}>
                <span className="font-digital glow-yellow" style={{ fontSize: '42px', fontWeight: '900' }}>28°C</span>
                <div style={{ fontSize: '10px', color: '#cbd5e1', lineHeight: '1.6', textAlign: 'right' }}>
                  <div>Humidity: 58%</div>
                  <div>Wind: 12 km/h</div>
                  <div style={{ color: '#4ade80' }}>Clear Sky</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '6px', fontSize: '9px', color: '#94a3b8' }}>
                <span>WED: 32°</span><span>THU: 31°</span><span>FRI: 30°</span><span>SAT: 31°</span>
              </div>
            </div>

            {/* WORLD CLOCK */}
            <div className="neon-panel border-neon-green" style={{ padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#4ade80' }}>
                <span className="font-tech" style={{ fontWeight: 'bold' }}>🌐 WORLD CLOCK</span>
                <span style={{ color: '#94a3b8', fontSize: '10px' }}>+ 5 Cities</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', padding: '5px 8px', borderRadius: '6px' }}>
                  <span>🇺🇸 New York</span>
                  <span className="font-digital" style={{ color: '#00f0ff' }}>11:15 PM</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', padding: '5px 8px', borderRadius: '6px' }}>
                  <span>🇬🇧 London</span>
                  <span className="font-digital" style={{ color: '#c084fc' }}>04:15 AM</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', padding: '5px 8px', borderRadius: '6px' }}>
                  <span>🇯🇵 Tokyo</span>
                  <span className="font-digital" style={{ color: '#f472b6' }}>12:15 PM</span>
                </div>
              </div>
            </div>

            {/* 6 TOOLS HIGH-TECH BUTTON GRID */}
            <div className="neon-panel border-neon-purple" style={{ padding: '16px' }}>
              <div className="font-tech" style={{ fontSize: '12px', color: '#c084fc', fontWeight: 'bold', marginBottom: '8px' }}>🛠️ QUICK TOOLS</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', textAlign: 'center', fontSize: '10px' }}>
                <div onClick={() => setSwRunning(!swRunning)} style={{ padding: '8px 2px', background: 'rgba(0, 240, 255, 0.1)', border: '1px solid #00f0ff', color: '#00f0ff', borderRadius: '8px', cursor: 'pointer' }}>⏱️ SW</div>
                <div onClick={() => setTimerRunning(!timerRunning)} style={{ padding: '8px 2px', background: 'rgba(251, 191, 36, 0.1)', border: '1px solid #fbbf24', color: '#fbbf24', borderRadius: '8px', cursor: 'pointer' }}>⏳ Timer</div>
                <div onClick={() => setActiveModal('alarm')} style={{ padding: '8px 2px', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22c55e', color: '#4ade80', borderRadius: '8px', cursor: 'pointer' }}>🔔 Alarm</div>
                <div onClick={() => setActiveModal('countdown')} style={{ padding: '8px 2px', background: 'rgba(244, 114, 182, 0.1)', border: '1px solid #f472b6', color: '#f472b6', borderRadius: '8px', cursor: 'pointer' }}>🔄 Count</div>
                <div onClick={() => { setTimerRunning(false); setTimerSeconds(25*60); setTimerRunning(true); }} style={{ padding: '8px 2px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#fca5a5', borderRadius: '8px', cursor: 'pointer' }}>🍅 Pomo</div>
                <div onClick={() => setActiveModal('notes')} style={{ padding: '8px 2px', background: 'rgba(250, 204, 21, 0.1)', border: '1px solid #facc15', color: '#fef08a', borderRadius: '8px', cursor: 'pointer' }}>📝 Notes</div>
              </div>
            </div>

          </div>

          {/* BOTTOM ROW (Stopwatch + Timer with Gauge + Alarm List) */}
          <div style={{ gridColumn: 'span 2', display: 'grid', gridTemplateColumns: '1fr 1.2fr 1fr', gap: '14px' }}>
            
            {/* STOPWATCH WIDGET */}
            <div className="neon-panel border-neon-cyan" style={{ padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div className="font-tech" style={{ fontSize: '12px', color: '#00f0ff', fontWeight: 'bold' }}>⏱️ STOPWATCH</div>
              <div className="font-digital glow-cyan" style={{ fontSize: '22px', textAlign: 'center', margin: '8px 0', letterSpacing: '1px' }}>
                {formatSW()}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => setSwRunning(!swRunning)} style={{ flex: 1, padding: '8px', background: swRunning ? '#7f1d1d' : '#14532d', border: `1px solid ${swRunning ? '#ef4444' : '#22c55e'}`, color: '#fff', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
                  {swRunning ? 'Pause' : 'Start'}
                </button>
                <button onClick={() => { setSwRunning(false); setSwTime(0); }} style={{ padding: '8px 14px', background: '#334155', border: '1px solid #64748b', color: '#fff', borderRadius: '6px', fontSize: '11px', cursor: 'pointer' }}>
                  Reset
                </button>
              </div>
            </div>

            {/* COUNTDOWN TIMER WITH CIRCULAR ACCENT */}
            <div className="neon-panel border-neon-purple" style={{ padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', justifyContent:
