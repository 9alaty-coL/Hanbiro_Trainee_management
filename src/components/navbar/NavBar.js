import classes from "./NavBar.module.scss";
import { useState } from "react";
import Option from "./Option";
import LogoutModal from "../auth/LogoutModal";

const OPTION_LIST = [
  {
    name: "Trang Chủ",
    path: "/",
    link: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Home_Icon.svg/2048px-Home_Icon.svg.png",
  },
  {
    name: "Danh sách thực tập",
    path: "/interns",
    link: "https://www.lawctopus.com/wp-content/uploads/2020/10/40716-200.png",
  },
  {
    name: "Đăng xuất",
    path: "/logout",
    link: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/OOjs_UI_icon_logOut-ltr.svg/240px-OOjs_UI_icon_logOut-ltr.svg.png",
  },
];

const NavBar = () => {
  const [showName, setShowName] = useState(false);
  const [isLogout, setIsLogout] = useState(false)
  const options = OPTION_LIST.map((value) => (
    <Option
      showName={showName}
      key={value.name}
      name={value.name}
      link={value.path}
      imgSrc={value.link}
      setIsLogout={setIsLogout}
    />
  ));
  return (
    <div className={`${classes.navbar} ${!showName && classes.hide}`}>
      <div
        className={classes.show}
        onClick={() => setShowName((prev) => !prev)}
      >
          <div className={classes.line} />
      </div>
      {options}
      {isLogout && <LogoutModal onBackdropClick={()=>setIsLogout(false)}/>}
    </div>
  );
};

export default NavBar;
