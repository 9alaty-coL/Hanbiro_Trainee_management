import { createContext, useState } from "react";
import { useJwt } from "react-jwt";

const AuthContext = createContext({
    token: '',
    isLoggedIn: false,
    _id: '',
    username: '',
    isUser: false,
    login: (token) => {},
    logout: () => {},
})

export const AuthContextProvider = props => {
    const [token, setToken] = useState(localStorage.getItem('TRAINEE_MANAGEMENT_AUTH_TOKEN') || '')
    const { decodedToken, isExpired } = useJwt(token);

    const userIsLoggedIn = !!token
    const loginHandler = (token) => {
        setToken(token)
        localStorage.setItem('TRAINEE_MANAGEMENT_AUTH_TOKEN', token)
    }
    const logoutHandler = () => {
        setToken('')
        localStorage.removeItem('TRAINEE_MANAGEMENT_AUTH_TOKEN')
    }
    const _id = decodedToken?.data?._id
    const username = decodedToken?.data?.username
    const isUser = decodedToken?.data?.isUser
    const contextValue = {
        token: token,
        _id: _id,
        username: username,
        isUser: isUser,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    }
    console.log(contextValue)
    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext