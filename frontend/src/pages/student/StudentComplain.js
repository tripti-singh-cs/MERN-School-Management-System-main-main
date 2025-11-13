import { useEffect, useState } from 'react';
import { Box, CircularProgress, Stack, TextField, Typography, Paper } from '@mui/material';
import Popup from '../../components/Popup';
import { BlueButton } from '../../components/buttonStyles';
import { addStuff } from '../../redux/userRelated/userHandle';
import { useDispatch, useSelector } from 'react-redux';

const StudentComplain = () => {
    const [complaint, setComplaint] = useState("");
    const [date, setDate] = useState("");

    const dispatch = useDispatch()
    const { status, currentUser, error } = useSelector(state => state.user);

    const user = currentUser._id
    const school = currentUser.school._id
    const address = "Complain"

    const [loader, setLoader] = useState(false)
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fields = {
        user,
        date,
        complaint,
        school,
    };

    const submitHandler = (event) => {
        event.preventDefault()
        setLoader(true)
        dispatch(addStuff(fields, address))
    };

    useEffect(() => {
        if (status === "added") {
            setLoader(false)
            setShowPopup(true)
            setMessage("Done Successfully")
        }
        else if (error) {
            setLoader(false)
            setShowPopup(true)
            setMessage("Network Error")
        }
    }, [status, error])

    return (
        <>
            <Box
                sx={{
                    flex: '1 1 auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    backgroundColor: '#f5f5f5',
                    px: 2
                }}
            >
                <Paper elevation={8} sx={{ maxWidth: 600, width: '100%', borderRadius: 3, p: { xs: 3, sm: 5 } }}>
                    <Stack spacing={2} sx={{ mb: 4, textAlign: 'center' }}>
                        <Typography variant="h4" sx={{ fontWeight: 600, color: '#2c2143' }}>
                            Submit a Complain
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#555' }}>
                            Select the date and write your complaint below. Your submission will be sent directly to the school administration.
                        </Typography>
                    </Stack>
                    <form onSubmit={submitHandler}>
                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                label="Select Date"
                                type="date"
                                value={date}
                                onChange={(event) => setDate(event.target.value)}
                                required
                                InputLabelProps={{ shrink: true }}
                                sx={{ backgroundColor: '#fafafa', borderRadius: 1 }}
                            />
                            <TextField
                                fullWidth
                                label="Write your complaint"
                                variant="outlined"
                                value={complaint}
                                onChange={(event) => setComplaint(event.target.value)}
                                required
                                multiline
                                maxRows={4}
                                sx={{ backgroundColor: '#fafafa', borderRadius: 1 }}
                            />
                        </Stack>
                        <BlueButton
                            fullWidth
                            size="large"
                            sx={{ mt: 4, py: 1.5 }}
                            variant="contained"
                            type="submit"
                            disabled={loader}
                        >
                            {loader ? <CircularProgress size={24} color="inherit" /> : "Submit"}
                        </BlueButton>
                    </form>
                </Paper>
            </Box>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default StudentComplain;
