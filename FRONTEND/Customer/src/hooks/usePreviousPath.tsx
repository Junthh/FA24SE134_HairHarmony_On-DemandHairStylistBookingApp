import { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PreviousPathContext = createContext(null);

export const usePreviousPath = () => {
  return useContext(PreviousPathContext);
};

export const PreviousPathProvider = ({ children }) => {
  const location = useLocation();
  const [previousPath, setPreviousPath] = useState(null);

  useEffect(() => {
    return () => {
      const currentPath = location.pathname;
      setPreviousPath(currentPath);
    };
  }, [location]);

  return (
    <PreviousPathContext.Provider value={previousPath}>{children}</PreviousPathContext.Provider>
  );
};
