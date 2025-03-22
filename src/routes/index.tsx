import { Suspense, FC } from "react";
import routesConfig from "./routes.config";
import routesConstants from "./routesConstants";
import {
  Route,
  Routes as ReactRouterDomRoutes,
  Navigate,
} from "react-router-dom";
import Layout from "@/layout";
import Loader from "@/components/common/loaders/Loader";

interface RouteProps {
  component: React.ComponentType;
  path?: string;
  index?: boolean;
  children?: RouteProps[];
}

const Private: FC<RouteProps> = ({ component: Component }) => (
  <Suspense fallback={<Loader />}>
    <Component />
  </Suspense>
);

const createNestedRoutes = (
  routes: RouteProps[],
  RouteType: FC<RouteProps>
) => {
  return routes.map((route, i) => {
    if (!route.component) {
      throw new Error("Component must be required.");
    }
    if (route.children) {
      return (
        <Route path={route.path} key={i} element={<RouteType {...route} />}>
          {createNestedRoutes(route.children, RouteType)}
        </Route>
      );
    } else {
      return (
        <Route
          key={i}
          index={route.index}
          path={route.path}
          element={<RouteType {...route} />}
        />
      );
    }
  });
};

const Routes: FC = () => {
  const { private: privateRoutes } = routesConfig;
  return (
    <ReactRouterDomRoutes>
        <>
          <Route
            index
            path="/"
            element={<Navigate to={routesConstants.BROKER} />}
          />
          <Route path="/" element={<Layout />}>
            {createNestedRoutes(privateRoutes, Private)}
          </Route>
          <Route path="*" element={<Navigate to={routesConstants.BROKER} />} />
        </>
      
    </ReactRouterDomRoutes>
  );
};

export default Routes;
