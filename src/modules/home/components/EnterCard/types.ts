import React from "react";

export interface IEnterCardProps {
  image: string;
  icon: React.ReactElement;
  title: string;
  description: string;
  path?: string;
  isDisabled?: boolean;
  colorType: "alvheim" | "freyja" | "uthgard" | "jotunheim";
}
