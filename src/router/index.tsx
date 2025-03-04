import { RouteObject, createBrowserRouter, redirect } from "react-router-dom";

import MainLayout from "@/layout/MainLayout";
import LoginLayout from "@/layout/LoginLayout";

import NotFound from "@/components/NotFound";
import Login from "@/pages/login/index";

import { lazy } from "react";

type CustomObject = {
  roleItemKey?: string;
  name?: string;
};

type CustomRouteObject = CustomObject & RouteObject;

type CustomRouter = ReturnType<typeof createBrowserRouter>;

const routes: CustomRouteObject[] = [
  {
    path: "/",
    Component: LoginLayout,
    children: [
      {
        path: "",
        loader: async () => {
          return redirect("/login");
        },
      },
      {
        path: "/login",
        Component: Login,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: MainLayout,
    children: [
      {
        path: "",
        element: <h1>dashboard</h1>,
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
];

export const router: CustomRouter = createBrowserRouter(routes);

const authRouterMaps: CustomRouteObject[] = [
  {
    path: "/dashboard/page1",
    roleItemKey: "dashboard:page1",
    name: "page1",
    Component: lazy(() => import("@/pages/page1")),
  },
  {
    path: "/dashboard/page2",
    roleItemKey: "dashboard:page2",
    name: "page2",
    Component: lazy(() => import("@/pages/page2")),
  },
  {
    path: "/dashboard/page3",
    roleItemKey: "dashboard:page3",
    name: "page3",
    Component: lazy(() => import("@/pages/page3")),
  },
];

export const gotoLogin = () => {
  router.navigate("/login");
};

export const filterRoutes = (menus: CustomObject[]) => {
  return authRouterMaps.filter((route) => {
    const menu = menus.find((menu) => menu.roleItemKey === route.roleItemKey);
    return menu;
  });
};

export const addRoutes = (router: any, menus: CustomObject[]) => {
  const children = filterRoutes(menus);
  // console.log('children', children)
  router.routes[1].children = [
    ...children,
    {
      path: "*",
      Component: NotFound,
    },
  ];
};
