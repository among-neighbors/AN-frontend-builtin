import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import styled from 'styled-components';
import { handleRefreshAccountAccessToken, makeNotification } from '~/others/store';
import { useNavigate } from 'react-router';
import myAxios from '~/others/myAxios';
import { AxiosError } from 'axios';
import { CustomAxiosResponse } from '~/others/integrateInterface';

const StyledImg = styled.img`
  margin: 10px 90px;
  height: 65px;
`;

const StyledBody = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #;
  display: flex;
  align-items: center;
  justify-content: center;
  const StyledImg = styled.img;
  position: relative;
`;

const StyledBackground = styled.img`
  width: 100%;
  height: 100%;
`;

const StyledContainer = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  justify-contents: center;
`;

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const body = {
        username: data.get('username'),
        passwd: data.get('password'),
      };
      console.log(body);
      const res = await myAxios('post', 'api/v1/auth/accounts/login', body, true);

      handleRefreshAccountAccessToken(res.data.response.accessToken);
      navigate('/faceDetection');
    } catch (error) {
      const err = error as AxiosError;
      makeNotification((err.response as CustomAxiosResponse).data.message);
    }
  };

  return (
    <StyledBody>
      <StyledBackground src='../../public/img/background.svg' />
      <StyledContainer>
        {' '}
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifycontent: 'center',
            }}
          >
            <StyledImg src='../../public/img/logo.svg' />
            <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin='normal'
                required
                fullWidth
                id='username'
                label='Username'
                name='username'
                autoComplete='username'
                autoFocus
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='secondary'
                sx={{ mt: 3, mb: 2 }}
              >
                로그인
              </Button>
            </Box>
          </Box>
        </Container>
      </StyledContainer>
    </StyledBody>
  );
};

export default SignIn;
