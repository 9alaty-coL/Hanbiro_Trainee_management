import classes from "./LogoutModal.module.scss";
import Modal from "../UI/Modal";
import ButtonGroup from "../UI/modal-util/ButtonGroup";
import { useNavigate } from "react-router-dom";

const LogoutModal = (props) => {
    const navigate = useNavigate()
    const logoutHandler = ()=>{
        navigate('/logout')
    }
  return (
    <Modal noCloseButton onBackdropClick={props.onBackdropClick}>
    <div className={classes.main}>
      <h2>Bạn muốn đăng xuất?</h2>
      <img src="https://cdn3.iconfinder.com/data/icons/business-man-line-color-v2/512/close_door_escape_exit_logout_escaping_business_man-512.png" />
      <ButtonGroup
        ok="Logout"
        red={true}
        onCancelClick={props.onBackdropClick}
        onOkClick={logoutHandler}
      />

    </div>
    </Modal>
  );
};

export default LogoutModal;
