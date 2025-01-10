import { createBrowserRouter } from "react-router";
// import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "@/components/not-found";
import Home from "@/pages/home";
import AppLayout from "@/layout/app-layout";
import { ChatsPage } from "@/pages/chats-page";


const routes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    // errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "chats",
        element: <ChatsPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
