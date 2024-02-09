import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import "./AddUser.css";
import { useFormik } from "formik";
import { UserRegisterValidationSchema } from "../../../allValidation/ValidationSchemas";
import { useDispatch } from "react-redux";
import { addUser, getAllRolePermission } from "../../../redux";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [allRole, setAllRoles] = React.useState([]);
  const [showPassword, setShowPassword] = React.useState(false);

  let dispatch = useDispatch();
  let navigate=useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      password: "",
      roleType: "",
      profilePic:""
    },
    validationSchema: UserRegisterValidationSchema,
    onSubmit: (values) => {

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("mobile", values.mobile);
      formData.append("password", values.password);
      formData.append("roleType", values.roleType);
      formData.append("profilePic", values.profilePic);
      alert(JSON.stringify(values, null, 2));
      dispatch(addUser(formData)).then((res)=>{if(res.payload.data.status==201){
        toast.success(res.payload.data.message)
        navigate("/admin/dashboard/user-list")
        
      }}).catch((err)=>console.log("err",err))
      formik.resetForm(); 
    },
  });

  useEffect(() => {
    dispatch(getAllRolePermission()).then((res) => {
      console.log(res.payload.data);
      if (res.payload.data.status == 200) {
        setAllRoles(res?.payload?.data?.rolesPermission);
      }
    });
  }, []);

  const handleChnage = (e) => {
    console.log(e.target.value);
    formik.setFieldValue("roleType", e.target.value);
  };

  const imageHandleChange = (e) => {
    console.log(e.target.files[0], "evvv");
    let profile=e.target.files[0]
    console.log("profile",profile)
    formik.setFieldValue("profilePic",profile);
  };
  return (
    <>
      <Box className="form-div">
        <Box className="form-wrapper">
          <form onSubmit={formik.handleSubmit}>
            <TextField
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              placeholder="Enter Name"
            />
            <TextField
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              placeholder="Enter Email"
            />
            <TextField
              name="mobile"
              onChange={formik.handleChange}
              value={formik.values.mobile}
              onBlur={formik.handleBlur}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
              placeholder="Enter Mobile"
            />
            {console.log("first", formik.values)}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="roleType"
                onChange={handleChnage}
                value={formik.values.roleType}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.roleType && Boolean(formik.errors.roleType)
                }
                helperText={formik.touched.roleType && formik.errors.roleType}
              >
                {console.log(formik.values.roleType, "idd")}
                <MenuItem value="">
                  <em>Select role</em>
                </MenuItem>
                {allRole &&
                  allRole?.map((roles) => {
                    return (
                      <MenuItem value={roles._id}>{roles?.role_name}</MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              required
              name="profilePic"
              type="file"
              onChange={(e) => imageHandleChange(e)}
            
              onBlur={formik.handleBlur}
              error={
                formik.touched.profilePic && Boolean(formik.errors.profilePic)
              }
              helperText={formik.touched.profilePic && formik.errors.profilePic}
            />
             
            <Button type="submit" variant="contained">
              Add User
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default AddUser;
