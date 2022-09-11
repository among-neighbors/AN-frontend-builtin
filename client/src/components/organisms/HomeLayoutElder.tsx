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
import { useEffect, useState } from 'react';
import { Stomp } from '@stomp/stompjs';
import { accessTokenState, ProfileState } from '~/others/store';
const StyledBody = styled.div`
    height: 100vh;
    background-color: #F5F5F5;
    display: flex;
    justify-content: center;
    align-items: center;
    }
`;

const StyledImg = styled.img`
width: 154px;
height: 151px;
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
    src: '../../public/img/Notice.png',
  },
  {
    name: '민원',
    link: '/complaintElder',
    src: '../../public/img/Complaint.png',
  },
  {
    name: '커뮤니티',
    link: '/communityElder',
    src: '../../public/img/Community.png',
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

interface HomePageProps {
  accessToken: accessTokenState;
  profileData: ProfileState;
}

//웹소켓 주소
const WSS_FEED_URL: string = 'wss://neighbor42.com:8181/an-ws';

const HomeElder = ({ accessToken, profileData }: HomePageProps) => {
  //도움 요청한 집 호수
  const [requestHouseName, setrequestHouseName] = useState<string>(' ');

  //객체 생성
  var client = Stomp.client(WSS_FEED_URL);
  const [isRequest, setIsRequest] = useState<boolean>(false);
  const dismissRequest = () => {
    setIsRequest(false);
  };
  let isDone = true;
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
    //요청 한 집 초기화
    setrequestHouseName(' ');
  };
  const [anchorElHelpCall, setAnchorElHelpCall] = React.useState<null | HTMLElement>(null);
  const handleOpenHelpCallModal = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElHelpCall(event.currentTarget);
  };

  const handleCloseHelpCallModal = () => {
    setAnchorElHelpCall(null);
  };

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
            setrequestHouseName(JSON.parse(e.body)['house']);
            console.log('requestHouseName', requestHouseName);

            if (requestHouseName != ' ') {
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
            sx={{
              my: 2,
              color: 'black',
              display: 'block',
              width: '272px',
              height: '261px',
              textAlign: 'center',
              fontSize: '24px',
              fontWeight: 900,
              margin: '80px',
              borderRadius: '40px',
              border: '4px solid black',
              '&:hover': {
                border: '4px solid #EC8034',
                borderRadius: '40px',
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
      <IconButton onClick={handleOpenHelpCallModal} sx={{ p: 0 }}>
        <StyledImg src='../../public/img/warning.png' />
      </IconButton>

      <Menu
        open={Boolean(anchorElHelpCall)}
        onClose={handleCloseHelpCallModal}
        sx={{ mt: '10px', '& ul': { padding: 0 } }}
      >
        <Box
          sx={{
            opacity: 1,
            position: 'fixed',
            right: '25%',
            bottom: '25%',
            width: '740px',
            height: '360px',
            backgroundColor: 'white',
            ...shadowCssForMUI,
          }}
        >
          <Typography
            sx={{
              fontSize: '30px',
              lineHeight: '80px',
              height: '130px',
              alignItems: 'center',
              paddingTop: '70px',
              textAlign: 'center',
            }}
          >
            도움 요청 시 라인 내 입주민에게
          </Typography>
          <Typography sx={{ fontSize: '30px', textAlign: 'center', height: '70px' }}>
            도움 요청을 알립니다.
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button
              onClick={handleCloseHelpCallModal}
              variant='outlined'
              color='inherit'
              sx={{ height: '70px', fontSize: '30px' }}
              startIcon={<ArrowBack />}
            >
              돌아가기
            </Button>
            <Button
              onClick={sendHelpRequest}
              variant='contained'
              color='error'
              sx={{ height: '70px', fontSize: '30px' }}
              endIcon={<ArrowForward />}
            >
              동의 후 도움 요청
            </Button>
          </Box>
        </Box>
      </Menu>

      <Menu open={isRequest} onClose={dismissRequest} sx={{ mt: '10px', '& ul': { padding: 0 } }}>
        <Box
          sx={{
            opacity: 1,
            position: 'fixed',
            right: '25%',
            bottom: '25%',
            width: '740px',
            height: '360px',
            backgroundColor: 'white',
            ...shadowCssForMUI,
          }}
        >
          <Typography
            sx={{
              fontSize: '30px',
              lineHeight: '80px',
              height: '190px',
              alignItems: 'center',
              paddingTop: '110px',
              textAlign: 'center',
            }}
          >
            103동 1201호에서 긴급 도움 요청!
          </Typography>
          <Typography>
            <br />
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button
              onClick={dismissRequest}
              variant='outlined'
              color='inherit'
              sx={{ height: '70px', fontSize: '30px' }}
            >
              거절
            </Button>
            <Button
              onClick={sendHelpResponse}
              variant='contained'
              color='success'
              sx={{ height: '70px', width: '350px', fontSize: '30px' }}
            >
              수락
            </Button>
          </Box>
        </Box>
      </Menu>
      <StyledDown src='/img/down_elder.png' />
    </StyledBody>
  );
};

export default HomeElder;
