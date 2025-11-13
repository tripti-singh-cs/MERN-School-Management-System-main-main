import { useEffect, useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Box, Typography, Paper, Checkbox, FormControlLabel, TextField, CssBaseline, IconButton, InputAdornment, CircularProgress, Backdrop } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import bgpic from "../assets/designlogin.jpg"
import { LightPurpleButton } from '../components/buttonStyles';
import styled from 'styled-components';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const defaultTheme = createTheme();

const LoginPage = ({ role }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

    const [toggle, setToggle] = useState(false)
    const [guestLoader, setGuestLoader] = useState(false)
    const [loader, setLoader] = useState(false)
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [rollNumberError, setRollNumberError] = useState(false);
    const [studentNameError, setStudentNameError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (role === "Student") {
            const rollNum = event.target.rollNumber.value;
            const studentName = event.target.studentName.value;
            const password = event.target.password.value;
            if (!rollNum || !studentName || !password) {
                if (!rollNum) setRollNumberError(true);
                if (!studentName) setStudentNameError(true);
                if (!password) setPasswordError(true);
                return;
            }
            const fields = { rollNum, studentName, password }
            setLoader(true)
            dispatch(loginUser(fields, role))
        } else {
            const email = event.target.email.value;
            const password = event.target.password.value;
            if (!email || !password) {
                if (!email) setEmailError(true);
                if (!password) setPasswordError(true);
                return;
            }
            const fields = { email, password }
            setLoader(true)
            dispatch(loginUser(fields, role))
        }
    };

    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'rollNumber') setRollNumberError(false);
        if (name === 'studentName') setStudentNameError(false);
    };

    const guestModeHandler = () => {
        const password = "zxc"
        if (role === "Admin") {
            const email = "yogendra@12"
            const fields = { email, password }
            setGuestLoader(true)
            dispatch(loginUser(fields, role))
        }
        else if (role === "Student") {
            const rollNum = "1"
            const studentName = "Dipesh Awasthi"
            const fields = { rollNum, studentName, password }
            setGuestLoader(true)
            dispatch(loginUser(fields, role))
        }
        else if (role === "Teacher") {
            const email = "tony@12"
            const fields = { email, password }
            setGuestLoader(true)
            dispatch(loginUser(fields, role))
        }
    }

    useEffect(() => {
        if (status === 'success' || currentUser !== null) {
            if (currentRole === 'Admin') navigate('/Admin/dashboard');
            else if (currentRole === 'Student') navigate('/Student/dashboard');
            else if (currentRole === 'Teacher') navigate('/Teacher/dashboard');
        } else if (status === 'failed') {
            setMessage(response)
            setShowPopup(true)
            setLoader(false)
        } else if (status === 'error') {
            setMessage("Network Error")
            setShowPopup(true)
            setLoader(false)
            setGuestLoader(false)
        }
    }, [status, currentRole, navigate, error, response, currentUser]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid item xs={12} sm={8} md={5}>
                    <StyledPaper elevation={8}>
                        <Box sx={{ my: 6, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="h3" sx={{ mb: 1, fontWeight: '700', color: "#3c1361" }}>
                                {role} Login
                            </Typography>
                            <Typography variant="subtitle1" sx={{ mb: 3, color: "#6e5494" }}>
                                Welcome back! Please enter your details
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                                {role === "Student" ? (
                                    <>
                                        <StyledTextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="rollNumber"
                                            label="Roll Number"
                                            name="rollNumber"
                                            type="number"
                                            autoFocus
                                            error={rollNumberError}
                                            helperText={rollNumberError && 'Roll Number is required'}
                                            onChange={handleInputChange}
                                        />
                                        <StyledTextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="studentName"
                                            label="Name"
                                            name="studentName"
                                            error={studentNameError}
                                            helperText={studentNameError && 'Name is required'}
                                            onChange={handleInputChange}
                                        />
                                    </>
                                ) : (
                                    <StyledTextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        name="email"
                                        autoFocus
                                        error={emailError}
                                        helperText={emailError && 'Email is required'}
                                        onChange={handleInputChange}
                                    />
                                )}
                                <StyledTextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type={toggle ? 'text' : 'password'}
                                    id="password"
                                    error={passwordError}
                                    helperText={passwordError && 'Password is required'}
                                    onChange={handleInputChange}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setToggle(!toggle)} aria-label="toggle password visibility">
                                                    {toggle ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Grid container justifyContent="space-between" alignItems="center">
                                    <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                                    <StyledLink href="#">Forgot password?</StyledLink>
                                </Grid>
                                <LightPurpleButton type="submit" fullWidth variant="contained" sx={{ mt: 3, py: 1.5, fontWeight: 600 }}>
                                    {loader ? <CircularProgress size={24} color="inherit" /> : "Login"}
                                </LightPurpleButton>
                                <Button fullWidth onClick={guestModeHandler} variant="outlined" sx={{ mt: 2, mb: 3, color: "#7f56da", borderColor: "#7f56da", py: 1.5 }}>
                                    Login as Guest
                                </Button>
                                {role === "Admin" &&
                                    <Grid container justifyContent="center" spacing={1}>
                                        <Grid item>Don't have an account?</Grid>
                                        <Grid item>
                                            <StyledLink to="/Adminregister">Sign up</StyledLink>
                                        </Grid>
                                    </Grid>
                                }
                            </Box>
                        </Box>
                    </StyledPaper>
                </Grid>
                <Grid
                    item xs={false} sm={4} md={7}
                    sx={{
                        backgroundImage: `url(${bgpic})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(to bottom, rgba(58, 20, 100, 0.6), rgba(58, 20, 100, 0.6))',
                        }
                    }}
                />
            </Grid>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={guestLoader}>
                <CircularProgress color="inherit" />
                Please Wait
            </Backdrop>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </ThemeProvider>
    );
}

export default LoginPage

const StyledPaper = styled(Paper)`
  margin: auto;
  margin-top: 3%;
  padding: 40px 32px;
  border-radius: 16px;
  background: linear-gradient(145deg, #ffffff, #f3f0ff);
  box-shadow: 0px 8px 20px rgba(0,0,0,0.2);
`;

const StyledTextField = styled(TextField)`
  & label.Mui-focused {
    color: #6c4fcf;
  }
  & .MuiInput-underline:after {
    border-bottom-color: #6c4fcf;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: #6c4fcf;
    }
  }
`;

const StyledLink = styled(Link)`
  margin-top: 5px;
  text-decoration: none;
  color: #7f56da;
  font-weight: 500;
`;
