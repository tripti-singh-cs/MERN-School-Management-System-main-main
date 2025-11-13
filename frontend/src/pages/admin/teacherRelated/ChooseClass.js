import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography, Container, Paper } from '@mui/material';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { useNavigate } from 'react-router-dom';
import { PurpleButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';

const ChooseClass = ({ situation }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getAllSclasses(currentUser._id, "Sclass"));
  }, [currentUser._id, dispatch]);

  if (error) {
    console.log(error);
  }

  const navigateHandler = (classID) => {
    if (situation === "Teacher") {
      navigate("/Admin/teachers/choosesubject/" + classID);
    } else if (situation === "Subject") {
      navigate("/Admin/addsubject/" + classID);
    }
  };

  const sclassColumns = [
    { id: 'name', label: 'Class Name', minWidth: 170 },
  ];

  const sclassRows = sclassesList && sclassesList.length > 0 && sclassesList.map((sclass) => {
    return {
      name: sclass.sclassName,
      id: sclass._id,
    };
  });

  const SclassButtonHaver = ({ row }) => {
    return (
      <PurpleButton
        variant="contained"
        onClick={() => navigateHandler(row.id)}
      >
        Choose
      </PurpleButton>
    );
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
        {loading ? (
          <Typography variant="h6" align="center">Loading...</Typography>
        ) : (
          <>
            {getresponse ? (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate("/Admin/addclass")}
                  sx={{ fontWeight: 600 }}
                >
                  Add Class
                </Button>
              </Box>
            ) : (
              <>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                  Choose a Class
                </Typography>
                {Array.isArray(sclassesList) && sclassesList.length > 0 &&
                  <TableTemplate buttonHaver={SclassButtonHaver} columns={sclassColumns} rows={sclassRows} />
                }
              </>
            )}
          </>
        )}
      </Paper>
    </Container>
  );
};

export default ChooseClass;
