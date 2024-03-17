import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Input, Button } from "@quark-uilib/components";
import { IconSend2 } from "@quark-uilib/icons";
import {
  ChatInputWrapper,
  ChatStyled,
  ChatMessageStyled,
  ChatMessagesListWrapper
} from "./styles";
import api from "src/modules/Events/api";

interface IMessage {
  text: string;
  isUser: boolean;
}

const Chat: React.FC = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const params = useParams();
  const refMessagesWrapper = useRef<HTMLDivElement>(null);

  const handleChangeMessage = (
    _: React.ChangeEvent | React.MouseEvent,
    value: string
  ): void => {
    setMessage(value);
  };

  const handleSend = (): void => {
    api.getChat(params.id as string, message).then((res) => {
      res.data.text.map((mes) => {
        setMessages((prevState) => [
          ...prevState,
          { text: mes, isUser: false }
        ]);
        if (refMessagesWrapper.current) {
          refMessagesWrapper.current.scrollTop =
            refMessagesWrapper.current.scrollHeight;
        }
      });
    });
    setMessages((prevState) => [...prevState, { text: message, isUser: true }]);
    setMessage("");
    if (refMessagesWrapper.current) {
      refMessagesWrapper.current.scrollTop =
        refMessagesWrapper.current.scrollHeight;
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent): void => {
    if (event.keyCode === 13) {
      handleSend();
    }
  };

  return (
    <ChatStyled>
      <ChatMessagesListWrapper ref={refMessagesWrapper}>
        {messages.map((mes) => (
          <ChatMessageStyled type="corvus" key={mes.text} isUser={mes.isUser}>
            {mes.text}
          </ChatMessageStyled>
        ))}
      </ChatMessagesListWrapper>
      <ChatInputWrapper>
        <Input
          onChange={handleChangeMessage}
          value={message}
          onKeyUp={handleKeyUp}
        />
        <Button viewType="icon" onClick={handleSend}>
          <IconSend2 />
        </Button>
      </ChatInputWrapper>
    </ChatStyled>
  );
};

export default Chat;
