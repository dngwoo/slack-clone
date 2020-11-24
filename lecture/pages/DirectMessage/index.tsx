import { Header } from '@pages/DirectMessage/styles';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import { useParams } from 'react-router-dom';
import React from 'react';
import gravatar from 'gravatar';
import useSWR from 'swr';

const DirectMessage = () => {
  const { workspace, id } = useParams<{ workspace: string; id: string }>();
  // 현재 params를 받아와서 (:workspace, :id) 백엔드 요청을 하고 userData를 받는다.
  const { data: userData } = useSWR<IUser>(`/api/workspace/${workspace}/user/${id}`, fetcher);
  return (
    <div>
      <Header>
        {userData && (
          <>
            {/* 받은 userData는 여기서 사용 된다. 채팅 헤드 부분에 디엠하는 상대방 아바타와 nickname이 뜨게 된다. */}
            <img src={gravatar.url(userData.email, { s: '24px' })} alt={userData.nickname} />
            <span>{userData.nickname}</span>
          </>
        )}
      </Header>
      {/* 채팅 목록 */}
      {/* <ChatList />
      <ChatBox /> */}
    </div>
  );
};

export default DirectMessage;
