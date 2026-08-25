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

  // Modals & Alarms
  const [activeModal, setActiveModal] = useState(null);
  const [notes, setNotes] = useState('Daily Targets:\n- Bharat Clock UI Pro\n- Launch on GitHub');
  const [alarm1, setAlarm1] = useState(true);
  const [alarm2, setAlarm2] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    let int = null;
    if (swRunning) int = setInterval(() => setSwTime((p) => p + 10), 10);
    return () => clearInterval(int);
  }, [swRunning]);

  useEffect(() => {
    let int = null;
    if (timerRunning && timerSeconds > 0) {
      int = setInterval(() => setTimerSeconds((p) => p - 1), 1000);
    } else if (timerSeconds === 0 && timerRunning) {
      setTimerRunning(false);
      alert('⏰ Timer Time Over!');
    }
    return () => clearInterval(int);
  }, [timerRunning, timerSeconds]);

  const formatSW = () => {
    const ms = String(Math.floor(swTime % 1000)).padStart(3, '0');
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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '12px 16px', boxSizing: 'border-box' }}>
      
      {/* 1. TOP NAVBAR */}
      <header className="cyber-panel border-gradient-purple" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '26px' }}>🇮🇳</span>
          <div>
            <h1 className="font-tech" style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, letterSpacing: '1px', background: 'linear-gradient(90deg, #ff9933, #ffffff, #138808)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              भारत CLOCK
            </h1>
            <span style={{ fontSize: '9px', color: '#94a3b8' }}>Made in India ❤️</span>
          </div>
        </div>

        {/* Center Navigation */}
        <nav style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '20px', background: 'rgba(59, 130, 246, 0.2)', border: '1px solid #3b82f6', color: '#60a5fa', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>⌂ Home</button>
          <button onClick={() => alert('World Clock')} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '20px', background: 'transparent', border: '1px solid transparent', color: '#94a3b8', fontSize: '11px', cursor: 'pointer' }}>🌐 World Clock</button>
          <button onClick={() => alert('Calendar')} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '20px', background: 'transparent', border: '1px solid transparent', color: '#94a3b8', fontSize: '11px', cursor: 'pointer' }}>📅 Calendar</button>
          <button onClick={() => setActiveModal('notes')} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '20px', background: 'transparent', border: '1px solid transparent', color: '#94a3b8', fontSize: '11px', cursor: 'pointer' }}>🛠️ Tools</button>
          <button onClick={() => setActiveModal('alarm')} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '20px', background: 'transparent', border: '1px solid transparent', color: '#94a3b8', fontSize: '11px', cursor: 'pointer' }}>🔔 Alarm</button>
        </nav>

        {/* Right Search & Controls */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', cursor: 'pointer' }}>🔍</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 10px', background: 'rgba(147, 51, 234, 0.2)', border: '1px solid #9333ea', borderRadius: '20px', color: '#c084fc', fontSize: '11px' }}>
            <span>☀️</span><span>🌙</span>
          </div>
          <span style={{ fontSize: '11px', color: '#cbd5e1', background: 'rgba(255,255,255,0.06)', padding: '5px 8px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)' }}>EN ▾</span>
        </div>
      </header>

      {/* 2. MAIN BODY */}
      <div style={{ display: 'flex', gap: '12px', flex: 1 }}>
        
        {/* LEFT VERTICAL SIDEBAR */}
        <aside className="cyber-panel border-gradient-cyan" style={{ width: '70px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center', width: '100%' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(0,240,255,0.15)', border: '1px solid #00f0ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00f0ff', cursor: 'pointer' }}>⊞</div>
            <div onClick={() => alert('World Clock')} style={{ width: '40px', height: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '9px', cursor: 'pointer' }}>🌐<span>World</span></div>
            <div onClick={() => alert('Calendar')} style={{ width: '40px', height: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '9px', cursor: 'pointer' }}>📅<span>Calendar</span></div>
            <div onClick={() => setActiveModal('notes')} style={{ width: '40px', height: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '9px', cursor: 'pointer' }}>🛠️<span>Tools</span></div>
            <div onClick={() => setActiveModal('alarm')} style={{ width: '40px', height: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '9px', cursor: 'pointer' }}>🔔<span>Alarm</span></div>
          </div>

          <div style={{ width: '56px', padding: '4px', borderRadius: '6px', background: 'rgba(34,197,94,0.15)', border: '1px solid #22c55e', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '8px', color: '#4ade80', fontWeight: 'bold' }}>LIVE</span>
            <span style={{ fontSize: '8px', color: '#4ade80' }}>● ONLINE</span>
          </div>
        </aside>

        {/* MAIN 3-COLUMN DASHBOARD */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1.3fr 1.1fr', gap: '12px' }}>
          
          {/* ROW 1: HERO DIGITAL CLOCK (Spans Col 1 & 2) */}
          <div className="cyber-panel border-gradient-hero" style={{ gridColumn: 'span 2', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden', minHeight: '220px' }}>
            
            {/* India Map Wireframe & Ashoka Chakra */}
            <div style={{ position: 'absolute', right: '15px', top: '10px', width: '230px', height: '190px', pointerEvents: 'none', opacity: 0.85 }}>
              <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%', stroke: '#00ff88', strokeWidth: '1.2', fill: 'none' }}>
                <path d="M 90,15 L 110,30 L 105,45 L 140,50 L 170,75 L 160,110 L 130,140 L 110,185 L 95,185 L 85,140 L 60,115 L 45,95 L 70,70 L 60,40 Z" strokeDasharray="3,3" />
                <circle cx="100" cy="95" r="22" stroke="#00f0ff" strokeWidth="1.5" fill="rgba(0, 240, 255, 0.05)" />
                {[...Array(24)].map((_, i) => (
                  <line key={i} x1="100" y1="95" x2={100 + 22 * Math.cos((i * 15 * Math.PI) / 180)} y2={95 + 22 * Math.sin((i * 15 * Math.PI) / 180)} stroke="#00f0ff" strokeWidth="1" />
                ))}
              </svg>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="font-tech" style={{ fontSize: '13px', color: '#00ff88', letterSpacing: '1px' }}>
                🧭 INDIA STANDARD TIME <span style={{ color: '#94a3b8' }}>UTC +5:30</span>
              </span>
              <span style={{ background: '#052e16', border: '1px solid #22c55e', color: '#4ade80', padding: '2px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 'bold' }}>● LIVE</span>
            </div>

            {/* Big Digits */}
            <div style={{ margin: '10px 0', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span className="font-digital glow-pink" style={{ fontSize: '72px', fontWeight: '900', letterSpacing: '2px' }}>
                {formattedHours}
              </span>
              <span className="font-digital glow-pink" style={{ fontSize: '72px', fontWeight: '900' }}>:</span>
              <span className="font-digital glow-cyan" style={{ fontSize: '72px', fontWeight: '900', letterSpacing: '2px' }}>
                {formattedMinutes}
              </span>
              <span className="font-digital glow-green" style={{ fontSize: '72px', fontWeight: '900' }}>:</span>
              <span className="font-digital glow-green" style={{ fontSize: '72px', fontWeight: '900' }}>
                {formattedSeconds}
              </span>
              {!is24Hour && <span className="font-digital glow-cyan" style={{ fontSize: '24px', marginLeft: '10px' }}>{ampm}</span>}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', fontSize: '12px', color: '#cbd5e1' }}>
              <span className="font-tech" style={{ letterSpacing: '1px' }}>TUESDAY, 25 AUGUST 2026</span>
              <span className="font-tech" style={{ color: '#94a3b8' }}>📍 New Delhi, India</span>
              <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.4)', padding: '2px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <button onClick={() => setIs24Hour(false)} style={{ padding: '2px 8px', background: !is24Hour ? '#9333ea' : 'transparent', border: 'none', color: '#fff', borderRadius: '4px', fontSize: '10px', cursor: 'pointer' }}>12H</button>
                <button onClick={() => setIs24Hour(true)} style={{ padding: '2px 8px', background: is24Hour ? '#9333ea' : 'transparent', border: 'none', color: '#fff', borderRadius: '4px', fontSize: '10px', cursor: 'pointer' }}>24H</button>
              </div>
            </div>
          </div>

          {/* ROW 1: CALENDAR (Col 3) */}
          <div className="cyber-panel border-gradient-purple" style={{ padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#c084fc', marginBottom: '6px' }}>
              <span className="font-tech" style={{ fontWeight: 'bold' }}>📅 CALENDAR</span>
              <span className="font-tech">AUGUST 2026 ‹ ›</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', fontSize: '10px', color: '#94a3b8' }}>
              <span style={{ color: '#f87171' }}>SUN</span><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>
              <span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span><span>1</span>
              <span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span>
              <span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span>
              <span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span>
              <span>23</span><span>24</span>
              <span style={{ background: 'rgba(34, 197, 94, 0.25)', border: '1px solid #4ade80', color: '#4ade80', borderRadius: '4px', fontWeight: 'bold' }}>25</span>
              <span>26</span><span>27</span><span>28</span><span>29</span>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '6px', display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#94a3b8' }}>
              <span>25 AUGUST 2026</span>
              <span style={{ color: '#00f0ff' }}>No events today</span>
            </div>
          </div>

          {/* ROW 2: WEATHER (Col 1) */}
          <div className="cyber-panel border-gradient-cyan" style={{ padding: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#00f0ff' }}>
              <span className="font-tech" style={{ fontWeight: 'bold' }}>☀️ WEATHER</span>
              <span style={{ color: '#94a3b8', fontSize: '9px' }}>📍 New Delhi, India</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '6px 0' }}>
              <span className="font-digital glow-orange" style={{ fontSize: '38px', fontWeight: 'bold' }}>28°C</span>
              <div style={{ fontSize: '9px', color: '#cbd5e1', lineHeight: '1.5', textAlign: 'right' }}>
                <div>Humidity: 58%</div>
                <div>Wind: 12 km/h</div>
                <div style={{ color: '#4ade80' }}>Clear Sky</div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '6px', fontSize: '8px', color: '#94a3b8' }}>
              <span>WED: 32°/26°</span><span>THU: 31°/25°</span><span>FRI: 30°/24°</span><span>SAT: 31°/24°</span>
            </div>
          </div>

          {/* ROW 2: WORLD CLOCK (Col 2) */}
          <div className="cyber-panel border-gradient-green" style={{ padding: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#00f0ff' }}>
              <span className="font-tech" style={{ fontWeight: 'bold' }}>🌐 WORLD CLOCK</span>
              <span style={{ color: '#94a3b8', fontSize: '9px' }}>+ Add City</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', padding: '4px 6px', borderRadius: '4px' }}>
                <span>🇮🇳 New Delhi, India</span>
                <span className="font-digital" style={{ color: '#4ade80' }}>08:45 AM</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', padding: '4px 6px', borderRadius: '4px' }}>
                <span>🇺🇸 New York, USA</span>
                <span className="font-digital" style={{ color: '#00f0ff' }}>11:15 PM</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', padding: '4px 6px', borderRadius: '4px' }}>
                <span>🇬🇧 London, UK</span>
                <span className="font-digital" style={{ color: '#c084fc' }}>04:15 AM</span>
              </div>
            </div>
          </div>

          {/* ROW 2: 6 GLOWING TOOL TILES (Col 3) */}
          <div className="cyber-panel border-gradient-purple" style={{ padding: '14px' }}>
            <div className="font-tech" style={{ fontSize: '11px', color: '#00f0ff', fontWeight: 'bold', marginBottom: '6px' }}>🛠️ TOOLS</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', textAlign: 'center', fontSize: '9px' }}>
              <div onClick={() => setSwRunning(!swRunning)} style={{ padding: '8px 2px', background: 'rgba(0, 240, 255, 0.1)', border: '1px solid #00f0ff', color: '#00f0ff', borderRadius: '8px', cursor: 'pointer' }}>⏱️<br/>Stopwatch</div>
              <div onClick={() => setTimerRunning(!timerRunning)} style={{ padding: '8px 2px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid #f59e0b', color: '#fbbf24', borderRadius: '8px', cursor: 'pointer' }}>⏳<br/>Timer</div>
              <div onClick={() => setActiveModal('alarm')} style={{ padding: '8px 2px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid #3b82f6', color: '#60a5fa', borderRadius: '8px', cursor: 'pointer' }}>🔔<br/>Alarm</div>
              <div onClick={() => setActiveModal('countdown')} style={{ padding: '8px 2px', background: 'rgba(236, 72, 153, 0.1)', border: '1px solid #ec4899', color: '#f472b6', borderRadius: '8px', cursor: 'pointer' }}>🔄<br/>Countdown</div>
              <div onClick={() => { setTimerRunning(false); setTimerSeconds(25*60); setTimerRunning(true); }} style={{ padding: '8px 2px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#f87171', borderRadius: '8px', cursor: 'pointer' }}>🍅<br/>Pomodoro</div>
              <div onClick={() => setActiveModal('notes')} style={{ padding: '8px 2px', background: 'rgba(234, 179, 8, 0.1)', border: '1px solid #eab308', color: '#fde047', borderRadius: '8px', cursor: 'pointer' }}>📝<br/>Notes</div>
            </div>
          </div>

          {/* ROW 3: RADAR STOPWATCH (Col 1) */}
          <div className="cyber-panel border-gradient-cyan" style={{ padding: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div className="font-tech" style={{ fontSize: '11px', color: '#00ff88', fontWeight: 'bold' }}>⏱️ STOPWATCH</div>
            <div className="font-digital glow-cyan" style={{ fontSize: '18px', textAlign: 'center', margin: '4px 0', letterSpacing: '1px' }}>
              {formatSW()}
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button onClick={() => setSwRunning(!swRunning)} style={{ flex: 1, padding: '6px', background: swRunning ? '#7f1d1d' : '#14532d', border: `1px solid ${swRunning ? '#ef4444' : '#22c55e'}`, color: '#fff', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
                {swRunning ? 'Pause' : 'Start'}
              </button>
              <button on
