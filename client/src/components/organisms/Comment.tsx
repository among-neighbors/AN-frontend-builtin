import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Table, TableBody, TableRow } from '@mui/material';
import { TableRowForComment } from '../molecules/TableRow';
import styled from 'styled-components';
import { CommentData, Obj } from '~/others/integrateInterface';
import { accessTokenState, ProfileState, RootState } from '~/others/store';
import myAxios from '~/others/myAxios';
import { connect } from 'react-redux';

interface CommentFormProps {
  type: string;
  accessToken: accessTokenState;
  boardId: string;
  getComments: (type: string, boardId: string) => Promise<void>;
}

const CommentForm: React.FC<CommentFormProps> = ({ type, accessToken, boardId, getComments }) => {
  const handlePostComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const comment = data.get('comment')?.toString() ?? '';
    const body = {
      boardId,
      text: comment,
    };

    await myAxios(
      'post',
      `${commentAPIbyType[type]}`,
      body,
      undefined,
      accessToken.profileAccessToken,
    );
    (event.target as HTMLFormElement).reset();
    getComments(type, boardId);
  };

  return (
    <Box
      component='form'
      onSubmit={handlePostComment}
      action='#'
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        marginBottom: '30px',
        '& .MuiTextField-root': {
          m: 1,
          width: 'calc(100% - 130px)',
        },
      }}
      autoComplete='off'
    ></Box>
  );
};

interface CommentProps {
  type: string;
  accessToken: accessTokenState;
  boardId: string;
  profileData: ProfileState;
}

const Comment: React.FC<CommentProps> = ({ type, accessToken, boardId }) => {
  const { accountAccessToken } = accessToken;
  const [comments, setComments] = useState<CommentData[] | null>(null);

  const getComments = async (type: string, boardId: string) => {
    const res = await myAxios(
      'get',
      `${commentAPIbyType[type]}${boardId}?page=1&count=500`,
      null,
      true,
      accountAccessToken,
    );
    setComments(res.data.response.list);
  };

  useEffect(() => {
    getComments(type, boardId);
  }, []);
  return (
    <CommentContainer className='comment'>
      <CommentForm
        type={type}
        getComments={getComments}
        boardId={boardId}
        accessToken={accessToken}
      />
      <Table>
        <TableBody>
          {comments &&
            comments.map((comment, index) => {
              return (
                <TableRow
                  key={index}
                  sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}
                >
                  <TableRowForComment commentData={comment} />
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </CommentContainer>
  );
};

const commentAPIbyType: Obj<string> = {
  notice: `api/v1/comments/notices/`,
  complaint: `api/v1/comments/reports/`,
  community: `api/v1/comments/communities/`,
};

const CommentContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  height: 200px;
`;

const mapStateToProps = (state: RootState) => {
  return {
    profileData: state.profileReducer,
  };
};

export default connect(mapStateToProps)(Comment);
