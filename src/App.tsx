import "ress";
import "./App.scss";
import { ControlSurface } from "./component/control_surface";
import { SongSelector } from "./component/song_selector";
import { ModalPortal } from "./component/modal";
import { SettingView } from "./component/setting_view";
import { createContext, useContext, useState } from "react";
import { AppState } from "./type";
import { AnimatePresence } from "framer-motion";

const useAppState = () => {
  const [appState, setAppState] = useState<AppState>({
    showSettings: false,
  });
  return { appState, setAppState };
}

export type AppStateContextType = ReturnType<typeof useAppState>;

export const AppStateContext = createContext<AppStateContextType | null>(null);

export const useAppStateContext = () => {
  const ctx = useContext(AppStateContext);
  if (ctx === undefined) throw new Error("Context must be used within Provider.");
  return ctx;
}

function App() {
  const value = useAppState();
  return (
    <AppStateContext.Provider value={value}>
      <div id="app">
        <header id="header">
          <span className="title">osutify!</span>
          <div className="buttons">
            <button onClick={() => value.setAppState({ ...value.appState, showSettings: true })}>Settings</button>
          </div>
        </header>

        <div id="app_container">
          <ControlSurface />
          <SongSelector />
          <audio />
        </div>

        <ModalPortal>
          <AnimatePresence>
            {value.appState.showSettings && <SettingView />}
          </AnimatePresence>
        </ModalPortal>
      </div>
    </AppStateContext.Provider>
  )
}

export default App
