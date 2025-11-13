import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/userRelated/userHandle';
import Popup from '../../../components/Popup';
import { underControl } from '../../../redux/userRelated/userSlice';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { CircularProgress, Box, Typography, TextField, MenuItem, Button } from '@mui/material';
import styled from 'styled-components';

const AddStudent = ({ situation }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const { status, currentUser, response, error } = useSelector(state => state.user);
    const { sclassesList } = useSelector((state) => state.sclass);

    const [name, setName] = useState('');
    const [rollNum, setRollNum] = useState('');
    const [password, setPassword] = useState('');
    const [className, setClassName] = useState('');
    const [sclassName, setSclassName] = useState('');

    const adminID = currentUser._id;
    const role = "Student";
    const attendance = [];

    useEffect(() => {
        if (situation === "Class") {
            setSclassName(params.id);
        }
    }, [params.id, situation]);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        dispatch(getAllSclasses(adminID, "Sclass"));
    }, [adminID, dispatch]);

    const changeHandler = (event) => {
        if (event.target.value === 'Select Class') {
            setClassName('Select Class');
            setSclassName('');
        } else {
            const selectedClass = sclassesList.find(
                (classItem) => classItem.sclassName === event.target.value
            );
            setClassName(selectedClass.sclassName);
            setSclassName(selectedClass._id);
        }
    }

    const fields = { name, rollNum, password, sclassName, adminID, role, attendance }

    const submitHandler = (event) => {
        event.preventDefault()
        if (sclassName === "") {
            setMessage("Please select a classname")
            setShowPopup(true)
        }
        else {
            setLoader(true)
            dispatch(registerUser(fields, role))
        }
    }

    useEffect(() => {
        if (status === 'added') {
            dispatch(underControl())
            navigate(-1)
        }
        else if (status === 'failed') {
            setMessage(response)
            setShowPopup(true)
            setLoader(false)
        }
        else if (status === 'error') {
            setMessage("Network Error")
            setShowPopup(true)
            setLoader(false)
        }
    }, [status, navigate, error, response, dispatch]);

    return (
        <Container>
            <FormWrapper>
                <Typography variant="h5" align="center" gutterBottom>
                    Add Student
                </Typography>
                <form onSubmit={submitHandler}>
                    <FieldWrapper>
                        <TextField
                            fullWidth
                            label="Name"
                            placeholder="Enter student's name..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </FieldWrapper>

                    {situation === "Student" &&
                        <FieldWrapper>
                            <TextField
                                select
                                fullWidth
                                label="Class"
                                value={className}
                                onChange={changeHandler}
                                required
                            >
                                <MenuItem value="Select Class">Select Class</MenuItem>
                                {sclassesList.map((classItem) => (
                                    <MenuItem key={classItem._id} value={classItem.sclassName}>
                                        {classItem.sclassName}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FieldWrapper>
                    }

                    <FieldWrapper>
                        <TextField
                            fullWidth
                            type="number"
                            label="Roll Number"
                            placeholder="Enter student's Roll Number..."
                            value={rollNum}
                            onChange={(e) => setRollNum(e.target.value)}
                            required
                        />
                    </FieldWrapper>

                    <FieldWrapper>
                        <TextField
                            fullWidth
                            type="password"
                            label="Password"
                            placeholder="Enter student's password..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                            required
                        />
                    </FieldWrapper>

                    <ButtonWrapper>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={loader}
                        >
                            {loader ? <CircularProgress size={24} color="inherit" /> : "Add"}
                        </Button>
                    </ButtonWrapper>
                </form>
            </FormWrapper>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Container>
    )
}

export default AddStudent;

// Styled Components
const Container = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  @media (max-width: 600px) {
    padding: 1rem;
  }
`;

const FormWrapper = styled(Box)`
  width: 100%;
  max-width: 500px;
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0px 4px 16px rgba(0,0,0,0.1);
`;

const FieldWrapper = styled(Box)`
  margin-bottom: 1.5rem;
`;

const ButtonWrapper = styled(Box)`
  margin-top: 1rem;
`;
