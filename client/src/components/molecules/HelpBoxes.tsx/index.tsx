import { Box, Button, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { client } from '~/components/organisms/HelpCallConnectSocket';
import { shadowCssForMUI } from '~/others/cssLibrary';
import { closeHelpCallBox, openMap, Pos } from '~/others/store';
import { useState } from 'react';

interface HelpFinBoxProps {
  idx: number;
  myHouseLine: string;
  targetHouse: string;
  acceptHouse: string;
  pos?: Pos;
}

interface HelpCallBoxProps {
  idx: number;
  myHouseLine: string;
  targetHouse: string;
  pos: Pos;
}

const HelpFinBox: React.FC<HelpFinBoxProps> = ({ idx, targetHouse, acceptHouse, myHouseLine }) => {
  const [isShow, setIsShow] = useState<boolean>(true);

  if (isShow) {
    return (
      <Box
        sx={{
          position: 'fixed',
          right: `${60 + 12 * idx}px`,
          bottom: `${190 + 12 * idx}px`,
          width: '350px',
          height: '160px',
          backgroundColor: '#F2ECE5',
          alignItems: 'center',
          textAlign: 'center',
          ...shadowCssForMUI,
        }}
      >
        <Typography
          sx={{
            lineHeight: '28px',
            position: 'absolute',
            right: 0,
            padding: '5px',
          }}
        >
          <IconButton
            onClick={() => {
              setIsShow(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </Typography>
        <Typography
          sx={{
            fontSize: '18px',
            lineHeight: '28px',
            height: '55px',
            alignItems: 'center',
            paddingTop: '35px',
            paddingBottom: '20px',
            textAlign: 'center',
          }}
        >
          {`${myHouseLine} ${targetHouse}의 `}
        </Typography>
        <Typography
          sx={{
            fontSize: '18px',
            lineHeight: '28px',
            paddingTop: '10px',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          긴급 도움 요청을 수락했습니다.
        </Typography>
        <Typography
          sx={{
            fontSize: '18px',
            lineHeight: '28px',
            alignItems: 'center',
            paddingTop: '15px',
            paddingBottom: '50px',
            fontWeight: 600,
            textAlign: 'center',
            color: '#EC8034',
          }}
        >
          {`도운 이웃 : ${acceptHouse}`}
        </Typography>
      </Box>
    );
  }
  return null;
};

const HelpFinBoxElder: React.FC<HelpFinBoxProps> = ({
  idx,
  targetHouse,
  acceptHouse,
  myHouseLine,
}) => {
  const [isShow, setIsShow] = useState<boolean>(true);

  if (isShow) {
    return (
      <Box
        sx={{
          opacity: 1,
          alignItems: 'center',
          textAlign: 'center',
          position: 'fixed',
          top: `${54 + idx}%`,
          left: `${52 + idx}%`,
          transform: 'translate(-50%, -50%)',
          width: '65%',
          height: '60%',
          backgroundColor: '#F2ECE5',
          padding: '6%',
          ...shadowCssForMUI,
        }}
      >
        <Typography
          sx={{
            height: '20%',
            position: 'absolute',
            top: 0,
            right: 0,
            padding: '5px',
          }}
        >
          <IconButton
            onClick={() => {
              setIsShow(false);
            }}
          >
            <CloseIcon fontSize='large' />
          </IconButton>
        </Typography>
        <Typography
          sx={{
            fontSize: '45px',
            fontWeight: 900,
            margin: '1%',
            height: '20%',
            alignItems: 'center',
            textAlign: 'center',
            marginTop: '5%',
          }}
        >
          {`${myHouseLine} ${targetHouse}의 `}
        </Typography>
        <Typography
          sx={{
            fontSize: '45px',
            fontWeight: 900,
            margin: '1%',
            height: '20%',
            alignItems: 'center',
            textAlign: 'center',
            marginTop: '2%',
          }}
        >
          긴급 도움 요청을 수락했습니다.
        </Typography>
        <Typography
          sx={{
            fontSize: '45px',
            fontWeight: 900,
            margin: '1%',
            height: '20%',
            alignItems: 'center',
            textAlign: 'center',
            marginTop: '8%',
            marginBottom: '10%',
            color: '#EC8034',
          }}
        >
          {`도운 이웃 : ${acceptHouse}`}
        </Typography>
      </Box>
    );
  }
  return null;
};

const HelpCallBox: React.FC<HelpCallBoxProps> = ({ idx, targetHouse, myHouseLine, pos }) => {
  const acceptHelpCall = (pos: Pos) => {
    const { lat, lng } = pos;
    client.publish({
      destination: '/pub/accept',
      body: JSON.stringify({ target: targetHouse, lat, lng }),
    });

    openMap(pos);
  };

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          right: `${50 + 10 * idx}px`,
          bottom: `${180 + 10 * idx}px`,
          width: '350px',
          height: '160px',
          backgroundColor: '#F2ECE5',
          alignItems: 'center',
          textAlign: 'center',
          ...shadowCssForMUI,
        }}
      >
        <Typography
          sx={{
            lineHeight: '28px',
            position: 'absolute',
            right: 0,
            padding: '5px',
          }}
        >
          <IconButton onClick={() => closeHelpCallBox(targetHouse)}>
            <CloseIcon />
          </IconButton>
        </Typography>
        <Typography
          sx={{
            fontSize: '18px',
            lineHeight: '28px',
            height: '55px',
            alignItems: 'center',
            paddingTop: '55px',
            paddingBottom: '50px',
            textAlign: 'center',
          }}
        >
          {`${myHouseLine} ${targetHouse}에서 긴급 도움 요청!`}
        </Typography>

        <Box sx={{ backgroundColor: '#F2ECE5', display: 'flex', justifyContent: 'space-around' }}>
          <Button
            color='secondary'
            sx={{ width: '110px', height: '32px' }}
            variant='contained'
            onClick={() => openMap(pos)}
          >
            지도 보기
          </Button>
          <Button
            color='primary'
            sx={{ width: '140px', height: '32px', margin: '0 0 0 10px' }}
            variant='contained'
            onClick={() => acceptHelpCall(pos)}
          >
            수락
          </Button>
        </Box>
      </Box>
    </>
  );
};

const HelpCallBoxElder: React.FC<HelpCallBoxProps> = ({ idx, targetHouse, myHouseLine, pos }) => {
  const acceptHelpCall = (pos: Pos) => {
    const { lat, lng } = pos;
    client.publish({
      destination: '/pub/accept',
      body: JSON.stringify({ target: targetHouse, lat, lng }),
    });

    openMap(pos);
  };

  return (
    <>
      <Box
        sx={{
          opacity: 1,
          alignItems: 'center',
          textAlign: 'center',
          position: 'fixed',
          top: `${54 + idx}%`,
          left: `${52 + idx}%`,
          transform: 'translate(-50%, -50%)',
          width: '65%',
          height: '60%',
          backgroundColor: '#F2ECE5',
          padding: '6%',
          ...shadowCssForMUI,
        }}
      >
        <Typography
          sx={{
            height: '20%',
            position: 'absolute',
            top: 0,
            right: 0,
            padding: '5px',
          }}
        >
          <IconButton onClick={() => closeHelpCallBox(targetHouse)}>
            <CloseIcon fontSize='large' />
          </IconButton>
        </Typography>
        <Typography
          sx={{
            fontSize: '45px',
            fontWeight: 900,
            margin: '1%',
            height: '20%',
            alignItems: 'center',
            textAlign: 'center',
            marginTop: '8%',
            marginBottom: '10%',
          }}
        >
          {`${myHouseLine} ${targetHouse}에서 긴급 도움 요청!`}
        </Typography>

        <Box sx={{ backgroundColor: '#F2ECE5', display: 'flex', justifyContent: 'space-around' }}>
          <Button
            color='secondary'
            sx={{ fontSize: '40px', width: '35%', height: '10%' }}
            variant='contained'
            onClick={() => openMap(pos)}
          >
            지도 보기
          </Button>
          <Button
            color='primary'
            sx={{ fontSize: '40px', width: '35%', height: '10%' }}
            variant='contained'
            onClick={() => acceptHelpCall(pos)}
          >
            수락
          </Button>
        </Box>
      </Box>
    </>
  );
};

export { HelpFinBox, HelpCallBox, HelpCallBoxElder, HelpFinBoxElder };
