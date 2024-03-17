import React, { useMemo, useEffect, useState, useRef } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { openSnackBar, SearchBox } from "@quark-uilib/components";
import { IconDocumentDownload } from "@quark-uilib/icons";
import { TColumn, IRowClickedEvent } from "@quark-uilib/table";
import api from "../../api";
import { IEvent } from "../../types";
import { STATUSES_EVENT } from "../../constants";
import { EventAddButtonStyled, TableStyled } from "./styles";
import HeaderPage from "src/components/HeaderPage";
import { FORMAT_DATE_TIME_SHORT } from "src/constants";
import { clientRoutes } from "src/routes/constants";
import ResultDialog from "src/modules/Events/components/ResultDialog";
import Drawer from "src/components/Drawer";

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const navigate = useNavigate();
  const [result, setResult] = useState<IEvent | null>(null);
  const clickTimeout = useRef<NodeJS.Timeout>();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const columns: TColumn<IEvent, string>[] = useMemo(
    () => [
      {
        title: "Название",
        field: "name",
        isSortable: true,
        sortMenuItems: [
          {
            options: [
              {
                title: "От А до Я",
                nameSort: "ascName"
              },
              {
                title: "От Я до A",
                nameSort: "descName"
              }
            ]
          }
        ],
        comparator: (valueA, valueB, nameSort) => {
          if (nameSort === "ascName") {
            return valueA > valueB ? 1 : -1;
          }
          if (nameSort === "descName") {
            return valueA < valueB ? 1 : -1;
          }
          return 0;
        }
      },
      {
        title: "Дата",
        field: "created",
        isSortable: true,
        sortMenuItems: [
          {
            options: [
              {
                title: "C начала новые",
                nameSort: "asc"
              },
              {
                title: "С начала старые",
                nameSort: "desc"
              }
            ]
          }
        ],
        comparator: (valueA, valueB, nameSort) => {
          if (nameSort === "asc") {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            return new Date(valueB) - new Date(valueA);
          }
          if (nameSort === "desc") {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            return new Date(valueA) - new Date(valueB);
          }
          return 0;
        },
        valueFormatter: ({ value }) =>
          format(new Date(value as string), FORMAT_DATE_TIME_SHORT)
      },
      {
        title: "Статус",
        field: "status",
        columnTypes: "status",
        isFilter: true,
        filterFunc: (params) => {
          const filterParams = [...params.filterParams];
          if (filterParams.includes("process")) {
            filterParams.push("created");
          }
          return params.value
            .split(" ")
            .some((v) => params.filterParams.includes(v));
        },
        filterMenuItems: [
          {
            options: [
              {
                title: "В процессе",
                name: "process"
              },
              {
                title: "Готово",
                name: "done"
              }
            ]
          }
        ],
        valueFormatter: ({ value }) => {
          if (value === "created" || value === "process") {
            return "В процессе";
          }
          return "Готово";
        },
        cellParamsGetter: ({ value }) => ({
          colorType: (STATUSES_EVENT as any)[value as string],
          isFilled: true
        })
      }
    ],
    [page]
  );

  useEffect(() => {
    api
      .getEvents(search)
      .then((res) => {
        setEvents(res.data);
      })
      .catch(() => {
        openSnackBar({
          message: "Упс, что-то пошло не так. Попробуйте перезагрузить страницу"
        });
      });
  }, [search]);

  const handleNewEvent = (): void => {
    navigate(clientRoutes.newEvent.path);
  };

  const handleCloseDrawer = (): void => {
    setResult(null);
  };

  const handleDoubleClick = ({ data }: IRowClickedEvent<IEvent>): void => {
    clearTimeout(clickTimeout.current);
    if (data.status === "done") {
      navigate(`/event/${data.id}`);
    }
  };

  const handleRowClick = ({ data }: IRowClickedEvent<IEvent>): void => {
    if (data.status === "done") {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = setTimeout(() => {
        api
          .getEvent(data.id)
          .then((res) => {
            setResult(res.data);
          })
          .catch(() => {
            openSnackBar({
              message:
                "Упс, что-то пошло не так. Попробуйте перезагрузить страницу"
            });
          });
      }, 200);
    }
  };

  const handleSearch = (
    _: React.MouseEvent | React.ChangeEvent,
    value: string
  ): void => {
    setSearch(value);
  };

  return (
    <>
      <HeaderPage
        title="Стенографист"
        description="Запомни прошедшую встречу"
      />
      <SearchBox onChange={handleSearch} />
      <TableStyled
        columns={columns}
        rowData={events}
        rowClicked={handleRowClick}
        getRowId={(event) => event.data.id}
        isPagination
        paginationPageSize={5}
        rowDoubleClicked={handleDoubleClick}
        onPaginationChange={({ newPage }) => setPage(newPage)}
      />
      <EventAddButtonStyled
        size="l"
        icon={<IconDocumentDownload />}
        onClick={handleNewEvent}>
        Добавить файл
      </EventAddButtonStyled>
      <Drawer
        onClose={handleCloseDrawer}
        isOpen={!!result}
        title={result?.name}>
        {result && (
          <ResultDialog
            messages={result.result.full}
            speakers={result.result.speakers}
          />
        )}
      </Drawer>
    </>
  );
};

export default EventsPage;
