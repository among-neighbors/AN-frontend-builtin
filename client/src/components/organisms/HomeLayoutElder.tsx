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
import CircularProgress from '@mui/material/CircularProgress';
const StyledBody = styled.div`
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

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
}

//웹소켓 주소
const WSS_FEED_URL: string = 'wss://neighbor42.com:8181/an-ws';

const HomeElder = ({ accessToken, profileData }: HomePageProps) => {
  console.log(accessToken, profileData);
  //도움 요청한 집 호수
  const [requestHouseName, setrequestHouseName] = useState('');
  //도움을 수락한 호수
  const [accepttHouseName, setacceptHouseName] = useState('');
  //도움을 받을 호수
  const [targetHouseName, settargetHouseName] = useState('');
  const [isSend, setIsSend] = useState<boolean>(false);
  //객체 생성
  var client = Stomp.client(WSS_FEED_URL);

  const [anchorElHelpCall, setAnchorElHelpCall] = React.useState<null | HTMLElement>(null);

  const sendHelpRequest = () => {
    setIsSend(true);
    client.publish({ destination: '/pub/alert', body: JSON.stringify({ text: '도와주세요' }) });
  };
  const sendHelpResponse = () => {
    console.log('내집 이름이다 아이가', profileData.houseName);
    //라인 추가해야함
    client.publish({
      destination: '/pub/accept',
      body: JSON.stringify({ target: requestHouseName }),
    });
    setIsRequest(false);
    //요청 한 집 초기화
    setrequestHouseName('');
    request = '';
  };
  const handleOpenHelpCallModal = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElHelpCall(event.currentTarget);
  };
  const handleCloseHelpCallModal = () => {
    setAnchorElHelpCall(null);
  };

  const [isRequest, setIsRequest] = useState<boolean>(false);
  const [isAccept, setIsAccept] = useState<boolean>(false);
  const dismissRequest = () => {
    setIsRequest(false);
  };
  const checkAccept = () => {
    setIsRequest(false);
    setIsAccept(false);
  };
  let isDone = true;
  let request;

  useEffect(() => {
    if (
      accessToken.accountAccessToken != '' &&
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
            console.log(e.headers);
            console.log(e.headers['type']);
            if (e.headers['type'] == 'alert') {
              console.log(JSON.parse(e.body)['house']);
              request = JSON.parse(e.body)['house'];
              setrequestHouseName(JSON.parse(e.body)['house']);
              console.log('requestHouseName', requestHouseName);
              if (request != '' && request != profileData.houseName) {
                setIsRequest(true);
              }
            } else if (e.headers['type'] == 'accept') {
              setacceptHouseName(JSON.parse(e.body)['accept_house']);
              settargetHouseName(JSON.parse(e.body)['target_house']);
              console.log('수락한 집의 정보들..', JSON.parse(e.body));
              setIsSend(false);
              setIsAccept(true);
              //accept_house -> accepttHouseName
              //target_house -> targetHouseName
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
              width: '360px',
              height: '330px',
              textAlign: 'center',
              fontSize: '55px',
              fontWeight: 900,
              margin: '80px 50px 50px 50px',
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
      <IconButton onClick={handleOpenHelpCallModal} sx={{ p: 0 }}>
        <StyledImg src='../../public/img/warning.svg' />
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
            bottom: '22%',
            width: '740px',
            height: '360px',
            backgroundColor: 'white',
            ...shadowCssForMUI,
          }}
        >
          {isSend ? (
            <>
              <CircularProgress sx={{ margin: '110px 0px 40px 330px', color: '#0093BA' }} />
              <Typography
                sx={{
                  fontSize: '30px',
                  lineHeight: '28px',
                  height: '45px',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                도움 요청 중입니다...
              </Typography>
            </>
          ) : (
            <>
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
            </>
          )}
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
            {profileData.lineName} {requestHouseName}에서 긴급 도움 요청!
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

      <Menu open={isAccept} onClose={checkAccept} sx={{ mt: '10px', '& ul': { padding: 0 } }}>
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
            {accepttHouseName}에서 {targetHouseName}의 긴급 도움을 수락했습니다.
          </Typography>
          <Typography>
            <br />
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button
              onClick={checkAccept}
              variant='contained'
              color='success'
              sx={{ height: '70px', width: '300px', fontSize: '30px', alignItems: 'center' }}
            >
              확인
            </Button>
          </Box>
        </Box>
      </Menu>

      <StyledDown src='../../public/img/down_elder.png' />
    </StyledBody>
  );
};

export default HomeElder;
