import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

interface SidebarContextProps {
  isVisibleSidebar?: boolean;
  setIsVisibleSidebar:Dispatch<SetStateAction<boolean>>
}

export const SidebarContext = createContext<SidebarContextProps>({
  isVisibleSidebar: false,
  setIsVisibleSidebar:() => false

});

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isVisibleSidebar, setIsVisibleSidebar] = useState(false)

  return (
    <div>
      <SidebarContext.Provider
        value={{
          isVisibleSidebar,
          setIsVisibleSidebar,
        }}
      >
        {children}
      </SidebarContext.Provider>
    </div>
  );
}
