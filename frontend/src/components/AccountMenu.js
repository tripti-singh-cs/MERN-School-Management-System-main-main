import React, { useState } from 'react';
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { Settings, Logout } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { currentRole, currentUser } = useSelector((state) => state.user);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Tooltip title="Account settings" arrow>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{
              ml: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.1)',
                backgroundColor: 'rgba(25, 118, 210, 0.1)',
              },
            }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: 'primary.main',
                color: 'white',
                fontWeight: 600,
                fontSize: '1rem',
              }}
            >
              {String(currentUser.name).charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 3,
          sx: styles.styledPaper,
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          component={Link}
          to={`/${currentRole}/profile`}
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.08)',
            },
          }}
        >
          <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main' }} />
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            Profile
          </Typography>
        </MenuItem>

        <Divider sx={{ my: 1 }} />

        <MenuItem
          onClick={handleClose}
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.08)',
            },
          }}
        >
          <ListItemIcon>
            <Settings fontSize="small" color="action" />
          </ListItemIcon>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            Settings
          </Typography>
        </MenuItem>

        <MenuItem
          component={Link}
          to="/logout"
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(211, 47, 47, 0.08)',
            },
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" color="error" />
          </ListItemIcon>
          <Typography
            variant="body1"
            sx={{ fontWeight: 500, color: 'error.main' }}
          >
            Logout
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountMenu;

const styles = {
  styledPaper: {
    overflow: 'visible',
    borderRadius: '12px',
    minWidth: 180,
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(255,255,255,0.95)',
    filter: 'drop-shadow(0px 4px 12px rgba(0,0,0,0.15))',
    mt: 1.5,
    transition: 'all 0.3s ease',
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 16,
      width: 12,
      height: 12,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
};
