import classes from "./Option.module.scss";
import { NavLink } from "react-router-dom";

const Option = (props) => {
  if (props.link === "/logout") {
    return (
      <div
        onClick={()=>props.setIsLogout(true)}
        className={classes.option}
      >
        <img src={props.imgSrc} />
        {props.showName && <span>{props.name}</span>}
      </div>
    );
  } else {
    return (
      <NavLink
        to={props.link}
        className={({ isActive }) =>
          classes.option + " " + (isActive ? classes.active : "")
        }
      >
        <img src={props.imgSrc} />
        {props.showName && <span>{props.name}</span>}
      </NavLink>
    );
  }
};

export default Option;
