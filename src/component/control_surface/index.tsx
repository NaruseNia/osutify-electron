import { Controller } from "./controller";
import "./styles.scss"

export const ControlSurface = () => {
  return (
    <div className="control_surface">
      <div className="cs_container">
        <div className="controller">
          <Controller />
        </div>
        <div className="next_up">
          <span>Next up</span>
        </div>
      </div>
    </div>
  )
};
