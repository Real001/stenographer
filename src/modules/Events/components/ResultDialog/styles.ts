import styled from "styled-components";

export const MessagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: auto;
`;

export const MessageStyled = styled.div<{ color: string }>`
  background: ${({ color }) => color};
  padding: 8px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .speaker {
    text-align: end;
  }
`;

export const ResultDialogStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: auto;
`;
