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
import { MenuItem } from '@mui/material';
const StyledImg = styled.img`
  margin: 0px 2px;
  height: 60px;
`;

const StyledImg2 = styled.img`
  height: 105px;
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

// const pages: {
//   name: string;
//   link: string;
// }[] = [
//   {
//     name: '공지',
//     link: '/notice',
//   },
//   {
//     name: '민원',
//     link: '/complaint',
//   },
//   {
//     name: '커뮤니티',
//     link: '/community',
//   },
// ];
// const settings = ['로그아웃'];

interface HeadereProps {
  accessToken: accessTokenState;
  profileData: ProfileState;
}

const HeaderElderDefualt = ({ accessToken, profileData }: HeadereProps) => {
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

  return (
    <AppBar sx={{ background: '#FFF' }} elevation={0} position='fixed'>
      <Container maxWidth='xl'>
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
            {/* {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'black',
                  display: 'block',
                  width: '140px',
                  textAlign: 'center',
                  fontSize: '24px',
                  fontWeight: 900,
                }}
                component={Link}
                to={page.link}
              >
                {page.name}
              </Button>
            ))} */}

            <StyledContainer>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <StyledImg2 src='../../public/img/house.png' />
                <StyledContainerText>
                  {profileData.lineName} {profileData.houseName}호
                </StyledContainerText>
              </IconButton>
            </StyledContainer>

            <Menu
              sx={{ mt: '60px' }}
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

export default HeaderElderDefualt;
