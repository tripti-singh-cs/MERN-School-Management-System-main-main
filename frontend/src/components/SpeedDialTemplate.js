import React from 'react';
import { SpeedDial, SpeedDialAction, styled, Tooltip, Zoom } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';

const SpeedDialTemplate = ({ actions }) => {
    return (
        <CustomSpeedDial
            ariaLabel="SpeedDial playground example"
            icon={<TuneIcon />}
            direction="left"
            FabProps={{ sx: { boxShadow: '0 6px 20px rgba(0,0,0,0.3)' } }}
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={<Tooltip title={action.name} arrow TransitionComponent={Zoom} />}
                    onClick={action.action}
                    sx={{
                        '& .MuiSpeedDialAction-fab': {
                            bgcolor: '#065f46',
                            '&:hover': { bgcolor: '#10b981' },
                        },
                        '& .MuiTooltip-tooltip': {
                            fontSize: '0.875rem',
                            backgroundColor: '#111',
                        }
                    }}
                />
            ))}
        </CustomSpeedDial>
    );
};

export default SpeedDialTemplate;

const CustomSpeedDial = styled(SpeedDial)`
  .MuiSpeedDial-fab {
    background-color: #032803;
    color: #fff;
    width: 60px;
    height: 60px;
    &:hover {
      background-color: #16a34a;
      transform: scale(1.05);
      transition: all 0.3s ease;
    }
  }
`;
