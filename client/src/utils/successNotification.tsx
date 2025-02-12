import { enqueueSnackbar } from "notistack";

const SuccessNotification = (message: string) => {
  enqueueSnackbar(message, {
    variant: "success",
    anchorOrigin: { vertical: "top", horizontal: "right" },
  });
};

export default SuccessNotification;
