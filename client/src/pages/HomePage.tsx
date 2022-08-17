import { useEffect } from 'react';
import { connect } from 'react-redux';
import Home from '../components/organisms/HomeLayout';
import Header from '../components/organisms/Header';
const HomePage = (props: any) => {
  useEffect(() => {
    console.log(props);
  }, []);
  return <>
  
  <Header />
  <Home />
 
  

  </>;
};

const mapStateToProps = (state: any) => {
  return {
    state,
  };
};

export default connect(mapStateToProps)(HomePage);