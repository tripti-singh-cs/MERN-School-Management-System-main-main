import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { BlueButton } from "../../../components/buttonStyles";
import Popup from "../../../components/Popup";
import Classroom from "../../../assets/classroom.png";
import styled from "styled-components";

const AddClass = () => {
    const [sclassName, setSclassName] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { status, currentUser, response, tempDetails } = useSelector(state => state.user);

    const adminID = currentUser._id
    const address = "Sclass"

    const [loader, setLoader] = useState(false)
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fields = { sclassName, adminID };

    const submitHandler = (event) => {
        event.preventDefault()
        setLoader(true)
        dispatch(addStuff(fields, address))
    };

    useEffect(() => {
        if (status === 'added' && tempDetails) {
            navigate("/Admin/classes/class/" + tempDetails._id)
            dispatch(underControl())
            setLoader(false)
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
    }, [status, navigate, response, dispatch, tempDetails]);

    return (
        <>
            <StyledContainer>
                <StyledBox>
                    <Stack alignItems="center" mb={4}>
                        <img
                            src={Classroom}
                            alt="classroom"
                            style={{ width: '80%', maxWidth: '300px', borderRadius: '8px' }}
                        />
                    </Stack>
                    <Typography variant="h5" sx={{ textAlign: 'center', mb: 3, fontWeight: 600 }}>
                        Create a New Class
                    </Typography>
                    <form onSubmit={submitHandler}>
                        <Stack spacing={3}>
                            <TextField
                                label="Class Name"
                                variant="outlined"
                                value={sclassName}
                                onChange={(event) => setSclassName(event.target.value)}
                                required
                                fullWidth
                            />
                            <BlueButton
                                fullWidth
                                size="large"
                                variant="contained"
                                type="submit"
                                disabled={loader}
                                sx={{
                                    py: 1.5,
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    transition: 'all 0.3s ease',
                                    '&:hover': { transform: 'scale(1.03)' }
                                }}
                            >
                                {loader ? <CircularProgress size={24} color="inherit" /> : "Create"}
                            </BlueButton>
                            <Button
                                variant="outlined"
                                onClick={() => navigate(-1)}
                                sx={{ py: 1.5, fontWeight: 500 }}
                            >
                                Go Back
                            </Button>
                        </Stack>
                    </form>
                </StyledBox>
            </StyledContainer>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    )
}

export default AddClass

const StyledContainer = styled(Box)`
  flex: 1 1 auto;
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

const StyledBox = styled(Box)`
  width: 100%;
  max-width: 550px;
  padding: 40px 2rem;
  background-color: #fff;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.2);
  }
`;
