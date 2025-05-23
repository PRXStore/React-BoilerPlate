import React, {
    Context,
    createContext,
    useContext,
    useEffect,
    useState,
  } from "react";
  import { useNuiEvent } from "../hooks/useNuiEvent";
  import { fetchNui } from "../utils/fetchNui";
  import { isEnvBrowser } from "../utils/misc";
  
  const VisibilityCtx = createContext(null);
  

  export const VisibilityProvider = ({
    children,
  }) => {
    const [visible, setVisible] = useState(false);
  
    useNuiEvent("setVisible", setVisible);
  
    useEffect(() => {
      if (!visible) return;
  
      const keyHandler = (e) => {
        if (["Backspace", "Escape"].includes(e.code)) {
          if (!isEnvBrowser()) fetchNui("hideFrame");
          else setVisible(!visible);
        }
      };
  
      window.addEventListener("keydown", keyHandler);
  
      return () => window.removeEventListener("keydown", keyHandler);
    }, [visible]);
  
    return (
      <VisibilityCtx.Provider
        value={{
          visible,
          setVisible,
        }}
      >
        <div
          style={{ visibility: visible ? "visible" : "hidden", height: "100%" }}
        >
          {children}
        </div>
      </VisibilityCtx.Provider>
    );
  };
  
  export const useVisibility = () =>
    useContext(
      VisibilityCtx,
    );
