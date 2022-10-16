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
        <Box sx={{ margin: '10px 50px 10px 0px' }}>
          <img height='50px' src='../../../public/img/icon_grey.png' />
        </Box>

        <Box className='contact'>
          <p>{`Copyright © KNUD4 All Rights Reserved.`}</p>
        </Box>
      </StyledBody>
    </FooterWrapper>
  );
};

export default Footer;
