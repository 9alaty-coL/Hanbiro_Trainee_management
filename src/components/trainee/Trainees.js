import classes from "./Trainees.module.scss";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Pagination, Stack, CircularProgress } from "@mui/material";

import { useQuery } from "react-query";
import AuthContext from "../../context/AuthContext";
import { getAllInterns } from "../../api-calls/api-calls";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import DeleteModal from "./modal/DeleteModal";

const Trainees = props => {
  const [openDelete, setOpenDelete] = useState(null)
  const [refetchTable, setRefetchTable] = useState(false)
  const authContext = useContext(AuthContext);
  const interns = useQuery(
    ["getInterns", props.reFetch, refetchTable],
    getAllInterns.bind(null, authContext.token)
  );
  const onBackdropClick = () => {
    setOpenDelete(null)

  }
  let table;
  if (interns.isLoading) {
    table = <CircularProgress size="100px" style={{alignSelf: "center"}}/>;
  }
  if (interns.isError){
    table = <h4 color="red">{interns.error}</h4>
  }
  if (interns.isSuccess) {
    let rows = interns.data.map((value, index) => {
      return {
        _id: value._id,
        index: index,
        name: value.name,
        major: value.major,
        result: value.finalResult ? 'Đạt' : 'Chưa đạt',
        option: (
          <>
            {/* <Button variant="outlined" color="primary" style={{marginRight: "5px"}}>
              Chi tiết
            </Button> */}
            {/* <Button variant="contained" color="primary" style={{marginRight: "5px"}}>
              Sửa
            </Button> */}
            <Button variant="contained" color="error" onClick={()=>setOpenDelete(value._id)}>
              Xóa
            </Button>
          </>
        ),
      };
    });
    table = (
      <div className={classes.table}>
        <TableContainer component={Paper} style={{ marginBottom: "30px" , marginTop: "30px",}}>
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>#</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Họ tên</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Chuyên ngành
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Kết quả hiện tại
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>Tùy chỉnh</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">
                    {row.index + 1}
                  </TableCell>
                  <TableCell><Link to={'/interns/' + row._id} style={{
                    textDecoration: 'none', fontSize: '1.15rem'
                  }}>{row.name}</Link></TableCell>
                  <TableCell>{row.major}</TableCell>
                  <TableCell>{row.result}</TableCell>
                  <TableCell>{row.option}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* <Stack spacing={2}>
          <Pagination count={2} variant="outlined" color="primary" />
        </Stack> */}
      </div>
    );
  }
  return <div className={classes.main}>
  {openDelete && <DeleteModal setRefetchTable={setRefetchTable} onBackdropClick={onBackdropClick} internId={openDelete}/>}
  {table}
  </div>;
};

export default Trainees;
