import classes from "./AddTrainee.module.scss";

import { useState, useContext, useRef, useEffect } from "react";
import { useMutation } from "react-query";

import Modal from "../../UI/Modal";
import AuthContext from "../../../context/AuthContext";
import TraineeInfoRow from "./TraineeInfoRow";
import InternshipInfoRow from "./InternshipInfoRow";
import { addIntern } from "../../../api-calls/api-calls";

import { Button, CircularProgress } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import { faUser, faLock, faBook, faPhone, faUserCircle, faListNumeric} from "@fortawesome/free-solid-svg-icons";

import {useNavigate} from "react-router-dom"

const AddTrainee = (props) => {
  const navigate = useNavigate()
  const [state, setState] = useState('')

  const nameRef = useRef()
  const majorRef = useRef()
  const phoneRef = useRef()
  const yearRef = useRef()
  const accountRef = useRef()
  const passwordRef = useRef()
  const startRef = useRef()
  const endRef = useRef()
  const cvRef = useRef()

  const authContext = useContext(AuthContext);
  const [option, setOption] = useState(0);
  const mutation = useMutation(addIntern);

  useEffect(() => {
    if (mutation.isError) {
      setState(<span style={{ color: "red", fontSize: "20px" }}>{mutation.error.message}</span>);
    } else if (mutation.isLoading) {
      setState (<CircularProgress size="80px" />);
    } else if (mutation.isSuccess) {
      props.setReFetch(prev => !prev)
      props.onBackdropClick();
    }
  }, [mutation.isSuccess, mutation.isError], mutation.isLoading);



  const theme = createTheme({
    palette: {
      secondary: {
        // This is green.A700 as hex.
        main: "#888",
      },
    },
  });

  const onSubmitHandler = e => {
    e.preventDefault()
    const data = {
      token: authContext.token,
      name: nameRef.current.value,
      major: majorRef.current.value,
      phone: phoneRef.current.value,
      username: accountRef.current.value,
      password: accountRef.current.value,
      currentYear: yearRef.current.value,
      CVFile: cvRef.current.value,
      startDay: startRef.current.value,
      endDay: endRef.current.value,
      finalResult: option === 0 ? true : false,
    }
    console.log(data);
    mutation.mutate(data);
  };

  return (
    <Modal
      onBackdropClick={props.onBackdropClick}
      onCloseClick={props.onBackdropClick}
    >
      <div className={classes.main}>
        <div className={classes.state}>{state}</div>
        <div className={classes.head}>
          <h2>Th??m th???c t???p sinh</h2>
        </div>
        <form className={classes.body} onSubmit={onSubmitHandler}>
          <div className={classes.info}>
            <div className={classes.traineeInfo}>
              <span>Th??ng tin c?? b???n</span>
              <TraineeInfoRow icon={faUserCircle} placeholder="H??? t??n" ref={nameRef} />
              <TraineeInfoRow icon={faBook} placeholder="Chuy??n ng??nh" ref={majorRef}/>
              <TraineeInfoRow
                icon={faPhone}
                placeholder="S??? ??i???n tho???i"
                type={"number"}
                ref={phoneRef}
              />
              <TraineeInfoRow
                icon={faListNumeric}
                placeholder="Sinh vi??n n??m th???"
                type={"number"}
                ref={yearRef}
              />
              <span>T??i kho???n truy c???p</span>
              <TraineeInfoRow ref={accountRef} icon={faUser} placeholder="T??i kho???n" />
              <TraineeInfoRow
              ref={passwordRef}
                icon={faLock}
                placeholder="M???t kh???u"
                type="password"

              />
            </div>
            <div className={classes.internshipInfo}>
              <span className={classes.title}>Th??ng tin th???c t???p</span>
              <InternshipInfoRow ref={startRef} title="Ng??y b???t ?????u" type="date" />
              <InternshipInfoRow ref={endRef} title="Ng??y k???t th??c" type="date" />
              <InternshipInfoRow ref={cvRef} title="File CV" type="file" />
              <InternshipInfoRow
                title="K???t qu??? cu???i c??ng"
                options={[{ name: "?????t" }, { name: "Ch??a ?????t" }]}
                option={option}
                setOption={setOption}
              />
            </div>
          </div>
          <div className={classes.btnGroup}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              style={{ marginRight: "10px" }}
            >
              Th??m
            </Button>
            <ThemeProvider theme={theme}>
              <Button variant="contained" color="secondary" onClick={props.onBackdropClick}>
                H???y
              </Button>
            </ThemeProvider>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddTrainee;
