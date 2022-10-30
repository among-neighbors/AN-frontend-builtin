import { Box, Button, Typography } from '@mui/material';
import { client } from '~/components/organisms/HelpCallConnectSocket';
import { shadowCssForMUI } from '~/others/cssLibrary';
import { openMap, Pos } from '~/others/store';
import { HelpFinBoxContainer } from './styled';

interface HelpFinBoxProps {
  myHouseLine: string;
  targetHouse: string;
  acceptHouse: string;
  pos?: Pos;
}

interface HelpCallBoxProps {
  myHouseLine: string;
  targetHouse: string;
  pos: Pos;
}

const HelpFinBox: React.FC<HelpFinBoxProps> = ({ targetHouse, acceptHouse, myHouseLine, pos }) => {
  return (
    <HelpFinBoxContainer>
      <h5>{`${myHouseLine} ${targetHouse}의 긴급 도움 요청을 수락했습니다.`}</h5>
      <p>{`도운 이웃 : ${acceptHouse}`}</p>
      {pos && (
        <Button
          color='inherit'
          sx={{ color: '#000', width: '110px', height: '30px' }}
          variant='outlined'
          onClick={() => openMap(pos)}
        >
          지도 보기
        </Button>
      )}
    </HelpFinBoxContainer>
  );
};

const HelpCallBox: React.FC<HelpCallBoxProps> = ({ targetHouse, myHouseLine, pos }) => {
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
            paddingBottom: '40px',
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

const HelpCallBoxElder: React.FC<HelpCallBoxProps> = ({ targetHouse, myHouseLine, pos }) => {
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
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '65%',
          height: '65%',
          backgroundColor: '#F2ECE5',
          ...shadowCssForMUI,
          padding: '6%',
        }}
      >
        {/* <div className={'close'}>
          <button onClick={() => closeHelpCallBox(targetHouse)}>
            <SquareImg src={'../../../public/img/cancel.png'} length={'20px'} />{' '}
          </button>
        </div> */}
        <Typography
          sx={{
            fontSize: '45px',
            fontWeight: 900,
            margin: '2%',
            height: '20%',
            alignItems: 'center',
            textAlign: 'center',
            marginTop: '15%',
            marginBottom: '8%',
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

export { HelpFinBox, HelpCallBox, HelpCallBoxElder };
