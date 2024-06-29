import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormLabel,
  TextField,
  Typography
} from "@mui/material";
import { sendAuthRequest } from "../api-helpers/helpers";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const onResReceived = (data) => {
    if (isSignup) {
      localStorage.setItem("userId", data.user._id);
      setSuccess("Congratulations! Signup successful. Start sharing your travel stories.");
    } else {
      localStorage.setItem("userId", data.id);
      setSuccess("Login successful! Get ready to embark on new travel adventures.");
    }
    dispatch(authActions.login());
    setDialogOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      sendAuthRequest(true, inputs)
        .then(onResReceived)
        .catch((err) => {
          setError("Invalid credentials");
          console.log(err);
        });
    } else {
      sendAuthRequest(false, inputs)
        .then(onResReceived)
        .catch((err) => {
          setError("Invalid Email or Password");
          console.log(err);
        });
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    navigate("/diaries");
  };

  const [inputs, setInputs] = useState({ name: "", email: "", password: "" });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Box
    width={{ xs: "90%", sm: "60%", md: "50%", lg: "40%" }}
    maxWidth="500px"
      borderRadius={10}
      boxShadow={"5px 5px 10px #ccc"}
      margin="auto"
      marginTop={10}

    >
      
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection={"column"}
          width="60%"
          padding={5}
          margin="auto"
        >
          <Typography padding={1} variant="h4" textAlign="center">
            {isSignup ? "Signup" : "Login"}
          </Typography>
          {isSignup && (
            <>
              <FormLabel>Name</FormLabel>
              <TextField
                onChange={handleChange}
                value={inputs.name}
                name="name"
                required
                margin="normal"
                autoComplete="off"
              />
            </>
          )}
          <FormLabel>Email</FormLabel>
          <TextField
            onChange={handleChange}
            value={inputs.email}
            name="email"
            type="email"
            required
            margin="normal"
            autoComplete="off"
          />
          <FormLabel>Password</FormLabel>
          <TextField
            onChange={handleChange}
            value={inputs.password}
            name="password"
            type="password"
            required
            margin="normal"
            autoComplete="off"
          />
          <Button
            sx={{ mt: 2, borderRadius: 10 }}
            type="submit"
            variant="contained"
          >
            {isSignup ? "Signup" : "Login"}
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            sx={{ mt: 2, borderRadius: 10 }}
            variant="outlined"
          >
            Change to {isSignup ? "Login" : "Signup"}
          </Button>

          {error && (
            <Typography color="error" variant="body1" mt={2} textAlign={"center"}>
              {error}
            </Typography>
          )}

          <Dialog open={dialogOpen} onClose={handleDialogClose}>
            {/* <DialogTitle>Success</DialogTitle> */}
            <DialogContent>
              <DialogContentText color={"green"}>{success}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} autoFocus>
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </form>
    </Box>
  );
};

export default Auth;
