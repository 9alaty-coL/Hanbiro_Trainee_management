import classes from "./TraineeInfoRow.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef } from "react";

const TraineeInfoRow = forwardRef((props, ref) => {
  return (
    <div className={classes.main}>
      <FontAwesomeIcon className={classes.icon} icon={props.icon} />
      <input
        className={classes.input}
        placeholder={props.placeholder}
        type={props.type}
        required
        ref={ref}
      />
    </div>
  );
})

export default TraineeInfoRow;
