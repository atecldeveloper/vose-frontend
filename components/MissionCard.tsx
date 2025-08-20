import * as React from "react";
import {Paper, Stack, Typography} from "@mui/material";

interface Props {
    title: string
    description: string
    progress: any
    isComplete: boolean
}

const MissionCard = ({title, description, progress, isComplete}: Props) => {
    return (
        <Paper elevation={3} sx={{ backgroundColor: (t) => t.palette.background.default, p: 3 }}>
            <Typography
                sx={{ color: (t) => t.palette.secondary.main, fontSize: 20, fontWeight: "bold" }}
            >
                {title}
            </Typography>
            <Typography sx={{ color: (t) => t.palette.gary.light, pt: 3, pb: 2 }}>
                {description}
            </Typography>
            <Stack sx={{ width: "100%" }} alignItems={"flex-end"}>
                <Typography sx={{ color: isComplete ? (t) => t.palette.gary.light : 'red', pt: 3, pb: 2 }}>
                    {isComplete ? 'Done' : progress}
                </Typography>
            </Stack>
        </Paper>
    )
}

export default MissionCard;
