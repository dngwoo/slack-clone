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

const Workspace = () => (
  const {data: userData} = useSWR('/api/user');
  
  return (
    <div>
    {/* 1행 */}
    <Header>
      { userData && (
        <RightMenu>
          <span>
            <ProfileImg src={}></ProfileImg>
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
