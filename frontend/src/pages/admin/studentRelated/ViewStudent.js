import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUserDetails, updateUser } from '../../../redux/userRelated/userHandle';
import { useNavigate, useParams } from 'react-router-dom';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { Box, Button, Collapse, IconButton, Table, TableBody, TableHead, Typography, Tab, Paper, BottomNavigation, BottomNavigationAction, Container, CircularProgress } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { KeyboardArrowUp, KeyboardArrowDown, Delete as DeleteIcon } from '@mui/icons-material';
import { removeStuff, updateStudentFields } from '../../../redux/studentRelated/studentHandle';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../../components/attendanceCalculator';
import CustomBarChart from '../../../components/CustomBarChart';
import CustomPieChart from '../../../components/CustomPieChart';
import { StyledTableCell, StyledTableRow } from '../../../components/styles';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import Popup from '../../../components/Popup';

const ViewStudent = () => {
    const [showTab, setShowTab] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { userDetails, response, loading,} = useSelector((state) => state.user);

    const studentID = params.id;
    const address = "Student";

    useEffect(() => {
        dispatch(getUserDetails(studentID, address));
    }, [dispatch, studentID]);

    useEffect(() => {
        if (userDetails?.sclassName?._id) {
            dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
        }
    }, [dispatch, userDetails]);

    const [name, setName] = useState('');
    const [rollNum, setRollNum] = useState('');
    const [password, setPassword] = useState('');
    const [sclassName, setSclassName] = useState('');
    const [studentSchool, setStudentSchool] = useState('');
    const [subjectMarks, setSubjectMarks] = useState('');
    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const [openStates, setOpenStates] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => setValue(newValue);

    const [selectedSection, setSelectedSection] = useState('table');
    const handleSectionChange = (event, newSection) => setSelectedSection(newSection);

    const fields = password === "" ? { name, rollNum } : { name, rollNum, password };

    useEffect(() => {
        if (userDetails) {
            setName(userDetails.name || '');
            setRollNum(userDetails.rollNum || '');
            setSclassName(userDetails.sclassName || '');
            setStudentSchool(userDetails.school || '');
            setSubjectMarks(userDetails.examResult || '');
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(updateUser(fields, studentID, address))
            .then(() => dispatch(getUserDetails(studentID, address)))
            .catch((error) => console.error(error));
    };

    const deleteHandler = () => {
        dispatch(deleteUser(studentID, address));
        navigate(-1);
        setMessage("Student deleted successfully!");
        setShowPopup(true);
    };

    const removeHandler = (id, deladdress) => {
        dispatch(removeStuff(id, deladdress))
            .then(() => dispatch(getUserDetails(studentID, address)));
    };

    const removeSubAttendance = (subId) => {
        dispatch(updateStudentFields(studentID, { subId }, "RemoveStudentSubAtten"))
            .then(() => dispatch(getUserDetails(studentID, address)));
    };

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;
    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    const subjectData = Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { subCode, present, sessions }]) => ({
        subject: subName,
        attendancePercentage: calculateSubjectAttendancePercentage(present, sessions),
        totalClasses: sessions,
        attendedClasses: present
    }));

    const StudentAttendanceSection = () => {
        const renderTableSection = () => (
            <Box sx={{ overflowX: 'auto', mb: 2 }}>
                <Typography variant="h6" mb={2}>Attendance:</Typography>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>Subject</StyledTableCell>
                            <StyledTableCell>Present</StyledTableCell>
                            <StyledTableCell>Total Sessions</StyledTableCell>
                            <StyledTableCell>Attendance %</StyledTableCell>
                            <StyledTableCell align="center">Actions</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    {Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { present, allData, subId, sessions }], index) => {
                        const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
                        return (
                            <TableBody key={index}>
                                <StyledTableRow>
                                    <StyledTableCell>{subName}</StyledTableCell>
                                    <StyledTableCell>{present}</StyledTableCell>
                                    <StyledTableCell>{sessions}</StyledTableCell>
                                    <StyledTableCell>{subjectAttendancePercentage}%</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Button variant="contained" size="small" sx={styles.attendanceButton} onClick={() => handleOpen(subId)}>
                                            {openStates[subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />} Details
                                        </Button>
                                        <IconButton onClick={() => removeSubAttendance(subId)}>
                                            <DeleteIcon color="error" />
                                        </IconButton>
                                        <Button variant="contained" size="small" sx={styles.attendanceButton} onClick={() => navigate(`/Admin/subject/student/attendance/${studentID}/${subId}`)}>Change</Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                                <StyledTableRow>
                                    <StyledTableCell colSpan={6} sx={{ paddingBottom: 0, paddingTop: 0 }}>
                                        <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
                                            <Box sx={{ margin: 1 }}>
                                                <Typography variant="subtitle1" gutterBottom>Attendance Details</Typography>
                                                <Table size="small">
                                                    <TableHead>
                                                        <StyledTableRow>
                                                            <StyledTableCell>Date</StyledTableCell>
                                                            <StyledTableCell>Status</StyledTableCell>
                                                        </StyledTableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {allData.map((data, index) => {
                                                            const date = new Date(data.date);
                                                            const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
                                                            return (
                                                                <StyledTableRow key={index}>
                                                                    <StyledTableCell>{dateString}</StyledTableCell>
                                                                    <StyledTableCell>{data.status}</StyledTableCell>
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
                        )
                    })}
                </Table>
                <Box mt={2}>
                    <Typography variant="body1">Overall Attendance: {overallAttendancePercentage.toFixed(2)}%</Typography>
                    <Button variant="contained" color="error" startIcon={<DeleteIcon />} sx={{ mr: 1, mt: 1 }} onClick={() => removeHandler(studentID, "RemoveStudentAtten")}>Delete All</Button>
                    <Button variant="contained" sx={{ mt: 1 }} onClick={() => navigate("/Admin/students/student/attendance/" + studentID)}>Add Attendance</Button>
                </Box>
            </Box>
        );

        const renderChartSection = () => (
            <Box mt={2}>
                <CustomBarChart chartData={subjectData} dataKey="attendancePercentage" />
            </Box>
        );

        return subjectAttendance?.length > 0 ? (
            <>
                {selectedSection === 'table' ? renderTableSection() : renderChartSection()}
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                    <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
                        <BottomNavigationAction label="Table" value="table" icon={selectedSection === 'table' ? <TableChartIcon /> : <TableChartOutlinedIcon />} />
                        <BottomNavigationAction label="Chart" value="chart" icon={selectedSection === 'chart' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />} />
                    </BottomNavigation>
                </Paper>
            </>
        ) : (
            <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate("/Admin/students/student/attendance/" + studentID)}>Add Attendance</Button>
        )
    }

    const StudentMarksSection = () => {
        const renderTableSection = () => (
            <Box sx={{ overflowX: 'auto', mb: 2 }}>
                <Typography variant="h6" mb={2}>Subject Marks:</Typography>
                <Table sx={{ minWidth: 500 }}>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>Subject</StyledTableCell>
                            <StyledTableCell>Marks</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {subjectMarks.map((result, index) => result.subName && result.marksObtained && (
                            <StyledTableRow key={index}>
                                <StyledTableCell>{result.subName.subName}</StyledTableCell>
                                <StyledTableCell>{result.marksObtained}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
                <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate("/Admin/students/student/marks/" + studentID)}>Add Marks</Button>
            </Box>
        );

        const renderChartSection = () => (
            <Box mt={2}>
                <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
            </Box>
        );

        return subjectMarks?.length > 0 ? (
            <>
                {selectedSection === 'table' ? renderTableSection() : renderChartSection()}
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                    <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
                        <BottomNavigationAction label="Table" value="table" icon={selectedSection === 'table' ? <TableChartIcon /> : <TableChartOutlinedIcon />} />
                        <BottomNavigationAction label="Chart" value="chart" icon={selectedSection === 'chart' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />} />
                    </BottomNavigation>
                </Paper>
            </>
        ) : (
            <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate("/Admin/students/student/marks/" + studentID)}>Add Marks</Button>
        )
    }

    const StudentDetailsSection = () => (
        <Box sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>Name: {userDetails.name}</Typography>
            <Typography variant="body1">Roll Number: {userDetails.rollNum}</Typography>
            <Typography variant="body1">Class: {sclassName.sclassName}</Typography>
            <Typography variant="body1" mb={2}>School: {studentSchool.schoolName}</Typography>
            {subjectAttendance?.length > 0 && <CustomPieChart data={chartData} />}
            <Button variant="contained" color="error" sx={{ mt: 2 }} onClick={deleteHandler}>Delete</Button>
        </Box>
    );

    return (
        <>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} sx={{ position: 'fixed', width: '100%', bgcolor: 'background.paper', zIndex: 1 }}>
                                <Tab label="Details" value="1" />
                                <Tab label="Attendance" value="2" />
                                <Tab label="Marks" value="3" />
                            </TabList>
                        </Box>
                        <Container sx={{ marginTop: "4rem", marginBottom: "6rem" }}>
                            <TabPanel value="1"><StudentDetailsSection /></TabPanel>
                            <TabPanel value="2"><StudentAttendanceSection /></TabPanel>
                            <TabPanel value="3"><StudentMarksSection /></TabPanel>
                        </Container>
                    </TabContext>
                </Box>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default ViewStudent;

const styles = {
    attendanceButton: {
        marginLeft: "10px",
        backgroundColor: "#270843",
        "&:hover": { backgroundColor: "#3f1068" },
        minWidth: '80px'
    },
    styledButton: {
        margin: "10px 0",
        backgroundColor: "#02250b",
        "&:hover": { backgroundColor: "#106312" },
    }
};
