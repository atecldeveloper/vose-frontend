import React, {useImperativeHandle} from "react";
import {DeleteImageProps} from "./shopRegister/UploadsSSM";
import {useDropzone} from "react-dropzone";
import {SnackBarType} from "../src/constants";
import {Box, Button, Stack, Typography} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import {useSnackbarContext} from "../src/context/snackbar";
import { useTranslations } from "use-intl";

interface Props {
    initialImg: string
    handleSubmit: (files: any) => () => void
    handleDelete: (items: DeleteImageProps) => void
}

export const UploadWithShowLink = React.forwardRef<any, Props>((
    {initialImg, handleSubmit, handleDelete}, ref
) => {
    const t: any = useTranslations('MonthlyClaim');
    const { handleOpenSnackbar } = useSnackbarContext();
    const [fileArr, setFileArr] = React.useState<Array<File>>([])

    const {getRootProps, fileRejections, getInputProps, open, acceptedFiles} = useDropzone({
        // Disable click and keydown behavior
        accept: {
            // 'image/jpeg': [],
            // 'image/png': []
        },
        // maxFiles: 1,
        onDrop: (files) => handleGetFile(files),
        noClick: true,
        noKeyboard: true,
    });

    const handleGetFile = (files: any) => {
        const fun: any = handleOpenSnackbar
        let fileArr: Array<File> = [];

        if (files.length > 1) {
            fun(`Max ${1} Image`, SnackBarType.Error);
            files = []
        }

        // const prefix = getPrefix(type)

        for (let i = 0; i < files.length; i++) {
            const e = files[i];
            e.preview = URL.createObjectURL(e)
            fileArr.push(e)
        }

        setFileArr(fileArr);
        handleSubmit(fileArr)()
    };

    useImperativeHandle(ref, () => ({
        fileArr,
        setFileArr,
    }));

    return (
        <Box>
            {(initialImg && !fileArr.length) &&
                <Stack direction='row' alignItems='center' sx={{ my: 3 }}>
                    <img src={initialImg} style={{ maxWidth: '300px' }} />
                </Stack>
            }
            {fileArr.map((e: any) => (
                <Stack direction='row' alignItems='center' sx={{ my: 3 }}>
                    <img src={e.preview} style={{ maxWidth: '300px' }} />
                </Stack>
            ))}
            <div {...getRootProps({className: 'dropzone'})}>
            <input style={{display: 'none'}} {...getInputProps()} />
              <Button variant="contained" sx={{ fontSize: '16px' }} onClick={open}>{t('UPLOAD')}</Button>
            </div>
        </Box>
    )
});
