import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { routes } from './config'
import { NavigationBar, Menu } from './components'
import { useSrContext, CHECK_IF_IOS_DEVICE } from './context'
import { removeNavBar  } from './utils'

function App() {
  const location = useLocation()
  const isPageHasNav = removeNavBar(location, routes)
  const [initialState, dispatch] = useSrContext()

  // Use effect
  useEffect(() => {
    (() => {
      const metaTag = document.querySelector('meta[name="viewport"]')
      metaTag.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0')
    })()
    
    dispatch({ type: CHECK_IF_IOS_DEVICE, payload: !!navigator.platform.match(/iPhone|iPod|iPad/) })
  }, [])
  
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
