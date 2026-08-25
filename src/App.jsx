import React, { useEffect, useMemo, useState } from 'react';
import './App.css';

export default function App() {
  const [time, setTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(false);

  // Stopwatch
  const [swTime, setSwTime] = useState(0);
  const [swRunning, setSwRunning] = useState(false);

  // Timer
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [timerRunning, setTimerRunning] = useState(false);

  // UI
  const [activeModal, setActiveModal] = useState(null);
  const [notes, setNotes] = useState(
    'Daily Targets:\n- Bharat Clock UI Pro\n- Launch on GitHub'
  );

  // Alarms
  const [alarm1, setAlarm1] = useState(true);
  const [alarm2, setAlarm2] = useState(false);

  // Clock update
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Stopwatch update
  useEffect(() => {
    if (!swRunning) return;

    const interval = setInterval(() => {
      setSwTime((prev) => prev + 10);
    }, 10);

    return () => clearInterval(interval);
  }, [swRunning]);

  // Timer update
  useEffect(() => {
    if (!timerRunning) return;

    if (timerSeconds <= 0) {
      setTimerRunning(false);
      window.setTimeout(() => {
        alert('⏰ Timer Over!');
      }, 0);
      return;
    }

    const interval = setInterval(() => {
      setTimerSeconds((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  // ---------- FORMATTERS ----------

  const formatSW = () => {
    const ms = String(swTime % 1000).padStart(3, '0');
    const sec = String(Math.floor(swTime / 1000) % 60).padStart(2, '0');
    const min = String(Math.floor(swTime / 60000) % 60).padStart(2, '0');
    const hr = String(Math.floor(swTime / 3600000)).padStart(2, '0');

    return `${hr}:${min}:${sec}.${ms}`;
  };

  const formatTR = (seconds) => {
    const hr = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const min = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const sec = String(seconds % 60).padStart(2, '0');

    return `${hr}:${min}:${sec}`;
  };

  // ---------- CURRENT TIME ----------

  const hours = time.getHours();

  const formattedHours = is24Hour
    ? String(hours).padStart(2, '0')
    : String(hours % 12 || 12).padStart(2, '0');

  const formattedMinutes = String(time.getMinutes()).padStart(2, '0');
  const formattedSeconds = String(time.getSeconds()).padStart(2, '0');

  const ampm = hours >= 12 ? 'PM' : 'AM';

  // ---------- DATE ----------

  const dateText = time.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  });

  const monthText = time.toLocaleDateString('en-IN', {
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  });

  const currentDay = Number(
    time.toLocaleDateString('en-IN', {
      day: '2-digit',
      timeZone: 'Asia/Kolkata',
    })
  );

  // ---------- CALENDAR ----------

  const calendarDays = useMemo(() => {
    const year = time.getFullYear();
    const month = time.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const previousMonthDays = new Date(year, month, 0).getDate();

    const days = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: previousMonthDays - i,
        muted: true,
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        muted: false,
        today: day === currentDay,
      });
    }

    while (days.length % 7 !== 0) {
      days.push({
        day: days.length - firstDay - daysInMonth + 1,
        muted: true,
      });
    }

    return days;
  }, [time, currentDay]);

  // ---------- WORLD CLOCK ----------

  const worldClock = (zone) =>
    time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: zone,
    });

  // ---------- TIMER CONTROLS ----------

  const setTimer = (seconds) => {
    setTimerRunning(false);
    setTimerSeconds(seconds);
  };

  const startPomodoro = () => {
    setTimerRunning(false);
    setTimerSeconds(25 * 60);

    setTimeout(() => {
      setTimerRunning(true);
    }, 50);
  };

  // ---------- MODAL ----------

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '12px 16px',
        boxSizing: 'border-box',
      }}
    >
      {/* ================= TOP NAVBAR ================= */}

      <header
        className="cyber-panel border-gradient-purple"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 20px',
          marginBottom: '12px',
          gap: '12px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <span style={{ fontSize: '26px' }}>🇮🇳</span>

          <div>
            <h1
              className="font-tech"
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                margin: 0,
                letterSpacing: '1px',
                background:
                  'linear-gradient(90deg, #ff9933, #ffffff, #138808)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              भारत CLOCK
            </h1>

            <span
              style={{
                fontSize: '9px',
                color: '#94a3b8',
              }}
            >
              Made in India ❤️
            </span>
          </div>
        </div>

        <nav
          style={{
            display: 'flex',
            gap: '6px',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <button
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              background: 'rgba(59, 130, 246, 0.2)',
              border: '1px solid #3b82f6',
              color: '#60a5fa',
              fontSize: '11px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            ⌂ Home
          </button>

          <button
            onClick={() => setActiveModal('world')}
            style={navButtonStyle}
          >
            🌐 World Clock
          </button>

          <button
            onClick={() => setActiveModal('calendar')}
            style={navButtonStyle}
          >
            📅 Calendar
          </button>

          <button
            onClick={() => setActiveModal('notes')}
            style={navButtonStyle}
          >
            🛠️ Tools
          </button>

          <button
            onClick={() => setActiveModal('alarm')}
            style={navButtonStyle}
          >
            🔔 Alarm
          </button>
        </nav>

        <div
          style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
          }}
        >
          <button
            onClick={() => setIs24Hour((prev) => !prev)}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              background: '#312e81',
              border: '1px solid #818cf8',
              color: '#e0e7ff',
              fontSize: '11px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            {is24Hour ? '24H' : '12H'}
          </button>

          <span
            style={{
              fontSize: '11px',
              color: '#cbd5e1',
              background: 'rgba(255,255,255,0.06)',
              padding: '5px 8px',
              borderRadius: '6px',
            }}
          >
            EN ▾
          </span>
        </div>
      </header>

      {/* ================= MAIN BODY ================= */}

      <div
        style={{
          display: 'flex',
          gap: '12px',
          flex: 1,
          minHeight: 0,
        }}
      >
        {/* SIDEBAR */}

        <aside
          className="cyber-panel border-gradient-cyan"
          style={{
            width: '70px',
            minWidth: '70px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 0',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'rgba(0,240,255,0.15)',
                border: '1px solid #00f0ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#00f0ff',
                cursor: 'pointer',
              }}
            >
              ⊞
            </div>

            <SidebarButton
              icon="🌐"
              text="World"
              onClick={() => setActiveModal('world')}
            />

            <SidebarButton
              icon="📅"
              text="Calendar"
              onClick={() => setActiveModal('calendar')}
            />

            <SidebarButton
              icon="🛠️"
              text="Tools"
              onClick={() => setActiveModal('notes')}
            />

            <SidebarButton
              icon="🔔"
              text="Alarm"
              onClick={() => setActiveModal('alarm')}
            />
          </div>

          <div
            style={{
              width: '56px',
              padding: '4px',
              borderRadius: '6px',
              background: 'rgba(34,197,94,0.15)',
              border: '1px solid #22c55e',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontSize: '8px',
                color: '#4ade80',
                fontWeight: 'bold',
              }}
            >
              LIVE
            </span>

            <span
              style={{
                fontSize: '8px',
                color: '#4ade80',
              }}
            >
              ● ONLINE
            </span>
          </div>
        </aside>

        {/* ================= DASHBOARD ================= */}

        <div
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1.3fr 1.1fr',
            gap: '12px',
            minWidth: 0,
          }}
        >
          {/* HERO CLOCK */}

          <div
            className="cyber-panel border-gradient-hero"
            style={{
              gridColumn: 'span 2',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '220px',
            }}
          >
            <div
              style={{
                position: 'absolute',
                right: '15px',
                top: '10px',
                width: '230px',
                height: '190px',
                pointerEvents: 'none',
                opacity: 0.85,
              }}
            >
              <svg
                viewBox="0 0 200 200"
                style={{
                  width: '100%',
                  height: '100%',
                  stroke: '#00ff88',
                  strokeWidth: '1.2',
                  fill: 'none',
                }}
              >
                <path
                  d="M 90,15 L 110,30 L 105,45 L 140,50 L 170,75 L 160,110 L 130,140 L 110,185 L 95,185 L 85,140 L 60,115 L 45,95 L 70,70 L 60,40 Z"
                  strokeDasharray="3,3"
                />

                <circle
                  cx="100"
                  cy="95"
                  r="22"
                  stroke="#00f0ff"
                  strokeWidth="1.5"
                  fill="rgba(0, 240, 255, 0.05)"
                />

                {[...Array(24)].map((_, i) => (
                  <line
                    key={i}
                    x1="100"
                    y1="95"
                    x2={
                      100 +
                      22 * Math.cos((i * 15 * Math.PI) / 180)
                    }
                    y2={
                      95 +
                      22 * Math.sin((i * 15 * Math.PI) / 180)
                    }
                    stroke="#00f0ff"
                    strokeWidth="1"
                  />
                ))}
              </svg>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative',
                zIndex: 2,
              }}
            >
              <span
                className="font-tech"
                style={{
                  fontSize: '13px',
                  color: '#00ff88',
                  letterSpacing: '1px',
                }}
              >
                🧭 INDIA STANDARD TIME{' '}
                <span style={{ color: '#94a3b8' }}>
                  UTC +5:30
                </span>
              </span>

              <span
                style={{
                  background: '#052e16',
                  border: '1px solid #22c55e',
                  color: '#4ade80',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '10px',
                  fontWeight: 'bold',
                }}
              >
                ● LIVE
              </span>
            </div>

            <div
              style={{
                margin: '10px 0',
                display: 'flex',
                alignItems: 'baseline',
                gap: '4px',
                position: 'relative',
                zIndex: 2,
              }}
            >
              <span
                className="font-digital glow-pink"
                style={{
                  fontSize: '72px',
                  fontWeight: '900',
                  letterSpacing: '2px',
                }}
              >
                {formattedHours}
              </span>

              <span
                className="font-digital glow-pink"
                style={{
                  fontSize: '72px',
                  fontWeight: '900',
                }}
              >
                :
              </span>

              <span
                className="font-digital glow-cyan"
                style={{
                  fontSize: '72px',
                  fontWeight: '900',
                  letterSpacing: '2px',
                }}
              >
                {formattedMinutes}
              </span>

              <span
                className="font-digital glow-green"
                style={{
                  fontSize: '72px',
                  fontWeight: '900',
                }}
              >
                :
              </span>

              <span
                className="font-digital glow-green"
                style={{
                  fontSize: '72px',
                  fontWeight: '900',
                }}
              >
                {formattedSeconds}
              </span>

              {!is24Hour && (
                <span
                  className="font-digital glow-cyan"
                  style={{
                    fontSize: '24px',
                    marginLeft: '10px',
                  }}
                >
                  {ampm}
                </span>
              )}
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                paddingTop: '8px',
                fontSize: '12px',
                color: '#cbd5e1',
                position: 'relative',
                zIndex: 2,
                gap: '10px',
              }}
            >
              <span
                className="font-tech"
                style={{
                  letterSpacing: '1px',
                }}
              >
                {dateText.toUpperCase()}
              </span>

              <span
                className="font-tech"
                style={{
                  color: '#94a3b8',
                }}
              >
                📍 New Delhi, India
              </span>

              <div
                style={{
                  display: 'flex',
                  gap: '4px',
                  background: 'rgba(0,0,0,0.4)',
                  padding: '2px',
                  borderRadius: '6px',
                }}
              >
                <button
                  onClick={() => setIs24Hour(false)}
                  style={{
                    padding: '2px 8px',
                    background: !is24Hour
                      ? '#9333ea'
                      : 'transparent',
                    border: 'none',
                    color: '#fff',
                    borderRadius: '4px',
                    fontSize: '10px',
                    cursor: 'pointer',
                  }}
                >
                  12H
                </button>

                <button
                  onClick={() => setIs24Hour(true)}
                  style={{
                    padding: '2px 8px',
                    background: is24Hour
