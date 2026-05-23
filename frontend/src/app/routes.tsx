import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Actualites } from "./pages/Actualites";
import { ActualiteDetail } from "./pages/ActualiteDetail";
import { Evenements } from "./pages/Evenements";
import { APropos } from "./pages/APropos";
import { NotFound } from "./pages/NotFound";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "actualites", Component: Actualites },
      { path: "actualites/:slug", Component: ActualiteDetail },
      { path: "evenements", Component: Evenements },
      { path: "a-propos", Component: APropos },
      { path: "*", Component: NotFound },
    ],
  },
]);
