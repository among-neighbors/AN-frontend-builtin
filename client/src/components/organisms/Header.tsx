import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SquareImg from '../atoms/Img';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fontSize } from '@mui/system';

const StyledImg = styled.img`
    margin: 0px 2px;
    height: 67px;
  
    }
`;

const StyledImg2 = styled.img`
    margin: 0px 2px;
    height: 75px;
  
    }
`;

const StyledUp = styled.img`

    width: 400px;
  
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
    link: 'complaint',
  },
  {
    name: '커뮤니티',
    link: 'community',
  },
];
const settings = ['로그아웃'];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar style={{ background: '#F5F5F5'  }} elevation={0}  position='fixed' >
      <Container maxWidth='xl'>
        <Toolbar disableGutters sx={{
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'space-between',
              flexDirection:'row',
            }}>
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
        
          
          <Box sx={{
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'space-between',
              flexDirection:'row',
            }} padding={1} margin={5}>
              
            
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block', width:'140px', textAlign:'center' , fontSize:'24px' }}
                component={Link}
                to={page.link}
              > 
                {page.name} 
              </Button>
            ))}
             <Tooltip title='Open settings'>
              <IconButton onClick={handleCloseUserMenu} component={Link} to='/sign' sx={{ p: 0 }}>
              <StyledImg2 src='/img/house.png' />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign='center'>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

        
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;