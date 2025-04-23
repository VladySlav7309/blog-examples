import { createContext, FC, PropsWithChildren, useContext } from "react";

type AuthContextType = {
  getAccessToken: () => Promise<string>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const getAccessToken = async (): Promise<string> => {
    // Simulate an async operation to fetch an access token
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("mock-access-token");
      });
    });
  };

  return (
    <AuthContext.Provider value={{ getAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
