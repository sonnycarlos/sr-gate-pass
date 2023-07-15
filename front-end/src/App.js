import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { routes } from './config'
import { Menu, NavigationBar, SideBar } from './components'
import { useSrContext, CHECK_IF_IOS_DEVICE } from './context'
import { removeNavBar, removeSideBar  } from './utils'

function App() {
  const location = useLocation()
  const isPageHasNavBar = removeNavBar(location, routes)
  const isPageHasSideBar = removeSideBar(location, routes)
  const [initialState, dispatch] = useSrContext()
  const [isRotated, setIsRotated] = useState(false)

  // Use effect
  useEffect(() => {
    const handleOrientationChange = () => {
      if (window.orientation !== 0) {
        setIsRotated(true)
      } else {
        setIsRotated(false)
      }
    }
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange)
    }
  }, [])

  useEffect(() => {
    (() => {
      const metaTag = document.querySelector('meta[name="viewport"]')
      metaTag.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0')
    })()
    
    dispatch({ type: CHECK_IF_IOS_DEVICE, payload: !!navigator.platform.match(/iPhone|iPod|iPad/) })
  }, [])
  
  return (
    <div style={{ display: `${isRotated ? 'none' : 'block'}`}}>
      {isPageHasSideBar && <SideBar />}
      {isPageHasNavBar && <NavigationBar />}
      {initialState.isMenuOpen && <Menu />}

      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.component} />
        ))}
      </Routes>
    </div>
  );
}

export default App
