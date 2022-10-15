import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TableNav from '~/components/molecules/TableNav';
import BoardTable from '~/components/organisms/Table';
import myAxios from '~/others/myAxios';
import { RootState } from '~/others/store';
import { useLocation } from 'react-router-dom';
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

const StyledMargin = styled.div`
  margin: 110px 0 55px 0;
`;

const StyledMargin2 = styled.div`
  margin: 50px 0 0 0;
`;

const StyledImg = styled.img`
  margin: 70px 0 0 0;
  height: 120px;
`;

const ListPage = ({
  type,
  accessToken,
  isReadyForRequestAPI,
  mode,
  profileData,
}: ListPageProps) => {
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
    const { page, scope, category } = URLQueryData;
    var num;
    {
      mode === 'elder' ? (num = 4) : (num = 5);
    }
    const querys: Obj<string> = {
      notice: `?page=${page ?? 1}&count=${num}&scope=${scope ?? 'ALL'}`,
      complaint: `?page=${page ?? 1}&count=${num}`,
      community: `?page=${page ?? 1}&count=${num}&scope=${scope ?? 'ALL'}&category=${
        category ?? 'ALL'
      }`,
    };
    const res = await myAxios(
      'get',
      `${APIbyType[type]}${querys[type]}`,
      null,
      true,
      accessToken.accountAccessToken,
    );
    console.log(`${APIbyType[type]}${querys[type]}`);
    setTableData(res.data.response);
  };

  useEffect(() => {
    if (!isReadyForRequestAPI) return;
    getListData();
  }, [isReadyForRequestAPI, location.pathname, location.search]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
      {mode === 'elder' ? (
        <HeaderElderDefualt accessToken={accessToken} profileData={profileData} />
      ) : (
        <HeaderDefault accessToken={accessToken} profileData={profileData} />
      )}
      {mode === 'elder' ? (
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
            color: 'black',
            letterSpacing: '.1rem',
            textDecoration: 'none',
            textAlign: 'center',
            margin: '50px 0 0px 0',
          }}
        >
          {type === 'community' ? (
            <>
              <StyledImg src='../../public/img/communityHeader.png' />
            </>
          ) : (
            <></>
          )}
          {type === 'complaint' ? (
            <>
              {' '}
              <StyledImg src='../../public/img/complaintHeader.png' />
            </>
          ) : (
            <></>
          )}
          {type === 'notice' ? (
            <>
              <StyledImg src='../../public/img/noticeHeader.png' />
            </>
          ) : (
            <></>
          )}
        </Typography>
      ) : (
        <>
          <StyledMargin></StyledMargin>
        </>
      )}
      {type === 'community' || type === 'notice' ? (
        <TableNav type={type} />
      ) : (
        <StyledMargin2></StyledMargin2>
      )}
      <BoardTable
        type={type}
        rows={rows}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        mode={mode}
      />
    </Box>
  );
};

const handleList = (list: DeliverdTypePostDataArray): ProcessedTypePostDataArray | null => {
  if (list.length === 0) return null;
  if (isDeliveredCommunityPostDataArray(list)) {
    return list.map(({ id, title, content, createdDate, writer, scope, category }) => {
      return {
        id,
        title,
        content,
        scope,
        category,
        writer: writer.name,
        date: handledDate(createdDate),
      };
    });
  }
  if (isDeliveredNoticePostDataArray(list)) {
    return list.map(({ id, title, content, createdDate, writer, scope }) => {
      return {
        id,
        title,
        content,
        scope,
        writer: writer.name,
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
      writer: `${writer.lineName} ${writer.houseName}호`,
    };
  });
};

const mapStateToProps = (state: RootState) => {
  return {
    accessToken: state.accessTokenReducer,
    isReadyForRequestAPI: state.readyForRequestAPIReducer,
    profileData: state.profileReducer,
  };
};

export default connect(mapStateToProps)(ListPage);
