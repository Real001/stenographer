import styled from "styled-components";
import { LIGHT_THEME, P2 } from "@quark-uilib/components";

export const EventPageStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  height: 100%;
`;

export const EventResultWrapper = styled.div`
  display: flex;
  gap: 40px;
  height: calc(100% - 136px);
`;

export const MessagesWrapper = styled.div`
  border-radius: 16px;
  padding: 16px;
  width: 50%;
  background: ${({ theme }) => theme.colors.overlay2};
  height: 100%;
  overflow: auto;
`;

MessagesWrapper.defaultProps = {
  theme: LIGHT_THEME
};

export const HandlerResultWrapper = styled.div`
  width: 50%;

  .tabs-wrapper {
    display: flex;
  }
`;

export const TabPanelStyled = styled.div`
  padding: 16px;
  overflow: auto;
  height: calc(100% - 50px);

  .tasks {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

export const RetellingStyled = styled(P2)`
  overflow: auto;
`;
