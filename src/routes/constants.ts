import { homeRoutes } from "src/modules/home/constants";
import { eventsRoutes } from "src/modules/Events/constants";

export const clientRoutes = {
  ...homeRoutes,
  ...eventsRoutes
};
