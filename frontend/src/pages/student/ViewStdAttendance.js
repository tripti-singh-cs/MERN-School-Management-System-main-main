import React, { useEffect, useState } from 'react'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Box, Button, Collapse, Paper, Table, TableBody, TableHead, Typography, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../components/attendanceCalculator';
import CustomBarChart from '../../components/CustomBarChart'
import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import { StyledTableCell, StyledTableRow } from '../../components/styles';
import styled from 'styled-components';

const ViewStdAttendance = () => {
    const dispatch = useDispatch();
    const [openStates, setOpenStates] = useState({});
    const { userDetails, currentUser, loading, response} = useSelector((state) => state.user);
    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const [selectedSection, setSelectedSection] = useState('table');

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id]);

    useEffect(() => {
        if (userDetails) setSubjectAttendance(userDetails.attendance || []);
    }, [userDetails]);

    const handleOpen = (subId) => {
        setOpenStates(prev => ({ ...prev, [subId]: !prev[subId] }));
    };

    const handleSectionChange = (event, newSection) => setSelectedSection(newSection);

    const attendanceBySubject = groupAttendanceBySubject(subjectAttendance)
    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);

    const subjectData = Object.entries(attendanceBySubject).map(([subName, { present, sessions }]) => ({
        subject: subName,
        attendancePercentage: calculateSubjectAttendancePercentage(present, sessions),
        totalClasses: sessions,
        attendedClasses: present
    }));

    const renderTableSection = () => (
        <SectionContainer>
            <Typography variant="h4" align="center" gutterBottom>Attendance</Typography>
            {Object.entries(attendanceBySubject).map(([subName, { present, allData, subId, sessions }], index) => (
                <PaperStyled key={index} elevation={2}>
                    <Table>
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell>Subject</StyledTableCell>
                                <StyledTableCell>Present</StyledTableCell>
                                <StyledTableCell>Total Sessions</StyledTableCell>
                                <StyledTableCell>Attendance %</StyledTableCell>
                                <StyledTableCell align="center">Actions</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow>
                                <StyledTableCell>{subName}</StyledTableCell>
                                <StyledTableCell>{present}</StyledTableCell>
                                <StyledTableCell>{sessions}</StyledTableCell>
                                <StyledTableCell>{calculateSubjectAttendancePercentage(present, sessions)}%</StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button variant="contained" onClick={() => handleOpen(subId)}>
                                        {openStates[subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />} Details
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                    <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
                                        <Box sx={{ margin: 2 }}>
                                            <Typography variant="h6" gutterBottom>Attendance Details</Typography>
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
                                                        )
                                                    })}
                                                </TableBody>
                                            </Table>
                                        </Box>
                                    </Collapse>
                                </StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </PaperStyled>
            ))}
            <Typography variant="h6" align="center" sx={{ marginTop: 2 }}>
                Overall Attendance: <span style={{ fontWeight: 'bold', color: 'green' }}>{overallAttendancePercentage.toFixed(2)}%</span>
            </Typography>
        </SectionContainer>
    );

    const renderChartSection = () => (
        <SectionContainer>
            <CustomBarChart chartData={subjectData} dataKey="attendancePercentage" />
        </SectionContainer>
    );

    if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="60vh">Loading...</Box>;

    return (
        <>
            {subjectAttendance && subjectAttendance.length > 0
                ? (
                    <>
                        {selectedSection === 'table' && renderTableSection()}
                        {selectedSection === 'chart' && renderChartSection()}

                        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                            <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
                                <BottomNavigationAction
                                    label="Table"
                                    value="table"
                                    icon={selectedSection === 'table' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
                                />
                                <BottomNavigationAction
                                    label="Chart"
                                    value="chart"
                                    icon={selectedSection === 'chart' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
                                />
                            </BottomNavigation>
                        </Paper>
                    </>
                )
                : <Typography variant="h6" align="center" sx={{ mt: 4 }}>Currently You Have No Attendance Details</Typography>
            }
        </>
    )
}

export default ViewStdAttendance

const SectionContainer = styled(Container)`
    margin-top: 2rem;
    margin-bottom: 6rem;
`;

const PaperStyled = styled(Paper)`
    margin-bottom: 1.5rem;
    padding: 1rem;
    border-radius: 12px;
`;
