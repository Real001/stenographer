import styled, { createGlobalStyle, css } from "styled-components";
import { ITheme } from "@quark-uilib/components";
import { lightTheme } from "src/services/theme/constants";

export const GlobalStyle = createGlobalStyle`
  #root {
    height: 100vh;
    box-sizing: border-box;
    overflow: hidden;
  }

  /* Make clicks pass-through */
  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: blue;

    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;

    width: 100%;
    height: 3px;
  }

  /* Fancy blur effect */
  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0;
    width: 100px;
    height: 100%;
    box-shadow: ${({ theme }: { theme: ITheme }) =>
      css`0 0 10px ${theme.colors.jotunheim1}  0 0 5px ${theme.colors.jotunheim1}`};
    opacity: 1;
    transform: rotate(3deg) translate(0px, -4px);
  }
`;

GlobalStyle.defaultProps = {
  theme: lightTheme
};

export const MainWrapper = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: row;
  background: ${({ theme }) => theme.colors.sidebarBg};
`;

MainWrapper.defaultProps = {
  theme: lightTheme
};

export const PageWrapper = styled.div`
  padding: 40px;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
  color: ${({ theme }) => theme.colors.textBasicPressed};
  width: 100%;
  border-top-left-radius: 40px;
  background: ${({ theme }) => theme.colors.backgroundPrimaryMain};
`;

PageWrapper.defaultProps = {
  theme: lightTheme
};
