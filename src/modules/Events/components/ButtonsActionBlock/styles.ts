import styled from "styled-components";
import { LIGHT_THEME } from "@quark-uilib/components";

export const ButtonsActionBlockWrapper = styled.div`
  margin-left: auto;
  margin-right: 0;
  display: flex;
  width: 196px;
  height: 48px;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  gap: 16px;
  flex-direction: row;
  background: ${({ theme }) => theme.colors.backgroundSecondaryGrayscale};
  border-radius: 8px;
`;

ButtonsActionBlockWrapper.defaultProps = {
  theme: LIGHT_THEME
};
