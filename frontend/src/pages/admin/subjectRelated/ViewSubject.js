import React, { useEffect, useState } from 'react';
import { getClassStudents, getSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Tab, Container, Typography, BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { BlueButton, GreenButton, PurpleButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

const ViewSubject = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { subloading, subjectDetails, sclassStudents, getresponse, error } = useSelector((state) => state.sclass);

  const { classID, subjectID } = params;

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
    dispatch(getClassStudents(classID));
  }, [dispatch, subjectID, classID]);

  if (error) {
    console.log(error);
  }

  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => setValue(newValue);

  const [selectedSection, setSelectedSection] = useState('attendance');
  const handleSectionChange = (event, newSection) => setSelectedSection(newSection);

  const studentColumns = [
    { id: 'rollNum', label: 'Roll No.', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 170 },
  ];

  const studentRows = sclassStudents.map((student) => ({
    rollNum: student.rollNum,
    name: student.name,
    id: student._id,
  }));

  const StudentsAttendanceButtonHaver = ({ row }) => (
    <>
      <BlueButton variant="contained" onClick={() => navigate("/Admin/students/student/" + row.id)}>
        View
      </BlueButton>
      <PurpleButton variant="contained" onClick={() => navigate(`/Admin/subject/student/attendance/${row.id}/${subjectID}`)}>
        Take Attendance
      </PurpleButton>
    </>
  );

  const StudentsMarksButtonHaver = ({ row }) => (
    <>
      <BlueButton variant="contained" onClick={() => navigate("/Admin/students/student/" + row.id)}>
        View
      </BlueButton>
      <PurpleButton variant="contained" onClick={() => navigate(`/Admin/subject/student/marks/${row.id}/${subjectID}`)}>
        Provide Marks
      </PurpleButton>
    </>
  );

  const SubjectStudentsSection = () => (
    <>
      {getresponse ? (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <GreenButton variant="contained" onClick={() => navigate("/Admin/class/addstudents/" + classID)}>
            Add Students
          </GreenButton>
        </Box>
      ) : (
        <>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            Students List
          </Typography>
          {selectedSection === 'attendance' &&
            <TableTemplate buttonHaver={StudentsAttendanceButtonHaver} columns={studentColumns} rows={studentRows} />
          }
          {selectedSection === 'marks' &&
            <TableTemplate buttonHaver={StudentsMarksButtonHaver} columns={studentColumns} rows={studentRows} />
          }
          <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={4}>
            <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels sx={{ bgcolor: '#f5f5f5' }}>
              <BottomNavigationAction
                label="Attendance"
                value="attendance"
                icon={selectedSection === 'attendance' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
              />
              <BottomNavigationAction
                label="Marks"
                value="marks"
                icon={selectedSection === 'marks' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
              />
            </BottomNavigation>
          </Paper>
        </>
      )}
    </>
  );

  const SubjectDetailsSection = () => {
    const numberOfStudents = sclassStudents.length;
    return (
      <Box sx={{ textAlign: 'center', p: { xs: 2, md: 4 }, bgcolor: '#fafafa', borderRadius: 3, boxShadow: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
          Subject Details
        </Typography>
        <Typography variant="h6" gutterBottom>Subject Name : {subjectDetails?.subName}</Typography>
        <Typography variant="h6" gutterBottom>Subject Code : {subjectDetails?.subCode}</Typography>
        <Typography variant="h6" gutterBottom>Subject Sessions : {subjectDetails?.sessions}</Typography>
        <Typography variant="h6" gutterBottom>Number of Students: {numberOfStudents}</Typography>
        <Typography variant="h6" gutterBottom>Class Name : {subjectDetails?.sclassName?.sclassName}</Typography>
        {subjectDetails?.teacher ? (
          <Typography variant="h6" gutterBottom>Teacher Name : {subjectDetails.teacher.name}</Typography>
        ) : (
          <GreenButton variant="contained" onClick={() => navigate("/Admin/teachers/addteacher/" + subjectDetails._id)}>
            Add Subject Teacher
          </GreenButton>
        )}
      </Box>
    );
  };

  return (
    <>
      {subloading ? (
        <Box sx={{ textAlign: 'center', mt: 5 }}>Loading...</Box>
      ) : (
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} sx={{ position: 'fixed', width: '100%', bgcolor: 'background.paper', zIndex: 10 }}>
                <Tab label="Details" value="1" />
                <Tab label="Students" value="2" />
              </TabList>
            </Box>
            <Container sx={{ mt: '4rem', mb: '5rem' }}>
              <TabPanel value="1"><SubjectDetailsSection /></TabPanel>
              <TabPanel value="2"><SubjectStudentsSection /></TabPanel>
            </Container>
          </TabContext>
        </Box>
      )}
    </>
  );
};

export default ViewSubject;
