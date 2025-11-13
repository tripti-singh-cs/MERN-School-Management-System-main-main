import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { CircularProgress, TextField, Button, Stack, Box, Typography } from '@mui/material';
import Popup from '../../../components/Popup';
import styled from 'styled-components';

const AddNotice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector(state => state.user);
  const { currentUser } = useSelector(state => state.user);

  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');
  const adminID = currentUser._id;

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const fields = { title, details, date, adminID };
  const address = "Notice";

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === 'added') {
      navigate('/Admin/notices');
      dispatch(underControl());
    } else if (status === 'error') {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, dispatch]);

  return (
    <>
      <Container>
        <FormWrapper>
          <Typography variant="h4" align="center" gutterBottom>
            Add Notice
          </Typography>
          <form onSubmit={submitHandler}>
            <Stack spacing={3}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <TextField
                label="Details"
                variant="outlined"
                fullWidth
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required
              />
              <TextField
                label="Date"
                type="date"
                variant="outlined"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={loader}
                sx={{ py: 1.5 }}
              >
                {loader ? <CircularProgress size={24} color="inherit" /> : "Add"}
              </Button>
            </Stack>
          </form>
        </FormWrapper>
      </Container>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default AddNotice;

const Container = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const FormWrapper = styled(Box)`
  width: 100%;
  max-width: 500px;
  background-color: #ffffff;
  padding: 2.5rem 2rem;
  border-radius: 10px;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.1);
`;
