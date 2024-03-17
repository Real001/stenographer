import { lazy } from "react";
import { RouteObject } from "react-router";
import { eventsRoutes } from "./constants";

const EventsPage = lazy(() => import("./pages/EventsPage"));
const NewEventPage = lazy(() => import("./pages/NewEventPage"));
const EventPage = lazy(() => import("./pages/EventPage"));

const eventsRouter: RouteObject[] = [
  {
    path: eventsRoutes.main.path,
    element: <EventsPage />
  },
  {
    path: eventsRoutes.newEvent.path,
    element: <NewEventPage />
  },
  {
    path: eventsRoutes.event.path,
    element: <EventPage />
  }
];

export default eventsRouter;
