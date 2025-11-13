import React from 'react'
import styled from 'styled-components';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import { useSelector } from 'react-redux';

const TeacherProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) console.log(response);
  else if (error) console.log(error);

  const teachSclass = currentUser.teachSclass;
  const teachSubject = currentUser.teachSubject;
  const teachSchool = currentUser.school;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <ProfileCard elevation={6}>
        <AvatarBox>
          <Avatar sx={{ width: 120, height: 120, fontSize: '2rem', bgcolor: '#1976d2' }}>
            {currentUser.name?.charAt(0)}
          </Avatar>
        </AvatarBox>
        <ProfileCardContent>
          <ProfileText variant="h6">{currentUser.name}</ProfileText>
          <ProfileText variant="body1">Email: {currentUser.email}</ProfileText>
          <ProfileText variant="body1">Class: {teachSclass.sclassName}</ProfileText>
          <ProfileText variant="body1">Subject: {teachSubject.subName}</ProfileText>
          <ProfileText variant="body1">School: {teachSchool.schoolName}</ProfileText>
        </ProfileCardContent>
      </ProfileCard>
    </Box>
  )
}

export default TeacherProfile

const ProfileCard = styled(Card)`
  width: 100%;
  max-width: 450px;
  border-radius: 16px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 32px rgba(0,0,0,0.15);
  }
  padding: 24px 16px;
`;

const AvatarBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

const ProfileCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileText = styled(Typography)`
  margin: 6px 0;
  font-weight: 500;
`;
