import React, { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard,
  Globe,
  Calendar as CalIcon,
  Wrench,
  Bell,
  Settings,
  Sun,
  Search,
  Moon,
  ChevronDown,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Watch,
  Timer as TimerIcon,
  Hourglass,
  Clock,
  FileText,
  Palette,
  Plus,
  X
} from "lucide-react";
import "./App.css";

export default function App() {
  const [time, setTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [activeLang, setActiveLang] = useState("EN");
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Stopwatch States
  const [swTime, setSwTime] = useState(0);
  const [swRunning, setSwRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const swRef = useRef(null);

  // Timer States
  const [timerLeft, setTimerLeft] = useState(25 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerPreset, setTimerPreset] = useState("25");
  const timerRef = useRef(null);

  // Alarms State & Modal
  const [alarms, setAlarms] = useState([
    { id: 1, time: "07:00 AM", label: "Daily Wake Up", active: true },
    { id: 2, time: "08:30 AM", label: "Work Routine", active: false }
  ]);
  const [showAlarmModal, setShowAlarmModal] = useState(false);
  const [newAlarmTime, setNewAlarmTime] = useState("06:00");
  const [newAlarmLabel, setNewAlarmLabel] = useState("");

  // Interactive Calendar State & Live Events
  const [selectedDay, setSelectedDay] = useState(time.getDate());
  const [events, setEvents] = useState({
    [time.getDate()]: "Live Session • Productivity Sprint",
    15: "Independence Day Celebration 🇮🇳",
    25: "Project Milestone Review",
    28: "Team Sync & Code Deployment"
  });

  // World Cities
  const [cities, setCities] = useState([
    { id: 1, name: "New York, USA", flag: "🇺🇸", zone: "EDT", time: "11:15 PM", color: "#00f0ff" },
    { id: 2, name: "London, UK", flag: "🇬🇧", zone: "BST", time: "04:15 AM", color: "#ff9900" },
    { id: 3, name: "Dubai, UAE", flag: "🇦🇪", zone: "GST", time: "07:15 AM", color: "#ff007f" },
    { id: 4, name: "Tokyo, Japan", flag: "🇯🇵", zone: "JST", time: "12:15 PM", color: "#00ff88" }
  ]);

  // Audio Beep Helper
  const playBeep = () => {
    if (isMuted) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.frequency.value = 850;
      gain.gain.value = 0.15;
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {
      console.log(e);
    }
  };

  // Clock Update
  useEffect(() => {
    const clockInterval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(clockInterval);
  }, []);

  // Stopwatch Logic
  useEffect(() => {
    if (swRunning) {
      swRef.current = setInterval(() => setSwTime((p) => p + 10), 10);
    } else {
      clearInterval(swRef.current);
    }
    return () => clearInterval(swRef.current);
  }, [swRunning]);

  // Timer Logic
  useEffect(() => {
    if (timerRunning && timerLeft > 0) {
      timerRef.current = setInterval(() => setTimerLeft((p) => (p > 0 ? p - 1 : 0)), 1000);
    } else if (timerLeft === 0 && timerRunning) {
      setTimerRunning(false);
      clearInterval(timerRef.current);
      playBeep();
      alert("⏰ Timer Finished!");
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [timerRunning, timerLeft, isMuted]);

  const pad = (n, len = 2) => String(n).padStart(len, "0");

  const formatStopwatch = (ms) => {
    const min = Math.floor(ms / 60000);
    const sec = Math.floor((ms % 60000) / 1000);
    const milli = Math.floor((ms % 1000) / 10);
    return `${pad(min)}:${pad(sec)}.${pad(milli, 2)}`;
  };

  const formatTimer = (sec) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  // Add Alarm Submission
  const saveNewAlarm = (e) => {
    e.preventDefault();
    if (!newAlarmTime) return;

    const [h, m] = newAlarmTime.split(":");
    let hoursInt = parseInt(h, 10);
    const ampmStr = hoursInt >= 12 ? "PM" : "AM";
    hoursInt = hoursInt % 12 || 12;
    const formattedAlarmTime = `${pad(hoursInt)}:${m} ${ampmStr}`;

    const newObj = {
      id: Date.now(),
      time: formattedAlarmTime,
      label: newAlarmLabel.trim() || "Quick Alarm",
      active: true
    };

    setAlarms([newObj, ...alarms]);
    setNewAlarmLabel("");
    setShowAlarmModal(false);
    playBeep();
  };

  // Add Event Handler for Selected Calendar Day
  const handleAddCalendarEvent = () => {
    const eventName = prompt(`Add Live Event for August ${selectedDay}, 2026:`);
    if (eventName && eventName.trim()) {
      setEvents({
        ...events,
        [selectedDay]: eventName.trim()
      });
      playBeep();
    }
  };

  // Time Calculation
  const rawHours = time.getHours();
  const displayHours = is24Hour ? pad(rawHours) : pad(rawHours % 12 || 12);
  const minutes = pad(time.getMinutes());
  const seconds = pad(time.getSeconds());
  const ampm = rawHours >= 12 ? "PM" : "AM";

  return (
    <div className={`app-container ${!isDarkMode ? "alt-theme" : ""}`}>
      {/* 1. Left Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-menu">
          {[
            { name: "Dashboard", icon: LayoutDashboard },
            { name: "World Clock", icon: Globe },
            { name: "Calendar", icon: CalIcon },
            { name: "Tools", icon: Wrench },
            { name: "Alarm", icon: Bell },
            { name: "Settings", icon: Settings },
            { name: "Theme", icon: Palette },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                className={`nav-item ${activeNav === item.name ? "active" : ""}`}
                onClick={() => {
                  playBeep();
                  if (item.name === "Theme") setIsDarkMode(!isDarkMode);
                  else setActiveNav(item.name);
                }}
              >
                <Icon size={19} /> {item.name}
              </button>
            );
          })}
        </div>
        <div className="live-status-box">
          LIVE STATUS<br />● ONLINE
        </div>
      </aside>

      {/* 2. Main Viewport */}
      <main className="main-viewport">
        {/* Top Nav */}
        <header className="top-nav">
          <div className="brand-box">
            <span style={{ fontSize: "24px" }}>🇮🇳</span>
            <div className="brand-text">
              <h2>भारत CLOCK</h2>
              <span>Made in India ❤️</span>
            </div>
          </div>

          <div className="top-tabs">
            {["Home", "World Clock", "Calendar", "Tools", "Alarm", "Settings"].map((t) => (
              <button
                key={t}
                className={`tab-btn ${activeNav === t || (t === "Home" && activeNav === "Dashboard") ? "active" : ""}`}
                onClick={() => {
                  playBeep();
                  setActiveNav(t === "Home" ? "Dashboard" : t);
                }}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="top-ctrls">
            <div className="circle-btn" onClick={() => {
              const q = prompt("Search Dashboard Feature:");
              if (q) alert(`Navigating to ${q}`);
            }}>
              <Search size={14} />
            </div>
            <div className="circle-btn" onClick={() => {
              playBeep();
              setIsDarkMode(!isDarkMode);
            }}>
              {isDarkMode ? <Moon size={14} /> : <Sun size={14} />}
            </div>
            <div
              className="lang-dropdown"
              onClick={() => {
                playBeep();
                setActiveLang(activeLang === "EN" ? "HI" : "EN");
              }}
            >
              {activeLang} <ChevronDown size={13} />
            </div>
          </div>
        </header>

        {/* Row 1: Clock + Calendar */}
        <div className="grid-row-1">
          {/* Main Hero Clock */}
          <div className="card-neon glow-cyan">
            {/* India Map & Chakra Vector */}
            <svg className="india-map-bg" viewBox="0 0 200 200" fill="none">
              <path
                d="M100 20 C120 25 130 40 145 50 C160 60 175 75 165 95 C155 110 145 130 135 150 C125 170 115 185 100 195 C85 185 75 170 65 150 C55 130 45 110 35 95 C25 75 40 60 55 50 C70 40 80 25 100 20 Z"
                stroke="#00f0ff"
                strokeWidth="1.2"
                strokeDasharray="2 3"
                opacity="0.4"
              />
              <circle cx="100" cy="105" r="26" stroke="#00e5ff" strokeWidth="1.5" />
              <circle cx="100" cy="105" r="6" fill="#00e5ff" />
              {Array.from({ length: 24 }).map((_, i) => (
                <line
                  key={i}
                  x1="100"
                  y1="105"
                  x2={100 + 24 * Math.cos((i * 15 * Math.PI) / 180)}
                  y2={105 + 24 * Math.sin((i * 15 * Math.PI) / 180)}
                  stroke="#00e5ff"
                  strokeWidth="0.8"
                  opacity="0.7"
                />
              ))}
            </svg>

            {/* Monuments Vector Outline */}
            <svg className="monuments-silhouette" viewBox="0 0 600 80" fill="none" stroke="#00f0ff" strokeWidth="1.2">
              <path d="M50 75 L50 25 L80 25 L80 75 M50 35 L80 35 M60 75 L60 45 C60 40 70 40 70 45 L70 75" />
              <path d="M140 75 L140 30 C140 20 160 20 160 30 L160 75 M150 15 L150 20 M120 75 L120 40 L130 40 L130 75 M170 75 L170 40 L180 40 L180 75" />
              <path d="M230 75 C240 40 250 30 260 75 M240 75 C250 45 260 45 270 75 M250 75 C260 50 270 50 280 75" />
              <path d="M340 75 L348 10 L352 10 L360 75 M343 55 L357 55 M345 35 L355 35" />
            </svg>

            <div className="clock-display-wrap">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#00f0ff", fontWeight: "700", fontSize: "13px" }}>
                  ✦ {activeLang === "HI" ? "भारतीय मानक समय" : "INDIA STANDARD TIME"}{" "}
                  <span style={{ color: "#94a3b8" }}>UTC +5:30</span>
                </span>
                <span style={{ background: "rgba(0,255,136,0.15)", color: "#00ff88", border: "1px solid #00ff88", padding: "2px 8px", borderRadius: "10px", fontSize: "11px", fontWeight: "bold" }}>
                  ● LIVE
                </span>
              </div>

              <div className="clock-main-digits">
                <span className="digit-pink">{displayHours}</span>
                <span style={{ color: "#ff007f", margin: "0 4px" }}>:</span>
                <span className="digit-cyan">{minutes}</span>
                <span style={{ color: "#00f0ff", margin: "0 4px" }}>:</span>
                <span className="digit-green">{seconds}</span>
                {!is24Hour && <span className="ampm-tag">{ampm}</span>}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "6px" }}>
                <div style={{ color: "#cbd5e1", fontSize: "12px" }}>
                  <span>{time.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).toUpperCase()}</span> • <span>📍 New Delhi, India</span>
                </div>
                <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                  <button
                    style={{
                      background: !is24Hour ? "rgba(255,255,255,0.15)" : "transparent",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "#fff",
                      padding: "2px 8px",
                      borderRadius: "5px",
                      fontSize: "11px",
                      cursor: "pointer"
                    }}
                    onClick={() => { playBeep(); setIs24Hour(false); }}
                  >
                    12H
                  </button>
                  <button
                    style={{
                      background: is24Hour ? "#7c3aed" : "transparent",
                      border: "1px solid #7c3aed",
                      color: "#fff",
                      padding: "2px 8px",
                      borderRadius: "5px",
                      fontSize: "11px",
                      cursor: "pointer"
                    }}
                    onClick={() => { playBeep(); setIs24Hour(true); }}
                  >
                    24H
                  </button>
                  <div className="circle-btn small" onClick={() => setIsMuted(!isMuted)}>
                    {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
                  </div>
                  <div className="circle-btn small" onClick={toggleFullscreen}>
                    {isFullscreen ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Live Events Calendar */}
          <div className="card-neon glow-purple">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px", fontWeight: "bold" }}>
              <span style={{ color: "#c084fc" }}>📅 CALENDAR</span>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span>AUGUST 2026</span>
                <button
                  style={{ background: "rgba(0, 255, 136, 0.15)", border: "1px solid #00ff88", color: "#00ff88", borderRadius: "4px", padding: "1px 5px", fontSize: "9px", cursor: "pointer" }}
                  onClick={handleAddCalendarEvent}
                >
                  + Event
                </button>
              </div>
            </div>

            <div className="cal-grid">
              {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d, i) => (
                <span key={i} className="cal-head">{d}</span>
              ))}
              {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => {
                const hasEvent = Boolean(events[d]);
                return (
                  <span
                    key={d}
                    className={`cal-cell ${d === selectedDay ? "today" : ""} ${hasEvent ? "has-event" : ""}`}
                    onClick={() => {
                      playBeep();
                      setSelectedDay(d);
                    }}
                  >
                    {d}
                  </span>
                );
              })}
            </div>

            {/* Dynamic Event Viewer for Selected Date */}
            <div className="calendar-event-footer">
              <span style={{ color: "#00ff88", fontWeight: "bold" }}>🟢 {selectedDay} AUG 2026:</span>{" "}
              <span style={{ color: events[selectedDay] ? "#00f0ff" : "#94a3b8" }}>
                {events[selectedDay] || "No events scheduled for this day"}
              </span>
            </div>
          </div>
        </div>

        {/* Row 2: Weather + World Clock + Tools */}
        <div className="grid-row-2">
          {/* Weather Card */}
          <div className="card-neon glow-cyan">
            <div style={{ display: "flex", justifyContent: "space-between", color: "#00f0ff", fontSize: "12px", fontWeight: "bold" }}>
              <span>☁️ WEATHER</span>
              <span style={{ color: "#94a3b8" }}>📍 New Delhi, India</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "4px 0" }}>
              <Sun size={36} color="#ff9900" style={{ filter: "drop-shadow(0 0 10px #ff9900)" }} />
              <h2 style={{ fontSize: "32px", fontWeight: "bold" }}>28°C</h2>
              <div style={{ fontSize: "11px", color: "#94a3b8", textAlign: "right" }}>
                <div>Humidity: 58%</div>
                <div>Wind: 12 km/h</div>
                <div>Pressure: 1012 hPa</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#cbd5e1", marginTop: "auto", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "4px" }}>
              <span>WED 32°</span><span>THU 31°</span><span>FRI 30°</span><span>SAT 31°</span><span>SUN 32°</span>
            </div>
          </div>

          {/* World Clock Card */}
          <div className="card-neon glow-cyan">
            <div style={{ display: "flex", justifyContent: "space-between", color: "#00f0ff", fontSize: "12px", fontWeight: "bold", marginBottom: "4px" }}>
              <span>🌐 WORLD CLOCK</span>
              <span style={{ color: "#00ff88", cursor: "pointer" }} onClick={() => {
                const cityName = prompt("Enter City Name (e.g. Paris, France):");
                if (cityName) {
                  const tStr = prompt("Enter Current Time (e.g. 05:45 PM):", "05:45 PM");
                  setCities([...cities, { id: Date.now(), name: cityName, flag: "🌐", zone: "GMT", time: tStr || "12:00 PM", color: "#00f0ff" }]);
                }
              }}>+ Add City</span>
            </div>
            <div className="city-item active-city">
              <span>🇮🇳 New Delhi, India</span>
              <strong style={{ color: "#00ff88" }}>{displayHours}:{minutes} {ampm}</strong>
            </div>
            {cities.slice(0, 4).map((c) => (
              <div key={c.id} className="city-item">
                <span>{c.flag} {c.name}</span>
                <span style={{ color: c.color }}>{c.time}</span>
              </div>
            ))}
          </div>

          {/* Interactive Tools Grid */}
          <div className="card-neon glow-purple">
            <div style={{ color: "#c084fc", fontSize: "12px", fontWeight: "bold", marginBottom: "4px" }}>🛠️ TOOLS</div>
            <div className="tools-6-grid">
              <button className="tool-card-btn tc-green" onClick={() => { playBeep(); setSwRunning(!swRunning); }}>
                <Watch size={15} /> Stopwatch
              </button>
              <button className="tool-card-btn tc-orange" onClick={() => { playBeep(); setTimerRunning(!timerRunning); }}>
                <TimerIcon size={15} /> Timer
              </button>
              <button className="tool-card-btn tc-cyan" onClick={() => setShowAlarmModal(true)}>
                <Bell size={15} /> Alarm
              </button>
              <button className="tool-card-btn tc-pink" onClick={() => {
                playBeep();
                setTimerRunning(false);
                setTimerPreset("5");
                setTimerLeft(5 * 60);
              }}>
                <Hourglass size={15} /> 5m Count
              </button>
              <button className="tool-card-btn tc-red" onClick={() => {
                playBeep();
                setTimerRunning(false);
                setTimerPreset("25");
                setTimerLeft(25 * 60);
              }}>
                <Clock size={15} /> Pomodoro
              </button>
              <button className="tool-card-btn tc-yellow" onClick={() => {
                const note = prompt("Enter Quick Note:", "Focus on tasks");
                if (note) alert(`Note Saved: "${note}"`);
              }}>
                <FileText size={15} /> Notes
              </button>
            </div>
          </div>
        </div>

        {/* Row 3: Stopwatch + Timer + Alarm */}
        <div className="grid-row-3">
          {/* Stopwatch */}
          <div className="card-neon glow-cyan" style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <span style={{ color: "#00ff88", fontSize: "12px", fontWeight: "bold" }}>⏱️ STOPWATCH</span>
              <h2 style={{ fontFamily: "Orbitron", fontSize: "18px", margin: "4px 0", color: "#00f0ff" }}>
                {formatStopwatch(swTime)}
              </h2>
              <div style={{ display: "flex", gap: "6px" }}>
                <button className="btn-neon bg-neon-green" onClick={() => { playBeep(); setSwRunning(!swRunning); }}>
                  {swRunning ? "Pause" : "Start"}
                </button>
                <button className="btn-neon bg-outline" onClick={() => {
                  if (swRunning) {
                    playBeep();
                    setLaps([...laps, formatStopwatch(swTime)]);
                  }
                }}>
                  Lap ({laps.length})
                </button>
                <button className="btn-neon bg-neon-pink" onClick={() => {
                  playBeep();
                  setSwRunning(false);
                  setSwTime(0);
                  setLaps([]);
                }}>
                  Reset
                </button>
              </div>
            </div>
            <div className="radar-concentric">
              <div style={{ width: "42px", height: "42px", borderRadius: "50%", border: "1px dashed #00f0ff", position: "absolute" }}></div>
              <div style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background: swRunning ? "#00ff88" : "rgba(0, 255, 136, 0.2)",
                boxShadow: swRunning ? "0 0 15px #00ff88" : "none",
                transition: "0.3s"
              }}></div>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="card-neon glow-pink" style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <span style={{ color: "#ff9900", fontSize: "12px", fontWeight: "bold" }}>⏳ TIMER</span>
              <h2 style={{ fontFamily: "Orbitron", fontSize: "18px", margin: "4px 0", color: "#fff" }}>
                {formatTimer(timerLeft)}
              </h2>
              <div style={{ display: "flex", gap: "4px", marginBottom: "4px" }}>
                {[15, 25, 30].map((m) => (
                  <button
                    key={m}
                    className={`preset-btn ${timerPreset === String(m) ? "active" : ""}`}
                    onClick={() => {
                      playBeep();
                      setTimerRunning(false);
                      setTimerPreset(String(m));
                      setTimerLeft(m * 60);
                    }}
                  >
                    {m}m
                  </button>
                ))}
              </div>
              <div style={{ display: "flex", gap: "6px" }}>
                <button className="btn-neon bg-neon-orange" onClick={() => { playBeep(); setTimerRunning(!timerRunning); }}>
                  {timerRunning ? "Pause" : "Start"}
                </button>
                <button className="btn-neon bg-outline" onClick={() => {
                  playBeep();
                  setTimerRunning(false);
                  setTimerLeft(25 * 60);
                  setTimerPreset("25");
                }}>
                  Reset
                </button>
              </div>
            </div>
            <div className="circle-timer-ring">
              {pad(Math.floor(timerLeft / 60))}:{pad(timerLeft % 60)}
            </div>
          </div>

          {/* Alarms with Add Modal trigger */}
          <div className="card-neon glow-purple">
            <div style={{ display: "flex", justifyContent: "space-between", color: "#c084fc", fontSize: "12px", fontWeight: "bold" }}>
              <span>🔔 ALARM</span>
              <span style={{ color: "#00ff88", cursor: "pointer" }} onClick={() => setShowAlarmModal(true)}>+ Add Alarm</span>
            </div>
            
            <div className="alarm-items-scroll">
              {alarms.map((al) => (
                <div key={al.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px" }}>
                  <div>
                    <h3 style={{ fontFamily: "Orbitron", fontSize: "14px", color: al.active ? "#fff" : "#64748b" }}>{al.time}</h3>
                    <p style={{ fontSize: "9px", color: "#94a3b8" }}>{al.label}</p>
                  </div>
                  <div
                    className={`neon-switch ${al.active ? "active" : ""}`}
                    onClick={() => {
                      playBeep();
                      setAlarms(alarms.map((a) => (a.id === al.id ? { ...a, active: !a.active } : a)));
                    }}
                  >
                    <div className="switch-dot"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer with Created with ❤️ by Yash */}
        <footer className="footer-container">
          <div style={{ color: "#64748b" }}>
            © 2026 Bharat Clock. All rights reserved. 🇮🇳
          </div>
          <div className="quote-text">
            ❝ *समय सबसे कीमती दौलत है, इसे सही दिशा में निवेश करें।* ❞
          </div>
          <div className="creator-badge">
            Created with <span className="heart">❤️</span> by <strong className="creator-name">Yash</strong>
          </div>
        </footer>
      </main>

      {/* Cyberpunk Neon Modal for Add Alarm */}
      {showAlarmModal && (
        <div className="modal-backdrop">
          <div className="cyber-modal">
            <div className="modal-header">
              <h3>🔔 SET NEW ALARM</h3>
              <button className="modal-close" onClick={() => setShowAlarmModal(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={saveNewAlarm} className="modal-form">
              <label>Select Time</label>
              <input
                type="time"
                value={newAlarmTime}
                onChange={(e) => setNewAlarmTime(e.target.value)}
                required
                className="neon-input"
              />

              <label>Alarm Label</label>
              <input
                type="text"
                placeholder="e.g. Gym Workout / Coding Sprint"
                value={newAlarmLabel}
                onChange={(e) => setNewAlarmLabel(e.target.value)}
                className="neon-input"
              />

              <div className="modal-actions">
                <button type="submit" className="btn-neon bg-neon-green" style={{ width: "100%", padding: "10px" }}>
                  Save & Enable Alarm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
