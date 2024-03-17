import React, { useEffect } from "react";
import { ScrollStyle } from "@quark-uilib/components";
import "@quark-uilib/components/styles/index.css";

import { GlobalStyle } from "./styles";
import { LayoutPages } from "src/app/LayoutPages";
import { AppTheme } from "src/services/theme";

const log = (...args: any[]): void =>
  window.console.log("---handle Error", ...args);

export const App: React.FC = () => {
  useEffect(() => {
    addEventListener("error", log);

    return () => removeEventListener("error", log);
  }, []);

  useEffect(() => {
    document.addEventListener("customerror", log);

    return () => document.removeEventListener("customerror", log);
  }, []);

  return (
    <AppTheme>
      <GlobalStyle />
      <ScrollStyle />
      <LayoutPages />
    </AppTheme>
  );
};
