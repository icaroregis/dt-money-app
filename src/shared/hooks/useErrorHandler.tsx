import { useSnackbarContext } from "@/context/snackbar.context";
import { AppError } from "../helpers/AppError";

export const useErrorHandler = () => {
  const { notify } = useSnackbarContext();
  const handleError = (error: unknown, defaultMessage: string) => {
    const isAppError = error instanceof AppError;
    const message = isAppError ? error.message : defaultMessage;
    notify({ messageType: "ERROR", message });
  }
  return { handleError };
}