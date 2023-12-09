import React, {createContext} from "react";


export interface SideBarContextProps {
  mode: 'normal' |'drawer'
  setMode: (mode: SideBarContextProps['mode']) => void
  drawerOpen: boolean
  setDrawerOpen: (open: boolean) => void
  toggleDrawer: () => void
}

export const SideBarContext = createContext<SideBarContextProps>({
  mode: 'normal',
  drawerOpen: false,
  setDrawerOpen: () => {},
  toggleDrawer: () => {},
  setMode: () => {}
})

export const SideBarProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const [mode, setMode] =
      React.useState<SideBarContextProps['mode']>('normal')
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <SideBarContext.Provider value={{
      mode,
      drawerOpen,
      setDrawerOpen,
      toggleDrawer,
      setMode
    }}>
      {children}
    </SideBarContext.Provider>
  )
}

export const useSideBar = () => {
  const context = React.useContext(SideBarContext)
  if (context === undefined) {
    throw new Error('useSideBar must be used within a SideBarProvider')
  }
  return context
}

