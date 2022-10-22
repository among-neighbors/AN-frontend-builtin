import * as React from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import { accessTokenState, HelpCallState, MapState, ProfileState, RootState } from '~/others/store';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { shadowCssForMUI } from '~/others/cssLibrary';
import Button from '@mui/material/Button';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { client } from './HelpCallConnectSocket';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { HelpCallBox } from '../molecules/HelpBoxes.tsx';
import { connect } from 'react-redux';

const StyledBody = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledBtn = styled.img`
  width: 140px;
  height: 140px;
  margin: 20px;
`;

const pages: {
  name: string;
  link: string;
  src: string;
}[] = [
  {
    name: '공지',
    link: '/notice',
    src: '../../public/img/notice.png',
  },
  {
    name: '민원',
    link: '/complaint',
    src: '../../public/img/complaint.png',
  },
  {
    name: '커뮤니티',
    link: '/community',
    src: '../../public/img/community.png',
  },
];

const StyledImg = styled.img`
  width: 124px;
  height: 111px;
`;
const StyledDiv = styled.div`
  width: 130px;
  height: 120px;
  position: fixed;
  right: 40px;
  bottom: 40px;
`;

const StyledDown = styled.img`
  width: 420px;
  background-position: 10% 100px;
  position: fixed;
  left: 0px;
  bottom: 0px;
`;

interface HomePageProps {
  accessToken: accessTokenState;
  profileData: ProfileState;
  helpCallData: HelpCallState;
  isHelpCallSideBarOpen: boolean;
  mapState: MapState;
}

const Home = ({ isHelpCallSideBarOpen, profileData, helpCallData, mapState }: HomePageProps) => {
  const [anchorElHelpCall, setAnchorElHelpCall] = React.useState<null | HTMLElement>(null);
  const { isOpen } = mapState;
  const getPosition = async () => {
    return new Promise<GeolocationPosition>((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject),
    );
  };
  const requestHelpCall = async () => {
    if (!navigator.geolocation) {
      alert('위치 동의가 필요합니다!');
      return;
    }

    const pos = await getPosition();
    const { latitude, longitude } = pos.coords;
    console.log(pos);
    client.publish({
      destination: '/pub/alert',
      body: JSON.stringify({ text: 'help', lat: latitude, lng: longitude }),
    });
    handleCloseHelpCallModal();
    // openHelpSideBar();
  };
  const handleOpenHelpCallModal = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElHelpCall(event.currentTarget);
  };
  const handleCloseHelpCallModal = () => {
    setAnchorElHelpCall(null);
  };

  return (
    <StyledBody>
      {!isOpen && (
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: '100%',
          }}
          padding={2}
          margin={3}
        >
          {pages.map((page) => (
            <Button
              variant='outlined'
              key={page.name}
              sx={{
                my: 2,
                color: 'black',
                display: 'block',
                width: '25%',
                height: '25%',
                textAlign: 'center',
                fontSize: '24px',
                fontWeight: 900,
                margin: '5%',
                borderRadius: '40px',
                border: '4px solid black',
                '&:hover': {
                  border: '4px solid #0093BA',
                  borderRadius: '40px',
                  color: '#EC8034',
                  backgroundColor: '#f5f5f5',
                },
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
      )}

      <StyledDiv>
        <IconButton
          onClick={handleOpenHelpCallModal}
          className='helpCallBtn'
          sx={{
            zIndex: 1,
            background: '#fff',
            marginRight: '20px',
          }}
        >
          <StyledImg src='../../public/img/warning.svg'></StyledImg>
        </IconButton>
      </StyledDiv>
      <Box
        sx={{
          display: {
            xs: 'none',
            sm: 'flex',
          },
          position: 'relative',
          '& .helpCallBtn:hover': {
            background: '#fff',
          },
          '& .helpListBtn:hover': {
            background: '#ff1000',
            zIndex: 2,
          },
        }}
      >
        <IconButton
          onClick={handleOpenHelpCallModal}
          className='helpCallBtn'
          sx={{
            zIndex: 1,
            background: '#fff',
            marginRight: '20px',
          }}
        ></IconButton>

        {!isHelpCallSideBarOpen && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column-reverse',
              position: 'absolute',
              top: '40px',
              right: '-20px',
              width: '300px',
              gap: '5px',
              zIndex: 3,
            }}
          >
            {helpCallData.requests.map(({ targetHouse, pos }, index) => {
              if (profileData.houseName === targetHouse) {
                return (
                  <Box key={index} sx={{ width: '100%', height: '100%', padding: '3px 13px' }}>
                    <Box
                      sx={{
                        position: 'fixed',
                        right: '40px',
                        bottom: '170px',
                        width: '350px',
                        height: '150px',
                        backgroundColor: '#F2ECE5',
                        alignItems: 'center',
                        textAlign: 'center',
                        ...shadowCssForMUI,
                      }}
                    >
                      <CircularProgress sx={{ margin: '35px 0 5px 0', color: '#0093BA' }} />
                      <Typography
                        sx={{
                          fontSize: '18px',
                          lineHeight: '28px',
                          height: '45px',
                          alignItems: 'center',
                          textAlign: 'center',
                        }}
                      >
                        도움 요청 중입니다…
                      </Typography>
                    </Box>
                  </Box>
                );
              }
              return (
                <HelpCallBox
                  key={index}
                  targetHouse={targetHouse}
                  myHouseLine={profileData.lineName}
                  pos={pos}
                />
              );
            })}
          </Box>
        )}
      </Box>
      <Menu
        anchorEl={anchorElHelpCall}
        open={Boolean(anchorElHelpCall)}
        onClose={handleCloseHelpCallModal}
        sx={{ mt: '10px', '& ul': { padding: 0 } }}
      >
        <Box
          sx={{
            position: 'fixed',
            right: '40px',
            bottom: '170px',
            width: '350px',
            height: '150px',
            backgroundColor: '#F2ECE5',
            alignItems: 'center',
            textAlign: 'center',
            ...shadowCssForMUI,
          }}
        >
          <Typography
            sx={{
              fontSize: '18px',
              lineHeight: '28px',
              height: '55px',
              alignItems: 'center',
              paddingTop: '45px',
              paddingBottom: '45px',
              textAlign: 'center',
            }}
          >
            도움 요청 시 이웃에게 알립니다.
          </Typography>

          <Box sx={{ backgroundColor: '#F2ECE5', display: 'flex', justifyContent: 'space-around' }}>
            <Button
              onClick={handleCloseHelpCallModal}
              variant='outlined'
              color='inherit'
              sx={{ width: '110px', height: '32px' }}
              startIcon={<ArrowBack />}
            >
              돌아가기
            </Button>
            <Button
              variant='contained'
              color='error'
              sx={{ height: '32px' }}
              endIcon={<ArrowForward />}
              onClick={requestHelpCall}
            >
              동의 후 도움 요청
            </Button>
          </Box>
        </Box>
      </Menu>

      <StyledDown src='../../public/img/down.png' />
    </StyledBody>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    isHelpCallSideBarOpen: state.helpSideBarReducer,
    accessToken: state.accessTokenReducer,
    helpCallData: state.helpCallReducer,
    profileData: state.profileReducer,
    mapState: state.mapReducer,
  };
};

export default connect(mapStateToProps)(Home);
