import React, { useState, useEffect } from "react";
import {
  KeyboardArrowDown,
  KeyboardArrowUp
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  updateUser
} from "../../redux/userRelated/userHandle";
import { useNavigate } from "react-router-dom";
import { authLogout } from "../../redux/userRelated/userSlice";
import { Button, Collapse, Snackbar, Alert } from "@mui/material";

const AdminProfile = () => {
  const [showTab, setShowTab] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser, response, error } = useSelector(
    (state) => state.user
  );

  // 👇 Make sure backend route is lowercase (important)
  const address = "admin";

  // Initial state values
  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [password, setPassword] = useState("");
  const [schoolName, setSchoolName] = useState(
    currentUser?.schoolName || ""
  );

  // Update fields logic
  const fields =
    password === ""
      ? { name, email, schoolName }
      : { name, email, password, schoolName };

  // Submit update
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser(fields, currentUser._id, address));
  };

  // Delete admin handler
  const deleteHandler = async () => {
    try {
      await dispatch(deleteUser(currentUser._id, "students"));
      await dispatch(deleteUser(currentUser._id, address));
      dispatch(authLogout());
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  // Snackbar feedback
  useEffect(() => {
    if (response) {
      setSnackbarMsg("Profile updated successfully!");
      setSnackbarType("success");
      setOpenSnackbar(true);
      setShowTab(false);
    } else if (error) {
      setSnackbarMsg("Something went wrong! Please try again.");
      setSnackbarType("error");
      setOpenSnackbar(true);
    }
  }, [response, error]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Admin Profile</h2>

      <div style={styles.infoBox}>
        <p>
          <strong>Name:</strong> {currentUser?.name}
        </p>
        <p>
          <strong>Email:</strong> {currentUser?.email}
        </p>
        <p>
          <strong>School:</strong> {currentUser?.schoolName}
        </p>
      </div>

      <div style={styles.buttonGroup}>
        <Button
          variant="contained"
          color="error"
          sx={styles.deleteButton}
          onClick={deleteHandler}
        >
          Delete Account
        </Button>

        <Button
          variant="contained"
          sx={styles.showButton}
          onClick={() => setShowTab(!showTab)}
          startIcon={
            showTab ? <KeyboardArrowUp /> : <KeyboardArrowDown />
          }
        >
          {showTab ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      <Collapse in={showTab} timeout="auto" unmountOnExit>
        <div style={styles.formBox}>
          <form onSubmit={submitHandler} style={styles.form}>
            <h3 style={styles.formTitle}>Edit Details</h3>

            <label style={styles.label}>Name</label>
            <input
              type="text"
              placeholder="Enter your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />

            <label style={styles.label}>School</label>
            <input
              type="text"
              placeholder="Enter your school name..."
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              required
              style={styles.input}
            />

            <label style={styles.label}>Email</label>
            <input
              type="email"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />

            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Enter new password (optional)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />

            <button type="submit" style={styles.submitButton}>
              Update
            </button>
          </form>
        </div>
      </Collapse>

      {/* Snackbar for feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarType}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AdminProfile;

// ---------- Styling ----------
const styles = {
  container: {
    maxWidth: "500px",
    margin: "40px auto",
    padding: "20px",
    background: "#f8f9fa",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontFamily: "Poppins, sans-serif"
  },
  title: {
    textAlign: "center",
    color: "#270843",
    marginBottom: "15px"
  },
  infoBox: {
    lineHeight: "1.8",
    color: "#333",
    marginBottom: "20px"
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px"
  },
  deleteButton: {
    backgroundColor: "#d32f2f",
    "&:hover": { backgroundColor: "#b71c1c" }
  },
  showButton: {
    backgroundColor: "#270843",
    "&:hover": { backgroundColor: "#3f1068" }
  },
  formBox: {
    marginTop: "20px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  formTitle: {
    textAlign: "center",
    marginBottom: "10px",
    color: "#270843"
  },
  label: {
    fontWeight: "500"
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none"
  },
  submitButton: {
    marginTop: "10px",
    background: "#270843",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600"
  }
};
