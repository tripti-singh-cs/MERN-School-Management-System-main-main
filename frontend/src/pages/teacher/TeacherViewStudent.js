import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Collapse, Table, TableBody, TableHead, Typography, Paper, Divider } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart'
import { PurpleButton } from '../../components/buttonStyles';
import { StyledTableCell, StyledTableRow } from '../../components/styles';
import styled from 'styled-components';

const TeacherViewStudent = () => {
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch();
    const { currentUser, userDetails, loading } = useSelector((state) => state.user);

    const address = "Student"
    const studentID = params.id
    const teachSubject = currentUser.teachSubject?.subName
    const teachSubjectID = currentUser.teachSubject?._id

    const [sclassName, setSclassName] = useState('');
    const [studentSchool, setStudentSchool] = useState('');
    const [subjectMarks, setSubjectMarks] = useState([]);
    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const [openStates, setOpenStates] = useState({});

    useEffect(() => {
        dispatch(getUserDetails(studentID, address));
    }, [dispatch, studentID]);

    useEffect(() => {
        if (userDetails) {
            setSclassName(userDetails.sclassName || '');
            setStudentSchool(userDetails.school || '');
            setSubjectMarks(userDetails.examResult || []);
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const handleOpen = (subId) => {
        setOpenStates((prev) => ({ ...prev, [subId]: !prev[subId] }));
    };

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;
    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    return (
        <Container>
            {loading ? <Typography>Loading...</Typography> : (
                <Box>
                    <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                        <Typography variant="h5" gutterBottom>
                            Student Details
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Typography><strong>Name:</strong> {userDetails.name}</Typography>
                        <Typography><strong>Roll Number:</strong> {userDetails.rollNum}</Typography>
                        <Typography><strong>Class:</strong> {sclassName.sclassName}</Typography>
                        <Typography><strong>School:</strong> {studentSchool.schoolName}</Typography>
                    </Paper>

                    <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                        <Typography variant="h5" gutterBottom>
                            Attendance
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        {subjectAttendance && subjectAttendance.length > 0 && Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { present, allData, subId, sessions }], index) => {
                            if (subName === teachSubject) {
                                const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
                                return (
                                    <Box key={index} sx={{ mb: 3 }}>
                                        <Table>
                                            <TableHead>
                                                <StyledTableRow>
                                                    <StyledTableCell>Subject</StyledTableCell>
                                                    <StyledTableCell>Present</StyledTableCell>
                                                    <StyledTableCell>Total Sessions</StyledTableCell>
                                                    <StyledTableCell>Attendance Percentage</StyledTableCell>
                                                    <StyledTableCell align="center">Actions</StyledTableCell>
                                                </StyledTableRow>
                                            </TableHead>
                                            <TableBody>
                                                <StyledTableRow>
                                                    <StyledTableCell>{subName}</StyledTableCell>
                                                    <StyledTableCell>{present}</StyledTableCell>
                                                    <StyledTableCell>{sessions}</StyledTableCell>
                                                    <StyledTableCell>{subjectAttendancePercentage}%</StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        <Button variant="contained" onClick={() => handleOpen(subId)}>
                                                            {openStates[subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />} Details
                                                        </Button>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                                <StyledTableRow>
                                                    <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                                        <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
                                                            <Box sx={{ margin: 1 }}>
                                                                <Typography variant="h6" gutterBottom>
                                                                    Attendance Details
                                                                </Typography>
                                                                <Table size="small">
                                                                    <TableHead>
                                                                        <StyledTableRow>
                                                                            <StyledTableCell>Date</StyledTableCell>
                                                                            <StyledTableCell align="right">Status</StyledTableCell>
                                                                        </StyledTableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        {allData.map((data, idx) => {
                                                                            const date = new Date(data.date);
                                                                            const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
                                                                            return (
                                                                                <StyledTableRow key={idx}>
                                                                                    <StyledTableCell>{dateString}</StyledTableCell>
                                                                                    <StyledTableCell align="right">{data.status}</StyledTableCell>
                                                                                </StyledTableRow>
                                                                            );
                                                                        })}
                                                                    </TableBody>
                                                                </Table>
                                                            </Box>
                                                        </Collapse>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            </TableBody>
                                        </Table>
                                    </Box>
                                )
                            }
                            return null;
                        })}
                        <Typography sx={{ mt: 2, fontWeight: 'bold' }}>
                            Overall Attendance Percentage: {overallAttendancePercentage.toFixed(2)}%
                        </Typography>
                        <Box sx={{ maxWidth: 400, mt: 2 }}>
                            <CustomPieChart data={chartData} />
                        </Box>
                        <PurpleButton sx={{ mt: 2 }} onClick={() => navigate(`/Teacher/class/student/attendance/${studentID}/${teachSubjectID}`)}>
                            Add Attendance
                        </PurpleButton>
                    </Paper>

                    <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                        <Typography variant="h5" gutterBottom>
                            Subject Marks
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        {subjectMarks && subjectMarks.length > 0 && subjectMarks.map((result, idx) => {
                            if (result.subName.subName === teachSubject) {
                                return (
                                    <Table key={idx} sx={{ mb: 2 }}>
                                        <TableHead>
                                            <StyledTableRow>
                                                <StyledTableCell>Subject</StyledTableCell>
                                                <StyledTableCell>Marks</StyledTableCell>
                                            </StyledTableRow>
                                        </TableHead>
                                        <TableBody>
                                            <StyledTableRow>
                                                <StyledTableCell>{result.subName.subName}</StyledTableCell>
                                                <StyledTableCell>{result.marksObtained}</StyledTableCell>
                                            </StyledTableRow>
                                        </TableBody>
                                    </Table>
                                )
                            }
                            return null;
                        })}
                        <PurpleButton sx={{ mt: 2 }} onClick={() => navigate(`/Teacher/class/student/marks/${studentID}/${teachSubjectID}`)}>
                            Add Marks
                        </PurpleButton>
                    </Paper>
                </Box>
            )}
        </Container>
    );
}

// Styled container to add padding
const Container = styled(Box)`
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 900px) {
    padding: 16px;
  }
`;

export default TeacherViewStudent;
