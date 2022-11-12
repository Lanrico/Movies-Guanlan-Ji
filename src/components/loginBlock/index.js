import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { Snackbar } from '@mui/material';
import Alert from "@mui/material/Alert";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const theme = createTheme();

export default function LoginBlock() {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFail, setOpenFail] = useState(false);
  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState("");
  const firebaseConfig = {
    apiKey: "AIzaSyBuCt1AzgifZ98mO8IMvHe7fBqLUT1H5kw",
    authDomain: "movies-guanlan-ji.firebaseapp.com",
    projectId: "movies-guanlan-ji",
    storageBucket: "movies-guanlan-ji.appspot.com",
    messagingSenderId: "1080962489218",
    appId: "1:1080962489218:web:5e6e9e8218312990338d9b",
    measurementId: "G-QFTQJVEKHT"
  };
  

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const handleSubmit = (event) => {
    const data = new FormData(event.currentTarget);
    signInWithEmailAndPassword(auth, data.get('email'), data.get('password'))
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)
      setOpenSuccess(true);
      setLogin(true);
      setUserName(user.email);
      // ...
    })
    .catch((error) => {
      setOpenFail(true);
    });
    event.preventDefault();
  };

  const handleSuccessSnackClose = (event) => {
    setOpenSuccess(false);
  };
  const handleLogout = (event) => {
    setLogin(false);
  };
  const handleFailSnackClose = (event) => {
    setOpenFail(false);
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  }));

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSuccess}
        onClose={handleSuccessSnackClose}
      >
        <Alert
          severity="success"
          onClose={handleSuccessSnackClose}
        >
          <Typography variant="h5">
            Login success
          </Typography>
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openFail}
        onClose={handleFailSnackClose}
      >
        <Alert
          severity="error"
          onClose={handleFailSnackClose}
        >
          <Typography variant="h5">
            Invalid email or password
          </Typography>
        </Alert>
      </Snackbar>
      <Container component="main" maxWidth="xs" sx={login ? { display: "none" } : null}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: purple[500], width: 75, height: 75 }}>
            <LoginIcon fontSize='large' />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me for 30 days"
            />
            <ColorButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: purple[500] }}
            >
              Sign In
            </ColorButton>
            <Grid container>
              <Grid item sx={{ justifyContent: 'center', margin: 'auto' }}>
                <Link href='' variant="body2">
                  {"Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Container sx={login ? null : { display: "none" }} >
        <Typography textAlign={'center'} variant="h4" >
          Welcome,
          <br></br>
          {userName}!
        </Typography>
        <ColorButton
          fullWidth
          onClick={handleLogout}
          variant="contained"
          sx={{ mt: 3, mb: 2, bgcolor: purple[500] }}
        >
          Logout
        </ColorButton>
      </Container>
    </ThemeProvider>
  );
}