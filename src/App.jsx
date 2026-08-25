import React, { useState, useEffect, useRef } from 'react';
import './App.css';

export default function App() {
  // Live Clock
  const [time, setTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(false);

  // Stopwatch Logic
  const [swTime, setSwTime] = useState(0);
  const [swRunning, setSwRunning] = useState(false);

  // Timer Logic
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [timerRunning, setTimerRunning] = useState(false);

  // Modals / Tools
  const [activeModal, setActiveModal] = useState(null);
  const [notes, setNotes] = useState('Aaj ke tasks:\n- Project complete karna\n- Neon UI test');
  const [alarms, setAlarms] = useState([
    { id: 1, time: '07:00 AM', label: 'Daily', enabled: true },
    { id: 2, time: '08:30 AM', label: 'Mon-Fri', enabled: false },
  ]);

  // Clock Update
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Stopwatch Ticker
  useEffect(() => {
    let int = null;
    if (swRunning) {
      int = setInterval(() => {
        setSwTime((prev) => prev + 10);
      }, 10);
    }
    return () => clearInterval(int);
  }, [swRunning]);

  // Timer Ticker
  useEffect(() => {
    let int = null;
    if (timerRunning && timerSeconds > 0) {
      int = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerRunning) {
      setTimerRunning(false);
      alert('⏰ Timer Time Over!');
    }
    return () => clearInterval(int);
  }, [timerRunning, timerSeconds]);

  // Format Stopwatch Time
  const getFormattedSW = () => {
    const ms = String(Math.floor((swTime % 1000) / 10)).padStart(2, '0');
    const sec = String(Math.floor((swTime / 1000) % 60)).padStart(2, '0');
    const min = String(Math.floor((swTime / 60000) % 60)).padStart(2, '0');
    return `${min}:${sec}.${ms}`;
  };

  // Format Timer Time
  const getFormattedTimer = () => {
    const min = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
    const sec = String(timerSeconds % 60).padStart(2, '0');
    return `${min}:${sec}`;
  };

  const hours = time.getHours();
  const formattedHours = is24Hour ? String(hours).padStart(2, '0') : String(hours % 12 || 12).padStart(2, '0');
  const formattedMinutes = String(time.getMinutes()).padStart(2, '0');
  const formattedSeconds = String(time.getSeconds()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#050711', color: '#fff', padding: '12px', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' }}>
      
      {/* 1. TOP NAVBAR */}
      <header className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '24px' }}>🇮🇳</span>
          <div>
            <h1 className="font-tech" style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: '#00f0ff' }}>भारत CLOCK</h1>
            <span style={{ fontSize: '10px', color: '#94a3b8' }}>Made in India ❤️</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setIs24Hour(!is24Hour)} 
            style={{ padding: '6px 14px', background: '#1e1b4b', border: '1px solid #6366f1', color: '#c7d2fe', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
            {is24Hour ? 'Switch to 12H' : 'Switch to 24H'}
          </button>
        </div>
      </header>

      {/* 2. MAIN DASHBOARD GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
        
        {/* HERO CLOCK */}
        <div className="glass-panel neon-border-cyan" style={{ gridColumn: 'span 2', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#00f0ff' }}>
            <span>⚡ INDIA STANDARD TIME (UTC +5:30)</span>
            <span style={{ background: '#052e16', border: '1px solid #22c55e', color: '#4ade80', padding: '2px 8px', borderRadius: '12px' }}>● LIVE</span>
          </div>

          <div style={{ margin: '20px 0', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span className="font-digital neon-text-pink" style={{ fontSize: '64px', fontWeight: '900' }}>
              {formattedHours}:{formattedMinutes}
            </span>
            <span className="font-digital neon-text-green" style={{ fontSize: '50px', fontWeight: 'bold' }}>
              :{formattedSeconds}
            </span>
            {!is24Hour && <span className="font-digital" style={{ fontSize: '22px', color: '#00f0ff', marginLeft: '10px' }}>{ampm}</span>}
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

        {/* WEATHER */}
        <div className="glass-panel neon-border-cyan" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#facc15' }}>
            <span>☀️ WEATHER</span>
            <span style={{ color: '#94a3b8' }}>New Delhi</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '14px 0' }}>
            <span className="font-digital" style={{ fontSize: '38px', color: '#fef08a' }}>28°C</span>
            <div style={{ fontSize: '11px', color: '#94a3b8', textAlign: 'right' }}>
              <div>Humidity: 58%</div>
              <div>Wind: 12 km/h</div>
              <div>Clear Sky</div>
            </div>
          </div>
        </div>

        {/* QUICK TOOLS (ALL WORKING DIRECT CLICKS) */}
        <div className="glass-panel neon-border-purple" style={{ padding: '18px' }}>
          <div style={{ fontSize: '13px', color: '#c084fc', marginBottom: '10px' }}>🛠️ TOOLS (Click to Run)</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', fontSize: '11px', textAlign: 'center' }}>
            
            <button 
              onClick={() => setSwRunning(!swRunning)} 
              style={{ padding: '10px 4px', background: '#083344', border: '1px solid #06b6d4', color: '#67e8f9', borderRadius: '8px', cursor: 'pointer' }}>
              ⏱️ {swRunning ? 'Pause SW' : 'Start SW'}
            </button>

            <button 
              onClick={() => setTimerRunning(!timerRunning)} 
              style={{ padding: '10px 4px', background: '#451a03', border: '1px solid #f59e0b', color: '#fde68a', borderRadius: '8px', cursor: 'pointer' }}>
              ⏳ {timerRunning ? 'Pause TR' : 'Start TR'}
            </button>

            <button 
              onClick={() => setActiveModal('notes')} 
              style={{ padding: '10px 4px', background: '#3b0764', border: '1px solid #a855f7', color: '#e9d5ff', borderRadius: '8px', cursor: 'pointer' }}>
              📝 Notes
            </button>

            <button 
              onClick={() => { setTimerRunning(false); setTimerSeconds(25 * 60); setTimerRunning(true); }} 
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

        {/* STOPWATCH CONTROLLER */}
        <div className="glass-panel neon-border-cyan" style={{ padding: '18px' }}>
          <div style={{ fontSize: '13px', color: '#00f0ff', marginBottom: '8px' }}>⏱️ STOPWATCH</div>
          <div className="font-digital" style={{ fontSize: '28px', color: '#67e8f9', textAlign: 'center', margin: '10px 0' }}>
            {getFormattedSW()}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => setSwRunning(!swRunning)} 
              style={{ flex: 1, padding: '8px', background: swRunning ? '#7f1d1d' : '#14532d', border: `1px solid ${swRunning ? '#ef4444' : '#22c55e'}`, color: '#fff', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
              {swRunning ? 'Pause' : 'Start'}
            </button>
            <button 
              onClick={() => { setSwRunning(false); setSwTime(0); }} 
              style={{ padding: '8px 16px', background: '#334155', border: '1px solid #64748b', color: '#fff', borderRadius: '6px', cursor: 'pointer' }}>
              Reset
            </button>
          </div>
        </div>

        {/* COUNTDOWN TIMER CONTROLLER */}
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
              onClick={() => setTimerRunning(!timerRunning)} 
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

        {/* ALARMS */}
        <div className="glass-panel neon-border-green" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#4ade80', marginBottom: '8px' }}>
            <span>🔔 ALARM</span>
            <span onClick={() => setActiveModal('alarm')} style={{ cursor: 'pointer', textDecoration: 'underline' }}>+ Add</span>
          </div>
          {alarms.map((al) => (
            <div key={al.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '6px 10px', borderRadius: '6px', marginBottom: '6px' }}>
              <div>
                <span className="font-digital" style={{ fontSize: '13px', color: al.enabled ? '#4ade80' : '#64748b' }}>{al.time}</span>
                <div style={{ fontSize: '9px', color: '#94a3b8' }}>{al.label}</div>
              </div>
              <input 
                type="checkbox" 
                checked={al.enabled} 
                onChange={() => setAlarms(alarms.map(a => a.id === al.id ? { ...a, enabled: !a.enabled } : a))} 
                style={{ cursor: 'pointer' }}
              />
            </div>
          ))}
        </div>

      </div>

      {/* MODAL POPUPS */}
      {activeModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div className="glass-panel neon-border-purple" style={{ padding: '24px', width: '90%', maxWidth: '400px', background: '#0b0f19' }}>
            
            {activeModal === 'notes' && (
              <div>
                <h3 style={{ margin: '0 0 10px 0', color: '#facc15' }}>📝 Quick Notes</h3>
                <textarea 
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)} 
                  style={{ width: '100%', height: '120px', background: '#000', color: '#fff', border: '1px solid #ca8a04', borderRadius: '6px', padding: '8px', boxSizing: 'border-box' }}
                />
                <button onClick={() => setActiveModal(null)} style={{ marginTop: '10px', width: '100%', padding: '8px', background: '#ca8a04', border: 'none', color: '#000', fontWeight: 'bold', borderRadius: '6px', cursor: 'pointer' }}>Close & Save</button>
              </div>
            )}

            {activeModal === 'countdown' && (
              <div>
                <h3 style={{ margin: '0 0 10px 0', color: '#ec4899' }}>🔄 Choose Countdown Duration</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', margin: '15px 0' }}>
                  {[5, 10, 20, 30, 45, 60].map(m => (
                    <button key={m} onClick={() => { setTimerRunning(false); setTimerSeconds(m * 60); setActiveModal(null); }} style={{ padding: '8px', background: '#831843', border: '1px solid #f472b6', color: '#fff', borderRadius: '6px', cursor: 'pointer' }}>{m} Min</button>
                  ))}
                </div>
                <button onClick={() => setActiveModal(null)} style={{ width: '100%', padding: '6px', background: '#334155', border: 'none', color: '#fff', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
              </div>
            )}

            {activeModal === 'alarm' && (
              <div>
                <h3 style={{ margin: '0 0 10px 0', color: '#4ade80' }}>🔔 Add Alarm</h3>
                <input id="newAlarmTime" type="time" defaultValue="06:00" style={{ width: '100%', padding: '8px', background: '#000', color: '#4ade80', border: '1px solid #22c55e', borderRadius: '6px', fontSize: '18px', textAlign: 'center', boxSizing: 'border-box' }} />
                <button 
                  onClick={() => {
                    const v = document.getElementById('newAlarmTime').value;
                    if (v) {
                      setAlarms([...alarms, { id: Date.now(), time: v, label: 'Custom', enabled: true }]);
                      setActiveModal(null);
                    }
                  }} 
                  style={{ marginTop: '12px', width: '100%', padding: '8px', background: '#16a34a', border: 'none', color: '#fff', fontWeight: 'bold', borderRadius: '6px', cursor: 'pointer' }}>
                  Save Alarm
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
