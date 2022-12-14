import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

import { accessTokenState, handleRefreshAccountAccessToken, ProfileState } from '~/others/store';
import myAxios from '~/others/myAxios';

const StyledImg = styled.img`
  margin: 0 0 0 2px;
  height: 50px;
`;

const StyledImg2 = styled.img`
  height: 80px;
`;

const StyledUp = styled.img`
  width: 500px;
  background-position: 10% 100px;
  position: fixed;
  right: 0px;
  up: 0px;
`;
//이미지와 텍스트를 감싸고 있는 요소
const StyledContainer = styled.div`
  position: relative;
`;
// 텍스트를 감싸고 있는 요소
const StyledContainerText = styled.h4`
  width: 200px;
  position: relative;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
`;
const StyledContainerButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 110px;
  height: 100px;
`;

interface HeadereProps {
  accessToken: accessTokenState;
  profileData: ProfileState;
}

const Header = ({ accessToken, profileData }: HeadereProps) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const [isClicked, SetIsClicked] = React.useState<boolean>(false);

  const handleOpenMode = () => {
    const newIsClicked = !isClicked;
    SetIsClicked(newIsClicked);
  };

  const navigate = useNavigate();
  const handleLogOutAndRedirect = async () => {
    handleCloseUserMenu();
    handleRefreshAccountAccessToken('');
    await myAxios('get', `api/v1/auth/accounts/logout`, null, true, accessToken.accountAccessToken);

    navigate('/sign');
  };

  return (
    <AppBar sx={{ background: 'white' }} elevation={0} position='fixed'>
      <Container maxWidth='xl'>
        <StyledUp src='../../public/img/up.png' />
        <Toolbar
          disableGutters
          sx={{
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}
        >
          <Typography
            variant='h6'
            noWrap
            component={Link}
            to='/'
            sx={{
              mr: 4,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              textDecoration: 'none',
            }}
          >
            <StyledImg src='../../public/img/logo.svg' />
          </Typography>

          <Typography
            variant='h5'
            noWrap
            component={Link}
            to='/'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 4,
              fontFamily: 'monospace',
              fontWeight: 600,
              letterSpacing: '.1rem',
              color: 'black',
              textDecoration: 'none',
              alignItems: 'center',
            }}
          >
            <StyledImg src='../../public/img/logo.svg' />
          </Typography>

          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}
            padding={2}
            margin={2}
          >
            <StyledContainerButton>
              <Button
                disableRipple
                sx={{
                  my: 2,
                  color: 'black',
                  width: '100%',
                  height: '30%',
                  textAlign: 'center',
                  fontSize: '20px',
                  fontWeight: 800,
                  margin: '40px 0px 0px 30px',
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                }}
                onClick={handleOpenMode}
              >
                BASIC
                {isClicked ? <ChevronUpIcon width='10px' /> : <ChevronDownIcon />}
              </Button>
              <Button
                disableRipple
                sx={{
                  color: 'black',
                  width: '100%',
                  height: '30%',
                  textAlign: 'center',
                  fontSize: '20px',
                  fontWeight: 800,
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                }}
                component={Link}
                to={'/elder'}
              >
                {isClicked && 'EASY'}
              </Button>
            </StyledContainerButton>

            <StyledContainer>
              <IconButton onClick={handleOpenUserMenu}>
                <StyledImg2 src='../../public/img/house.png' />
                <StyledContainerText>
                  {profileData.lineName} {profileData.houseName}
                </StyledContainerText>
              </IconButton>
            </StyledContainer>

            <Menu
              sx={{ mt: '70px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleLogOutAndRedirect}>
                <Typography textAlign='center'>로그아웃</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
