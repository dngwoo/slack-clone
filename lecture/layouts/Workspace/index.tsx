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
import { Link, useParams } from 'react-router-dom';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import DMList from '@components/DMList';

const Workspace = () => {
  // type definition을 보기위해서 컨트롤 + useSWR 클릭을 해준다.
  const { data: userData } = useSWR<IUser>('/api/user', fetcher);
  const { workspace } = useParams<{workspace: string}>();

  return (
    <div>
      {/* 1행 */}
      <Header>
        { userData && (
        <RightMenu>
          <span>
            {/* 유저 이메일에 따라 알아서 아이콘 생성을 해줌. s = size, retro = 깃헙 같은 아이콘 */}
            <ProfileImg src={gravatar.url(userData.email, { s: '36px', d: 'retro' })} />
          </span>
        </RightMenu>
        )}
      </Header>
      {/* 2행 */}
      <WorkspaceWrapper>
        {/* 1열 */}
        <Workspaces>
          {/* userData가 undefined일때는 로딩중이기 때문에 옵셔널체이닝을 걸어준다 */}
          { userData?.Workspaces.map((val) => (
            <Link key={val.id} to={`/workspace/${val.url}`}>
              <WorkspaceButton>{val.name.slice(0, 1).toUpperCase()}</WorkspaceButton>
            </Link>
          )) }
        </Workspaces>
        {/* 2열 */}
        <Channels>
          <WorkspaceName>
            {userData?.Workspaces.find((v) => v.url === workspace)?.name}
          </WorkspaceName>
          <MenuScroll>
            <DMList />
          </MenuScroll>
        </Channels>
        {/* 3열 */}
        <Chats />
      </WorkspaceWrapper>
    </div>
  );
};

export default Workspace;
