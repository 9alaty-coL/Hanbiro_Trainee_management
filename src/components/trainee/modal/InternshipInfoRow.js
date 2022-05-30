import classes from "./InternshipInfoRow.module.scss";
import Options from "../../UI/OptionSelect"
import { forwardRef } from "react";

const InternshipInfoRow = forwardRef((props, ref) => {
  return (
    <div className={classes.main}>
      <span className={classes.title}>{props.title}</span>
      {!props.options ? <input
        className={classes.input}
        placeholder={props.placeholder}
        type={props.type}
        required
        ref={ref}
      /> : <Options options={props.options} option={props.option} setOption={props.setOption}/>}
    </div>
  );
})

export default InternshipInfoRow;
