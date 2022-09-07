import { useEffect } from 'react';
import { connect } from 'react-redux';
import Home from '../components/organisms/HomeLayout';
import Header from '../components/organisms/Header';
import HeaderElder from '~/components/organisms/HeaderElder';
import HomeElder from '~/components/organisms/HomeLayoutElder';
const HomePageElder = (props: any) => {
  useEffect(() => {
    console.log(props);
  }, []);
  return <>
  
  <HeaderElder />
  <HomeElder />
 
  </>;
};

const mapStateToProps = (state: any) => {
  return {
    state,
  };
};

export default connect(mapStateToProps)(HomePageElder);