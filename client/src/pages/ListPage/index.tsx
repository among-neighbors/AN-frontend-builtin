import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import TableNav from '~/components/molecules/TableNav';
import BoardTable from '~/components/organisms/Table';
import myAxios from '~/others/myAxios';
import { RootState } from '~/others/store';
import { Link, useLocation } from 'react-router-dom';
import { parse } from 'query-string';
import {
  Obj,
  ProcessedTypePostDataArray,
  DeliverdTypePostDataArray,
  TableDataProps,
  isDeliveredCommunityPostDataArray,
  isDeliveredNoticePostDataArray,
} from '~/others/integrateInterface';
import { ListPageProps } from './interface';
import { APIbyType, handledDate } from '~/others/integrateVariable';
import HeaderDefault from '~/components/organisms/HeaderDefault';
import styled from 'styled-components';
import HeaderElderDefualt from '~/components/organisms/HeaderElderDefualt';
import Typography from '@mui/material/Typography';

const StyledBody = styled.div`
      margin: 200px 0 55px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
`;
const StyledBodyElder = styled.div`
      margin: 0px 0 55px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
`;


const StyledImg = styled.img`
    margin: 0px 2px;
    height: 120px;
  
    }
`;

const ListPage = ({ type, accountAccessToken, isReadyForRequestAPI, mode }: ListPageProps) => {
  const location = useLocation();
  const [tableData, setTableData] = useState<TableDataProps>({
    list: [],
    isFirstPage: false,
    isLastPage: false,
  });
  const { list, isFirstPage, isLastPage } = tableData;
  const rows = handleList(list);

  const getListData = async () => {
    const URLQueryData = parse(location.search);
    const { page, range, category } = URLQueryData;
    const querys: Obj<string> = {
      notice: `?page=${page ?? 1}&count=10&range=${range ?? 'ALL'}`,
      complaint: `?page=${page ?? 1}&count=10`,
      community: `?page=${page ?? 1}&count=10&range=${range ?? 'ALL'}&category=${
        category ?? 'ALL'
      }`,
    };
    const res = await myAxios(
      'get',
      `${APIbyType[type]}${querys[type]}`,
      null,
      true,
      accountAccessToken,
    );
    // 삭제 필요
    console.log(`${APIbyType[type]}${querys[type]}`);
    setTableData(res.data.response);
  };

  useEffect(() => {
    if (!isReadyForRequestAPI) return;
    getListData();
  }, [isReadyForRequestAPI, location.pathname, location.search]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
      {mode === 'elder' ? (<HeaderElderDefualt/>) : (<HeaderDefault />)}
      {mode === 'elder' ? (<Typography
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
            {type === 'community' ? (<><StyledImg src='/img/communityHeader.png' /></>) : (<></>)}
            {type === 'complaint' ? (<> <StyledImg src='/img/complaintHeader.png' /></>) : (<></>)}
            {type === 'notice' ? (<><StyledImg src='/img/noticeHeader.png' /></>) : (<></>)}
  
          </Typography>) : (<></>)}
    
      {mode === 'elder' ? (<> <StyledBodyElder>
        {type === 'notice' || type === 'community' ? (
          <TableNav type={type} isPageMove={false} />
        ) : (
          <> </>
        )}
      </StyledBodyElder></>) : (<> <StyledBody>
        {type === 'notice' || type === 'community' ? (
          <TableNav type={type} isPageMove={false} />
        ) : (
          <></>
        )}
      </StyledBody></>)}
     

      {/* {type === 'complaint' || type === 'community' ? (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'right', paddingRight: '20px' }}>
          <Button component={Link} to={`/${type}/writing`} variant='contained'>
            {buttonTextByType[type]}
          </Button>
        </Box>
      ) : (
        <></>
      )} */}
      <BoardTable type={type} rows={rows} isFirstPage={isFirstPage} isLastPage={isLastPage} />
      
    </Box>
  );
};

const handleList = (list: DeliverdTypePostDataArray): ProcessedTypePostDataArray | null => {
  if (list.length === 0) return null;
  if (isDeliveredCommunityPostDataArray(list)) {
    return list.map(({ id, title, content, createdDate, writer, range, category }) => {
      return {
        id,
        title,
        content,
        range,
        category,
        writer: writer.name,
        date: handledDate(createdDate),
      };
    });
  }
  if (isDeliveredNoticePostDataArray(list)) {
    return list.map(({ id, title, content, createdDate, writer, range }) => {
      return {
        id,
        title,
        content,
        range,
        writer,
        date: handledDate(createdDate),
      };
    });
  }

  return list.map(({ id, title, content, createdDate, writer }) => {
    return {
      id,
      title,
      content,
      date: handledDate(createdDate),
      writer: `${writer.lineName}동 ${writer.houseName}호`,
    };
  });
};

// const buttonTextByType: Obj<string> = {
//   complaint: '민원 작성',
//   community: '글쓰기',
// };

const mapStateToProps = (state: RootState) => {
  return {
    accountAccessToken: state.accessTokenReducer.accountAccessToken,
    isReadyForRequestAPI: state.readyForRequestAPIReducer,
  };
};

export default connect(mapStateToProps)(ListPage);
