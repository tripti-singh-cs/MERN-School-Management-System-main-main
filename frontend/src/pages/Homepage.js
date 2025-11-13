import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button, Paper } from '@mui/material';
import styled from 'styled-components';
import Students from "../assets/students.svg";
import { LightPurpleButton } from '../components/buttonStyles';

const Homepage = () => {
    return (
        <StyledContainer maxWidth="xl">
            <Grid container spacing={0}>
                <Grid item xs={12} md={6}>
                    <ImageContainer>
                        <img src={Students} alt="students" />
                    </ImageContainer>
                </Grid>
                <Grid item xs={12} md={6}>
                    <StyledPaper elevation={6}>
                        <StyledTitle>
                            Welcome to
                            <br />
                            School Management
                            <br />
                            System
                        </StyledTitle>
                        <StyledText>
                            Streamline school management, organize classes, and manage students & faculty effortlessly.
                            Track attendance, assess performance, and communicate with ease.
                        </StyledText>
                        <StyledBox>
                            <StyledLink to="/choose">
                                <LightPurpleButton variant="contained" fullWidth>
                                    Login
                                </LightPurpleButton>
                            </StyledLink>
                            <StyledLink to="/chooseasguest">
                                <Button variant="outlined" fullWidth
                                    sx={{
                                        mt: 2, mb: 3,
                                        color: "#7f56da",
                                        borderColor: "#7f56da",
                                        transition: "all 0.3s ease",
                                        '&:hover': {
                                            backgroundColor: "#7f56da",
                                            color: "white"
                                        }
                                    }}
                                >
                                    Login as Guest
                                </Button>
                            </StyledLink>
                            <StyledTextSmall>
                                Don't have an account?{' '}
                                <Link to="/Adminregister" style={{color:"#550080"}}>
                                    Sign up
                                </Link>
                            </StyledTextSmall>
                        </StyledBox>
                    </StyledPaper>
                </Grid>
            </Grid>
        </StyledContainer>
    );
};

export default Homepage;

// Styled Components
const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #6b2c91, #3e1f7f);
  display: flex;
  justify-content: center;
  align-items: center;
  
  img {
    width: 80%;
    max-width: 500px;
    object-fit: contain;
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
  }
`;

const StyledPaper = styled(Paper)`
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  background: #f9f9ff;
  border-radius: 20px;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  gap: 16px;
  padding-top: 24px;
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  color: #252525;
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: 20px;

  @media (max-width: 900px) {
    font-size: 2.2rem;
  }
`;

const StyledText = styled.p`
  color: #555;
  font-size: 1rem;
  margin-top: 20px;
  line-height: 1.6;
  text-align: justify;

  @media (max-width: 900px) {
    font-size: 0.95rem;
  }
`;

const StyledTextSmall = styled.p`
  font-size: 0.9rem;
  color: #555;
  text-align: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;
