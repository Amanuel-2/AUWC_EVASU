import { createBrowserRouter } from "react-router";
import Root from "./components/Root";
import Home from "./pages/Home";
import TeamDetails from "./pages/TeamDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "teams/:id", Component: TeamDetails },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      {
        path: "*",
        Component: () => (
          <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
            <span className="text-6xl">✦</span>
            <h1 className="font-['DM_Serif_Display'] text-4xl text-foreground">Page not found</h1>
            <p className="text-muted-foreground">The page you are looking for does not exist.</p>
            <a href="/" className="mt-4 bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors">
              Go Home
            </a>
          </div>
        ),
      },
    ],
  },
]);
