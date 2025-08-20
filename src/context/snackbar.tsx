import * as React from "react";
import {createContext, ReactNode, useContext, useEffect} from "react";
import {ISnackbarMessage} from "../types";

type Props = {
    children: ReactNode;
};

const SnackbarContent = createContext({
    open: false,
    messageInfo: {message: "", key: 0, type: ''},
    handleOpenSnackbar: (message: string, type: string) => {},
    handleClose: (event: React.SyntheticEvent | Event, reason?: string) => {},
    handleExited: () => {},
});

export function SnackbarWrapper({ children }: Props) {
    const [open, setOpen] = React.useState(false);
    const [snackPack, setSnackPack] = React.useState<readonly ISnackbarMessage[]>([]);
    const [messageInfo, setMessageInfo] = React.useState<ISnackbarMessage | undefined>(
        undefined,
    );

    useEffect(() => {
        if (snackPack.length && !messageInfo) {
            // Set a new snack when we don't have an active one
            setMessageInfo({ ...snackPack[0] });
            setSnackPack((prev) => prev.slice(1));
            setOpen(true);
        } else if (snackPack.length && messageInfo && open) {
            // Close an active snack when a new one is added
            setOpen(false);
        }
    }, [snackPack, messageInfo, open]);

    const handleOpenSnackbar = (message: string, type: string) => {
        setSnackPack((prev) => [...prev, { message, key: new Date().getTime(), type }]);
    };

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleExited = () => {
        setMessageInfo(undefined);
    };

    const value = {
        open,
        messageInfo,
        handleOpenSnackbar,
        handleClose,
        handleExited,
    }

    return (
        // @ts-ignore
        <SnackbarContent.Provider value={value}>
            {children}
        </SnackbarContent.Provider>
    );

}

export function useSnackbarContext() {
    return useContext(SnackbarContent);
}
