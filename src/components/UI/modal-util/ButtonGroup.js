import classes from "./ButtonGroup.module.scss";

const ButtonGroup = (props) => {
  return (
    <div className={classes.btnGroup}>
      <button onClick={props.onOkClick} className={props.red && classes.red}>{props.ok}</button>
      <button onClick={props.onCancelClick}>Hủy</button>
    </div>
  );
};

export default ButtonGroup;
