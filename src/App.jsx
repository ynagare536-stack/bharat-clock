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

  // Modal States
  const [activeModal, setActiveModal] = useState(null);
  const [notes, setNotes] = useState('🔥 Bharat Clock Tasks:\n- UI Cyberpunk Ready\n- Live Deployment Done');
  const [alarms, setAlarms] = useState([
    { id: 1, time: '07:00 AM', label: 'Daily', enabled: true },
    { id: 2, time: '08:30 AM', label: 'Mon-Fri', enabled: false }
  ]);

  // Live Clock Tick
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Stopwatch Tick
  useEffect(() => {
    let int = null;
    if (swRunning) {
      int = setInterval(() => setSwTime((p) => p + 10), 10);
    }
    return () => clearInterval(int);
  }, [swRunning]);

  // Timer Tick
  useEffect(() => {
    let int = null;
    if (timerRunning && timerSeconds > 0) {
      int = setInterval(() => setTimerSeconds((p) => p - 1), 1000);
    } else if (timerSeconds === 0 && timerRunning) {
      setTimerRunning(false);
      alert('⏰ Timer Over!');
    }
    return () => clearInterval(int);
  }, [timerRunning, timerSeconds]);

  const formatSW = () => {
    const ms = String(Math.floor((swTime % 1000) / 10)).padStart(2, '0');
    const sec = String(Math.floor((swTime / 1000) % 60)).padStart(2, '0');
    const min = String(Math.floor((swTime / 60000) % 60)).padStart(2, '0');
    return `${min}:${sec}.${ms}`;
  };

  const formatTR = (secTotal) => {
    const min = String(Math.floor(secTotal / 60)).padStart(2, '0');
    const sec = String(secTotal % 60).padStart(2, '0');
    return `${min}:${sec}`;
  };

  const hours = time.getHours();
  const formattedHours = is24Hour ? String(hours).padStart(2, '0') : String(hours % 12 || 12).padStart(2, '0');
  const formattedMinutes = String(time.getMinutes()).padStart(2, '0');
  const formattedSeconds = String(time.getSeconds()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '14px', boxSizing: 'border-box', background: '#050713', color: '#fff', fontFamily: 'sans-serif' }}>
      
      {/* 1. TOP NAVBAR */}
      <header className="neon-panel border-neon-purple" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '26px' }}>🇮🇳</span>
          <div>
            <h1 className="font-tech" style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: '#00f0ff', letterSpacing: '1px' }}>भारत CLOCK</h1>
            <span style={{ fontSize: '10px', color: '#94a3b8' }}>Made in India ❤️</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setIs24Hour(!is24Hour)} style={{ padding: '6px 14px', borderRadius: '8px', background: '#312e81', border: '1px solid #818cf8', color: '#e0e7ff', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
            {is24Hour ? '24H' : '12H'}
          </button>
        </div>
      </header>

      {/* 2. MAIN DASHBOARD GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px', flex: 1 }}>
        
        {/* HERO DIGITAL CLOCK */}
        <div className="neon-panel border-neon-cyan" style={{ gridColumn: 'span 2', padding: '24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#00f0ff' }}>
            <span>⚡ INDIA STANDARD TIME (UTC +5:30)</span>
            <span style={{ background: '#052e16', border: '1px solid #22c55e', color: '#4ade80', padding: '2px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 'bold' }}>● LIVE</span>
          </div>

          <div style={{ margin: '18px 0', display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span className="font-digital glow-pink" style={{ fontSize: '70px', fontWeight: '900', letterSpacing: '2px' }}>
              {formattedHours}:{formattedMinutes}
            </span>
            <span className="font-digital glow-green" style={{ fontSize: '55px', fontWeight: '900' }}>
              :{formattedSeconds}
            </span>
            {!is24Hour && <span className="font-digital glow-cyan" style={{ fontSize: '22px', marginLeft: '10px' }}>{ampm}</span>}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '10px', fontSize: '12px', color: '#cbd5e1' }}>
            <span>📍 New Delhi, India</span>
            <span>TUESDAY, 25 AUGUST 2026</span>
          </div>
        </div>

        {/* CALENDAR */}
        <div className="neon-panel border-neon-purple" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#c084fc', marginBottom: '8px' }}>
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
            <span style={{ background: 'rgba(34, 197, 94, 0.25)', border: '1px solid #4ade80', color: '#4ade80', borderRadius: '4px', fontWeight: 'bold' }}>25</span>
            <span>26</span><span>27</span><span>28</span><span>29</span>
          </div>
        </div>

        {/* WEATHER */}
        <div className="neon-panel border-neon-cyan" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#fbbf24' }}>
            <span>☀️ WEATHER</span>
            <span style={{ color: '#94a3b8' }}>New Delhi</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '12px 0' }}>
            <span className="font-digital glow-yellow" style={{ fontSize: '38px', fontWeight: 'bold' }}>28°C</span>
            <div style={{ fontSize: '11px', color: '#cbd5e1', lineHeight: '1.5', textAlign: 'right' }}>
              <div>Humidity: 58%</div>
              <div>Wind: 12 km/h</div>
              <div style={{ color: '#4ade80' }}>Clear Sky</div>
            </div>
          </div>
        </div>

        {/* QUICK TOOLS */}
        <div className="neon-panel border-neon-purple" style={{ padding: '16px' }}>
          <div style={{ fontSize: '12px', color: '#c084fc', marginBottom: '8px' }}>🛠️ QUICK TOOLS</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', textAlign: 'center', fontSize: '10px' }}>
            <button onClick={() => setSwRunning(!swRunning)} style={{ padding: '8px 2px', background: 'rgba(0, 240, 255, 0.1)', border: '1px solid #00f0ff', color: '#00f0ff', borderRadius: '6px', cursor: 'pointer' }}>⏱️ SW</button>
            <button onClick={() => setTimerRunning(!timerRunning)} style={{ padding: '8px 2px', background: 'rgba(251, 191, 36, 0.1)', border: '1px solid #fbbf24', color: '#fbbf24', borderRadius: '6px', cursor: 'pointer' }}>⏳ Timer</button>
            <button onClick={() => setActiveModal('alarm')} style={{ padding: '8px 2px', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22c55e', color: '#4ade80', borderRadius: '6px', cursor: 'pointer' }}>🔔 Alarm</button>
            <button onClick={() => setActiveModal('countdown')} style={{ padding: '8px 2px', background: 'rgba(244, 114, 182, 0.1)', border: '1px solid #f472b6', color: '#f472b6', borderRadius: '6px', cursor: 'pointer' }}>🔄 Count</button>
            <button onClick={() => { setTimerRunning(false); setTimerSeconds(25*60); setTimerRunning(true); }} style={{ padding: '8px 2px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#fca5a5', borderRadius: '6px', cursor: 'pointer' }}>🍅 Pomo</button>
            <button onClick={() => setActiveModal('notes')} style={{ padding: '8px 2px', background: 'rgba(250, 204, 21, 0.1)', border: '1px solid #facc15', color: '#fef08a', borderRadius: '6px', cursor: 'pointer' }}>📝 Notes</button>
          </div>
        </div>

        {/* STOPWATCH WIDGET */}
        <div className="neon-panel border-neon-cyan" style={{ padding: '16px' }}>
          <div style={{ fontSize: '12px', color: '#00f0ff' }}>⏱️ STOPWATCH</div>
          <div className="font-digital glow-cyan" style={{ fontSize: '24px', textAlign: 'center', margin: '8px 0' }}>
            {formatSW()}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setSwRunning(!swRunning)} style={{ flex: 1, padding: '8px', background: swRunning ? '#7f1d1d' : '#14532d', border: `1px solid ${swRunning ? '#ef4444' : '#22c55e'}`, color: '#fff', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
              {swRunning ? 'Pause' : 'Start'}
            </button>
            <button onClick={() => { setSwRunning(false); setSwTime(0); }} style={{ padding: '8px 14px', background: '#334155', border: '1px solid #64748b', color: '#fff', borderRadius: '6px', cursor: 'pointer' }}>
              Reset
            </button>
          </div>
        </div>

        {/* COUNTDOWN TIMER */}
        <div className="neon-panel border-neon-purple" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#c084fc' }}>⏳ TIMER</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button onClick={() => { setTimerRunning(false); setTimerSeconds(15*60); }} style={{ padding: '2px 6px', fontSize: '9px', background: '#581c87', border: '1px solid #a855f7', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}>15m</button>
              <button onClick={() => { setTimerRunning(false); setTimerSeconds(25*60); }} style={{ padding: '2px 6px', fontSize: '9px', background: '#581c87', border: '1px solid #a855f7', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}>25m</button>
              <button onClick={() => { setTimerRunning(false); setTimerSeconds(30*60); }} style={{ padding: '2px 6px', fontSize: '9px', background: '#581c87', border: '1px solid #a855f7', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}>30m</button>
            </div>
          </div>

          <div className="font-digital glow-pink" style={{ fontSize: '24px', textAlign: 'center', margin: '8px 0' }}>
            {formatTR(timerSeconds)}
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setTimerRunning(!timerRunning)} style={{ flex: 1, padding: '8px', background: timerRunning ? '#7c2d12' : '#c2410c', border: '1px solid #fb923c', color: '#fff', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
              {timerRunning ? 'Pause' : 'Start'}
            </button>
            <button onClick={() => { setTimerRunning(false); setTimerSeconds(25*60); }} style={{ padding: '8px 14px', background: '#334155', border: '1px solid #64748b', color: '#fff', borderRadius: '6px', cursor: 'pointer' }}>
              Reset
            </button>
          </div>
        </div>

        {/* ALARM MANAGER */}
        <div className="neon-panel border-neon-green" style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#4ade80', marginBottom: '6px' }}>
            <span>🔔 ALARM</span>
            <span onClick={() => setActiveModal('alarm')} style={{ fontSize: '10px', cursor: 'pointer', textDecoration: 'underline' }}>+ Add</span>
          </div>
          {alarms.map((al) => (
            <div key={al.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '6px 8px', borderRadius: '6px', marginBottom: '6px' }}>
              <div>
                <span className="font-digital" style={{ fontSize: '12px', color: al.enabled ? '#4ade80' : '#64748b' }}>{al.time}</span>
                <div style={{ fontSize: '9px', color: '#94a3b8' }}>{al.label}</div>
              </div>
              <input 
                type="checkbox" 
                checked={al.enabled} 
                onChange={() => setAlarms(alarms.map(a => a.id === al.id ? { ...a, enabled: !a.enabled } : a))} 
                style={{ cursor: 'pointer', accentColor: '#22c55e' }}
              />
            </div>
          ))}
        </div>

      </div>

      {/* 3. MODAL POPUPS */}
      {activeModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div className="neon-panel border-neon-purple" style={{ padding: '20px', width: '90%', maxWidth: '380px', background: '#080c1d' }}>
            
            {activeModal === 'notes' && (
              <div>
                <h3 style={{ margin: '0 0 10px 0', color: '#facc15' }}>📝 QUICK NOTES</h3>
                <textarea 
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)} 
                  style={{ width: '100%', height: '120px', background: '#02040a', color: '#fff', border: '1px solid #ca8a04', borderRadius: '6px', padding: '8px', boxSizing: 'border-box' }}
                />
                <button onClick={() => setActiveModal(null)} style={{ marginTop: '10px', width: '100%', padding: '8px', background: '#ca8a04', border: 'none', color: '#000', fontWeight: 'bold', borderRadius: '6px', cursor: 'pointer' }}>Save & Close</button>
              </div>
            )}

            {activeModal === 'countdown' && (
              <div>
                <h3 style={{ margin: '0 0 10px 0', color: '#ec4899' }}>🔄 SET TIMER</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', margin: '10px 0' }}>
                  {[5, 10, 15, 25, 45, 60].map((m) => (
                    <button key={m} onClick={() => { setTimerRunning(false); setTimerSeconds(m * 60); setActiveModal(null); }} style={{ padding: '8px', background: '#831843', border: '1px solid #f472b6', color: '#fff', borderRadius: '6px', cursor: 'pointer' }}>{m}m</button>
                  ))}
                </div>
                <button onClick={() => setActiveModal(null)} style={{ width: '100%', padding: '6px', background: '#334155', border: 'none', color: '#fff', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
              </div>
            )}

            {activeModal === 'alarm' && (
              <div>
                <h3 style={{ margin: '0 0 10px 0', color: '#4ade80' }}>🔔 ADD ALARM</h3>
                <input id="newAlarmVal" type="time" defaultValue="06:00" style={{ width: '100%', padding: '8px', background: '#000', color: '#4ade80', border: '1px solid #22c55e', borderRadius: '6px', fontSize: '18px', textAlign: 'center', boxSizing: 'border-box' }} />
                <button 
                  onClick={() => {
                    const v = document.getElementById('newAlarmVal').value;
                    if (v) {
                      setAlarms([...alarms, { id: Date.now(), time: v, label: 'Custom', enabled: true }]);
                      setActiveModal(null);
                    }
                  }} 
                  style={{ marginTop: '10px', width: '100%', padding: '8px', background: '#16a34a', border: 'none', color: '#fff', fontWeight: 'bold', borderRadius: '6px', cursor: 'pointer' }}>
                  Save
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* 4. FOOTER */}
      <footer className="neon-panel" style={{ padding: '8px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#94a3b8', marginTop: '14px' }}>
        <span>© 2026 Bharat Clock. All rights reserved. 🇮🇳</span>
        <span style={{ color: '#fef08a', fontStyle: 'italic' }}>"समय सबसे कीमती दौलत है, इसे सही दिशा में निवेश करें।"</span>
        <span>Made with ❤️ in India</span>
      </footer>

    </div>
  );
}
