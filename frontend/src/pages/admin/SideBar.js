import * as React from 'react'; 
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ReportIcon from '@mui/icons-material/Report';
import AssignmentIcon from '@mui/icons-material/Assignment';

const SideBar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname.startsWith(path);

    const menuItems = [
        { name: "Home", path: "/", icon: <HomeIcon /> },
        { name: "Classes", path: "/Admin/classes", icon: <ClassOutlinedIcon /> },
        { name: "Subjects", path: "/Admin/subjects", icon: <AssignmentIcon /> },
        { name: "Teachers", path: "/Admin/teachers", icon: <SupervisorAccountOutlinedIcon /> },
        { name: "Students", path: "/Admin/students", icon: <PersonOutlineIcon /> },
        { name: "Notices", path: "/Admin/notices", icon: <AnnouncementOutlinedIcon /> },
        { name: "Complains", path: "/Admin/complains", icon: <ReportIcon /> },
    ];

    const userItems = [
        { name: "Profile", path: "/Admin/profile", icon: <AccountCircleOutlinedIcon /> },
        { name: "Logout", path: "/logout", icon: <ExitToAppIcon /> },
    ];

    return (
        <>
            <React.Fragment>
                {menuItems.map((item, idx) => (
                    <ListItemButton
                        key={idx}
                        component={Link}
                        to={item.path}
                        sx={{
                            borderRadius: 2,
                            mb: 0.5,
                            '&:hover': { backgroundColor: '#f0f0f0' },
                            backgroundColor: isActive(item.path) ? 'rgba(127, 86, 218, 0.1)' : 'inherit'
                        }}
                    >
                        <ListItemIcon sx={{ color: isActive(item.path) ? '#7f56da' : 'inherit' }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText 
                            primary={item.name} 
                            primaryTypographyProps={{ fontWeight: isActive(item.path) ? 600 : 400, fontSize: '0.95rem' }}
                        />
                    </ListItemButton>
                ))}
            </React.Fragment>

            <Divider sx={{ my: 1, borderColor: '#ddd' }} />

            <React.Fragment>
                <ListSubheader component="div" inset sx={{ fontSize: '0.85rem', color: '#777', mb: 0.5 }}>
                    User
                </ListSubheader>
                {userItems.map((item, idx) => (
                    <ListItemButton
                        key={idx}
                        component={Link}
                        to={item.path}
                        sx={{
                            borderRadius: 2,
                            mb: 0.5,
                            '&:hover': { backgroundColor: '#f0f0f0' },
                            backgroundColor: isActive(item.path) ? 'rgba(127, 86, 218, 0.1)' : 'inherit'
                        }}
                    >
                        <ListItemIcon sx={{ color: isActive(item.path) ? '#7f56da' : 'inherit' }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText 
                            primary={item.name} 
                            primaryTypographyProps={{ fontWeight: isActive(item.path) ? 600 : 400, fontSize: '0.95rem' }}
                        />
                    </ListItemButton>
                ))}
            </React.Fragment>
        </>
    )
}

export default SideBar;
