import React, { useCallback, useState } from 'react';
import {
  Header, Button, Form, Input, Label, Error, LinkContainer,
} from '@pages/SignUp/styles';
import useInput from '@hooks/useInput';
import axios from 'axios';

const LogIn = () => {
  const [email, onChangeEmail] = useInput('');
  const [logInError, setLogInError] = useState('');
  const [password, onChangePassword] = useInput('');

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      axios
        .post(
          '/api/login',
          { email, password },
          {
            withCredentials: true,
          },
        )
        .then(() => {
        //   revalidate();
        })
        .catch((error) => {
          console.error(error.response);
          setLogInError(error.response?.data);
        });
    },
    [email, password],
  );

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
        </Label>
        {logInError && <Error>{logInError}</Error>}
        <Button type="submit">로그인</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <a href="/signup">회원가입 하러가기</a>
      </LinkContainer>
    </div>
  );
};

export default LogIn;
