import * as React from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import { accessTokenState, handleHelpSideBar, ProfileState } from '~/others/store';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { shadowCssForMUI } from '~/others/cssLibrary';
import Button from '@mui/material/Button';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { useEffect, useState } from 'react';
import { Stomp } from '@stomp/stompjs';

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

interface HomePageProps {
  accessToken: accessTokenState;
  profileData: ProfileState;
}

//웹소켓 주소
const WSS_FEED_URL: string = 'wss://neighbor42.com:8181/an-ws';

const Home = ({ accessToken, profileData }: HomePageProps) => {
  //도움 요청한 집 호수
  let requestHouseName = '';

  //객체 생성
  var client = Stomp.client(WSS_FEED_URL);
  const [isFirst, setIsFirst] = useState(true);

  const [anchorElHelpCall, setAnchorElHelpCall] = React.useState<null | HTMLElement>(null);

  const sendHelpRequest = () => {
    setAnchorElHelpCall(null);
    client.publish({ destination: '/pub/alert', body: JSON.stringify({ text: '도와주세요' }) });
  };
  const sendHelpResponse = () => {
    console.log('내집 이름이다 아이가', profileData.houseName);
    //라인 추가해야함
    client.publish({
      destination: '/pub/accept',
      body: JSON.stringify({ target: profileData.houseName }),
    });
    setIsRequest(false);
  };
  const handleOpenHelpCallModal = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElHelpCall(event.currentTarget);
  };
  const handleCloseHelpCallModal = () => {
    setAnchorElHelpCall(null);
  };

  const [isRequest, setIsRequest] = useState<boolean>(false);
  const dismissRequest = () => {
    setIsRequest(false);
  };
  let isDone = true;
  useEffect(() => {
    if (
      accessToken.accountAccessToken != ' ' &&
      profileData.houseName != '' &&
      profileData.lineName != '' &&
      isDone
    )
      // connect(header,연결 성공시 콜백,에러발생시 콜백)
      client.connect(
        { Authorization: accessToken.accountAccessToken },
        function () {
          console.log('Connected');
          isDone = false;

          //subscribe(subscribe url,해당 url로 메시지를 받을때마다 실행할 함수)
          client.subscribe('/user/queue/error', function (e) {
            //e.body에 전송된 data가 들어있다
            console.log(JSON.parse(e.body)['message']);
          });
          //라인 정보 등록
          const destination = '/sub/line/' + profileData.lineName;
          client.subscribe(destination, function (e) {
            //e.body에 전송된 data가 들어있다
            requestHouseName = JSON.parse(e.body)['house'];
            console.log('requestHouseName', requestHouseName);

            if (requestHouseName != null && requestHouseName != profileData.houseName) {
              setIsRequest(true);
            }
          });
        },
        function (e: { body: string }) {
          //에러 콜백
          console.log(JSON.parse(e.body));
        },
      );
  });

  return (
    <StyledBody>
      <StyledIllust src='img/homeIllust.png' />
      <IconButton onClick={handleOpenHelpCallModal} sx={{ p: 0 }}>
        <StyledImg src='/img/warning.png' />
      </IconButton>
      <Menu
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
            ...shadowCssForMUI,
          }}
        >
          <Typography
            sx={{
              fontSize: '18px',
              lineHeight: '28px',
              height: '55px',
              alignItems: 'center',
              paddingTop: '20px',
              textAlign: 'center',
            }}
          >
            도움 요청 시 라인 내 입주민에게
          </Typography>
          <Typography sx={{ fontSize: '18px', textAlign: 'center', height: '40px' }}>
            도움 요청을 알립니다.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button
              variant='outlined'
              color='inherit'
              sx={{ height: '32px' }}
              startIcon={<ArrowBack />}
            >
              돌아가기
            </Button>
            <Button
              variant='contained'
              color='error'
              sx={{ height: '32px' }}
              endIcon={<ArrowForward />}
              onClick={sendHelpRequest}
            >
              동의 후 도움 요청
            </Button>
          </Box>
        </Box>
      </Menu>
      <Menu open={isRequest} onClose={dismissRequest} sx={{ mt: '10px', '& ul': { padding: 0 } }}>
        <Box
          sx={{
            position: 'fixed',
            right: '40px',
            bottom: '170px',
            width: '350px',
            height: '150px',
            ...shadowCssForMUI,
          }}
        >
          <Typography
            sx={{
              fontSize: '18px',
              lineHeight: '28px',
              height: '95px',
              alignItems: 'center',
              paddingTop: '40px',
              textAlign: 'center',
            }}
          >
            103동 1201호에서 긴급 도움 요청!
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button
              onClick={dismissRequest}
              variant='outlined'
              color='inherit'
              sx={{ height: '32px' }}
            >
              거절
            </Button>
            <Button
              onClick={sendHelpResponse}
              variant='contained'
              color='success'
              sx={{ height: '32px', width: '198px' }}
            >
              수락
            </Button>
          </Box>
        </Box>
      </Menu>
      <StyledDown src='/img/down.png' />
    </StyledBody>
  );
};

export default Home;
