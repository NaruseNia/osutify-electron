import { Controller } from "./controller";
import { motion } from "framer-motion";
import "./styles.scss";
import { useState } from "react";

export const ControlSurface = () => {
  const [nextUpHeight, setNextUpHeight] = useState("5rem");

  const hoverNextUp = () => setNextUpHeight("50%")
  const leaveNextUp = () => setNextUpHeight("5rem")

  return (
    <div className="control_surface">
      <div className="cs_container" style={{ gridTemplateRows: `1fr ${nextUpHeight}` }}>
        <div className="controller">
          <Controller />
        </div>
        <div
          onMouseEnter={() => hoverNextUp()}
          onMouseLeave={() => leaveNextUp()}
          className="next_up"
        >
          <span>Next up</span>
        </div>
      </div>
    </div>
  )
};
