import * as React from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';

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

const Home = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      id: data.get('id'),
    });
  };

  return (
    <StyledBody>
      <StyledIllust src='img/homeIllust.png' />
      <IconButton sx={{ p: 0 }}>
        <StyledImg src='/img/warning.png' />
      </IconButton>
      <StyledDown src='/img/down.png' />
    </StyledBody>
  );
};

export default Home;
