import React, { useMemo } from "react";
import { useTheme } from "styled-components";
import { ITheme, P1, P2 } from "@quark-uilib/components";
import { ResultDialogProps } from "./types";
import { MessageStyled, MessagesWrapper, ResultDialogStyled } from "./styles";

const ResultDialog: React.FC<ResultDialogProps> = ({ speakers, messages }) => {
  const theme = useTheme() as ITheme;
  const colors = Object.values(theme.colors);
  const speakersColor = useMemo(
    () =>
      speakers.reduce<Record<string, string>>((acc, cur) => {
        acc[cur] = colors[Math.floor(Math.random() * colors.length)];
        return acc;
      }, {}),
    []
  );

  return (
    <ResultDialogStyled>
      <MessagesWrapper>
        {messages.map((message) => (
          <MessageStyled
            color={speakersColor[message.speaker]}
            key={message.start}>
            <P1 type={"cygnus"}>{message.text}</P1>
            <P2 type="columba" className="speaker">
              {message.speaker}
            </P2>
          </MessageStyled>
        ))}
      </MessagesWrapper>
    </ResultDialogStyled>
  );
};

export default ResultDialog;
