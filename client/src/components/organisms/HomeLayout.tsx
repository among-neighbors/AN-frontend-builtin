import * as React from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import { accessTokenState, handleHelpSideBar } from '~/others/store';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { shadowCssForMUI } from '~/others/cssLibrary';
import Button from '@mui/material/Button';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { useEffect, useState } from 'react';
import { Stomp } from '@stomp/stompjs';
import { type } from 'os';
import myAxios from '~/others/myAxios';

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
}

interface ProfileData {
  id: number;
  name: string;
  lineName: string;
  houseName: string;
}

//웹소켓 주소
const WSS_FEED_URL: string = 'wss://neighbor42.com:8181/an-ws';

const Home = ({ accessToken }: HomePageProps) => {
  //도움 요청한 집 호수
  let requestHouseName = '';
  //우리 집 호수
  let myHouseName = '';
  let myLineName = '';
  //객체 생성
  var client = Stomp.client(WSS_FEED_URL);
  const [isFirst, setIsFirst] = useState(true);
  //subscribe 할 때 라인 구독 정보에 이용
  const [profileList, setProfileList] = useState<ProfileData[]>([]);
  //라인 구독 정보 불러옴
  const getProfileList = async () => {
    console.log(accessToken.accountAccessToken);
    const res = await myAxios(
      'get',
      'api/v1/accounts/profiles',
      null,
      true,
      accessToken.accountAccessToken,
    );
    setProfileList(res.data.response.list);
    myHouseName = profileList[0].houseName;
    myLineName = profileList[0].lineName;
  };

  const [anchorElHelpCall, setAnchorElHelpCall] = React.useState<null | HTMLElement>(null);
  const [anchorElHelpCalRequest, setAnchorElHelpCallRequest] = React.useState<null | HTMLElement>(
    null,
  );
  const sendHelpRequest = () => {
    setAnchorElHelpCall(null);
    client.publish({ destination: '/pub/alert', body: JSON.stringify({ text: '도와주세요' }) });
  };
  const sendHelpResponse = () => {
    setAnchorElHelpCallRequest(null);
    //라인 추가해야함
    client.publish({
      destination: '/pub/accept',
      body: JSON.stringify({ target: myHouseName }),
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

  useEffect(() => {
    if (isFirst) {
      getProfileList();
      setIsFirst(false);
    }
    if (!client.connected) {
      // connect(header,연결 성공시 콜백,에러발생시 콜백)
      client.connect(
        { Authorization: accessToken.accountAccessToken },
        function () {
          console.log('Connected');
          //subscribe(subscribe url,해당 url로 메시지를 받을때마다 실행할 함수)
          client.subscribe('/user/queue/error', function (e) {
            //e.body에 전송된 data가 들어있다
            console.log(JSON.parse(e.body)['message']);
          });
          //라인 정보 등록
          // const destination = '/sub/line/' + profileList[0].lineName;
          client.subscribe('/sub/line/103', function (e) {
            //e.body에 전송된 data가 들어있다

            requestHouseName = JSON.parse(e.body)['house'];
            console.log('houseName', requestHouseName);
            setIsRequest(true);
          });
          // setIsHome(false);
        },
        function (e: { body: string }) {
          //에러 콜백
          console.log(JSON.parse(e.body));
        },
      );
    } else {
      console.log('이미 연결 돰');
    }
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
