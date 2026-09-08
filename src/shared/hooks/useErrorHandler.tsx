import { useCallback } from 'react';
import { useSnackbarContext } from "@/context/snackbar.context";
import { AppError } from "../helpers/AppError";

export const useErrorHandler = () => {
  const { notify } = useSnackbarContext();
  const handleError = useCallback((error: unknown, defaultMessage: string) => {
    const isAppError = error instanceof AppError;
    const message = isAppError ? error.message : defaultMessage;
    notify({ messageType: "ERROR", message });
  }, [notify]);
  return { handleError };
}