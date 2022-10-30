import * as React from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { shadowCssForMUI } from '~/others/cssLibrary';
import Menu from '@mui/material/Menu';
import {
  accessTokenState,
  HelpCallState,
  MapState,
  ProfileState,
  RootState,
  closeMap,
} from '~/others/store';
import CircularProgress from '@mui/material/CircularProgress';
import { connect } from 'react-redux';
import { client } from './HelpCallConnectSocket';
import { HelpCallBoxElder } from '../molecules/HelpBoxes.tsx';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import SquareImg from '~/components/atoms/Img';
const StyledBody = styled.div`
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledImg2 = styled.img`
  height: 20px;
  width: 20px;
`;
import { StyledMap } from './MyMap/styled';
import { useRef } from 'react';

const StyledImg = styled.img`
  width: 145px;
  height: 145px;
  position: fixed;
  right: 30px;
  bottom: 20px;
`;
const pages: {
  name: string;
  link: string;
  src: string;
}[] = [
  {
    name: '확인해요',
    link: '/noticeElder',
    src: '../../public/img/notice.png',
  },
  {
    name: '해결해주세요',
    link: '/complaintElder',
    src: '../../public/img/complaint.png',
  },
  {
    name: '친해져요',
    link: '/communityElder',
    src: '../../public/img/community.png',
  },
];

const StyledBtn = styled.img`
  width: 160px;
  height: 160px;
`;

const StyledDown = styled.img`
  width: 230px;
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

const HomeElder = ({
  isHelpCallSideBarOpen,
  profileData,
  helpCallData,
  mapState,
}: HomePageProps) => {
  const [anchorElHelpCall, setAnchorElHelpCall] = React.useState<null | HTMLElement>(null);
  const { isOpen, pos } = mapState;
  const mapRef = useRef<kakao.maps.Map>(null);

  const levelUp = () => {
    const map = mapRef.current;
    if (!map) return;
    const nowLevel = map.getLevel();
    map.setLevel(nowLevel - 1);
  };

  const levelDown = () => {
    const map = mapRef.current;
    if (!map) return;
    const nowLevel = map.getLevel();
    map.setLevel(nowLevel + 1);
  };

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
      {isOpen ? (
        <>
          <StyledMap>
            {pos && (
              <Map
                center={pos}
                ref={mapRef}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              >
                <MapMarker position={pos} />
              </Map>
            )}

            <div className={'back'}>
              <button onClick={closeMap}>
                <SquareImg src={'../../../../public/img/back.png'} />
              </button>
            </div>
            <div className={'services'}>
              <button onClick={levelUp}>
                <StyledImg2 src={'../../../../public/img/plus.svg'} />
              </button>
              <button onClick={levelDown}>
                <StyledImg2 src={'../../../../public/img/minus.svg'} />
              </button>
            </div>
          </StyledMap>
        </>
      ) : (
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
                width: '33%',
                height: '33%',
                textAlign: 'center',
                fontSize: '45px',
                fontWeight: 900,
                margin: '1%',
                padding: '20px',
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
      <IconButton onClick={handleOpenHelpCallModal} sx={{ p: 0 }}>
        <StyledImg src='../../public/img/warning.svg' />
      </IconButton>
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
              width: '65%',
              height: '60%',
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
                        opacity: 1,
                        alignItems: 'center',
                        textAlign: 'center',
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '65%',
                        height: '60%',
                        backgroundColor: '#F2ECE5',
                        ...shadowCssForMUI,
                        padding: '7%',
                      }}
                    >
                      <CircularProgress size='6rem' sx={{ margin: '40px 0', color: '#0093BA' }} />
                      <Typography
                        sx={{
                          fontSize: '45px',
                          fontWeight: 900,
                          margin: '2%',
                          height: '20%',
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
                <HelpCallBoxElder
                  key={index}
                  idx={index}
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
        elevation={0}
        onClose={handleCloseHelpCallModal}
        sx={{ mt: '10px', '& ul': { padding: 0 } }}
      >
        <Box
          sx={{
            opacity: 1,
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bottom: '22%',
            width: '65%',
            height: '60%',
            backgroundColor: '#F2ECE5',
            ...shadowCssForMUI,
          }}
        >
          <Typography
            sx={{
              fontSize: '45px',
              fontWeight: 900,
              margin: '1%',
              height: '30%',
              alignItems: 'center',
              marginTop: '18%',
              textAlign: 'center',
            }}
          >
            도움 요청 시 이웃에게 알립니다.
          </Typography>

          <Box sx={{ backgroundColor: '#F2ECE5', display: 'flex', justifyContent: 'space-around' }}>
            <Button
              onClick={handleCloseHelpCallModal}
              variant='contained'
              color='inherit'
              sx={{ fontSize: '40px', width: '30%', height: '10%' }}
              startIcon={<ArrowBack />}
            >
              돌아가기
            </Button>
            <Button
              variant='contained'
              color='error'
              sx={{ fontSize: '40px', width: '50%', height: '10%' }}
              endIcon={<ArrowForward />}
              onClick={requestHelpCall}
            >
              동의 후 도움 요청
            </Button>
          </Box>
        </Box>
      </Menu>

      <StyledDown src='../../public/img/down_elder.png' />
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

export default connect(mapStateToProps)(HomeElder);
