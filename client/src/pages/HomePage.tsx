import { useEffect } from 'react';
import { connect } from 'react-redux';
import Header from '../components/organisms/Header';
const HomePage = (props: any) => {
  useEffect(() => {
    console.log(props);
  }, []);
  return <>
  <Header />
  </>;
};

const mapStateToProps = (state: any) => {
  return {
    state,
  };
};

export default connect(mapStateToProps)(HomePage);