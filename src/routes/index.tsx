import { ReactElement } from "react";
import { useRoutes } from "react-router-dom";
import homeRouter from "src/modules/home/router";
import eventsRouter from "src/modules/Events/router";

export const routes = [...homeRouter, ...eventsRouter];

const Routes = (): ReactElement | null => useRoutes(routes);

export default Routes;
