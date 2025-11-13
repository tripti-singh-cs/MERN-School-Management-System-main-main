import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Table, TableBody, TableContainer, TableHead, Typography, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getTeacherFreeClassSubjects } from '../../../redux/sclassRelated/sclassHandle';
import { updateTeachSubject } from '../../../redux/teacherRelated/teacherHandle';
import { GreenButton, PurpleButton } from '../../../components/buttonStyles';
import { StyledTableCell, StyledTableRow } from '../../../components/styles';

const ChooseSubject = ({ situation }) => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [classID, setClassID] = useState("");
  const [teacherID, setTeacherID] = useState("");
  const [loader, setLoader] = useState(false);

  const { subjectsList, loading, error, response } = useSelector((state) => state.sclass);

  useEffect(() => {
    if (situation === "Norm") {
      setClassID(params.id);
      dispatch(getTeacherFreeClassSubjects(params.id));
    } else if (situation === "Teacher") {
      const { classID, teacherID } = params;
      setClassID(classID);
      setTeacherID(teacherID);
      dispatch(getTeacherFreeClassSubjects(classID));
    }
  }, [situation, params, dispatch]);

  if (loading) {
    return <Typography variant="h6" align="center" sx={{ mt: 4 }}>Loading...</Typography>;
  } else if (response) {
    return (
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Sorry, all subjects have teachers assigned already
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <PurpleButton
            variant="contained"
            onClick={() => navigate("/Admin/addsubject/" + classID)}
          >
            Add Subjects
          </PurpleButton>
        </Box>
      </Box>
    );
  } else if (error) {
    console.log(error);
  }

  const updateSubjectHandler = (teacherId, teachSubject) => {
    setLoader(true);
    dispatch(updateTeachSubject(teacherId, teachSubject));
    navigate("/Admin/teachers");
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', p: 3, mt: 4, borderRadius: 3, boxShadow: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>
        Choose a Subject
      </Typography>
      <TableContainer>
        <Table aria-label="subjects table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell align="center">Subject Name</StyledTableCell>
              <StyledTableCell align="center">Subject Code</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(subjectsList) && subjectsList.length > 0 && subjectsList.map((subject, index) => (
              <StyledTableRow key={subject._id}>
                <StyledTableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="center">{subject.subName}</StyledTableCell>
                <StyledTableCell align="center">{subject.subCode}</StyledTableCell>
                <StyledTableCell align="center">
                  {situation === "Norm" ? (
                    <GreenButton
                      variant="contained"
                      onClick={() => navigate("/Admin/teachers/addteacher/" + subject._id)}
                    >
                      Choose
                    </GreenButton>
                  ) : (
                    <GreenButton
                      variant="contained"
                      disabled={loader}
                      onClick={() => updateSubjectHandler(teacherID, subject._id)}
                    >
                      {loader ? <div className="load"></div> : 'Choose Sub'}
                    </GreenButton>
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ChooseSubject;
