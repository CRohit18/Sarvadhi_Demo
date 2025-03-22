import { lazy } from "react";
export const Broker = lazy(() => import("@/modules/broker/index"));
export const Diamond = lazy(() => import("@/modules/diamondDetail/index"));
export const Transaction = lazy(() => import("@/modules/transaction/index"));
export const Page404 = lazy(() => import("@/components/common/Page404"));
