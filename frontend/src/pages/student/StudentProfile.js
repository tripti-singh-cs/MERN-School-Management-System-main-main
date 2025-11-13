import React from 'react'
import styled from 'styled-components';
import { Card, CardContent, Typography, Grid, Box, Avatar, Container, Paper } from '@mui/material';
import { useSelector } from 'react-redux';

const StudentProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) { console.log(response) }
  else if (error) { console.log(error) }

  const sclassName = currentUser.sclassName
  const studentSchool = currentUser.school

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <ProfilePaper elevation={6}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Avatar alt="Student Avatar" sx={{ width: 150, height: 150, bgcolor: '#3f51b5', fontSize: 50 }}>
                {String(currentUser.name).charAt(0)}
              </Avatar>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Typography variant="h5" component="h2" textAlign="center" sx={{ fontWeight: 600, mt: 1 }}>
                {currentUser.name}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Typography variant="subtitle1" component="p" textAlign="center" color="text.secondary">
                Roll No: {currentUser.rollNum}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" component="p" textAlign="center">
              <strong>Class:</strong> {sclassName.sclassName}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" component="p" textAlign="center">
              <strong>School:</strong> {studentSchool.schoolName}
            </Typography>
          </Grid>
        </Grid>
      </ProfilePaper>

      <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
            Personal Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p">
                <strong>Date of Birth:</strong> January 1, 2000
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p">
                <strong>Gender:</strong> Male
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p">
                <strong>Email:</strong> john.doe@example.com
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p">
                <strong>Phone:</strong> (123) 456-7890
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p">
                <strong>Address:</strong> 123 Main Street, City, Country
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="p">
                <strong>Emergency Contact:</strong> (987) 654-3210
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  )
}

export default StudentProfile

const ProfilePaper = styled(Paper)`
  padding: 24px;
  margin-bottom: 24px;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(0,0,0,0.12);
  }
`;
