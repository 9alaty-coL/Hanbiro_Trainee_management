import classes from "./OptionSelect.module.scss";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const OptionSelect = (props) => {
  const { option, setOption } = props;
  const [choose, setChoose] = useState(false);
  const selectRef = useRef();
  if (props.options === undefined || props.options.length === 0){
    return <div className={classes.contain}>
      <div className={classes.select} style={{color:"gray"}}>
        Empty
      </div>
    </div>
  }
  return (
    <div
      className={classes.contain}
      onClick={(e) => e.target.focus()}
      ref={selectRef}
      onBlur={() => setChoose(false)}
      tabIndex="0"
    >
      <div
        className={classes.select}
        onClick={() => setChoose((prev) => !prev)}
      >
        {props.options.map((v, i) => (
          <span
            key={v.name}
            className={`${option === i ? classes.active : ""}`}
          >
            {v.name}
          </span>
        ))}
        {!choose ? (
          <FontAwesomeIcon className={classes.icon} icon={faChevronDown} />
        ) : (
          <FontAwesomeIcon className={classes.icon} icon={faChevronUp} />
        )}
      </div>
      <div className={`${classes.choose} ${choose ? classes.active : ""} `}>
        {props.options.map((v, i) => (
          <span
            key={v.name}
            className={`${option === i ? classes.active : ""}`}
            onClick={() => {
              setOption(i);
              selectRef.current.blur();
            }}
          >
            {v.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default OptionSelect;
