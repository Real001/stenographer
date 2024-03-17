import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import { IconHome1 } from "@quark-uilib/icons";
import {
  openSnackBar,
  Skeleton,
  IBreadcrumbItem,
  Tabs,
  P2
} from "@quark-uilib/components";
import Chat from "../../components/Chat";
import {
  EventResultWrapper,
  MessagesWrapper,
  EventPageStyled,
  HandlerResultWrapper,
  TabPanelStyled,
  RetellingStyled
} from "./styles";
import HeaderPage from "src/components/HeaderPage";
import api from "src/modules/Events/api";
import { IEvent } from "src/modules/Events/types";
import { clientRoutes } from "src/routes/constants";
import ResultDialog from "src/modules/Events/components/ResultDialog";
import ButtonsActionBlock from "src/modules/Events/components/ButtonsActionBlock";

const EventPage: React.FC = () => {
  const params = useParams();
  const [event, setEvent] = useState<IEvent | null>(null);
  const [tab, setTab] = useState<number | string>(0);
  const navigate = useNavigate();

  const breadcrumbs: IBreadcrumbItem[] = useMemo(
    () => [
      {
        icon: <IconHome1 />,
        onClick: () => navigate(clientRoutes.main.path)
      }
    ],
    []
  );

  useEffect(() => {
    if (params.id) {
      api
        .getEvent(params.id)
        .then((res) => {
          setEvent(res.data);
        })
        .catch(() => {
          openSnackBar({
            message:
              "Упс, что-то пошло не так. Попробуйте перезагрузить страницу"
          });
        });
    }
  }, [params]);

  const handleChangeTab = (
    _: React.MouseEvent,
    value: number | string
  ): void => {
    setTab(value);
  };

  return (
    <EventPageStyled>
      {event ? (
        <>
          <HeaderPage title={event?.name} breadcrumbs={breadcrumbs} />
          <EventResultWrapper>
            <MessagesWrapper>
              <ResultDialog
                messages={event.result.full}
                speakers={event.result.speakers}
              />
            </MessagesWrapper>
            <HandlerResultWrapper>
              <div className="tabs-wrapper">
                <Tabs value={tab} onChange={handleChangeTab}>
                  <Tabs.Tab label="Пересказ" />
                  <Tabs.Tab label="Чат" />
                  <Tabs.Tab label="Поручения" />
                </Tabs>
                <ButtonsActionBlock name={event.name} />
              </div>
              {tab === 0 && (
                <TabPanelStyled>
                  <RetellingStyled type="corvus">
                    {event.result.short}
                  </RetellingStyled>
                </TabPanelStyled>
              )}
              {tab === 1 && (
                <TabPanelStyled>
                  <Chat />
                </TabPanelStyled>
              )}
              {tab === 2 && (
                <TabPanelStyled>
                  <div className="tasks">
                    {event.result.task.length ? (
                      event.result.task.map((task) => (
                        <P2 type="corvus" key={task}>
                          {task}
                        </P2>
                      ))
                    ) : (
                      <P2 type="corvus">Поручений не найдено</P2>
                    )}
                  </div>
                </TabPanelStyled>
              )}
            </HandlerResultWrapper>
          </EventResultWrapper>
        </>
      ) : (
        <Skeleton type="list" rows={10} />
      )}
    </EventPageStyled>
  );
};

export default EventPage;
