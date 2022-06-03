import { createContext, useContext } from 'react';

const LayoutContext = createContext();

export function LayoutProvide({ children, value }) {
  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
}

export function useLayoutContext() {
  return useContext(LayoutContext);
}
