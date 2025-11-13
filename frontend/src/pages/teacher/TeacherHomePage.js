import { Container, Grid, Paper } from '@mui/material'
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import styled from 'styled-components';
import Students from "../../assets/img1.png";
import Lessons from "../../assets/subjects.svg";
import Tests from "../../assets/assignment.svg";
import Time from "../../assets/time.svg";
import { getClassStudents, getSubjectDetails } from '../../redux/sclassRelated/sclassHandle';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const TeacherHomePage = () => {
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.user);
    const { subjectDetails, sclassStudents } = useSelector((state) => state.sclass);

    const classID = currentUser.teachSclass?._id
    const subjectID = currentUser.teachSubject?._id

    useEffect(() => {
        dispatch(getSubjectDetails(subjectID, "Subject"));
        dispatch(getClassStudents(classID));
    }, [dispatch, subjectID, classID]);

    const numberOfStudents = sclassStudents?.length || 0;
    const numberOfSessions = subjectDetails?.sessions || 0;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {[{
                    img: Students,
                    title: "Class Students",
                    value: numberOfStudents,
                    duration: 2.5,
                    color: "#4caf50"
                },{
                    img: Lessons,
                    title: "Total Lessons",
                    value: numberOfSessions,
                    duration: 3,
                    color: "#2196f3"
                },{
                    img: Tests,
                    title: "Tests Taken",
                    value: 24,
                    duration: 4,
                    color: "#ff9800"
                },{
                    img: Time,
                    title: "Total Hours",
                    value: 30,
                    duration: 4,
                    suffix: "hrs",
                    color: "#9c27b0"
                }].map((card, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <CardPaper elevation={6} color={card.color}>
                            <img src={card.img} alt={card.title} style={{ width: '50px', marginBottom: '12px' }} />
                            <Title>{card.title}</Title>
                            <Data start={0} end={card.value} duration={card.duration} suffix={card.suffix || ""} />
                        </CardPaper>
                    </Grid>
                ))}

                <Grid item xs={12}>
                    <Paper sx={{ p: { xs: 2, sm: 3 }, display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
                        <SeeNotice />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

const CardPaper = styled(Paper)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 220px;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 16px;
  transition: transform 0.3s, box-shadow 0.3s;
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0px 12px 24px rgba(0,0,0,0.15);
  }
  background-color: ${props => props.color || '#fff'};
  color: #fff;
`;

const Title = styled.p`
  font-size: 1.2rem;
  margin: 8px 0;
  font-weight: 600;
`;

const Data = styled(CountUp)`
  font-size: calc(1.5rem + .5vw);
  font-weight: 700;
`;

export default TeacherHomePage;
