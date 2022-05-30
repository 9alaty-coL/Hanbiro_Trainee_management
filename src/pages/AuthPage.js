import { useContext, useRef , useCallback} from "react";
import classes from './scss/AuthPage.module.scss'
import { CircularProgress } from "@mui/material";
import { useMutation } from "react-query";
import {getAccessToken} from "../api-calls/api-calls";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";



export default function Login() {
  const navigate = useNavigate();
  const username = useRef();
  const password = useRef();
  const {login} = useContext(AuthContext)
  const tokenMutation = useMutation(getAccessToken)
  const dispatchLogin = useCallback(token => {
    login(token)
    navigate('/')
  }, [login])
  const handleClick = (e) => {
    e.preventDefault();
    tokenMutation.mutate({
      username: username.current.value,
      password: password.current.value,
      dispatch: dispatchLogin,
    })
  };

  return (
    <div className={classes.login}>
      <div className={classes.loginWrapper}>
        <div className={classes.loginLeft}>
          <h3 className={classes.loginLogo}>Trainee Management</h3>
          <span className={classes.loginDesc}>Manage intern your way!</span>
        </div>
        <div className={classes.loginRight}>
          <form className={classes.loginBox} onSubmit={handleClick}>
            <input
              placeholder="username"
              required
              className={classes.loginInput}
              ref={username}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="5"
              className={classes.loginInput}
              ref={password}
            />
            {tokenMutation.isError && <span style={{color: "red"}}>{tokenMutation?.error?.message}</span>}
            <button
              className={classes.loginButton}
              type="submit"
              disabled={tokenMutation.isLoading}
            >
              {
                tokenMutation.isLoading ? (
                  <CircularProgress color="secondary" size="30px" />
                ) : (
                  "Log In"
                )
              }
            </button>
            <span className={classes.loginForgot}>Forgot Password?</span>
          </form>
        </div>
      </div>
    </div>
  );
}
