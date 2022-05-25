import { useContext, useRef , useCallback} from "react";
import classes from './scss/AuthPage.module.scss'
import { CircularProgress } from "@mui/material";
import { useMutation } from "react-query";
// import getAccessToken from "../api-calls/getAccessToken";
// import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const username = useRef();
  const password = useRef();
  //   const { isFetching, dispatch } = useContext(AuthContext);
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
    // loginCall(
    //   { username: username.current.value, password: password.current.value },
    //   dispatch
    // );
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">HotMan</h3>
          <span className="loginDesc">Manage hotel your way!</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="username"
              required
              className="loginInput"
              ref={username}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="5"
              className="loginInput"
              ref={password}
            />
            {tokenMutation.isError && <span style={{color: "red"}}>{tokenMutation?.error?.message}</span>}
            <button
              className="loginButton"
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
            <span className="loginForgot">Forgot Password?</span>
          </form>
        </div>
      </div>
    </div>
  );
}
