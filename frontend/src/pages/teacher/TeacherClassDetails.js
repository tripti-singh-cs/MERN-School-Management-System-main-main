import { useEffect } from "react";
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getClassStudents } from "../../redux/sclassRelated/sclassHandle";
import { Paper, Box, Typography, ButtonGroup, Button, Popper, Grow, ClickAwayListener, MenuList, MenuItem, Divider } from '@mui/material';
import { BlackButton, BlueButton } from "../../components/buttonStyles";
import TableTemplate from "../../components/TableTemplate";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const TeacherClassDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { sclassStudents, loading, error, getresponse } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector((state) => state.user);

    const classID = currentUser.teachSclass?._id;
    const subjectID = currentUser.teachSubject?._id;

    useEffect(() => {
        dispatch(getClassStudents(classID));
    }, [dispatch, classID]);

    if (error) console.log(error);

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
    ];

    const studentRows = sclassStudents.map((student) => ({
        name: student.name,
        rollNum: student.rollNum,
        id: student._id,
    }));

    const StudentsButtonHaver = ({ row }) => {
        const options = ['Take Attendance', 'Provide Marks'];
        const [open, setOpen] = React.useState(false);
        const anchorRef = React.useRef(null);
        const [selectedIndex, setSelectedIndex] = React.useState(0);

        const handleClick = () => {
            if (selectedIndex === 0) navigate(`/Teacher/class/student/attendance/${row.id}/${subjectID}`);
            else if (selectedIndex === 1) navigate(`/Teacher/class/student/marks/${row.id}/${subjectID}`);
        };

        const handleMenuItemClick = (event, index) => {
            setSelectedIndex(index);
            setOpen(false);
        };

        const handleToggle = () => setOpen(prev => !prev);
        const handleClose = (event) => {
            if (anchorRef.current && anchorRef.current.contains(event.target)) return;
            setOpen(false);
        };

        return (
            <Box display="flex" flexWrap="wrap" gap={1}>
                <BlueButton variant="contained" sx={{ flexGrow: 1, minWidth: '100px' }} onClick={() => navigate(`/Teacher/class/student/${row.id}`)}>
                    View
                </BlueButton>
                <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                    <Button onClick={handleClick} sx={{ textTransform: 'none', fontWeight: 500 }}>{options[selectedIndex]}</Button>
                    <BlackButton
                        size="small"
                        aria-controls={open ? 'split-button-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-label="select action"
                        aria-haspopup="menu"
                        onClick={handleToggle}
                    >
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </BlackButton>
                </ButtonGroup>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal sx={{ zIndex: 1 }}>
                    {({ TransitionProps, placement }) => (
                        <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                            <Paper elevation={3} sx={{ borderRadius: 2 }}>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList id="split-button-menu" autoFocusItem>
                                        {options.map((option, index) => (
                                            <MenuItem
                                                key={option}
                                                selected={index === selectedIndex}
                                                onClick={(event) => handleMenuItemClick(event, index)}
                                            >
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </Box>
        );
    };

    return (
        <>
            <Typography variant="h4" align="center" gutterBottom sx={{ mt: 2, fontWeight: 600 }}>
                Class Details
            </Typography>

            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
                    <Typography variant="h6" color="text.secondary">Loading Students...</Typography>
                </Box>
            ) : getresponse ? (
                <Box display="flex" justifyContent="center" mt={4}>
                    <Typography variant="h6" color="text.secondary">No Students Found</Typography>
                </Box>
            ) : (
                <Paper sx={{ width: '100%', overflow: 'hidden', p: { xs: 2, sm: 3 }, borderRadius: 3 }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 500, mb: 2 }}>
                        Students List:
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    {Array.isArray(sclassStudents) && sclassStudents.length > 0 && (
                        <TableTemplate buttonHaver={(row) => <StudentsButtonHaver row={row} subjectID={subjectID} />} columns={studentColumns} rows={studentRows} />
                    )}
                </Paper>
            )}
        </>
    );
};

export default TeacherClassDetails;
