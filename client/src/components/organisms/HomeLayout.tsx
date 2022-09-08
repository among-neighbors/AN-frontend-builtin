import * as React from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import {
  accessTokenState,
  handleHelpSideBar,
} from '~/others/store';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { shadowCssForMUI } from '~/others/cssLibrary';
import Button from '@mui/material/Button';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';

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

const StyledIllust = styled.img`
  
    width: 450px;
  
    }
`;

const StyledDown = styled.img`
  
    width: 420px;
    background-position: 10% 100px;
    position: fixed;
    left: 0px;
    bottom: 0px;
    }
`;

const StyledMenu = styled.img`
  
    width: 420px;
    background-position: 10% 100px;
    position: fixed;
    left: 0px;
    bottom: 50px;
    }
`;


const Home = () => {
  const [anchorElHelpCall, setAnchorElHelpCall] = React.useState<null | HTMLElement>(null);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      id: data.get('id'),
    });
  };

  const handleOpenHelpCallModal = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElHelpCall(event.currentTarget);
  };

  const handleCloseHelpCallModal = () => {
    setAnchorElHelpCall(null);
  };

  return (
    <StyledBody>
      <StyledIllust src='img/homeIllust.png' />
      <IconButton onClick={handleOpenHelpCallModal} sx={{ p: 0 }}>
        <StyledImg src='/img/warning.png' />
      </IconButton>
    
      <Menu
          open={Boolean(anchorElHelpCall)}
          onClose={handleCloseHelpCallModal}
          sx={{ mt: '10px', '& ul': {padding: 0,},}}>
        <Box sx={{ position: 'fixed', right: '40px', bottom: '170px', width: '350px', height: '150px', ...shadowCssForMUI }}>
            <Typography
                sx={{
                        fontSize: '18px',
                        lineHeight: '28px',
                        height: '55px',
                        alignItems: 'center',
                        paddingTop: '20px',
                        textAlign:'center',

                      }}>
                도움 요청 시 라인 내 입주민에게
            </Typography>
            <Typography
                sx={{    fontSize: '18px', textAlign:'center', height: '40px',}}>
                도움 요청을 알립니다.
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button
                    variant='outlined'
                    color='inherit'
                    sx={{ height: '32px' }}
                    startIcon={<ArrowBack />}
                  >돌아가기</Button>
                <Button
                    variant='contained'
                    color='error'
                    sx={{ height: '32px' }}
                    endIcon={<ArrowForward />}
                  >동의 후 도움 요청</Button>
            </Box>
                  </Box>
      </Menu>

      {/* <Menu
          open={Boolean(anchorElHelpCall)}
          onClose={handleCloseHelpCallModal}
          sx={{ mt: '10px', '& ul': {padding: 0,},}}>
        <Box sx={{ position: 'fixed', right: '40px', bottom: '170px', width: '350px', height: '150px', ...shadowCssForMUI }}>
            <Typography
                sx={{
                        fontSize: '18px',
                        lineHeight: '28px',
                        height: '95px',
                        alignItems: 'center',
                        paddingTop: '40px',
                        textAlign:'center',

                      }}>
                103동 1201호에서 긴급 도움 요청!
            </Typography>
            
            
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button
                    variant='outlined'
                    color='inherit'
                    sx={{ height: '32px' }}
                  >거절</Button>
                <Button
                    variant='contained'
                    color='success'
                    sx={{ height: '32px', width: "198px" }}
                
                  >수락</Button>
            </Box>
                  </Box>
      </Menu> */}

      <StyledDown src='/img/down.png' />
    </StyledBody>
  );
};

export default Home;
