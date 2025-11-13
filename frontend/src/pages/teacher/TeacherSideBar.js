import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import { useSelector } from 'react-redux';

const TeacherSideBar = () => {
    const { currentUser } = useSelector((state) => state.user);
    const sclassName = currentUser.teachSclass;

    const location = useLocation();

    const menuItems = [
        { text: 'Home', icon: <HomeIcon />, path: '/' },
        { text: `Class ${sclassName.sclassName}`, icon: <ClassOutlinedIcon />, path: '/Teacher/class' },
        { text: 'Complain', icon: <AnnouncementOutlinedIcon />, path: '/Teacher/complain' },
    ];

    const userItems = [
        { text: 'Profile', icon: <AccountCircleOutlinedIcon />, path: '/Teacher/profile' },
        { text: 'Logout', icon: <ExitToAppIcon />, path: '/logout' },
    ];

    const isActive = (path) => location.pathname.startsWith(path);

    return (
        <>
            <React.Fragment>
                {menuItems.map((item) => (
                    <ListItemButton
                        key={item.text}
                        component={Link}
                        to={item.path}
                        sx={{
                            mb: 1,
                            borderRadius: 2,
                            transition: '0.3s',
                            bgcolor: isActive(item.path) ? 'primary.light' : 'transparent',
                            '&:hover': {
                                bgcolor: 'primary.lighter',
                                transform: 'scale(1.02)',
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: isActive(item.path) ? 'primary.main' : 'inherit' }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText
                            primary={item.text}
                            primaryTypographyProps={{ fontWeight: isActive(item.path) ? 'bold' : 'medium' }}
                        />
                    </ListItemButton>
                ))}
            </React.Fragment>

            <Divider sx={{ my: 2 }} />

            <React.Fragment>
                <ListSubheader component="div" inset sx={{ fontWeight: 'bold', mb: 1 }}>
                    User
                </ListSubheader>
                {userItems.map((item) => (
                    <ListItemButton
                        key={item.text}
                        component={Link}
                        to={item.path}
                        sx={{
                            mb: 1,
                            borderRadius: 2,
                            transition: '0.3s',
                            bgcolor: isActive(item.path) ? 'primary.light' : 'transparent',
                            '&:hover': {
                                bgcolor: 'primary.lighter',
                                transform: 'scale(1.02)',
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: isActive(item.path) ? 'primary.main' : 'inherit' }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText
                            primary={item.text}
                            primaryTypographyProps={{ fontWeight: isActive(item.path) ? 'bold' : 'medium' }}
                        />
                    </ListItemButton>
                ))}
            </React.Fragment>
        </>
    );
}

export default TeacherSideBar;
