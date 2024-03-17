import React from "react";
import { H, P2 } from "@quark-uilib/components";
import { useNavigate } from "react-router-dom";
import { IEnterCardProps } from "./types";
import {
  EnterCardStyled,
  EnterCardTextBlockStyled,
  EnterCardTextWrapper
} from "./styles";

const EnterCard: React.FC<IEnterCardProps> = ({
  image,
  icon,
  title,
  path,
  isDisabled,
  description,
  colorType
}) => {
  const navigate = useNavigate();

  const handleClick = (): void => {
    if (path) {
      navigate(path);
    }
  };
  return (
    <EnterCardStyled
      onClick={handleClick}
      colorType={colorType}
      disabled={isDisabled}>
      <img src={image} alt="title" />
      <EnterCardTextBlockStyled>
        {icon}
        <EnterCardTextWrapper>
          <H type="libra" className="entry-card__title">
            {title}
          </H>
          <P2 type="corvus" className="entry-card__description">
            {description}
          </P2>
        </EnterCardTextWrapper>
      </EnterCardTextBlockStyled>
    </EnterCardStyled>
  );
};

export default EnterCard;
