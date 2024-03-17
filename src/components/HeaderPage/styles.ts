import styled from "styled-components";
import { LIGHT_THEME } from "@quark-uilib/components";

export const HeaderPageStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const HeaderPageTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .title {
    color: ${({ theme }) => theme.colors.textBasicPressed};
  }

  .description {
    color: ${({ theme }) => theme.colors.textBasicDefault};
  }
`;

HeaderPageTextWrapper.defaultProps = {
  theme: LIGHT_THEME
};
