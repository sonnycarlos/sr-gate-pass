import { BrowserRouter, Routes, Route } from "react-router-dom";

import { routes } from './config/index'

function App() {
  return (
    <Routes>
      {routes.map(route => (
        <Route
          key={route.path}
          path={route.path}
          element={route.component}
        />
      ))}
    </Routes>
  );
}

export default App
