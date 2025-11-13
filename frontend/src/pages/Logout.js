import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../redux/userRelated/userSlice';
import styled from 'styled-components';

const Logout = () => {
    const currentUser = useSelector(state => state.user.currentUser);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(authLogout());
        navigate('/');
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <LogoutWrapper>
            <LogoutBox>
                <UserName>{currentUser?.name || "User"}</UserName>
                <LogoutMessage>Are you sure you want to log out?</LogoutMessage>
                <ButtonContainer>
                    <LogoutButton onClick={handleLogout} variant="logout">Log Out</LogoutButton>
                    <LogoutButton onClick={handleCancel} variant="cancel">Cancel</LogoutButton>
                </ButtonContainer>
            </LogoutBox>
        </LogoutWrapper>
    );
};

export default Logout;

// Styled Components
const LogoutWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #8e44ad, #6c3483);
`;

const LogoutBox = styled.div`
  background: #ffffff;
  padding: 40px 30px;
  border-radius: 16px;
  box-shadow: 0px 10px 25px rgba(0,0,0,0.2);
  text-align: center;
  min-width: 320px;
  max-width: 400px;
`;

const UserName = styled.h2`
  margin-bottom: 10px;
  color: #4a148c;
  font-size: 1.8rem;
  font-weight: 700;
`;

const LogoutMessage = styled.p`
  margin-bottom: 30px;
  font-size: 1rem;
  color: #555;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  flex-wrap: wrap;
`;

const LogoutButton = styled.button`
  flex: 1;
  padding: 12px 0;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  color: #fff;
  transition: all 0.3s ease;

  background-color: ${({ variant }) => variant === 'logout' ? '#e53935' : '#7b1fa2'};

  &:hover {
    background-color: ${({ variant }) => variant === 'logout' ? '#b71c1c' : '#4a148c'};
  }
`;
