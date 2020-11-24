import React from 'react';
import {
  AddButton,
  Channels,
  Chats,
  Header,
  MenuScroll,
  ProfileImg,
  RightMenu,
  WorkspaceButton,
  WorkspaceName,
  Workspaces,
  WorkspaceWrapper,
} from '@layouts/Workspace/styles';
import useSWR from 'swr';
import gravatar from 'gravatar';

const Workspace = () => (
  const {data: userData} = useSWR('/api/user');
  
  return (
    <div>
    {/* 1행 */}
    <Header>
      { userData && (
        <RightMenu>
          <span>
            {/* 유저 이메일에 따라 알아서 아이콘 생성을 해줌. s = size, retro = 깃헙 같은 아이콘 */}
            <ProfileImg src={gravatar.url(userData.email, {s: '36px', d: 'retro'})}></ProfileImg>
          </span>
        </RightMenu>
      )}
    </Header>
    {/* 2행 */}
    <WorkspaceWrapper>
      {/* 1열 */}
      <Workspaces />
      {/* 2열 */}
      <Channels>
        <WorkspaceName />
        <MenuScroll />
      </Channels>
      {/* 3열 */}
      <Chats />
    </WorkspaceWrapper>
  </div>
  )  
);

export default Workspace;
