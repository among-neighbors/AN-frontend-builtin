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
import { Link, Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import {
  accessTokenState,
  handleHelpSideBar,
  handleRefreshAccountAccessToken,
  ProfileState,
} from '~/others/store';
import myAxios from '~/others/myAxios';

const StyledImg = styled.img`
    margin: 0px 2px;
    height: 67px;
  
    }
`;
// 이미지와 텍스트를 감싸고 있는 요소
const StyledWrap = styled.div`
  position: relative;

    }
`;

const StyledImg2 = styled.img`
    margin: 0px 2px;
    height: 75px;
  
    }
`;

const StyledUp = styled.img`
  
    width: 500px;
    background-position: 10% 100px;
    position: fixed;
    right: 0px;
    up: 0px;
    }
`;
//이미지와 텍스트를 감싸고 있는 요소
const StyledContainer = styled.div`
  position: relative;
  }
`;
// 텍스트를 감싸고 있는 요소
const StyledContainerText = styled.h4`
  width: 200px;
  position: relative;
  position: absolute;
	top: 50%;
	left: 50%;
  transform: translate( -50%, -50% );
  color:white;
  font-family: BlinkMacSystemFont;
  }
`;
const pages: {
  name: string;
  link: string;
}[] = [
  {
    name: '공지',
    link: '/notice',
  },
  {
    name: '민원',
    link: '/complaint',
  },
  {
    name: '커뮤니티',
    link: '/community',
  },
];
const settings = ['로그아웃'];

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
  const navigate = useNavigate();
  const handleLogOutAndRedirect = async () => {
    handleCloseUserMenu();
    handleRefreshAccountAccessToken('');
    await myAxios('get', `api/v1/auth/accounts/logout`, null, true, accessToken.accountAccessToken);

    navigate('/sign');
  };

  return (
    <AppBar sx={{ background: '#F5F5F5' }} elevation={0} position='fixed'>
      <Container maxWidth='xl'>
        <StyledUp src='/img/up.png' />
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
            <StyledImg src='/img/Logo2.png' />
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
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'black',
              textDecoration: 'none',
              alignItems: 'center',
            }}
          >
            <StyledImg src='/img/Logo2.png' />
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
            {pages.map((page) => (
              <Button
                key={page.name}
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
            ))}

            <StyledContainer>
              <IconButton onClick={handleOpenUserMenu}>
                <StyledImg2 src='/img/house.png' />
                <StyledContainerText>
                  {profileData.lineName}동 {profileData.houseName}호
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
