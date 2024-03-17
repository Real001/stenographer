import styled, { css } from "styled-components";
import { rgba } from "polished";
import { DingDing } from "@quark-uilib/components";
import { lightTheme } from "src/services/theme/constants";

export const SidebarWrapper = styled.div`
  height: 100%;
  width: 157px;
  padding: 40px 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.colors.sidebarBg};

  .title {
    color: white;
  }
`;

SidebarWrapper.defaultProps = {
  theme: lightTheme
};

export const SidebarHeaderStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;

  .avatar_icon {
    width: 48px;
    height: 48px;
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  .title {
    padding: 8px;
  }
`;

LogoWrapper.defaultProps = {
  theme: lightTheme
};

export const SidebarFooterStyled = styled.div``;

export const SidebarDingDingStyled = styled(DingDing)`
  border-radius: 16px;
  .ding-ding__icon {
    color: ${({ theme }) => theme.colors.sidebarIcon};
  }

  & > div {
    background: ${({ theme }) => theme.colors.sidebarIcon};
  }

  &:hover {
    ${({ theme }) => css`
      background: ${rgba(theme.colors.grayscale0, 0.24)};
      .ding-ding__icon {
        color: ${theme.colors.sidebarIconHover};
      }
    `};
  }
`;

SidebarDingDingStyled.defaultProps = {
  theme: lightTheme
};
