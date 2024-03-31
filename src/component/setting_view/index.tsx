import { useAppStateContext } from "@/App";
import { motion } from "framer-motion";
import "./styles.scss";

export const SettingView = () => {
  const state = useAppStateContext();

  const handleClose = () => {
    state?.setAppState({ ...state.appState, showSettings: false })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="setting_container"
    >
      <span>Setting</span>
      <button onClick={() => handleClose()}>Close</button>
    </motion.div>
  );
};
