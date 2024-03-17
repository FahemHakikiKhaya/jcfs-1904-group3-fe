import * as React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Box,
  Typography,
  Container,
} from "@mui/material/";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import { loginAction } from "../../store/actions";
import SuccessAlert from "../../component/alert/success";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);

  // const role = useSelector((state) => state.auth.role);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);

      const res = await axios.post("/users/login", {
        username: data.get("username"),
        password: data.get("password"),
      });
      if (res.data.message) {
        const { id, username, role } = res.data.user;
        const { token } = res.data;

        loginAction({ id, username, role, token, dispatch });
        setSuccess(true);
        setTimeout(() => {
          if (role == "user") {
            navigate("/product-list");
          }
          if (role == "admin") {
            navigate("/admin/products");
          }
        }, 2000);
      }
    } catch (error) {
      throw error;
    }
  };

  // if (role) {
  //   return <Navigate to="/MusicAdmin" replace />;
  // }

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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: "black" }}
          >
            Login
            {/* {isLoading ? <CircularProgress color="secondary" /> : "Login"} */}
          </Button>

          <Link
            onClick={() => {
              navigate("/register");
            }}
            ariant="body2"
            sx={{ color: "black" }}
          >
            {"Don't have an account? Sign Up"}
          </Link>
        </Box>
      </Box>
      {success ? <SuccessAlert /> : ""}
    </Container>
  );
}
export default Login;
