import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import TableNav from '~/components/molecules/TableNav';
import Board from '~/components/organisms/Board';

import { Link, useLocation } from 'react-router-dom';
import myAxios from '~/others/myAxios';
import {
  isDeliveredCommunityPostData,
  isDeliveredNoticePostData,
  DeliverdTypePostData,
  ProcessedTypePostData,
} from '~/others/integrateInterface';
import { APIbyType } from '~/others/integrateVariable';
import { connect } from 'react-redux';
import { accessTokenState, RootState } from '~/others/store';
import HeaderElderDefualt from '~/components/organisms/HeaderElderDefualt';
import HeaderDefault from '~/components/organisms/HeaderDefault';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';

const StyledImg = styled.img`
    margin: 70px 0 0 0;
    height: 120px;
  }
  `;

  const StyledMargin = styled.div`
      margin: 110px 0 55px 0;
     
    }
`;

const StyledDiv = styled.div`
margin: 30px 0 0 0;

}
`;
interface ViewPageProps {
  type: string;
  accessToken: accessTokenState;
  isReadyForRequestAPI: boolean;
  mode: string;
}

const ViewPage = ({ type, accessToken, isReadyForRequestAPI, mode }: ViewPageProps) => {
  const [viewData, setViewData] = useState<DeliverdTypePostData | null>(null);
  const [boardData, setBoardData] = useState<ProcessedTypePostData | null>(null);
  const location = useLocation();

  const getViewData = async (id: string) => {
    const res = await myAxios(
      'get',
      `${APIbyType[type]}/${id}`,
      null,
      true,
      accessToken.accountAccessToken,
    );
    setViewData(res.data.response);
  };

  useEffect(() => {
    if (!isReadyForRequestAPI) return;
    const [pre, type, id] = location.pathname.split('/');
    pre;
    type;
    getViewData(id);
  }, [isReadyForRequestAPI]);

  useEffect(() => {
    if (!viewData) return;
    const commonViewData = {
      id: viewData.id,
      title: viewData.title,
      content: viewData.content,
      date: viewData.createdDate,
    };
    if (isDeliveredNoticePostData(viewData)) {
      const { writer, scope } = viewData;
      setBoardData({
        ...commonViewData,
        writer: writer.name,
        scope,
      });
      return;
    }

    if (isDeliveredCommunityPostData(viewData)) {
      const { writer, scope, category } = viewData;
      setBoardData({
        ...commonViewData,
        writer: `${writer.lineName}동 ${writer.houseName}호 ${writer.name}`,
        scope,
        category,
      });
      return;
    }

    const { writer } = viewData;
    setBoardData({
      ...commonViewData,
      writer: `${writer.lineName}동 ${writer.houseName}호`,
    });
  }, [viewData]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {mode === 'elder' ? <HeaderElderDefualt /> : <HeaderDefault />}
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
              <StyledImg src='/img/communityHeader.png' />
            </>
          ) : (
            <></>
          )}
          {type === 'complaint' ? (
            <>
              {' '}
              <StyledImg src='/img/complaintHeader.png' />
            </>
          ) : (
            <></>
          )}
          {type === 'notice' ? (
            <>
              <StyledImg src='/img/noticeHeader.png' />
            </>
          ) : (
            <></>
          )}
        </Typography>
      ) : (
        <StyledMargin></StyledMargin>
      )}
     
      {type === 'community' || type === 'notice' ? <TableNav type={type} /> : <></>}
      <StyledDiv></StyledDiv>
      {boardData && <Board type={type} boardData={boardData} />}
    </Box>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    accessToken: state.accessTokenReducer,
    isReadyForRequestAPI: state.readyForRequestAPIReducer,
  };
};

export default connect(mapStateToProps)(ViewPage);
