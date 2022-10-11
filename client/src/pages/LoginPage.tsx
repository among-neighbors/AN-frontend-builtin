import { SyntheticEvent, useState } from 'react';
import { Form } from 'react-bootstrap';
//import {  RouteComponentProps } from 'react-router-dom';
import FormContainer from '../components/organisms/FormContainer';
import styled from 'styled-components';

// interface Props {
//     history: RouteComponentProps['history']
//   }

const StyledApplyInput = styled.input`
  background-color: #ec8034;
  width: 405px;
  height: 56px;
  color: #000;
  font-size: 20px;
  padding-left: 10px;
  text-align: left;
  border: solid;
  margin: 16px;
  border-color: rgba(0, 0, 0, 0.5);
  border-width: 1px;
  border-radius: 8px;
  ::placeholder {
    color: rgba(0, 0, 0, 0.6);
    font-size: 20px;
    text-align: left;
  }
`;

const StyledApplyButton = styled.button`
  background-color: rgb(0, 0, 0);
  width: 419px;
  height: 56px;
  color: #fff;
  font-size: 20px;
  text-align: center;
  border: solid;
  margin: 16px;
  border-color: rgb(0, 0, 0);
  border-width: 1px;
  border-radius: 8px;
`;

const StyledBody = styled.div`
  height: 100vh;
  background-color: #ec8034;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledImg = styled.img`
  margin: 0px 90px;
  height: 83px;
`;

//const Login = ({ history }: Props) => {
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();

    await fetch('#', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
    });

    //history.push('/')
  };

  return (
    <StyledBody>
      <FormContainer>
        <Form onSubmit={submitHandler}>
          <StyledImg src='../../img/Logo.png' />
          <Form.Group controlId='email' className='my-3'>
            <StyledApplyInput
              type='email'
              placeholder='Email'
              value={email}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(event.target.value)
              }
            />
          </Form.Group>

          <Form.Group controlId='password' className='my-3'>
            <StyledApplyInput
              type='password'
              placeholder='Password'
              value={password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(event.target.value)
              }
            />
          </Form.Group>
          <StyledApplyButton type='submit' className='my-3'>
            Login
          </StyledApplyButton>
        </Form>
      </FormContainer>
    </StyledBody>
  );
};

export default LoginPage;
