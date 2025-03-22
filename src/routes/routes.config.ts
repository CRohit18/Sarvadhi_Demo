import { Page404, Dashboard, ForgotPassword, Login,Broker,Diamond,Transaction } from "./routeImports";
import routesConstants from "./routesConstants";

interface Route {
  path: string;
  component: React.ComponentType;
}

interface RoutesConfig {
  private: Route[];
}

const routesConfig: RoutesConfig = {
  private: [
    {
      path: routesConstants.BROKER,
      component: Broker,
    },
    {
      path: routesConstants.TRANSACTION,
      component: Transaction,
    },
    {
      path: routesConstants.DIAMOND,
      component: Diamond,
    },
  ],
};

export default routesConfig;
