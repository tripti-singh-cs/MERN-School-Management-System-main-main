import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { Paper, Box, IconButton, CircularProgress, Typography } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import TableTemplate from '../../../components/TableTemplate';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';

const ShowSubjects = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { subjectsList, loading, error, response } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if(currentUser?._id){
            dispatch(getSubjectList(currentUser._id, "AllSubjects"));
        }
    }, [currentUser?._id, dispatch]);

    if (error) console.log(error);

    const deleteHandler = (deleteID, address) => {
        setMessage("Subject deleted successfully!");
        setShowPopup(true);
        dispatch(deleteUser(deleteID, address))
            .then(() => dispatch(getSubjectList(currentUser._id, "AllSubjects")));
    };

    const subjectColumns = [
        { id: 'subName', label: 'Subject Name', minWidth: 170 },
        { id: 'sessions', label: 'Sessions', minWidth: 120 },
        { id: 'sclassName', label: 'Class', minWidth: 150 },
    ];

    const subjectRows = subjectsList.map((subject) => ({
        subName: subject.subName,
        sessions: subject.sessions,
        sclassName: subject.sclassName.sclassName,
        sclassID: subject.sclassName._id,
        id: subject._id,
    }));

    const SubjectsButtonHaver = ({ row }) => (
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <IconButton onClick={() => deleteHandler(row.id, "Subject")}>
                <DeleteIcon color="error" />
            </IconButton>
            <BlueButton variant="contained" onClick={() => navigate(`/Admin/subjects/subject/${row.sclassID}/${row.id}`)}>
                View
            </BlueButton>
        </Box>
    );

    const actions = [
        {
            icon: <PostAddIcon color="primary" />,
            name: 'Add New Subject',
            action: () => navigate("/Admin/subjects/chooseclass")
        },
        {
            icon: <DeleteIcon color="error" />,
            name: 'Delete All Subjects',
            action: () => deleteHandler(currentUser._id, "Subjects")
        }
    ];

    return (
        <>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                        <GreenButton variant="contained" onClick={() => navigate("/Admin/subjects/chooseclass")}>
                            Add Subjects
                        </GreenButton>
                    </Box>
                    <Paper sx={{ width: '100%', overflow: 'auto', p: 2, borderRadius: 2, boxShadow: 3 }}>
                        {Array.isArray(subjectsList) && subjectsList.length > 0 ? (
                            <TableTemplate buttonHaver={SubjectsButtonHaver} columns={subjectColumns} rows={subjectRows} />
                        ) : (
                            <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>No subjects found. Add new subjects to get started.</Typography>
                        )}
                        <SpeedDialTemplate actions={actions} />
                    </Paper>
                </>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default ShowSubjects;
