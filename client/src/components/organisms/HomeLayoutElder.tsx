import * as React from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { borderRadius } from '@mui/system';
const StyledBody = styled.div`
    height: 100vh;
    background-color: #F5F5F5;
    display: flex;
    justify-content: center;
    align-items: center;
   

    }
`;

const StyledImg = styled.img`
width: 104px;
height: 101px;
position: fixed;
right: 50px;
bottom: 50px;
    }
`;
const pages: {
  name: string;
  link: string;
  src: string;
}[] = [
  {
    name: '공지',
    link: '/noticeElder',
    src: '/img/notice.png',
  },
  {
    name: '민원',
    link: '/complaintElder',
    src: '/img/complaint.png',
  },
  {
    name: '커뮤니티',
    link: '/communityElder',
    src: '/img/community.png',
  },
];

const StyledBtn = styled.img`
  
    width: 140px;
    height: 140px;
    margin: 20px;
    }
`;

const StyledDown = styled.img`
  
    width: 350px;
    background-position: 10% 100px;
    position: fixed;
    left: 0px;
    bottom: 0px;
    }
`;

const HomeElder = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      id: data.get('id'),
    });
  };

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
    <StyledBody>
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
            variant='outlined'
            key={page.name}
            onClick={handleCloseNavMenu}
            sx={{
              my: 2,
              color: 'black',
              display: 'block',
              width: '272px',
              height: '261px',
              textAlign: 'center',
              fontSize: '24px',
              fontWeight: 900,
              margin: '108px',
              borderRadius: '40px',
              border: '4px solid #EC8034',
            }}
            component={Link}
            to={page.link}
          >
            <div>
              <StyledBtn src={page.src} />
            </div>

            {page.name}
          </Button>
        ))}
      </Box>
      <IconButton sx={{ p: 0 }}>
        <StyledImg src='/img/warning.png' />
      </IconButton>
      <StyledDown src='/img/down_elder.png' />
    </StyledBody>
  );
};

export default HomeElder;
