import AuthContext from "../context/AuthContext"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"

const LogoutPage = () => {
    const navigate = useNavigate()
    const authContext = useContext(AuthContext)
    authContext.logout()
    navigate('/auth')
    // return <></>
}

export default LogoutPage