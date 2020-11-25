import { IUser } from '@typings/db';
import React, {
  useRef, useCallback, FC,
} from 'react';
import {
  ChatArea, Form, MentionsTextarea, SendButton, Toolbox, EachMention,
} from '@components/ChatBox/styles';
import { Mention } from 'react-mentions';
import gravatar from 'gravatar';

interface Props {
  // props로 받아서 사용하는 이유는 chat를 이용하여 ChatList에도 표시를 해줘야되기 때문이다.
  onSubmitForm: (e: any) => void;
  chat?: string;
  onChangeChat: (e: any) => void;
  placeholder: string;
  data?: IUser[];
}
const ChatBox: FC<Props> = ({
  onSubmitForm, chat, onChangeChat, placeholder, data,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onKeydownChat = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        if (!e.shiftKey) {
          e.preventDefault();
          onSubmitForm(e);
        }
      }
    },
    [chat],
  );

  const renderUserSuggestion = useCallback(
    (member, search, highlightedDisplay, index, focus) => {
      if (!data) {
        return null;
      }
      return (
        <EachMention focus={focus}>
          <img src={gravatar.url(data[index].email, { s: '20px' })} alt={data[index].nickname} />
          <span>{highlightedDisplay}</span>
        </EachMention>
      );
    },
    [data],
  );

  return (
    <ChatArea>
      <Form onSubmit={onSubmitForm}>
        <MentionsTextarea
          id="editor-chat"
          value={chat}
          onChange={onChangeChat}
          onKeyPress={onKeydownChat}
          placeholder={placeholder}
          inputRef={textareaRef}
          allowSuggestionsAboveCursor
        >
          <Mention
            appendSpaceOnAdd
            trigger="@"
            data={data?.map((v) => ({ id: v.id, display: v.nickname })) || []}
            renderSuggestion={renderUserSuggestion}
          />
        </MentionsTextarea>
        <Toolbox>
          <SendButton
            className={
              `c-button-unstyled c-icon_button c-icon_button--light c-icon_button--size_medium c-texty_input__button c-texty_input__button--send${
                chat?.trim() ? '' : ' c-texty_input__button--disabled'}`
            }
            data-qa="texty_send_button"
            aria-label="Send message"
            data-sk="tooltip_parent"
            type="submit"
            disabled={!chat?.trim()}
          >
            <i className="c-icon c-icon--paperplane-filled" aria-hidden="true" />
          </SendButton>
        </Toolbox>
      </Form>
    </ChatArea>
  );
};

export default ChatBox;
