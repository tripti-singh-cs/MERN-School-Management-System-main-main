import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { BottomNavigation, BottomNavigationAction, Container, Paper, Table, TableBody, TableHead, Typography, Box } from '@mui/material';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import CustomBarChart from '../../components/CustomBarChart'

import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import { StyledTableCell, StyledTableRow } from '../../components/styles';
import styled from 'styled-components';

const StudentSubjects = () => {

    const dispatch = useDispatch();
    const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
    const { userDetails, currentUser, loading, response, } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id])

    const [subjectMarks, setSubjectMarks] = useState([]);
    const [selectedSection, setSelectedSection] = useState('table');

    useEffect(() => {
        if (userDetails) {
            setSubjectMarks(userDetails.examResult || []);
        }
    }, [userDetails])

    useEffect(() => {
        if (subjectMarks.length === 0) {
            dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
        }
    }, [subjectMarks, dispatch, currentUser.sclassName._id]);

    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    const renderTableSection = () => (
        <SectionContainer>
            <Typography variant="h4" align="center" gutterBottom>
                Subject Marks
            </Typography>
            <Table>
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell>Subject</StyledTableCell>
                        <StyledTableCell>Marks</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {subjectMarks.map((result, index) => {
                        if (!result.subName || !result.marksObtained) return null;
                        return (
                            <StyledTableRow key={index}>
                                <StyledTableCell>{result.subName.subName}</StyledTableCell>
                                <StyledTableCell>{result.marksObtained}</StyledTableCell>
                            </StyledTableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </SectionContainer>
    );

    const renderChartSection = () => (
        <SectionContainer>
            <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
        </SectionContainer>
    );

    const renderClassDetailsSection = () => (
        <SectionContainer>
            <Typography variant="h4" align="center" gutterBottom>
                Class Details
            </Typography>
            <Typography variant="h5" align="center" gutterBottom>
                You are currently in Class {sclassDetails && sclassDetails.sclassName}
            </Typography>
            <Typography variant="h6" align="center" gutterBottom>
                Subjects:
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="center">
                {subjectsList &&
                    subjectsList.map((subject, index) => (
                        <SubjectCard key={index}>
                            {subject.subName} ({subject.subCode})
                        </SubjectCard>
                    ))}
            </Box>
        </SectionContainer>
    );

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
                Loading...
            </Box>
        )
    }

    return (
        <>
            {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0
                ? (
                    <>
                        {selectedSection === 'table' && renderTableSection()}
                        {selectedSection === 'chart' && renderChartSection()}

                        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                            <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
                                <BottomNavigationAction
                                    label="Table"
                                    value="table"
                                    icon={selectedSection === 'table' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
                                />
                                <BottomNavigationAction
                                    label="Chart"
                                    value="chart"
                                    icon={selectedSection === 'chart' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
                                />
                            </BottomNavigation>
                        </Paper>
                    </>
                )
                : renderClassDetailsSection()
            }
        </>
    );
};

export default StudentSubjects;

const SectionContainer = styled(Container)`
    margin-top: 2rem;
    margin-bottom: 5rem;
    padding: 1rem;
`;

const SubjectCard = styled(Paper)`
    padding: 10px 20px;
    margin: 5px 0;
    width: 100%;
    max-width: 400px;
    text-align: center;
    font-weight: 500;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;
