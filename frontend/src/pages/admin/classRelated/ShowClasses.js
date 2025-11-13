import { useEffect, useState } from "react";
import {
  IconButton,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  Tooltip,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../../redux/userRelated/userHandle";
import { getAllSclasses } from "../../../redux/sclassRelated/sclassHandle";
import { BlueButton, GreenButton } from "../../../components/buttonStyles";
import TableTemplate from "../../../components/TableTemplate";

import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import PostAddIcon from "@mui/icons-material/PostAdd";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import AddCardIcon from "@mui/icons-material/AddCard";
import styled from "styled-components";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Popup from "../../../components/Popup";

const ShowClasses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { sclassesList, loading, getresponse } = useSelector(
    (state) => state.sclass
  );
  const { currentUser } = useSelector((state) => state.user);

  const adminID = currentUser._id;

  useEffect(() => {
    dispatch(getAllSclasses(adminID, "Sclass"));
  }, [adminID, dispatch]);

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const deleteHandler = (deleteID, address) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this class?"
    );
    if (!confirmDelete) return;

    dispatch(deleteUser(deleteID, address))
      .then(() => {
        dispatch(getAllSclasses(adminID, "Sclass"));
        setMessage("Class deleted successfully!");
        setShowPopup(true);
      })
      .catch((err) => {
        console.error("Error deleting class:", err);
        setMessage("Failed to delete class. Please try again.");
        setShowPopup(true);
      });
  };

  const sclassColumns = [{ id: "name", label: "Class Name", minWidth: 170 }];

  const sclassRows =
    sclassesList?.map((sclass) => ({
      name: sclass.sclassName,
      id: sclass._id,
    })) || [];

  const SclassButtonHaver = ({ row }) => {
    const actions = [
      {
        icon: <PostAddIcon />,
        name: "Add Subjects",
        action: () => navigate("/Admin/addsubject/" + row.id),
      },
      {
        icon: <PersonAddAlt1Icon />,
        name: "Add Student",
        action: () => navigate("/Admin/class/addstudents/" + row.id),
      },
    ];
    return (
      <ButtonContainer>
        <IconButton
          onClick={() => deleteHandler(row.id, "Sclass")}
          color="secondary"
          sx={{ transition: "transform 0.2s", "&:hover": { transform: "scale(1.1)" } }}
        >
          <DeleteIcon color="error" />
        </IconButton>
        <BlueButton
          variant="contained"
          onClick={() => navigate("/Admin/classes/class/" + row.id)}
        >
          View
        </BlueButton>
        <ActionMenu actions={actions} />
      </ButtonContainer>
    );
  };

  const ActionMenu = ({ actions }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
      <>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Tooltip title="Add Students & Subjects">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 1, bgcolor: "background.paper", "&:hover": { bgcolor: "grey.100" } }}
              aria-controls={open ? "action-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <SpeedDialIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="action-menu"
          open={open}
          onClose={handleClose}
          PaperProps={{
            elevation: 3,
            sx: {
              overflow: "visible",
              mt: 1.5,
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {actions.map((action, idx) => (
            <MenuItem key={idx} onClick={action.action}>
              <ListItemIcon>{action.icon}</ListItemIcon>
              <Typography variant="body2">{action.name}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  };

  const actions = [
    {
      icon: <AddCardIcon color="primary" />,
      name: "Add New Class",
      action: () => navigate("/Admin/addclass"),
    },
    {
      icon: <DeleteIcon color="error" />,
      name: "Delete All Classes",
      action: () => deleteHandler(adminID, "Sclasses"),
    },
  ];

  return (
    <>
      {loading ? (
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          Loading...
        </Typography>
      ) : (
        <>
          {getresponse ? (
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <GreenButton variant="contained" onClick={() => navigate("/Admin/addclass")}>
                Add Class
              </GreenButton>
            </Box>
          ) : (
            <>
              {sclassesList?.length > 0 && (
                <TableTemplate
                  buttonHaver={SclassButtonHaver}
                  columns={sclassColumns}
                  rows={sclassRows}
                />
              )}
              <SpeedDialTemplate actions={actions} />
            </>
          )}
        </>
      )}
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default ShowClasses;

const ButtonContainer = styled(Stack)`
  flex-direction: row;
  align-items: center;
  gap: 0.8rem;
  flex-wrap: wrap;
`;
