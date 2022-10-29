import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { accessTokenState, handleRefreshAccountAccessToken, ProfileState } from '~/others/store';
import myAxios from '~/others/myAxios';
import MenuItem from '@mui/material/MenuItem';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import Button from '@mui/material/Button';
const StyledImg = styled.img`
  margin: 0px 2px;
  height: 60px;
`;

const StyledImg2 = styled.img`
  height: 105px;
`;

const StyledUp = styled.img`
  width: 230px;
  position: fixed;
  right: 0px;
  up: 0px;
`;
//이미지와 텍스트를 감싸고 있는 요소
const StyledContainer = styled.div`
  position: relative;
`;
// 텍스트를 감싸고 있는 요소
const StyledContainerText = styled.h3`
  width: 300px;
  position: relative;
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 35px;
  transform: translate(-50%, -50%);
  color: white;
  font-family: BlinkMacSystemFont;
`;

const StyledContainerButton = styled.div`
  display: 'flex';
  alignitems: 'center';
  width: 200px;
`;

interface HeadereProps {
  accessToken: accessTokenState;
  profileData: ProfileState;
}

const HeaderElder = ({ accessToken, profileData }: HeadereProps) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const navigate = useNavigate();
  const handleLogOutAndRedirect = async () => {
    handleCloseUserMenu();
    handleRefreshAccountAccessToken('');
    await myAxios('get', `api/v1/auth/accounts/logout`, null, true, accessToken.accountAccessToken);

    navigate('/sign');
  };
  const [isClicked, SetIsClicked] = React.useState<boolean>(false);

  const handleOpenMode = () => {
    const newIsClicked = !isClicked;
    SetIsClicked(newIsClicked);
  };

  return (
    <AppBar sx={{ background: 'white' }} elevation={0} position='fixed'>
      <Container maxWidth='xl'>
        <StyledUp src='../../public/img/up_elder.png' />
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
            to='/elder'
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
            to='/elder'
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 4,
              fontFamily: 'monospace',
              fontWeight: 700,
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
              flexDirection: 'row',
            }}
            padding={2}
            margin={3}
          >
            <StyledContainerButton>
              <Button
                disableRipple
                sx={{
                  my: 2,
                  color: 'black',
                  width: '170px',
                  height: '40px',
                  textAlign: 'center',
                  fontSize: '28px',
                  fontWeight: 800,
                  margin: '30px 0px 5px 30px',
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                }}
                onClick={handleOpenMode}
              >
                EASY
                {isClicked ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </Button>
              <Button
                disableRipple
                sx={{
                  color: 'black',
                  width: '168px',
                  height: '40px',
                  textAlign: 'center',
                  fontSize: '28px',
                  fontWeight: 800,
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                }}
                component={Link}
                to={'/'}
              >
                {isClicked && 'BASIC'}
              </Button>
            </StyledContainerButton>

            <StyledContainer>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <StyledImg2 src='../../public/img/house.png' />
                <StyledContainerText>
                  {profileData.lineName} {profileData.houseName}
                </StyledContainerText>
              </IconButton>
            </StyledContainer>

            <Menu
              sx={{ mt: '65px' }}
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

export default HeaderElder;
