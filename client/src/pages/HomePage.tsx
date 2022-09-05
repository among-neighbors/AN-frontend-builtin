import { useEffect } from 'react';
import { connect } from 'react-redux';
import Home from '../components/organisms/HomeLayout';
import Header from '../components/organisms/Header';
import axios from 'axios';
const HomePage = (props: any) => {
  const test = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post('https://neighbor42.com:8181/api/v1/auth/account-token', null, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    console.log(props);
  }, []);
  return (
    <>
      <Header />
      <Home />
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    state,
  };
};

export default connect(mapStateToProps)(HomePage);
