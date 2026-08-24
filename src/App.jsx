import ClockHeading from "./components/ClockHeading";
import ClockSlogan from "./components/ClockSlogan";
import CurrentTime from "./components/CurrentTime";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="clock-card">
      <ClockHeading />
      <ClockSlogan />
      <CurrentTime />

      <div className="clock-footer">
        ● Asia/Kolkata • Indian Standard Time
      </div>
    </div>
  );
}

export default App;