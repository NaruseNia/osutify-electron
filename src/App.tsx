import "ress";
import "./App.scss";
import { ControlSurface } from "./component/control_surface";
import { SongSelector } from "./component/song_selector";

function App() {
  return (
    <div id="app">
      <header id="header">
        osutify!
      </header>

      <div id="app_container">
        <ControlSurface />
        <SongSelector />
        <audio />
      </div>
    </div>
  )
}

export default App
