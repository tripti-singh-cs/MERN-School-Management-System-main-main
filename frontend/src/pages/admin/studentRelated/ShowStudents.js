import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllStudents } from "../../../redux/studentRelated/studentHandle";
import { deleteUser } from "../../../redux/userRelated/userHandle";
import { Paper, Box, IconButton } from "@mui/material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import {
  BlackButton,
  BlueButton,
  GreenButton,
} from "../../../components/buttonStyles";
import TableTemplate from "../../../components/TableTemplate";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";

import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Popup from "../../../components/Popup";
import styled from "styled-components";

const ShowStudents = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { studentsList, loading, error, response } = useSelector(
    (state) => state.student
  );
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllStudents(currentUser._id));
  }, [currentUser._id, dispatch]);

  if (error) console.log(error);

  const [showPopup, setShowPopup] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const deleteHandler = (deleteID, address) => {
    console.log(deleteID, address);
    setMessage("Student deleted successfully!");
    setShowPopup(true);

    dispatch(deleteUser(deleteID, address)).then(() => {
      dispatch(getAllStudents(currentUser._id));
    });
  };

  const studentColumns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "rollNum", label: "Roll Number", minWidth: 100 },
    { id: "sclassName", label: "Class", minWidth: 170 },
  ];

  const studentRows =
    studentsList &&
    studentsList.length > 0 &&
    studentsList.map((student) => ({
      name: student.name,
      rollNum: student.rollNum,
      sclassName: student.sclassName.sclassName,
      id: student._id,
    }));

  const StudentButtonHaver = ({ row }) => {
    const options = ["Take Attendance", "Provide Marks"];
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleClick = () => {
      if (selectedIndex === 0) navigate("/Admin/students/student/attendance/" + row.id);
      else navigate("/Admin/students/student/marks/" + row.id);
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
      <ButtonContainer>
        <IconButton onClick={() => deleteHandler(row.id, "Student")}>
          <PersonRemoveIcon color="error" />
        </IconButton>
        <BlueButton
          variant="contained"
          onClick={() => navigate("/Admin/students/student/" + row.id)}
        >
          View
        </BlueButton>
        <React.Fragment>
          <ButtonGroup variant="contained" ref={anchorRef}>
            <Button onClick={handleClick}>{options[selectedIndex]}</Button>
            <BlackButton
              size="small"
              aria-controls={open ? "split-button-menu" : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="menu"
              onClick={handleToggle}
            >
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </BlackButton>
          </ButtonGroup>
          <Popper open={open} anchorEl={anchorRef.current} transition disablePortal sx={{ zIndex: 1 }}>
            {({ TransitionProps, placement }) => (
              <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem>
                      {options.map((option, index) => (
                        <MenuItem key={option} selected={index === selectedIndex} onClick={(event) => handleMenuItemClick(event, index)}>
                          {option}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </React.Fragment>
      </ButtonContainer>
    );
  };

  const actions = [
    { icon: <PersonAddAlt1Icon color="primary" />, name: "Add New Student", action: () => navigate("/Admin/addstudents") },
    { icon: <PersonRemoveIcon color="error" />, name: "Delete All Students", action: () => deleteHandler(currentUser._id, "Students") },
  ];

  return (
    <Container>
      {loading ? (
        <Box sx={{ textAlign: "center", mt: 4 }}>Loading...</Box>
      ) : (
        <>
          {response ? (
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <GreenButton variant="contained" onClick={() => navigate("/Admin/addstudents")}>Add Students</GreenButton>
            </Box>
          ) : (
            <PaperWrapper>
              {studentsList?.length > 0 && (
                <TableTemplate
                  buttonHaver={StudentButtonHaver}
                  columns={studentColumns}
                  rows={studentRows}
                />
              )}
              <SpeedDialTemplate actions={actions} />
            </PaperWrapper>
          )}
        </>
      )}
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Container>
  );
};

export default ShowStudents;

// Styled Components
const Container = styled(Box)`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @media (max-width: 600px) {
    padding: 1rem;
  }
`;

const PaperWrapper = styled(Paper)`
  width: 100%;
  overflow-x: auto;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0px 4px 16px rgba(0,0,0,0.08);
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  @media (max-width: 600px) {
    gap: 0.5rem;
  }
`;
