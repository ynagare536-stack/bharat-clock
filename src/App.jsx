import { useEffect, useMemo, useState } from "react";
import "./App.css";

const cities = [
  { flag: "🇮🇳", city: "New Delhi", country: "India", zone: "Asia/Kolkata", code: "IST" },
  { flag: "🇺🇸", city: "New York", country: "USA", zone: "America/New_York", code: "EDT" },
  { flag: "🇬🇧", city: "London", country: "UK", zone: "Europe/London", code: "BST" },
  { flag: "🇦🇪", city: "Dubai", country: "UAE", zone: "Asia/Dubai", code: "GST" },
  { flag: "🇯🇵", city: "Tokyo", country: "Japan", zone: "Asia/Tokyo", code: "JST" },
  { flag: "🇦🇺", city: "Sydney", country: "Australia", zone: "Australia/Sydney", code: "AEST" },
];

const navItems = [
  ["⌂", "Home"],
  ["◎", "World Clock"],
  ["▣", "Calendar"],
  ["⚒", "Tools"],
  ["♧", "Alarm"],
  ["⚙", "Settings"],
];

function pad(n) {
  return String(n).padStart(2, "0");
}

function formatTime(date, zone, hour12 = false) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12,
  }).format(date);
}

function formatDate(date, zone) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function App() {
  const [now, setNow] = useState(new Date());
  const [activeNav, setActiveNav] = useState("Home");
  const [dark, setDark] = useState(true);
  const [hour12, setHour12] = useState(false);

  const [stopwatch, setStopwatch] = useState(0);
  const [stopRunning, setStopRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  const [timer, setTimer] = useState(25 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerInput, setTimerInput] = useState("25");

  const [alarms, setAlarms] = useState([
    { id: 1, time: "07:00", period: "Daily", on: true },
    { id: 2, time: "08:30", period: "Mon, Tue, Wed, Thu, Fri", on: false },
  ]);

  const [notes, setNotes] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!stopRunning) return;

    const id = setInterval(() => {
      setStopwatch((v) => v + 10);
    }, 10);

    return () => clearInterval(id);
  }, [stopRunning]);

  useEffect(() => {
    if (!timerRunning) return;

    const id = setInterval(() => {
      setTimer((v) => {
        if (v <= 1) {
          setTimerRunning(false);
          return 0;
        }
        return v - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [timerRunning]);

  const istTime = useMemo(
    () => formatTime(now, "Asia/Kolkata", hour12),
    [now, hour12]
  );

  const istDate = useMemo(
    () => formatDate(now, "Asia/Kolkata"),
    [now]
  );

  const stopwatchText = `${pad(Math.floor(stopwatch / 360000))}:${pad(
    Math.floor((stopwatch % 360000) / 6000)
  )}:${pad(Math.floor((stopwatch % 6000) / 100))}.${pad(stopwatch % 100)}`;

  const timerText = `${pad(Math.floor(timer / 60))}:${pad(timer % 60)}`;

  const setTimerMinutes = (minutes) => {
    setTimer(Number(minutes) * 60);
    setTimerRunning(false);
  };

  const addAlarm = () => {
    const time = prompt("Enter alarm time (HH:MM)");
    if (!time) return;

    setAlarms((a) => [
      ...a,
      {
        id: Date.now(),
        time,
        period: "Daily",
        on: true,
      },
    ]);
  };

  const toggleAlarm = (id) => {
    setAlarms((items) =>
      items.map((alarm) =>
        alarm.id === id ? { ...alarm, on: !alarm.on } : alarm
      )
    );
  };

  const monthDays = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className={dark ? "app dark" : "app light"}>
      <div className="stars"></div>
      <div className="aurora aurora-one"></div>
      <div className="aurora aurora-two"></div>

      {/* TOP NAVIGATION */}
      <header className="topbar">
        <div className="brand">
          <div className="flag">🇮🇳</div>
          <div>
            <div className="brand-title">
              भारत <span>CLOCK</span>
            </div>
            <div className="brand-sub">Made in India ❤️</div>
          </div>
        </div>

        <nav className="top-nav">
          {navItems.map(([icon, name]) => (
            <button
              key={name}
              className={activeNav === name ? "nav-btn active" : "nav-btn"}
              onClick={() => setActiveNav(name)}
            >
              <span>{icon}</span>
              {name}
            </button>
          ))}
        </nav>

        <div className="top-actions">
          <button className="circle-btn">⌕</button>

          <button
            className="theme-toggle"
            onClick={() => setDark(!dark)}
            title="Toggle theme"
          >
            {dark ? "☀" : "☾"}
          </button>

          <button className="language">EN⌄</button>
        </div>
      </header>

      {/* BODY */}
      <div className="layout">
        {/* SIDEBAR */}
        <aside className="sidebar">
          {navItems.map(([icon, name]) => (
            <button
              key={name}
              className={activeNav === name ? "side-btn selected" : "side-btn"}
              onClick={() => setActiveNav(name)}
            >
              <span>{icon}</span>
              <small>{name}</small>
            </button>
          ))}

          <div className="online-card">
            <div className="pulse-dot"></div>
            LIVE STATUS
            <strong>ONLINE</strong>
          </div>
        </aside>

        <main className="dashboard">
          {/* MAIN CLOCK */}
          <section className="clock-card neon-blue">
            <div className="card-top">
              <span className="section-title">
                ☼ INDIA STANDARD TIME
                <small>UTC +5:30</small>
              </span>

              <span className="live">
                <i></i> LIVE
              </span>
            </div>

            <div className="clock-content">
              <div className="clock-left">
                <div className="digital-clock">
                  {istTime.split(" ")[0]}
                  {hour12 && (
                    <span className="ampm">{istTime.split(" ")[1]}</span>
                  )}
                </div>

                <div className="big-date">{istDate.toUpperCase()}</div>

                <div className="location">
                  ⌖ New Delhi, India
                </div>

                <div className="clock-controls">
                  <button onClick={() => setHour12(false)}>24H</button>
                  <button
                    className={hour12 ? "selected" : ""}
                    onClick={() => setHour12(true)}
                  >
                    12H
                  </button>
                  <button>🔊</button>
                  <button>⛶</button>
                </div>
              </div>

              <div className="india-visual">
                <div className="india-map">
                  <div className="map-glow">✦</div>
                  <div className="chakra">☸</div>
                  <div className="india-text">INDIA</div>
                </div>

                <div className="monuments">
                  <span>▥</span>
                  <span>▤</span>
                  <span>▥</span>
                  <span>◈</span>
                  <span>♜</span>
                </div>
              </div>
            </div>
          </section>

          {/* CALENDAR */}
          <section className="calendar-card neon-purple card">
            <div className="card-heading">
              <h3>▣ CALENDAR</h3>
              <div>‹ &nbsp; ›</div>
            </div>

            <div className="month-title">AUGUST 2026</div>

            <div className="weekdays">
              <b>SUN</b>
              <span>MON</span>
              <span>TUE</span>
              <span>WED</span>
              <span>THU</span>
              <span>FRI</span>
              <b>SAT</b>
            </div>

            <div className="calendar-grid">
              {[26, 27, 28, 29, 30, 31].map((d) => (
                <span className="muted-day" key={`p${d}`}>
                  {d}
                </span>
              ))}

              {monthDays.map((d) => (
                <button
                  key={d}
                  className={selectedDate === d ? "today" : ""}
                  onClick={() => setSelectedDate(d)}
                >
                  {d}
                </button>
              ))}
            </div>

            <div className="event-box">
              <span>▣</span>
              <div>
                <strong>{selectedDate} AUGUST 2026</strong>
                <small>No events today</small>
              </div>
              <b>›</b>
            </div>
          </section>

          {/* WEATHER */}
          <section className="weather-card card neon-yellow">
            <div className="card-heading">
              <h3>☀ WEATHER</h3>
              <small>⌖ New Delhi, India</small>
            </div>

            <div className="weather-main">
              <div className="sun-icon">☼</div>
              <div>
                <div className="temperature">28°C</div>
                <div>Clear Sky</div>
              </div>

              <div className="weather-info">
                <p>Humidity <b>58%</b></p>
                <p>Wind <b>12 km/h</b></p>
                <p>Pressure <b>1012 hPa</b></p>
                <p>Visibility <b>10 km</b></p>
              </div>
            </div>

            <div className="forecast">
              {[
                ["WED", "☀", "32°", "26°"],
                ["THU", "☀", "31°", "25°"],
                ["FRI", "☁", "30°", "24°"],
                ["SAT", "☀", "31°", "25°"],
                ["SUN", "☀", "32°", "25°"],
                ["MON", "☁", "31°", "25°"],
              ].map(([day, icon, hi, lo]) => (
                <div className="forecast-day" key={day}>
                  <b>{day}</b>
                  <span>{icon}</span>
                  <strong>{hi}</strong>
                  <small>{lo}</small>
                </div>
              ))}
            </div>
          </section>

          {/* WORLD CLOCK */}
          <section className="world-card card neon-blue">
            <div className="card-heading">
              <h3>◎ WORLD CLOCK</h3>
              <button className="small-add">＋ Add City</button>
            </div>

            <div className="world-list">
              {cities.map((city) => (
                <div className="world-row" key={city.city}>
                  <span className="city-flag">{city.flag}</span>

                  <strong>
                    {city.city}, {city.country}
                  </strong>

                  <small>
                    {new Intl.DateTimeFormat("en-US", {
                      timeZone: city.zone,
                      weekday: "short",
                      day: "2-digit",
                      month: "short",
                    }).format(now)}
                  </small>

                  <em>{city.code}</em>

                  <time>{formatTime(now, city.zone, true)}</time>
                </div>
              ))}
            </div>
          </section>

          {/* TOOLS */}
          <section className="tools-card card neon-cyan">
            <div className="card-heading">
              <h3>⚒ TOOLS</h3>
            </div>

            <div className="tools-grid">
              {[
                ["⏱", "Stopwatch", "green"],
                ["⌛", "Timer", "yellow"],
                ["⏰", "Alarm", "blue"],
                ["◉", "Countdown", "purple"],
                ["♥", "Pomodoro", "red"],
                ["▤", "Notes", "yellow"],
              ].map(([icon, name, color]) => (
                <button className={`tool-box ${color}`} key={name}>
                  <span>{icon}</span>
                  {name}
                </button>
              ))}
            </div>
          </section>

          {/* STOPWATCH */}
          <section className="stopwatch-card card neon-green">
            <div className="card-heading">
              <h3>⏱ STOPWATCH</h3>
            </div>

            <div className="stopwatch-time">{stopwatchText}</div>

            <div className="rings">
              <div></div>
            </div>

            <div className="control-row">
              <button
                className="green-btn"
                onClick={() => setStopRunning(!stopRunning)}
              >
                {stopRunning ? "Pause" : "Start"}
              </button>

              <button
                className="blue-btn"
                onClick={() =>
                  setLaps((l) => [...l, stopwatchText])
                }
              >
                Lap
              </button>

              <button
                className="red-btn"
                onClick={() => {
                  setStopRunning(false);
                  setStopwatch(0);
                  setLaps([]);
                }}
              >
                Reset
              </button>
            </div>

            {laps.length > 0 && (
              <div className="laps">
                {laps.slice(-3).map((lap, i) => (
                  <span key={i}>Lap {i + 1}: {lap}</span>
                ))}
              </div>
            )}
          </section>

          {/* TIMER */}
          <section className="timer-card card neon-orange">
            <div className="card-heading">
              <h3>⌛ TIMER</h3>
            </div>

            <div className="timer-time">{timerText}</div>

            <div className="timer-ring">
              <span>{Math.ceil(timer / 60)}:00</span>
            </div>

            <div className="preset-row">
              {[15, 25, 30, 60].map((m) => (
                <button key={m} onClick={() => setTimerMinutes(m)}>
                  {m === 60 ? "1h" : `${m}m`}
                </button>
              ))}
              <input
                value={timerInput}
                onChange={(e) => setTimerInput(e.target.value)}
                type="number"
                min="1"
                placeholder="Custom"
              />
              <button onClick={() => setTimerMinutes(timerInput)}>
                Set
              </button>
            </div>

            <div className="control-row">
              <button
                className="orange-btn"
                onClick={() => setTimerRunning(!timerRunning)}
              >
                {timerRunning ? "Pause" : "Start"}
              </button>

              <button
                className="blue-btn"
                onClick={() => {
                  setTimerRunning(false);
                  setTimer(25 * 60);
                }}
              >
                Reset
              </button>
            </div>
          </section>

          {/* ALARMS */}
          <section className="alarm-card card neon-purple">
            <div className="card-heading">
              <h3>♧ ALARM</h3>
              <button className="small-add" onClick={addAlarm}>
                ＋ Add Alarm
              </button>
            </div>

            <div className="alarm-list">
              {alarms.map((alarm) => (
                <div className="alarm-row" key={alarm.id}>
                  <div>
                    <strong>{alarm.time}</strong>
                    <small>{alarm.period}</small>
                  </div>

                  <button
                    className={alarm.on ? "switch on" : "switch"}
                    onClick={() => toggleAlarm(alarm.id)}
                  >
                    <i></i>
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* NOTES */}
          <section className="notes-card card neon-yellow">
            <div className="card-heading">
              <h3>▤ NOTES</h3>
              <span>Auto-save</span>
            </div>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write your notes here..."
            />

            <div className="note-status">
              {notes.length} characters
            </div>
          </section>
        </main>
      </div>

      {/* FOOTER */}
      <footer>
        <span>© 2026 Bharat Clock. All rights reserved. 🇮🇳</span>
        <strong>“समय सबसे कीमती दौलत है, इसे सही दिशा में निवेश करें।”</strong>
        <span>Made with ❤️ in India</span>
      </footer>
    </div>
  );
}

export default App;
