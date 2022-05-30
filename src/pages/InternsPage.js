import NavBar from "../components/navbar/NavBar";
import classes from "./scss/InternsPage.module.scss";
import Trainees from "../components/trainee/Trainees";
import { Button } from "@mui/material";
import { useState } from "react";
import AddTrainee from "../components/trainee/modal/AddTrainee";
import { Outlet, useParams } from "react-router-dom";

const InternsPage = () => {
    const params = useParams()
    
  const [reFetch, setReFetch] = useState(false);
  const [addIntern, setAddIntern] = useState(false);
  return (
    <div className={classes.main}>
      <NavBar />
{ !params.internId &&      <div className={classes.page}>
        <h1>Danh sách thực tập sinh</h1>
        <div className={classes.btnGroup}>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              setAddIntern(true);
            }}
          >
            Thêm thực tập sinh
          </Button>
        </div>
        {addIntern && (
          <AddTrainee
            setReFetch={setReFetch}
            onBackdropClick={() => {
              setAddIntern(false);
            }}
          />
        )}
        <Trainees reFetch={reFetch} />
      </div>}
      <Outlet />
    </div>
  );
};

export default InternsPage;
