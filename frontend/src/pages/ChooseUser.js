import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Container,
  CircularProgress,
  Backdrop,
  Typography
} from '@mui/material';
import { AccountCircle, School, Group } from '@mui/icons-material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const password = "zxc"

  const { status, currentUser, currentRole } = useSelector(state => state.user);

  const [loader, setLoader] = useState(false)
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    let fields = {};
    if (user === "Admin") {
      if (visitor === "guest") {
        fields = { email: "yogendra@12", password };
        setLoader(true)
        dispatch(loginUser(fields, user))
      } else navigate('/Adminlogin');
    }
    else if (user === "Student") {
      if (visitor === "guest") {
        fields = { rollNum: "1", studentName: "Dipesh Awasthi", password };
        setLoader(true)
        dispatch(loginUser(fields, user))
      } else navigate('/Studentlogin');
    }
    else if (user === "Teacher") {
      if (visitor === "guest") {
        fields = { email: "tony@12", password };
        setLoader(true)
        dispatch(loginUser(fields, user))
      } else navigate('/Teacherlogin');
    }
  }

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') navigate('/Admin/dashboard');
      else if (currentRole === 'Student') navigate('/Student/dashboard');
      else if (currentRole === 'Teacher') navigate('/Teacher/dashboard');
    } else if (status === 'error') {
      setLoader(false)
      setMessage("Network Error")
      setShowPopup(true)
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <StyledContainer>
      <Container>
        <Grid container spacing={4} justifyContent="center">
          {[
            { role: "Admin", icon: <AccountCircle fontSize="large" />, desc: "Login as an administrator to access the dashboard to manage app data." },
            { role: "Student", icon: <School fontSize="large" />, desc: "Login as a student to explore course materials and assignments." },
            { role: "Teacher", icon: <Group fontSize="large" />, desc: "Login as a teacher to create courses, assignments, and track student progress." }
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <StyledPaper elevation={6} onClick={() => navigateHandler(item.role)}>
                <Box mb={2} color="white">
                  {item.icon}
                </Box>
                <Typography variant="h5" mb={1} color="white">{item.role}</Typography>
                <Typography variant="body2" color="rgba(255,255,255,0.7)">
                  {item.desc}
                </Typography>
              </StyledPaper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
        <Typography ml={2}>Please Wait...</Typography>
      </Backdrop>

      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </StyledContainer>
  );
};

export default ChooseUser;

// Styled components
const StyledContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, #411d70, #19118b);
  padding: 2rem;
`;

const StyledPaper = styled(Paper)`
  padding: 30px 20px;
  text-align: center;
  background-color: #1f1f38;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  border-radius: 15px;

  &:hover {
    background-color: #2c2c6c;
    color: white;
    transform: translateY(-5px);
    box-shadow: 0px 10px 20px rgba(0,0,0,0.4);
  }

  @media (max-width: 900px) {
    padding: 25px 15px;
  }
`;
