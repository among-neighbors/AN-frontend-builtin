import { connect } from 'react-redux';
import { Button } from '@mui/material';
import { handleTableNav } from '~/others/store';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const tableList = [
  {
    type: 'notice',
    navList: ['통합 공지', '단지 공지', '라인 공지'],
  },
  {
    type: 'community',
    navList: ['통합 게시글', '단지 게시글', '라인 게시글', '내 글 목록'],
  },
];

interface TableNavState {
  [key: string]: number;
  notice: number;
  community: number;
}

interface TableNavProps {
  type: string;
  state: TableNavState;
}

const defaultStyleOfTableNavButton = {
  whiteSpace: 'nowrap',
  height: '50px',
  width: '130px',
  borderRadius: '0',
};

const clickedStyleOfTableNavButton = {
  ...defaultStyleOfTableNavButton,
  fontWeight: 700,
  fontSize: '20px',
  color: '#ED843C',
  outline: 'solid 1px #ED843C',
  zIndex: 1,
};

const nonClickedStyleOfTableNavButton = {
  ...defaultStyleOfTableNavButton,
  outline: 'solid 1px #BDBDBD',
  fontSize: '20px',
  color: '#808080',
};

const TableNav = ({ type, state }: TableNavProps) => {
  const tableNav = tableList.find((table) => table.type === type);
  const param = useParams();
  if (tableNav === undefined) return <></>;
  return (
    <>
      <div className='tableNav'>
        {tableNav.navList.map((kind, index) => {
          if (param?.id)
            return (
              <Button
                onClick={() => {
                  handleTableNav(tableNav.type === 'notice' ? true : false, index);
                }}
                component={Link}
                to={`/${type}`}
                sx={
                  state[type] === index
                    ? clickedStyleOfTableNavButton
                    : nonClickedStyleOfTableNavButton
                }
                variant='text'
                key={index}
              >
                {kind}
              </Button>
            );
          else
            return (
              <Button
                onClick={() => {
                  handleTableNav(tableNav.type === 'notice' ? true : false, index);
                }}
                sx={
                  state[type] === index
                    ? clickedStyleOfTableNavButton
                    : nonClickedStyleOfTableNavButton
                }
                variant='text'
                key={index}
              >
                {kind}
              </Button>
            );
        })}
      </div>
      <style jsx>{`
        .tableNav {
          display: flex;
          margin: 200px 0 55px 0;
          gap: 1px;
        }
      `}</style>
    </>
  );
};

const mapStateToProps = (state: TableNavState) => {
  return {
    state,
  };
};

export default connect(mapStateToProps)(TableNav);