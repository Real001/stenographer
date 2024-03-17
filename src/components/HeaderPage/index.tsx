import React from "react";
import { Breadcrumbs, P1, H } from "@quark-uilib/components";
import { IHeaderPageProps } from "./types";
import { HeaderPageStyled, HeaderPageTextWrapper } from "./styles";

const HeaderPage: React.FC<IHeaderPageProps> = ({
  title,
  breadcrumbs,
  description
}) => (
  <HeaderPageStyled>
    {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
    <HeaderPageTextWrapper>
      <H type="cancer" className="title">
        {title}
      </H>
      {description && (
        <P1 type="phoenix" className="description">
          {description}
        </P1>
      )}
    </HeaderPageTextWrapper>
  </HeaderPageStyled>
);

export default HeaderPage;
