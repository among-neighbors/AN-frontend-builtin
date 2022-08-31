import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import TableNav from '~/components/molecules/TableNav';
import Header from '~/components/organisms/Header';
import HeaderDefault from '~/components/organisms/HeaderDefault';
import HeaderElderDefualt from '~/components/organisms/HeaderElderDefualt';
import BoardTable from '~/components/organisms/Table';

interface Data {
  ID: string;
  title: string;
  type: boolean;
  writer: string;
  date: string;
}

function createData(ID: string, title: string, type: boolean, writer: string, date: string): Data {
  return { ID, title, type, writer, date };
}

const StyledImg = styled.img`
    margin: 0px 2px;
    height: 120px;
  
    }
`;
const rows = [
  createData('0', '해윙', true, '홍길동', '2022.08.14'),
  createData('1', '안녕하세요 제목입니다.', true, '관리자', '2022.08.14'),
  createData('2', '안녕하세요 제목입니다.', true, '관리자', '2022.08.14'),
  createData('3', '안녕하세요 제목입니다.', true, '관리자', '2022.08.14'),
  createData('3033', '안녕하세요 제목입니다.', true, '관리자', '2022.08.14'),
  createData('3033', '안녕하세요 제목입니다.', true, '관리자', '2022.08.14'),
  createData('3033', '안녕하세요 제목입니다.', true, '관리자', '2022.08.14'),
  createData('3033', '안녕하세요 제목입니다.', true, '관리자', '2022.08.14'),
  createData('3033', '안녕하세요 제목입니다.', true, '관리자', '2022.08.14'),
  createData('3033', '안녕하세요 제목입니다.', true, '관리자', '2022.08.14'),
  createData('3033', '안녕하세요 제목입니다.', true, '관리자', '2022.08.14'),
  createData('3033', '안녕하세요 제목입니다.', true, '관리자', '2022.08.14'),
  createData('3033', '안녕하세요 제목입니다.', true, '관리자', '2022.08.14'),
  createData('3033', '안녕하세요 제목입니다.', true, '관리자', '2022.08.14'),
  createData('3033', '안녕하세요 제목입니다.', true, '관리자', '2022.08.14'),
  createData('3033', '안녕하세요 제목입니다.', true, '관리자', '2022.08.14'),
];

const ComplaintPage = () => {
  useEffect(() => {
    // API로 공지사항 데이터 싹다 끌고와
  }, []);

  return (
    <>
      <HeaderElderDefualt />
      <div className='complaintPage'>
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
              margin: '120px 0 10px 0'
            }}
          >
            <StyledImg src='/img/complaintHeader.png' />
            </Typography>
        <BoardTable labels={['민원 ID', '제목', '민원 유형', '작성자', '등록일']} rows={rows} />
      </div>
      <style jsx>{`
        .complaintPage {
    
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </>
  );
};

export default ComplaintPage;
