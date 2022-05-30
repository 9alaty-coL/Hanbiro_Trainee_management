import classes from './scss/InternDetailPage.module.scss'

import NavBar from '../components/navbar/NavBar'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import getFormattedDate from '../utils/getFormattedDate'
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useContext, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from 'react-router-dom';
import {useMutation, useQuery} from 'react-query'
import { getOneIntern, updateOneIntern } from '../api-calls/api-calls';
import AuthContext from '../context/AuthContext'


// const DUMMY_USER = {
//     _id: '628ef19103f78ff3b85cc9f5',
//     name: 'Trần Tấn Lộc',
//     accountId: '628ef2f403f78ff3b85cc9fc',
//     phone: '0818662255',
//     major: 'Software Engineer',
//     currentYear: 3,
//     CVFile: 'path/abc/cv.pdf',
//     startDay: new Date('2022-06-01T17:00:00.000+00:00'),
//     endDay: new Date('2022-09-01T17:00:00.000+00:00'),
//     finalResult: true,
// }


const InternDetailPage = () => {
    const params = useParams()
    const navigate = useNavigate()
    const authContext = useContext(AuthContext)
    const [change, setChange] = useState(false)
    const mutation = useMutation('updateOneIntern', updateOneIntern)
    const detail = useQuery(['getOneIntern', params.internId, mutation.isSuccess], getOneIntern.bind(null, authContext.token, params.internId))
    const [result, setResult] = useState(false)

    const nameRef = useRef()
    const phoneRef = useRef()
    const majorRef = useRef()
    const currentYearRef = useRef()
    const cvFileRef = useRef()
    const cvFileRef2 = useRef()
    const startDayRef = useRef()
    const endDayRef = useRef()
    
    const handleChange = (event) => {
        setResult(event.target.value);
      };

useEffect(() => {
    if (detail.data?.finalResult){
        setResult(detail.data.finalResult)
    }else{
        setResult(false)
    }
}, [detail.data]);

useEffect(()=>{
    if (mutation.isSuccess){
        setChange(false)
    }
}, [mutation.isSuccess])

useEffect(()=>{
    if (cvFileRef?.current?.value && change){
        // cvFileRef?.current?.defaultValue = ""
    }
    if (nameRef?.current?.value && !change){
        nameRef.current.value = detail.data?.name
    }
    if (phoneRef?.current?.value && !change){
        phoneRef.current.value = detail.data?.phone
    }
    if (majorRef?.current?.value && !change){
        majorRef.current.value = detail.data?.major
    }
    if (currentYearRef?.current?.value && !change){
        currentYearRef.current.value = detail.data?.currentYear
    }
    if (cvFileRef?.current?.value && !change){
        cvFileRef.current.value = detail.data?.CVFile.substring(detail.data.CVFile.lastIndexOf('/')+1) == '' ? 'Not found' : detail.data?.CVFile.substring(detail.data.CVFile.lastIndexOf('/')+1)
    }
    if (startDayRef?.current?.value && !change){
        startDayRef.current.value = getFormattedDate(detail.data?.startDay)
    }
    if (endDayRef?.current?.value && !change){
        endDayRef.current.value = getFormattedDate(detail.data?.endDay)
    }
    if (!change && detail.data?.finalResult){
        setResult(detail.data?.finalResult)
    }
}, [change,params.internId, mutation.isSuccess, detail.data ])

const submitHandler = e => {
    e.preventDefault()
    mutation.mutate({
        token: authContext.token,
        internId: params.internId,
        internData: {
            name: nameRef.current.value,
            phone: phoneRef.current.value,
            major: majorRef.current.value,
            currentYear: +currentYearRef.current.value,
            CVFile: cvFileRef2.current.value == '' ? cvFileRef2.current.value : cvFileRef2.current.value,
            startDay: new Date(startDayRef.current.value),
            endDay: new Date(endDayRef.current.value),
            finalResult: result
        }
    })
}

let table
if (detail.isLoading){
    table = <CircularProgress style={{
        position: "absolute", top: "100px", left: "calc(50vw - 60px)"
    }} size="120px"/>
}
else if (detail.isSuccess){
    table = <div className={classes.body}>
            <div className={classes.avatar}>
                <img src='https://shop.phuongdonghuyenbi.vn/wp-content/uploads/avatars/1510/default-avatar-bpthumb.png' />
                <span>{detail.data.name}</span>
            </div>
            <div className={classes.info}>
                <span className={classes.title}>Thông tin chi tiết</span>
                <form className={classes.form} onSubmit={submitHandler}>
                    <TextField inputRef={nameRef} required id="outlined-required" label="Tên" defaultValue={detail.data.name} disabled={!change}/>
                    <TextField inputRef={phoneRef} required id="outlined-required" label="Số điện thoại" defaultValue={detail.data.phone} disabled={!change} />
                    <TextField inputRef={majorRef} required id="outlined-required" label="Chuyên ngành" defaultValue={detail.data.major} disabled={!change} />
                    <TextField inputRef={currentYearRef} required id="outlined-required" label="Sinh viên năm thứ" defaultValue={detail.data.currentYear} disabled={!change} />
                    {!change && <TextField inputRef={cvFileRef} required id="outlined-required" label="File CV" defaultValue={detail.data.CVFile.substring(detail.data.CVFile.lastIndexOf('/')+1) == '' ? 'Not found' : detail.data.CVFile.substring(detail.data.CVFile.lastIndexOf('/')+1)} disabled />}
                    {change && <TextField inputRef={cvFileRef2} id="outlined-required" InputLabelProps={{shrink: true,}} label="File CV"  type={'file'} />}
                    <TextField inputRef={startDayRef} required id="outlined-required" label="Ngày bắt đầu" defaultValue={getFormattedDate(detail.data.startDay)} type='date'  disabled={!change} />
                    <TextField inputRef={endDayRef} required id="outlined-required" label="Ngày kết thúc" defaultValue={getFormattedDate(detail.data.endDay)} type='date' disabled={!change}/>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Kết quả</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={result}
                            label="Kết quả"
                            onChange={handleChange}
                            disabled={!change}
                        >
                            <MenuItem value={true} defaultValue={result}>Đạt</MenuItem>
                            <MenuItem value={false} defaultValue={result}>Chưa đạt</MenuItem>
                        </Select>
                    </FormControl>
                    {!change && <Button style={{width: '25%', margin:'10px'}} color='primary' variant='contained' onClick={setChange.bind(null, true)}>Chỉnh sửa</Button>}
                    <div className={classes.btnGroup}>
                        {change && <Button  type='submit' color='success' variant='contained' disabled={mutation.isLoading}>{mutation.isLoading ? <CircularProgress size="30px"/> :'Lưu'}</Button>}
                        {change && <Button  color='error' variant='contained' onClick={setChange.bind(null, false)} disabled={mutation.isLoading}>Hủy</Button>}
                    </div>
                </form>
            </div>
        </div>
}

    
    return <div className={classes.main}>
        <div className={classes.head}>
            <FontAwesomeIcon icon={faArrowLeft} onClick={()=>navigate(-1)}/>
        </div>
        
        {table}
    </div>
}

export default InternDetailPage