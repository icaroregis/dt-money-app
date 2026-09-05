import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

export type SnackbarMessageType = "ERROR" | "SUCCESS";
interface NotifyMessageParams {
  message: string | null;
  messageType: SnackbarMessageType;
}

type SnackbarContextType = {
  messageType: SnackbarMessageType | null;
  message: string | null;
  notify: (params: NotifyMessageParams) => void;
}

export const SnackbarContext = createContext<SnackbarContextType>({
  messageType: null,
  message: null,
  notify: () => undefined,
});

export const SnackbarContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<SnackbarMessageType | null>(null);

  const notify = useCallback((params: NotifyMessageParams) => {
    setMessage(params.message);
    setMessageType(params.messageType);
    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 3000);
  }, []);

  const contextValue = useMemo(
    () => ({ messageType, message, notify }),
    [messageType, message, notify],
  );

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
    </SnackbarContext.Provider>
  );
}

export const useSnackbarContext = () => useContext(SnackbarContext);
