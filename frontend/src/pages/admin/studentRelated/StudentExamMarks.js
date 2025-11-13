import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../../../redux/userRelated/userHandle';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { updateStudentFields } from '../../../redux/studentRelated/studentHandle';

import Popup from '../../../components/Popup';
import { BlueButton } from '../../../components/buttonStyles';
import {
    Box, InputLabel,
    MenuItem, Select,
    Typography, Stack,
    TextField, CircularProgress, FormControl
} from '@mui/material';

const StudentExamMarks = ({ situation }) => {
    const dispatch = useDispatch();
    const { currentUser, userDetails, loading } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);
    const { response, error, statestatus } = useSelector((state) => state.student);
    const params = useParams()

    const [studentID, setStudentID] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const [chosenSubName, setChosenSubName] = useState("");
    const [marksObtained, setMarksObtained] = useState("");

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        if (situation === "Student") {
            setStudentID(params.id);
            dispatch(getUserDetails(params.id, "Student"));
        }
        else if (situation === "Subject") {
            const { studentID, subjectID } = params
            setStudentID(studentID);
            dispatch(getUserDetails(studentID, "Student"));
            setChosenSubName(subjectID);
        }
    }, [situation, params, dispatch]);

    useEffect(() => {
        if (userDetails?.sclassName && situation === "Student") {
            dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
        }
    }, [dispatch, userDetails, situation]);

    const changeHandler = (event) => {
        const selectedSubject = subjectsList.find(
            (subject) => subject.subName === event.target.value
        );
        setSubjectName(selectedSubject.subName);
        setChosenSubName(selectedSubject._id);
    }

    const fields = { subName: chosenSubName, marksObtained }

    const submitHandler = (event) => {
        event.preventDefault()
        setLoader(true)
        dispatch(updateStudentFields(studentID, fields, "UpdateExamResult"))
    }

    useEffect(() => {
        if (response) {
            setLoader(false)
            setShowPopup(true)
            setMessage(response)
        } else if (error) {
            setLoader(false)
            setShowPopup(true)
            setMessage("Network Error")
        } else if (statestatus === "added") {
            setLoader(false)
            setShowPopup(true)
            setMessage("Marks Updated Successfully")
        }
    }, [response, statestatus, error])

    return (
        <>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        px: 2,
                        py: { xs: 5, sm: 10 },
                    }}
                >
                    <Box
                        sx={{
                            width: { xs: '100%', sm: 500, md: 550 },
                            p: { xs: 2, sm: 3, md: 4 },
                            boxShadow: 3,
                            borderRadius: 2,
                            backgroundColor: '#fff'
                        }}
                    >
                        <Stack spacing={2} sx={{ mb: 3 }}>
                            <Typography variant={{ xs: 'h6', sm: 'h5', md: 'h4' }}>
                                Student Name: {userDetails?.name || "Loading..."}
                            </Typography>
                            {currentUser?.teachSubject &&
                                <Typography variant={{ xs: 'subtitle1', sm: 'h6', md: 'h5' }}>
                                    Subject Name: {currentUser.teachSubject?.subName}
                                </Typography>
                            }
                        </Stack>

                        <form onSubmit={submitHandler}>
                            <Stack spacing={3}>
                                {situation === "Student" &&
                                    <FormControl fullWidth>
                                        <InputLabel>Select Subject</InputLabel>
                                        <Select
                                            value={subjectName}
                                            onChange={changeHandler}
                                            required
                                        >
                                            {subjectsList && subjectsList.length > 0 ? (
                                                subjectsList.map((subject, index) => (
                                                    <MenuItem key={index} value={subject.subName}>
                                                        {subject.subName}
                                                    </MenuItem>
                                                ))
                                            ) : (
                                                <MenuItem value="">
                                                    Add Subjects For Marks
                                                </MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                }

                                <FormControl fullWidth>
                                    <TextField
                                        label="Enter Marks"
                                        type="number"
                                        value={marksObtained}
                                        onChange={(e) => setMarksObtained(e.target.value)}
                                        InputLabelProps={{ shrink: true }}
                                        required
                                    />
                                </FormControl>
                            </Stack>

                            <BlueButton
                                fullWidth
                                size="large"
                                sx={{ mt: 3 }}
                                variant="contained"
                                type="submit"
                                disabled={loader}
                            >
                                {loader ? <CircularProgress size={24} color="inherit" /> : "Submit"}
                            </BlueButton>
                        </form>
                    </Box>
                </Box>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    )
}

export default StudentExamMarks;
