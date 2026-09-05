import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from 'react';

export type SnackbarMessageType = "ERROR" | "SUCCESS";
interface NotifyMessageParams {
  message: string | null;
  messageType: SnackbarMessageType;
}

type SnackbarContextType = {
  message: string | null;
  type: SnackbarMessageType | null;
  notify: (params: NotifyMessageParams) => void;
}

export const SnackbarContext = createContext<SnackbarContextType>({} as SnackbarContextType);

export const SnackbarContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<SnackbarMessageType | null>(null);

  const notify = useCallback((params: NotifyMessageParams) => {
    setMessage(params.message);
    setType(params.messageType);
    setTimeout(() => {
      setMessage(null);
      setType(null);
    }, 3000);
  }, []);

  const contextValue = useMemo(
    () => ({ message, type, notify }),
    [message, type, notify],
  );

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
    </SnackbarContext.Provider>
  );
}
