import styled from "styled-components";
import { Button } from "@quark-uilib/components";
import { Table } from "@quark-uilib/table";

export const EventAddButtonStyled = styled(Button)`
  width: max-content;
`;

export const TableStyled = styled(Table)`
  overflow: auto;
  & > div {
    overflow: visible;
  }
` as typeof Table;
