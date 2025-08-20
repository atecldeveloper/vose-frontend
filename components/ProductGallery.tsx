import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery, { ReactImageGalleryProps } from 'react-image-gallery';
import { makeStyles } from "@mui/styles";
import { useMediaQuery, useTheme } from "@mui/material";

type ProductGalleryProps = {
  tnPosition?: any
  images: any
}

const ProductGallery = ({tnPosition = 'right', images}: ProductGalleryProps) => {
  const theme = useTheme();

  const isSmallSize = useMediaQuery(theme.breakpoints.down('md'));
  
  const _images = images.map((e: any) => {
    return ({
      original: e,
      thumbnail: e,
    })
  });

  return <ImageGallery 
    items={_images}
    showFullscreenButton={false}
    thumbnailPosition={tnPosition}
    infinite={false}
    showNav={false}
    showPlayButton={false}
  />;
}

export default ProductGallery;