import React, { useEffect } from 'react';
import { getTeacherDetails } from '../../../redux/teacherRelated/teacherHandle';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Typography, Paper, Box } from '@mui/material';
import { GreenButton } from '../../../components/buttonStyles';

const TeacherDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { loading, teacherDetails, error } = useSelector((state) => state.teacher);

  const teacherID = params.id;

  useEffect(() => {
    dispatch(getTeacherDetails(teacherID));
  }, [dispatch, teacherID]);

  if (error) {
    console.log(error);
  }

  const isSubjectNamePresent = teacherDetails?.teachSubject?.subName;

  const handleAddSubject = () => {
    navigate(`/Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`);
  };

  return (
    <>
      {loading ? (
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          Loading...
        </Typography>
      ) : (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
          <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 4 }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700 }}>
              Teacher Details
            </Typography>

            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                <strong>Name:</strong> {teacherDetails?.name}
              </Typography>
              <Typography variant="h6" gutterBottom>
                <strong>Class:</strong> {teacherDetails?.teachSclass?.sclassName}
              </Typography>

              {isSubjectNamePresent ? (
                <>
                  <Typography variant="h6" gutterBottom>
                    <strong>Subject:</strong> {teacherDetails?.teachSubject?.subName}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    <strong>Sessions:</strong> {teacherDetails?.teachSubject?.sessions}
                  </Typography>
                </>
              ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                  <GreenButton variant="contained" onClick={handleAddSubject}>
                    Add Subject
                  </GreenButton>
                </Box>
              )}
            </Box>
          </Paper>
        </Container>
      )}
    </>
  );
};

export default TeacherDetails;
