import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import Board from '~/components/organisms/Board';
import Comment from '~/components/organisms/Comment';
import { useLocation } from 'react-router-dom';
import myAxios from '~/others/myAxios';
import {
  isDeliveredCommunityPostData,
  isDeliveredNoticePostData,
  DeliverdTypePostData,
  ProcessedTypePostData,
} from '~/others/integrateInterface';
import { APIbyType } from '~/others/integrateVariable';
import { connect } from 'react-redux';
import { accessTokenState, RootState, ProfileState } from '~/others/store';
import HeaderElderDefualt from '~/components/organisms/HeaderElderDefualt';
import HeaderDefault from '~/components/organisms/HeaderDefault';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Footer from '~/components/molecules/Footer';

const StyledImg = styled.img`
  margin: 70px 0 0 0;
  height: 160px;
`;

const StyledMargin = styled.div`
  margin: 160px 0 55px 0;
`;
const StyledMargin2 = styled.div`
  margin: 30px 0;
`;

const StyledBody = styled.div`
  height: 100%;
`;

interface ViewPageProps {
  type: string;
  accessToken: accessTokenState;
  isReadyForRequestAPI: boolean;
  mode: string;
  profileData: ProfileState;
}

const ViewPage = ({
  type,
  accessToken,
  isReadyForRequestAPI,
  mode,
  profileData,
}: ViewPageProps) => {
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
        writer: `${writer.lineName} ${writer.houseName} ${writer.name}`,
        scope,
        category,
      });
      return;
    }

    const { writer } = viewData;
    setBoardData({
      ...commonViewData,
      writer: `${writer.lineName} ${writer.houseName}`,
    });
  }, [viewData]);

  return (
    <StyledBody>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {mode === 'elder' ? (
          <HeaderElderDefualt accessToken={accessToken} profileData={profileData} />
        ) : (
          <HeaderDefault accessToken={accessToken} profileData={profileData} />
        )}
        {mode === 'elder' ? (
          <Typography
            variant='h6'
            noWrap
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
              margin: '80px 0 0px 0',
            }}
          >
            {type === 'community' && <StyledImg src='../../public/img/communityHeader.png' />}
            {type === 'complaint' && <StyledImg src='../../public/img/complaintHeader.png' />}
            {type === 'notice' && <StyledImg src='../../public/img/noticeHeader.png' />}
          </Typography>
        ) : (
          <StyledMargin></StyledMargin>
        )}

        {boardData && <Board type={type} boardData={boardData} />}
        {boardData && (type === 'community' || type === 'complaint') ? (
          <Comment type={type} boardId={boardData.id} accessToken={accessToken} />
        ) : (
          <></>
        )}
        <StyledMargin2 />
        <Footer />
      </Box>
    </StyledBody>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    accessToken: state.accessTokenReducer,
    isReadyForRequestAPI: state.readyForRequestAPIReducer,
    profileData: state.profileReducer,
  };
};

export default connect(mapStateToProps)(ViewPage);
