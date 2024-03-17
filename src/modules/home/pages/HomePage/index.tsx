import React from "react";
import { H, P1 } from "@quark-uilib/components";
import { HomePageWrapper, HomePageHeaderStyled } from "./styles";

const HomePage: React.FC = () => (
  <HomePageWrapper>
    <HomePageHeaderStyled>
      <H type="cancer">Стенографист</H>
      <P1 type="phoenix">Запомни прошедшую встречу</P1>
    </HomePageHeaderStyled>
  </HomePageWrapper>
);

export default HomePage;
