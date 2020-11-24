import React, { useCallback, useState } from 'react';
import {
  Header, Button, Form, Input, Label, LinkContainer, Error, Success,
} from '@pages/SignUp/styles';
import useInput from '@hooks/useInput';
import axios from 'axios';

const SignUp = () => {
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [mismatchError, setMismatchError] = useState(false);
  const [signUpError, setSignUpError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  // password와 passwordCheck은 서로를 비교해서 맞으면 에러표시가 안나고 맞지 않으면 에러표시가 난다.
  const [password, _1, setPassword] = useInput('');
  const [passwordCheck, _2, setPasswordCheck] = useInput('');

  const onChangePassword = useCallback((e) => {
    setPassword(e.currentTarget.value);
    setMismatchError(passwordCheck !== e.currentTarget.value);
  }, [passwordCheck]);

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.currentTarget.value);
    setMismatchError(password !== e.currentTarget.value);
  }, [password]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      // 닉네임이 빈공간이 아니고 비밀번호가 일치한다면
      if (!nickname || !nickname.trim()) {
        setSignUpError('닉네임을 입력해주세요');
        return;
      }
      if (!mismatchError) {
        setSignUpError('');
        setSignUpSuccess(false);
        // axios를 쓰는 것이 노드와 브라우저에서 모두 사용가능하기 때문에 편리하다.
        axios.post('/api/user', { email, nickname, password })
          .then(() => {
            setSignUpSuccess(true);
          })
          .catch((error) => {
            console.error(error.response);
            setSignUpError(error.response?.data);
          });
      }
      console.log({
        email,
        password,
        nickname,
        passwordCheck,
      });
    },
    [email, password, nickname, passwordCheck],
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
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
        </Label>
        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <div>
            <Input
              type="password"
              id="password-check"
              name="password-check"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </div>
          {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
          {signUpError && <Error>{signUpError}</Error>}
          {signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>}
        </Label>
        <Button type="submit">회원가입</Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <a href="/login">로그인 하러가기</a>
      </LinkContainer>
    </div>
  );
};

export default SignUp;
