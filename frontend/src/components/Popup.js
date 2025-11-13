import * as React from 'react';
import { useDispatch } from 'react-redux';
import { underControl } from '../redux/userRelated/userSlice';
import { underStudentControl } from '../redux/studentRelated/studentSlice';
import MuiAlert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';

const Popup = ({ message, setShowPopup, showPopup }) => {
    const dispatch = useDispatch();

    const vertical = "top";
    const horizontal = "right";

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;

        setShowPopup(false);
        dispatch(underControl());
        dispatch(underStudentControl());
    };

    return (
        <Snackbar
            open={showPopup}
            autoHideDuration={2000}
            onClose={handleClose}
            anchorOrigin={{ vertical, horizontal }}
            key={vertical + horizontal}
            sx={{
                '& .MuiSnackbarContent-root': {
                    borderRadius: '12px',
                    padding: { xs: '10px 16px', sm: '12px 20px' },
                    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    width: { xs: '90%', sm: '400px' },
                    maxWidth: '100%',
                    transition: 'all 0.3s ease',
                },
            }}
        >
            {message === "Done Successfully" ? (
                <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{
                        width: '100%',
                        background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                        color: '#fff',
                        fontWeight: '500',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    }}
                >
                    {message}
                </Alert>
            ) : (
                <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{
                        width: '100%',
                        background: 'linear-gradient(135deg, #f85032 0%, #e73827 100%)',
                        color: '#fff',
                        fontWeight: '500',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                    }}
                >
                    {message}
                </Alert>
            )}
        </Snackbar>
    );
};

export default Popup;

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
