import styled from "styled-components";
import { LIGHT_THEME } from "@quark-uilib/components";
export const HomePageWrapper = styled.div`
  padding: 40px;
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
  color: ${({ theme }) => theme.colors.textBasicPressed};
`;

HomePageWrapper.defaultProps = {
  theme: LIGHT_THEME
};

export const HomePageHeaderStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  color: ${({ theme }) => theme.colors.textBasicPressed};
`;
