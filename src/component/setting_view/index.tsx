import { useAppStateContext } from "@/App";
import { motion, stagger, useAnimate } from "framer-motion";
import "./styles.scss";
import { useEffect, useState } from "react";

export const SettingView = () => {
  const state = useAppStateContext();
  const [scope, animate] = useAnimate();

  const handleClose = () => {
    state?.setAppState({ ...state.appState, showSettings: false })
  }

  useEffect(() => {
    animate("div", { y: [10, 0], opacity: [0, 1] }, { duration: 0.8, delay: stagger(0.1), ease: [0.075, 0.82, 0.165, 1] });
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="setting_container"
    >
      <div className="header">
        <div className="title">
          <span>Settings</span>
        </div>
        <nav className="nav">
          <button onClick={() => handleClose()}>x</button>
        </nav>
      </div>
      <motion.div
        className="content"
        ref={scope}
      >
        <div className="desc">
          <span className="name">osutify!</span>
          <span className="version">v0.0.1b</span>
        </div>
        <div className="settings">
          <ul>
            <li>
              <Separator title="Utility" />
              <CheckBoxSettingItem name="Always on top" state={true} title="Always on top" />
              <CheckBoxSettingItem name="Always update beatmaps" title="Always update beatmap on launch" />
            </li>
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Separator = (props: { title: string }) => {
  return (
    <div>
      <span style={{ fontWeight: "600", fontSize: "1.1rem" }}>{props.title}</span>
    </div>
  )
}

export const CheckBoxSettingItem = (props: { name: string, state?: boolean, stateSetter?: any, title?: string }) => {
  const [state, setState] = useState(false);

  useEffect(() => {
    setState(props.state ? props.state : false);
  }, [props.state])

  const handleCheck = () => {
    setState(!state);
  }

  return (
    <div style={{ display: "flex", padding: "4px 4px" }} onClick={() => handleCheck()} title={props.title} >
      {props.name}
      <div style={{ marginLeft: "auto" }}>
        <StyledCheckBox state={state} />
      </div>
    </div>
  )
}

export const StyledCheckBox = (props: { state: boolean, onCheck?: () => void }) => {
  return (
    <figure style={{
      width: 50,
      height: 15,
      backgroundColor: `${props.state ? "#f54cbc" : "#eee"}`,
      borderRadius: 20,
      transition: "0.2s"
    }}
      onClick={() => props.onCheck ? props.onCheck() : () => { }} />
  )
}
