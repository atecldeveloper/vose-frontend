import Paper from "@mui/material/Paper";
import { handleDownloadImage } from "../utils";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DownloadIcon from '@mui/icons-material/Download';
import { IconButton } from "@mui/material";
type DownloadButtonProps = {
  name: string;
  path: string;
}
const DownloadButton = ({ name, path }: DownloadButtonProps) => {
  return (
      <Paper
        elevation={3}
        sx={{
          px: 2,
          py: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <DescriptionOutlinedIcon color='primary' fontSize='medium'/>
        {name}
        <IconButton
          onClick={() => handleDownloadImage({ path: path, name: name })}
        >
          <DownloadIcon/>
        </IconButton>
      </Paper>
  );
};
export default DownloadButton;
