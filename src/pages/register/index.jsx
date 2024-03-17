import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
} from "@mui/material/";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import RegisterSchema from "../../component/validation/register";
import SuccessAlert from "../../component/alert/success";
import axios from "../../utils/axios";

function Register() {
  // const dispatch = useDispatch();
  // const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);

      const dataObject = {
        username: data.get("username"),
        email: data.get("email"),
        password: data.get("password"),
        confirmPassword: data.get("re-enter password"),
      };
      const isValidate = await RegisterSchema.validate(dataObject, {
        abortEarly: false,
      }).catch(function (err) {
        var errors = {};
        err.inner.filter((e) => {
          // errors.push({e.path : e.message});
          var path = e.path;
          var message = e.message;
          errors[path] = message;
        });
        setErrors(errors);
      });

      const { username, email, password } = dataObject;
      if (isValidate) {
        const res = await axios.post("/users/register", {
          username,
          email,
          password,
        });
        setSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      throw error;
    }
  };

  //   if (role) {
  //     return <Navigate to="/MusicAdmin" replace />;
  //   }

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: "200px" }}>
      <CssBaseline />

      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, backgroundColor: "black" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, width: "396px" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          {errors.username && <p>{errors.username}</p>}
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            type="email"
            id="email"
            autoComplete="email"
          />
          {errors.email && <p>{errors.email}</p>}

          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            autoComplete="password"
            autoFocus
          />
          {errors.password && <p>{errors.password}</p>}

          <TextField
            margin="normal"
            required
            fullWidth
            name="re-enter password"
            label="Re-enter Password"
            type="password"
            id="re-enter password"
            autoComplete="re-enter password"
          />
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: "black" }}
          >
            Sign Up
            {/* {isLoading ? <CircularProgress color="secondary" /> : "Login"} */}
          </Button>
        </Box>
      </Box>
      {success ? <SuccessAlert /> : ""}
    </Container>
  );
}
export default Register;
