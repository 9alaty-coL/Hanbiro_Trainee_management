import classes from './scss/HomePage.module.scss'
import NavBar from '../components/navbar/NavBar'
import { Button } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return <div className={classes.main}>
        <NavBar />
        <div className={classes.page}>
            <div className={classes.head}>
                <img src='https://hanbiro.vn/wp-content/uploads/2021/04/hanbiro-logo-white.png' />
                <h2>Hanbiro internship challenge</h2>
            </div>
            <div className={classes.body}>
                <a href='https://drive.google.com/file/d/1IxZch7ELNttG0880RWh3yMcxtWswRl3q/view?usp=sharing' target='_blank' style={{textDecoration: "none"}}>
                    <Button variant='contained' style={{width: '250px', display:'flex', justifyContent:'space-around', padding: '15px 20px'}}>
                        <FontAwesomeIcon fontSize={'30px'} icon={faUpRightFromSquare} /><span style={{fontSize: '15px'}}>Read my report</span>
                    </Button>
                </a>
            </div>
        </div>
    </div>
}

export default HomePage
