import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import styled from 'styled-components';
import { handleRefreshAccountAccessToken } from '~/others/store';
import { useNavigate } from 'react-router';
import myAxios from '~/others/myAxios';

const StyledImg = styled.img`
    margin: 0px 90px;
    height: 83px;
    }
`;

const StyledBody = styled.div`
    height: 100vh;
    background-color: #EC8034;
    display: flex;
    align-items: center;
    justify-content: center;
    }
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
    } catch (err) {
      alert(err);
    }
  };

  return (
    <StyledBody>
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
          <StyledImg src='../../img/Logo.png' />
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
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </StyledBody>
  );
};

export default SignIn;
