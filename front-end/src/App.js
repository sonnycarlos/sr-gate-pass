import { Routes, Route, useLocation } from 'react-router-dom'
import { routes } from './config'
import { NavigationBar } from './components'
import { removeNavBar  } from './utils'

function App() {
  const location = useLocation()
  const isPageHasNav = removeNavBar(location, routes)
  
  return (
    <>
      {isPageHasNav && <NavigationBar />}

      <Routes>
        {routes.map(route => (
          <Route
            key={route.path}
            path={route.path}
            element={route.component}
          />
        ))}
      </Routes>
    </>
  );
}

export default App
