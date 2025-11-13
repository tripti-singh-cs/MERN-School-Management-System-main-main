import { useState } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import TeacherSideBar from './TeacherSideBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import Logout from '../Logout';
import AccountMenu from '../../components/AccountMenu';
import { AppBar, Drawer } from '../../components/styles';
import StudentAttendance from '../admin/studentRelated/StudentAttendance';

import TeacherClassDetails from './TeacherClassDetails';
import TeacherComplain from './TeacherComplain';
import TeacherHomePage from './TeacherHomePage';
import TeacherProfile from './TeacherProfile';
import TeacherViewStudent from './TeacherViewStudent';
import StudentExamMarks from '../admin/studentRelated/StudentExamMarks';

const TeacherDashboard = () => {
    const [open, setOpen] = useState(true);
    const theme = useTheme();
    const toggleDrawer = () => setOpen(!open);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* AppBar */}
            <AppBar open={open} position='absolute' sx={{ backgroundColor: theme.palette.primary.main, boxShadow: 3 }}>
                <Toolbar sx={{ pr: '24px', minHeight: { xs: 56, sm: 64 } }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1, fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}
                    >
                        Teacher Dashboard
                    </Typography>
                    <AccountMenu />
                </Toolbar>
            </AppBar>

            {/* Drawer */}
            <Drawer
                variant="permanent"
                open={open}
                sx={{
                    width: open ? 240 : 60,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: open ? 240 : 60,
                        transition: theme.transitions.create('width', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                        overflowX: 'hidden',
                        boxShadow: 3,
                        borderRight: '1px solid rgba(0,0,0,0.12)',
                        backgroundColor: theme.palette.background.paper,
                    },
                }}
            >
                <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: open ? 'flex-end' : 'center', px: 1 }}>
                    {open && <IconButton onClick={toggleDrawer}><ChevronLeftIcon /></IconButton>}
                </Toolbar>
                <Divider />
                <List component="nav">
                    <TeacherSideBar />
                </List>
            </Drawer>

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
                    p: { xs: 2, sm: 3 },
                    minHeight: '100vh',
                    overflow: 'auto',
                    transition: theme.transitions.create(['margin', 'width'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                }}
            >
                <Toolbar />
                <Routes>
                    <Route path="/" element={<TeacherHomePage />} />
                    <Route path='*' element={<Navigate to="/" />} />
                    <Route path="/Teacher/dashboard" element={<TeacherHomePage />} />
                    <Route path="/Teacher/profile" element={<TeacherProfile />} />
                    <Route path="/Teacher/complain" element={<TeacherComplain />} />
                    <Route path="/Teacher/class" element={<TeacherClassDetails />} />
                    <Route path="/Teacher/class/student/:id" element={<TeacherViewStudent />} />
                    <Route path="/Teacher/class/student/attendance/:studentID/:subjectID" element={<StudentAttendance situation="Subject" />} />
                    <Route path="/Teacher/class/student/marks/:studentID/:subjectID" element={<StudentExamMarks situation="Subject" />} />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </Box>
        </Box>
    );
};

export default TeacherDashboard;
