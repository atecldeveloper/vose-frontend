import React, {useImperativeHandle} from "react";
import {useDropzone} from "react-dropzone";
import {useSnackbarContext} from "../../src/context/snackbar";
import {SnackBarType} from "../../src/constants";
import {Button, Stack, Typography, Box} from "@mui/material";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

interface Props {
    maxFiles?: number
    minFiles?: number
    type: number
    index?: number
    disabled?: boolean
    handleDelete: (items: DeleteImageProps) => void
    handleUploaded?: (files: any) => void
}

export interface ImageObjectProps {
    id: any
    name: string
    type: number
    src: string
}

export interface DeleteImageProps {
    deleteItem: ImageObjectProps
    tmpImage: Array<File>
    uploadedImage: Array<ImageObjectProps>
    setFileArr: any
    closePopup: any
}

const getPrefix = (type: number) => {
    let prefix = '';

    switch (type) {
        case 1:
            prefix = 'SSM_'
            break
        case 2:
            prefix = 'ICFront_'
            break
        case 3:
            prefix = 'ICBack_'
            break
        case 4:
            prefix = ''
            break
        default:
            prefix = 'SSM_'
    }
    return prefix
}

export const UploadSSM = React.forwardRef<any, Props>((
    {
        maxFiles = 100,
        minFiles=1,
        type,
        index=0,
        disabled=false,
        handleDelete,
        handleUploaded=() => {}
    },
    ref
) => {
    const { handleOpenSnackbar } = useSnackbarContext();
    const alertPopupRef = React.useRef<any>(null);
    const [fileArr, setFileArr] = React.useState<Array<File>>([])
    const [deleteItem, setDeleteItem] = React.useState<ImageObjectProps>({
        id: '',
        name: 'string',
        type: 1,
        src: ''
    })

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
        // let filesArr: Array<File> = [...fileArr];

        // if (files.length + filesArr.length > maxFiles) {
        //     fun(`Max ${maxFiles} Image`, SnackBarType.Error);
        //     files = []
        // }

        if (files.length > maxFiles) {
            fun(`Max ${maxFiles} File`, SnackBarType.Error);
            files = []
        } else if (files.length < minFiles) {
            fun(`Min ${minFiles} File`, SnackBarType.Error);
            files = []
        }

        const prefix = getPrefix(type)

        for (let i = 0; i < files.length; i++) {
            const e = files[i];
            const getFileType = e.name.split('.')[1]
            e.rename = `${prefix}${index+1}.${getFileType}`
            fileArr.push(e)
        }

        // files.forEach((e: File) => {
        //     filesArr.push(e);
        // });

        setFileArr(fileArr);
        handleUploaded(fileArr);
    };

    const handleClosePopup = () => {
        alertPopupRef.current.handleClose();
    }

    useImperativeHandle(ref, () => ({
        fileArr,
        setFileArr,
        handleClosePopup
    }));

    return (
        <Box>
            {fileArr.map((e: any) => (
                <Stack direction='row' alignItems='center' sx={{ my: 3 }}>
                    <InsertDriveFileIcon />
                    <Typography sx={{ml: 1}}>{e.name}</Typography>
                </Stack>
            ))}
            <div {...getRootProps({className: 'dropzone'})}>
            <input style={{display: 'none'}} {...getInputProps()} />
            <Button variant="contained" sx={{ fontSize: '16px' }} disabled={disabled} onClick={open}>Uploads</Button>
            </div>
        </Box>
    )
});

UploadSSM.displayName = 'UploadSSM';
