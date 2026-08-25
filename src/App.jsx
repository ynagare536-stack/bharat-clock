import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(new Date());
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const timeParts = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(time);

  const getPart = (type) =>
    timeParts.find((part) => part.type === type)?.value || "00";

  const hours = getPart("hour");
  const minutes = getPart("minute");
  const seconds = getPart("second");

  const indiaDate = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(time);

  const shortDate = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(time);

  const secondNumber = Number(seconds);

  return (
    <div
      className="app"
      style={{
        "--mouse-x": `${mouse.x}%`,
        "--mouse-y": `${mouse.y}%`,
      }}
    >
      {/* Background */}
      <div className="background-grid"></div>
      <div className="noise"></div>

      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      {/* Navbar */}
      <header className="navbar">
        <div className="brand">
          <div className="brand-logo">
            <span>🇮🇳</span>
          </div>

          <div>
            <div className="brand-name">BHARAT CLOCK</div>
            <div className="brand-subtitle">
              INDIA • IST • DIGITAL TIME SYSTEM
            </div>
          </div>
        </div>

        <div className="live-status">
          <span className="status-dot"></span>
          <span>LIVE</span>
          <span className="status-divider"></span>
          <span>IST +05:30</span>
        </div>
      </header>

      {/* Main */}
      <main className="main">
        <section className="hero-card">
          <div className="card-glow"></div>

          {/* Top information */}
          <div className="top-info">
            <div>
              <span className="small-label">CURRENT TIME</span>
              <h1>Indian Standard Time</h1>
            </div>

            <div className="system-chip">
              <span className="chip-icon">◉</span>
              <span>UTC +05:30</span>
            </div>
          </div>

          {/* Clock */}
          <div className="clock-section">
            <div
              className="clock-ring"
              style={{
                "--progress": `${(secondNumber / 60) * 360}deg`,
              }}
            >
              <div className="ring ring-one"></div>
              <div className="ring ring-two"></div>

              <div className="clock-center">
                <div className="time">
                  <span>{hours}</span>
                  <span className="colon">:</span>
                  <span>{minutes}</span>
                  <span className="colon">:</span>
                  <span className="seconds">{seconds}</span>
                </div>

                <div className="time-zone">
                  <span className="pulse"></span>
                  INDIA / IST
                </div>
              </div>
            </div>
          </div>

          {/* Date */}
          <div className="date-area">
            <div className="date-line"></div>

            <div className="date-content">
              <div className="date-icon">◷</div>

              <div>
                <div className="date-label">TODAY IN BHARAT</div>
                <div className="date-main">{indiaDate}</div>
              </div>

              <div className="date-number">
                {shortDate}
              </div>
            </div>

            <div className="date-line"></div>
          </div>

          {/* Stats */}
          <div className="stats">
            <div className="stat-card">
              <div className="stat-icon">◉</div>
              <div>
                <div className="stat-label">TIMEZONE</div>
                <div className="stat-value">IST</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">⌁</div>
              <div>
                <div className="stat-label">OFFSET</div>
                <div className="stat-value">UTC +5:30</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">✦</div>
              <div>
                <div className="stat-label">STATUS</div>
                <div className="stat-value online">SYNCHRONIZED</div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="bottom-bar">
            <div className="india-line">
              <span className="tricolor orange"></span>
              <span className="tricolor white"></span>
              <span className="tricolor green"></span>

              <span>MADE FOR BHARAT</span>
            </div>

            <div className="seconds-progress">
              <span>SECONDS</span>

              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{
                    width: `${(secondNumber / 60) * 100}%`,
                  }}
                ></div>
              </div>

              <span>{String(secondNumber).padStart(2, "0")}/60</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer>
          <div className="footer-left">
            <span className="footer-dot"></span>
            PRECISION TIME ENGINE
          </div>

          <div className="footer-center">
            BHARAT • INDIA • 82.5°E
          </div>

          <div className="footer-right">
            © {time.getFullYear()} Bharat Clock
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
