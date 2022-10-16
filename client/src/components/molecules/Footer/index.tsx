import React from 'react';
import { FooterWrapper } from './styled';
import Box from '@mui/material/Box';
import styled from 'styled-components';
const StyledBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 110px;
`;
const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <StyledBody>
        <img height='30px' src='../../../public/img/only_logo.svg' />

        <Box sx={{ margin: '5px 0 0 20px' }}>
          <p>{`Copyright © KNUD4 All Rights Reserved.`}</p>
        </Box>
      </StyledBody>
    </FooterWrapper>
  );
};

export default Footer;
