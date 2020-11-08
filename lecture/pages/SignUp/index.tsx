import React, { useState } from 'react';
import {
  Header, Form, Label, Input, Button, LinkContainer, Error,
} from '@pages/SignUp/styles';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const onChangeEmail = (e: React.SyntheticEvent<HTMLInputElement>): void => {
    setEmail(e.currentTarget.value);
  };

  const [nickname, setNickname] = useState('');
  const onChangeNickname = (e: React.SyntheticEvent<HTMLInputElement>): void => {
    setNickname(e.currentTarget.value);
  };

  const [password, setPassword] = useState('');
  const onChangePassword = (e: React.SyntheticEvent<HTMLInputElement>): void => {
    setPassword(e.currentTarget.value);
    setMissmatchError(passwordCheck !== e.currentTarget.value);
  };

  const [passwordCheck, setPasswordCheck] = useState('');
  const onChangePasswordCheck = (e: React.SyntheticEvent<HTMLInputElement>): void => {
    setPasswordCheck(e.currentTarget.value);
    setMissmatchError(password !== e.currentTarget.value);
  };

  const [mismatchError, setMissmatchError] = useState(false);

  return (
    <div className="container">
      <Header>dngTalk</Header>
      <Form>
        <Label>
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label>
          <span>닉네임</span>
          <div>
            <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
          </div>
        </Label>
        <Label>
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
        </Label>
        <Label>
          <span>비밀번호 확인</span>
          <div>
            <Input type="password" id="password-check" name="password-check" value={passwordCheck} onChange={onChangePasswordCheck} />
          </div>
        </Label>
        {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
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
