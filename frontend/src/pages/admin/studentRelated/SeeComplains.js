import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Box, Checkbox, Typography } from '@mui/material';
import { getAllComplains } from '../../../redux/complainRelated/complainHandle';
import TableTemplate from '../../../components/TableTemplate';
import styled from 'styled-components';

const SeeComplains = () => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const dispatch = useDispatch();
  const { complainsList, loading, error, response } = useSelector((state) => state.complain);
  const { currentUser } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getAllComplains(currentUser._id, "Complain"));
  }, [currentUser._id, dispatch]);

  if (error) {
    console.log(error);
  }

  const complainColumns = [
    { id: 'user', label: 'User', minWidth: 170 },
    { id: 'complaint', label: 'Complaint', minWidth: 100 },
    { id: 'date', label: 'Date', minWidth: 170 },
  ];

  const complainRows = complainsList && complainsList.length > 0 && complainsList.map((complain) => {
    const date = new Date(complain.date);
    const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
    return {
      user: complain.user.name,
      complaint: complain.complaint,
      date: dateString,
      id: complain._id,
    };
  });

  const ComplainButtonHaver = ({ row }) => (
    <Checkbox {...label} />
  );

  return (
    <Container>
      {loading ?
        <Typography variant="h6" align="center">Loading...</Typography>
        :
        <>
          {response ?
            <NoComplainsBox>
              <Typography variant="h6" color="textSecondary">No Complains Right Now</Typography>
            </NoComplainsBox>
            :
            <PaperWrapper>
              {Array.isArray(complainsList) && complainsList.length > 0 &&
                <TableTemplate buttonHaver={ComplainButtonHaver} columns={complainColumns} rows={complainRows} />
              }
            </PaperWrapper>
          }
        </>
      }
    </Container>
  );
};

export default SeeComplains;

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
  box-shadow: 0px 4px 16px rgba(0,0,0,0.1);
`;

const NoComplainsBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 2rem;
`;
