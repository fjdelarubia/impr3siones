import * as React from 'react';
import type { AuthConnector, UserData } from '@impr3siones/data-connector';

const loadAuth = async (): Promise<AuthConnector> => {
  return (await import('@impr3siones/data-connector')).auth;
};

export interface AuthContext {
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  authState?: UserData | null;
}

const Context = React.createContext<AuthContext>({
  loginWithGoogle: async () => {},
  logout: async () => {}
});

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }: Props) => {
  const [authInstance, setAuthInstance] = React.useState<AuthConnector>();
  const [authState, setAuthState] = React.useState<UserData | null | undefined>(
    null
  );

  React.useEffect(() => {
    loadAuth().then((auth) => {
      setAuthInstance(auth);
    });
  }, []);

  React.useEffect(() => {
    if (authInstance) {
      return authInstance.onAuthDataReceived(setAuthState);
    }
  }, [authInstance]);

  const value = {
    loginWithGoogle: async () => {
      authInstance?.loginWithGoogle();
    },
    logout: async () => {
      authInstance?.logout();
    },
    authState
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const AuthContextConsumer = Context.Consumer;

export default Context;
