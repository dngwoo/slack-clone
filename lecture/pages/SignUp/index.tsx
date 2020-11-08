import React from 'react';
import {
  Header, Form, Label, Input, Button, LinkContainer,
} from '@pages/SignUp/styles';

const SignUp = () => (
  <div className="container">
    <Header>Sleact</Header>
    <Form>
      <Label>
        <span>이메일 주소</span>
        <div>
          <Input type="email" id="email" name="email" />
        </div>
      </Label>
      <Label>
        <span>닉네임</span>
        <div>
          <Input type="text" id="nickname" name="nickname" />
        </div>
      </Label>
      <Label>
        <span>비밀번호</span>
        <div>
          <Input type="password" id="password" name="password" />
        </div>
      </Label>
      <Label>
        <span>비밀번호 확인</span>
        <div>
          <Input type="password" id="password-check" name="password-check" />
        </div>
      </Label>
      <Button type="submit">회원가입</Button>
    </Form>
    <LinkContainer>
      이미 회원이신가요?&nbsp;
      <a href="/login">로그인 하러가기</a>
    </LinkContainer>
  </div>
);

export default SignUp;
