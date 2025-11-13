import React, { useEffect, useState } from 'react'
import { Container, Grid, Paper, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import styled from 'styled-components';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import Subject from "../../assets/subjects.svg";
import Assignment from "../../assets/assignment.svg";
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';

const StudentHomePage = () => {
    const dispatch = useDispatch();

    const { userDetails, currentUser, loading, response } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);

    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const classID = currentUser.sclassName._id

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
    }, [dispatch, currentUser._id, classID]);

    const numberOfSubjects = subjectsList && subjectsList.length;

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails])

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <StyledPaper>
                        <img src={Subject} alt="Subjects" style={{ width: 60, height: 60 }} />
                        <Title>Total Subjects</Title>
                        <Data start={0} end={numberOfSubjects} duration={2.5} />
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StyledPaper>
                        <img src={Assignment} alt="Assignments" style={{ width: 60, height: 60 }} />
                        <Title>Total Assignments</Title>
                        <Data start={0} end={15} duration={4} />
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <ChartContainer>
                        {response ? (
                            <Typography variant="h6" color="text.secondary">No Attendance Found</Typography>
                        ) : loading ? (
                            <Typography variant="h6" color="text.secondary">Loading...</Typography>
                        ) : subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
                            <CustomPieChart data={chartData} />
                        ) : (
                            <Typography variant="h6" color="text.secondary">No Attendance Found</Typography>
                        )}
                    </ChartContainer>
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{ p: { xs: 2, sm: 3 }, display: 'flex', flexDirection: 'column', borderRadius: 3, boxShadow: 3 }}>
                        <SeeNotice />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

const ChartContainer = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  height: 260px;
  justify-content: center;
  align-items: center;
  text-align: center;

  @media (max-width: 600px) {
    height: 220px;
  }
`;

const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.12);
  }
`;

const Title = styled.p`
  font-size: 1.3rem;
  font-weight: 600;
  color: #2c2143;
`;

const Data = styled(CountUp)`
  font-size: calc(1.5rem + 0.6vw);
  color: #3f51b5;
  font-weight: 700;
`;

export default StudentHomePage;
