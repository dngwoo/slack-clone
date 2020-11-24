import React, { useState, useCallback } from 'react';
import { CollapseButton } from '@components/DMList/styles';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { NavLink, useParams } from 'react-router-dom';
import { IUser } from '@typings/db';

const DMList = () => {
  const { workspace } = useParams<{ workspace: string }>();
  const [channelCollapse, setChannelCollapse] = useState(false);
  // true => false , false => true로 만들때 많이 사용한다.
  const toggleChannelCollapse = useCallback(() => {
    setChannelCollapse((prev) => !prev);
  }, []);
  // 해당 workspace에 참여한 멤버들 불러오기
  const { data: memberData } = useSWR<IUser[]>(`/api/workspace/${workspace}/members`, fetcher);
  return (
    <div>
      <h2>
        {/* 클릭 시 styles.tsx에 있는 collapse 값이 바뀌게 되고 i의 transform이 변경된다 */}
        <CollapseButton collapse={channelCollapse} onClick={toggleChannelCollapse}>
          <i
            className="c-icon p-channel_sidebar__section_heading_expand p-channel_sidebar__section_heading_expand--show_more_feature c-icon--caret-right c-icon--inherit c-icon--inline"
            data-qa="channel-section-collapse"
            aria-hidden="true"
          />
        </CollapseButton>
        <span>Direct Message</span>
      </h2>
      <div>
        {/* 토글 버튼이 꺼진 상태라면 */}
        {!channelCollapse
          && memberData?.map((member) => {
            const isOnline = false;
            return (
              // Link말고 NavLink를 사용하면 하이라이팅기능을 해준다. 클릭시 표시
              <NavLink key={member.id} activeClassName="selected" to={`/workspace/${workspace}/dm/${member.id}`}>
                <i
                  className={`c-icon p-channel_sidebar__presence_icon p-channel_sidebar__presence_icon--dim_enabled c-presence ${
                    isOnline ? 'c-presence--active c-icon--presence-online' : 'c-icon--presence-offline'
                  }`}
                  aria-hidden="true"
                  data-qa="presence_indicator"
                  data-qa-presence-self="false"
                  data-qa-presence-active="false"
                  data-qa-presence-dnd="false"
                />
                <span>{member.nickname}</span>
              </NavLink>
            );
          })}
      </div>
    </div>
  );
};

export default DMList;
