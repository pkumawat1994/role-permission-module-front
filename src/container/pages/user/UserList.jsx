import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUser, getAllRolePermission, getAllUsers } from "../../../redux";
import { toast } from "react-toastify";
// import "./RolePermissionList.css";
import { Box, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Paper from "@mui/material/Paper";
import { Link, useNavigate } from "react-router-dom";
const UserList = () => {
  const [userList, setUserList] = useState([]);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllUsers()).then((res) => {
      if (res.payload.data.status == 200) {
        setUserList(res?.payload?.data?.users);
      }
    });
  }, []);

  const handleDelete=(id)=>{
      console.log(id,"oo")
    dispatch(deleteUser(id)).then((res)=>{if(res?.payload?.data?.status==200){
        toast.success(res.payload.data.message)
        dispatch(getAllUsers()).then((res) => {
          if (res.payload.data.status == 200) {
            setUserList(res?.payload?.data?.users);
          }
        });

    }})
  }
  return (
    <>
      <Box className="Role-Div">
      <Box className="add-role-box">
    <Button onClick={()=>navigate("/admin/dashboard/add-user")} type="button" variant="contained">
            Add User
          </Button>
        </Box>

        <Box className="Role-Table">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>No.</TableCell>
                  <TableCell align="right">image</TableCell>
                  <TableCell align="right">USERNAME</TableCell>
                  <TableCell align="right">EMAIL</TableCell>
                  <TableCell align="right">MOBILE</TableCell>
                  <TableCell align="right">ACTION</TableCell>

                  {/* <TableCell align="right">DELETE</TableCell>
                  <TableCell align="right">VIEW</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {userList?.map((user, index) => (
                  <TableRow key={user._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell align="right">image</TableCell>
                    <TableCell align="right">{user.name}</TableCell>
                    <TableCell align="right">{user.email}</TableCell>
                    <TableCell align="right">{user.mobile}</TableCell>
                    <TableCell align="right">
                      <Button variant="contained">
                        <VisibilityIcon />
                      </Button>
                      &nbsp;&nbsp;
                      <Button variant="contained">
                        <EditIcon />
                      </Button>
                      &nbsp;&nbsp;
                      <Button variant="contained" onClick={()=>handleDelete(user._id)} color="error">
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default UserList;
