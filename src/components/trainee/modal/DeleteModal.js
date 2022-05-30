import classes from './DeleteModal.module.scss'
import { Button, CircularProgress } from '@mui/material'
import { createTheme, ThemeProvider } from "@mui/material";
import Modal from '../../UI/Modal'
import {useMutation} from 'react-query'
import { useContext, useEffect } from 'react';
import AuthContext from '../../../context/AuthContext'
import { deleteIntern } from '../../../api-calls/api-calls';

const theme = createTheme({
    palette: {
      secondary: {
        main: "#888",
      },
    },
  });

const DeleteModal = props => {
    const authContext = useContext(AuthContext)
    const mutation = useMutation(deleteIntern)
    const onClickHandler = () => {
      mutation.mutate({
        token: authContext.token,
        internId: props.internId
      })
    }
    useEffect(()=>{
      if (mutation.isSuccess){
        props.onBackdropClick()
        props.setRefetchTable(prev => !prev)
      }
    }, [mutation.isSuccess])
    return <Modal noCloseButton onBackdropClick={props.onBackdropClick}>
        <div className={classes.main}>
            <div className={classes.head}>
                <span>Xóa thực tập sinh</span>
            </div>
            <div className={classes.body}>
                <span>Bạn có chắc chắn muốn xóa vĩnh viễn thực tập sinh này không?</span>
            </div>
            <div className={classes.btnGroup}>
            <ThemeProvider theme={theme}>
              <Button style={{marginRight: '3px'}} variant="contained" color="error" onClick={onClickHandler} disabled={mutation.isLoading}>
                {mutation.isLoading ? <CircularProgress size="25px" /> :'Xóa'}
              </Button>
              <Button variant="contained" color="secondary" onClick={props.onBackdropClick} disabled={mutation.isLoading}>
                Hủy
              </Button>
            </ThemeProvider>
            </div>
        </div>
    </Modal>
}

export default DeleteModal