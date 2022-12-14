import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ProcessedTypePostData } from '~/others/integrateInterface';
import { stringByScope, stringByCategory, handledDate } from '~/others/integrateVariable';
import BoardNav from '../molecules/BoardNav';

interface BoardProps {
  boardData: ProcessedTypePostData;
  type: string;
}

const Board: React.FC<BoardProps> = ({ boardData, type }) => {
  return (
    <Box sx={{ maxWidth: '1200px', width: '100%' }}>
      <Box
        className='boardHeader'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100px',
          borderTop: 'solid #666 4px',
        }}
      >
        <Typography variant='h4' sx={{ padding: '11px 10px', height: 'px' }}>
          {boardData.title}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            maxWidth: '800px',
            padding: '0 12px',
            justifyContent: 'space-between',
            '& p': {
              color: '#666',
              fontSize: '20px',
            },
          }}
        >
          {boardData.scope && <p>{`유형 : ${stringByScope[boardData.scope]}`}</p>}
          {boardData.category && <p>{`카테고리 : ${stringByCategory[boardData.category]}`}</p>}
          <p>{`작성자 : ${boardData.writer}`}</p>
          <p>{`등록일 : ${handledDate(boardData.date)}`}</p>
        </Box>
      </Box>
      <Box
        className='textBox'
        sx={{
          border: 'solid #d9d9d9',
          minHeight: '350px',
          borderWidth: '1.5px 0',
          padding: '30px 10px 50px 10px',
          marginBottom: '4px',
        }}
      >
        {boardData.content.split('\n').map((str, index) => {
          return (
            <Typography
              key={index}
              sx={{
                lineHeight: '24px',
                marginBottom: '9px',
                whiteSpace: 'pre-wrap',
                fontSize: '20px',
              }}
            >
              {str}
            </Typography>
          );
        })}
      </Box>
      <BoardNav type={type} />
    </Box>
  );
};

export default Board;
