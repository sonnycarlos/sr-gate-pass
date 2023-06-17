import { Routes, Route, useLocation } from 'react-router-dom'
import { routes } from './config'
import { NavigationBar, Menu } from './components'
import { useSrContext } from './context'
import { removeNavBar  } from './utils'

function App() {
  const location = useLocation()
  const isPageHasNav = removeNavBar(location, routes)
  const [initialState] = useSrContext()
  
  return (
    <>
      {isPageHasNav && <NavigationBar />}

      {initialState.isMenuOpen && <Menu />}

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
