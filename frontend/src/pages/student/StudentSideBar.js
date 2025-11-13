import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';

const StudentSideBar = () => {
    const location = useLocation();

    const menuItems = [
        { text: 'Home', icon: <HomeIcon />, path: '/' },
        { text: 'Subjects', icon: <AssignmentIcon />, path: '/Student/subjects' },
        { text: 'Attendance', icon: <ClassOutlinedIcon />, path: '/Student/attendance' },
        { text: 'Complain', icon: <AnnouncementOutlinedIcon />, path: '/Student/complain' },
    ];

    const userItems = [
        { text: 'Profile', icon: <AccountCircleOutlinedIcon />, path: '/Student/profile' },
        { text: 'Logout', icon: <ExitToAppIcon />, path: '/logout' },
    ];

    const isActive = (path) => location.pathname === path || location.pathname.startsWith(path);

    return (
        <>
            <React.Fragment>
                {menuItems.map((item) => (
                    <ListItemButton
                        key={item.text}
                        component={Link}
                        to={item.path}
                        sx={{
                            borderRadius: 2,
                            mb: 0.5,
                            backgroundColor: isActive(item.path) ? 'rgba(127, 86, 218, 0.12)' : 'transparent',
                            '&:hover': { backgroundColor: 'rgba(127, 86, 218, 0.2)' },
                        }}
                    >
                        <ListItemIcon sx={{ color: isActive(item.path) ? '#7f56da' : 'inherit' }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} sx={{ fontWeight: isActive(item.path) ? 600 : 400 }} />
                    </ListItemButton>
                ))}
            </React.Fragment>

            <Divider sx={{ my: 2 }} />

            <React.Fragment>
                <ListSubheader component="div" inset sx={{ fontWeight: 600, color: 'text.secondary' }}>
                    User
                </ListSubheader>
                {userItems.map((item) => (
                    <ListItemButton
                        key={item.text}
                        component={Link}
                        to={item.path}
                        sx={{
                            borderRadius: 2,
                            mb: 0.5,
                            backgroundColor: isActive(item.path) ? 'rgba(127, 86, 218, 0.12)' : 'transparent',
                            '&:hover': { backgroundColor: 'rgba(127, 86, 218, 0.2)' },
                        }}
                    >
                        <ListItemIcon sx={{ color: isActive(item.path) ? '#7f56da' : 'inherit' }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} sx={{ fontWeight: isActive(item.path) ? 600 : 400 }} />
                    </ListItemButton>
                ))}
            </React.Fragment>
        </>
    )
}

export default StudentSideBar;
