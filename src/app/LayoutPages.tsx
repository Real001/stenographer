import React, { Suspense } from "react";
import { Preloader, SnackBarInstance } from "@quark-uilib/components";
import { Outlet } from "react-router-dom";
import { MainWrapper, PageWrapper } from "./styles";

import ErrorBoundary from "src/components/ErrorBoundary";
import Sidebar from "src/components/Sidebar";

export const LayoutPages: React.FC = () => (
  <Suspense fallback={<Preloader type="loading" />}>
    <ErrorBoundary>
      <MainWrapper>
        <SnackBarInstance />
        <Sidebar />
        <PageWrapper>
          <Outlet />
        </PageWrapper>
      </MainWrapper>
    </ErrorBoundary>
  </Suspense>
);
