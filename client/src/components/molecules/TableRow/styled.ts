import styled from 'styled-components';

const DefaultTableRow = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 10px;
  border-top: solid 0.5px #eee;
  border-bottom: solid 0.5px #eee;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  & > div {
    display: flex;
    align-items: center;
    color: #000;
    font-size: 20px;
  }
  & > p {
    color: #999;
    font-size: 18px;
    margin: 0px 0 5px 0;
  }
`;

const StyledTableRowForMobile = styled(DefaultTableRow)`
  height: 70px;
  & > div {
    height: 50px;
  }
`;

const StyledTableRowForComment = styled(DefaultTableRow)`
  max-width: 1100px;
  & > div {
    margin: 20px 0;
  }
`;

export { StyledTableRowForMobile, StyledTableRowForComment };
