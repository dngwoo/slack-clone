import { Header } from '@pages/DirectMessage/styles';
import { IDM, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import { useParams } from 'react-router-dom';
import React, { useCallback } from 'react';
import gravatar from 'gravatar';
import useSWR, { useSWRInfinite } from 'swr';
import ChatList from '@components/ChatList';
import ChatBox from '@components/ChatBox';
import useInput from '@hooks/useInput';
import axios from 'axios';

const PAGE_SIZE = 20;
const DirectMessage = () => {
  const { workspace, id } = useParams<{ workspace: string; id: string }>();
  const [chat, onChangeChat, setChat] = useInput('');
  const { data: myData } = useSWR<IUser>('/api/user', fetcher);
  const { data: chatData, mutate: mutateChat, setSize } = useSWRInfinite<IDM[]>(
    (index) => `/api/workspace/${workspace}/dm/${id}/chats?perPage=${PAGE_SIZE}&page=${index + 1}`,
    fetcher,
  );
  // 현재 params를 받아와서 (:workspace, :id) 백엔드 요청을 하고 userData를 받는다.
  const { data: userData } = useSWR<IUser>(`/api/workspace/${workspace}/user/${id}`, fetcher);

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (myData && userData && chat?.trim() && chatData) {
        const savedChat = chat;
        // mutateChat은 받아온 데이터를 변조하는 것() <- 서버에서 성공하든 말든 일단 클라에서는 변조해서 보여준다.
        // 그래서 빠른 실시간처럼 보이게 한다. - 옵티미스틱UI기법임
        mutateChat((prevChatData) => {
          // 불변성을 지켜줘야 되고 promise를 지원한다.
          prevChatData?.[0].unshift({
            id: (chatData[0][0]?.id || 0) + 1,
            content: savedChat,
            SenderId: myData.id,
            Sender: myData,
            ReceiverId: userData.id,
            Receiver: userData,
            createdAt: new Date(),
          });
          return prevChatData;
        }).then(() => {
          setChat('');
        });
        axios
          .post(
            // 디엠 보내는 axios 요청
            `/api/workspace/${workspace}/dm/${id}/chat`,
            {
              content: chat,
            },
            {
              withCredentials: true,
            },
          )
          .catch(console.error);
      }
    },
    [chat, workspace, id, myData, userData, chatData],
  );
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
      <ChatList />
      {userData && (
        <ChatBox
          placeholder={`Message ${userData.nickname}`}
          data={[]}
          onChangeChat={onChangeChat}
          onSubmitForm={onSubmitForm}
          chat={chat}
        />
      )}
    </div>
  );
};

export default DirectMessage;
