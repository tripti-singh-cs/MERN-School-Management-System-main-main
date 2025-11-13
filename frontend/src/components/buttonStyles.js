import styled from 'styled-components';
import { Button } from '@mui/material';

/* 🔥 Base button style (applied to all buttons) */
const BaseButton = styled(Button)`
  && {
    border-radius: 10px;
    font-weight: 600;
    text-transform: none;
    letter-spacing: 0.5px;
    transition: all 0.3s ease-in-out;
    padding: 8px 18px;
    font-size: 0.95rem;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.25);
    }

    @media (max-width: 600px) {
      font-size: 0.85rem;
      padding: 7px 14px;
      border-radius: 8px;
    }
  }
`;

/* 🔴 Red Button */
export const RedButton = styled(BaseButton)`
  && {
    background-color: #ff2d2d;
    color: white;

    &:hover {
      background-color: #eb7979;
    }
  }
`;

/* ⚫ Black Button */
export const BlackButton = styled(BaseButton)`
  && {
    background-color: #000000;
    color: #ffffff;

    &:hover {
      background-color: #212020;
    }
  }
`;

/* 🔺 Dark Red Button */
export const DarkRedButton = styled(BaseButton)`
  && {
    background-color: #650909;
    color: white;

    &:hover {
      background-color: #a62c2c;
    }
  }
`;

/* 🔵 Blue Button */
export const BlueButton = styled(BaseButton)`
  && {
    background: linear-gradient(135deg, #0a1e82, #080a43);
    color: #fff;

    &:hover {
      background: linear-gradient(135deg, #101fab, #0a1e82);
    }
  }
`;

/* 🟣 Purple Button */
export const PurpleButton = styled(BaseButton)`
  && {
    background: linear-gradient(135deg, #3f1068, #270843);
    color: #fff;

    &:hover {
      background: linear-gradient(135deg, #5a1b9a, #3f1068);
    }
  }
`;

/* 💜 Light Purple Button */
export const LightPurpleButton = styled(BaseButton)`
  && {
    background: linear-gradient(135deg, #7f56da, #9c6df5);
    color: #fff;

    &:hover {
      background: linear-gradient(135deg, #7a1ccb, #8f3de0);
    }
  }
`;

/* 🟢 Green Button */
export const GreenButton = styled(BaseButton)`
  && {
    background: linear-gradient(135deg, #266810, #133104);
    color: #fff;

    &:hover {
      background: linear-gradient(135deg, #358d16, #1b4208);
    }
  }
`;

/* 🟤 Brown Button */
export const BrownButton = styled(BaseButton)`
  && {
    background: linear-gradient(135deg, #40220c, #2c1006);
    color: white;

    &:hover {
      background: linear-gradient(135deg, #5a3112, #3a1a08);
    }
  }
`;

/* 🟪 Indigo Button */
export const IndigoButton = styled(BaseButton)`
  && {
    background: linear-gradient(135deg, #534ea6, #2f2b80);
    color: white;

    &:hover {
      background: linear-gradient(135deg, #6e67c2, #3d389a);
    }
  }
`;
