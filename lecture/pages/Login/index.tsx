import React, { useCallback, useState } from 'react';
import {
  Header, Button, Form, Input, Label, Error, LinkContainer,
} from '@pages/SignUp/styles';
import useInput from '@hooks/useInput';
import axios from 'axios';
import useSWR from 'swr';
import { Redirect } from 'react-router-dom';
import fetcher from '@utils/fetcher';

const LogIn = () => {
  // userData <- 다른 swr데이터와 겹칠 수 있으므로 바꿔준다.
  // error <- 서버에서 에러가 터지면 여기에 담기게 된다.
  // revalidate <- 최신데이터가 있으면 알아서 확인해서 가져와 준다.
  // mutate <- 받아온 데이터를 변조하고 싶을 때 사용한다.(revalidate는 계속 최신데이터를 가져오기 때문에 같이 사용x)
  const {
    data: userData, error, revalidate, mutate,
  } = useSWR('/api/user', fetcher);
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
          revalidate();
        })
        .catch((error) => {
          console.error(error.response);
          setLogInError(error.response?.data);
        });
    },
    [email, password],
  );

  // userData는 사용자가 로그인했는지 안했는지 백엔드에서 보내주는 데이터이다.
  // 만약 userData가 true라면 일반 채팅 페이지로 이동하게 된다.
  if (userData) {
    return <Redirect to="/workspace/sleact/channel/일반" />;
  }

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
