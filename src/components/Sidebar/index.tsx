import { FC } from "react";
import { Avatar, H, Divider } from "@quark-uilib/components";
import { IconExit } from "@quark-uilib/icons";
import { useNavigate } from "react-router-dom";
import {
  LogoWrapper,
  SidebarWrapper,
  SidebarHeaderStyled,
  SidebarFooterStyled,
  SidebarDingDingStyled
} from "./styles";
import AvatarIcon from "src/assets/avatar.png";
import { ThemeSwitcher } from "src/services/theme";
import { clientRoutes } from "src/routes/constants";
import SidebarButton from "src/components/SidebarButton";
import Logo from "src/assets/Logo.png";

const Sidebar: FC = () => {
  const navigate = useNavigate();

  const handleNavigateGeneralPage = (): void => {
    navigate(clientRoutes.main.path);
  };

  return (
    <SidebarWrapper>
      <SidebarHeaderStyled>
        <LogoWrapper onClick={handleNavigateGeneralPage}>
          <img src={Logo} />
          <H className="title" type="capricornus" size={16}>
            Стенографист
          </H>
        </LogoWrapper>
        <ThemeSwitcher size="l" />
        <Avatar size="l" image={AvatarIcon} status="online" />
        <SidebarDingDingStyled size="l" notificationCount={0} />
        <Divider />
      </SidebarHeaderStyled>
      <SidebarFooterStyled>
        <SidebarButton>
          <IconExit />
        </SidebarButton>
      </SidebarFooterStyled>
    </SidebarWrapper>
  );
};

export default Sidebar;
