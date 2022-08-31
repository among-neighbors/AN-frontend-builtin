import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import Board from '~/components/organisms/Board';
import TableNav from '~/components/molecules/TableNav';
import HeaderElderDefualt from '~/components/organisms/HeaderElderDefualt';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
interface Data {
  ID: string;
  title: string;
  body: string;
  type: boolean;
  writer: string;
  date: string;
}

const StyledImg = styled.img`
    margin: 0px 2px;
    height: 120px;
  
    }
`;

const NoticeViewPageElder = () => {
  const [row, setRow] = useState<Data | null>(null);
  const params = useParams();

  useEffect(() => {
    // console.log(window.location.href);
    // params를 통해서 그 id에 맞는 데이터를 가져와야함.
    function createData(
      ID: string,
      title: string,
      body: string,
      type: boolean,
      writer: string,
      date: string,
    ): Data {
      return { ID, title, body, type, writer, date };
    }

    const row = createData(
      '0',
      '해윙~ 제목입니다',
      '해윙~ 글 내용입니다.',
      true,
      '홍길동',
      '2022.08.14',
    );
    setRow(row);
  }, []);

  return (
    <>
      <div className='noticeViewPage'>
      <HeaderElderDefualt />
      <Typography
            variant='h6'
            noWrap
            component={Link}
            to='/noticeElder'
            sx={{
              mr: 4,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              fontSize: '24px',
              color:'black',
              letterSpacing: '.1rem',
              textDecoration: 'none',
              textAlign: 'center',
              margin: '120px 0 0px 0'
            }}
          >
            <StyledImg src='/img/noticeHeader.png' />
  
          </Typography>
        <TableNav type='notice' />
        <Board row={row} />
       
      </div>
      <style>{`
      .noticeViewPage{
        display:flex;
        flex-direction:column;
        align-items:center;
      }
      `}</style>
    </>
  );
};

export default NoticeViewPageElder;