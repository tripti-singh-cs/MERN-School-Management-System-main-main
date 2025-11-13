import React, { useEffect, useState } from "react";
import { Button, TextField, Grid, Box, Typography, CircularProgress, Paper } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import Popup from '../../../components/Popup';

const SubjectForm = () => {
    const [subjects, setSubjects] = useState([{ subName: "", subCode: "", sessions: "" }]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const { status, currentUser, response } = useSelector(state => state.user);

    const sclassName = params.id;
    const adminID = currentUser._id;
    const address = "Subject";

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);

    const handleSubjectChange = (index, field) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index][field] = event.target.value;
        setSubjects(newSubjects);
    };

    const handleAddSubject = () => {
        setSubjects([...subjects, { subName: "", subCode: "", sessions: "" }]);
    };

    const handleRemoveSubject = (index) => () => {
        const newSubjects = [...subjects];
        newSubjects.splice(index, 1);
        setSubjects(newSubjects);
    };

    const fields = {
        sclassName,
        subjects: subjects.map(({ subName, subCode, sessions }) => ({ subName, subCode, sessions })),
        adminID,
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(addStuff(fields, address));
    };

    useEffect(() => {
        if (status === 'added') {
            navigate("/Admin/subjects");
            dispatch(underControl());
            setLoader(false);
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
        }
    }, [status, navigate, response, dispatch]);

    return (
        <Paper sx={{ p: { xs: 2, md: 4 }, borderRadius: 3, boxShadow: 4, maxWidth: 900, margin: "auto", mt: 4 }}>
            <Typography variant="h5" sx={{ mb: 3, textAlign: 'center', fontWeight: 600 }}>
                Add Subjects
            </Typography>
            <form onSubmit={submitHandler}>
                <Grid container spacing={3}>
                    {subjects.map((subject, index) => (
                        <React.Fragment key={index}>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    label="Subject Name"
                                    variant="outlined"
                                    value={subject.subName}
                                    onChange={handleSubjectChange(index, 'subName')}
                                    required
                                    sx={styles.inputField}
                                />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField
                                    fullWidth
                                    label="Subject Code"
                                    variant="outlined"
                                    value={subject.subCode}
                                    onChange={handleSubjectChange(index, 'subCode')}
                                    required
                                    sx={styles.inputField}
                                />
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <TextField
                                    fullWidth
                                    label="Sessions"
                                    variant="outlined"
                                    type="number"
                                    inputProps={{ min: 0 }}
                                    value={subject.sessions}
                                    onChange={handleSubjectChange(index, 'sessions')}
                                    required
                                    sx={styles.inputField}
                                />
                            </Grid>
                            <Grid item xs={12} md={2} display="flex" alignItems="center">
                                {index === 0 ? (
                                    <Button variant="contained" color="primary" onClick={handleAddSubject} fullWidth>
                                        Add
                                    </Button>
                                ) : (
                                    <Button variant="outlined" color="error" onClick={handleRemoveSubject(index)} fullWidth>
                                        Remove
                                    </Button>
                                )}
                            </Grid>
                        </React.Fragment>
                    ))}
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="flex-end">
                            <Button variant="contained" color="success" type="submit" disabled={loader} sx={{ minWidth: 120 }}>
                                {loader ? <CircularProgress size={24} color="inherit" /> : "Save"}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
                <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
            </form>
        </Paper>
    );
};

export default SubjectForm;

const styles = {
    inputField: {
        '& .MuiInputLabel-root': { color: '#555' },
        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#aaa' },
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#555' },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1976d2' },
    },
};
