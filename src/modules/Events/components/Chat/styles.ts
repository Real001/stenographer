import styled, { css } from "styled-components";
import { P2 } from "@quark-uilib/components";

export const ChatInputWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

export const ChatStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: space-between;
  height: 100%;
`;

export const ChatMessageStyled = styled(P2)<{ isUser?: boolean }>`
  border-radius: 16px;
  padding: 8px;
  background: ${({ theme }) => theme.colors.overlay2};
  width: max-content;
  max-width: 350px;
  ${({ isUser }) =>
    isUser &&
    css`
      margin-right: 0;
      margin-left: auto;
    `}
`;

export const ChatMessagesListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: auto;
`;
