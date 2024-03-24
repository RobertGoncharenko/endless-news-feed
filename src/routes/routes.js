import { Navigate } from "react-router-dom";
import About from "../pages/About";
import Login from "../pages/Login";
import PostIdPage from "../pages/PostIdPage";
import Posts from "../pages/Posts";

export const privateRoutes = [
  // {path: '/', element: <Navigate to="/posts"/>},
  {path: '/', element: <Posts/>},
  {path: '/posts', element: <Posts />},
  {path: '/about', element: <About />},
  {path: '/posts/:id', element: <PostIdPage />},
  {path: '/login', element:<Navigate to="/"/>},
]
export const publicRoutes = [
  {path: '/login', element:<Login/>},
  {path: '/*', element:<Navigate to="/login"/>},
]
