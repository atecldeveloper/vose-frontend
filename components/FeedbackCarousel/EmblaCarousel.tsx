import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { IconButton, Stack, Typography, useTheme } from "@mui/material";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

type EmblaCarouselProps = {
  children: any;
  initRowItems: any;
};

const EmblaCarousel = ({ children, initRowItems = 3 }: EmblaCarouselProps) => {
  const theme = useTheme();
  const [viewportRef, embla] = useEmblaCarousel({
    slidesToScroll: initRowItems,
    skipSnaps: false,
    align: 'start'
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
  }, [embla, onSelect]);
  return (
    <div className="embla">
      <div className="embla__viewport" ref={viewportRef}>
        <div className="embla__container">
          {children.length > 0 ? children.map((e: any) => (
            <div
              style={{
                minWidth: `${100/initRowItems}%`,
                width: "100%",
                position: "relative",
                paddingLeft: "10px",
              }}
            >
              {e}
            </div>
          ))
          :  <Typography>
            No Related Products Found!
          </Typography>
        
        }
        </div>
      </div>
      <Stack direction={"row"} justifyContent="flex-end" sx={{ marginTop: 4 }}>
        <IconButton onClick={scrollPrev} disabled={!prevBtnEnabled}>
          <ArrowBackIosNewOutlinedIcon />
        </IconButton>
        <IconButton onClick={scrollNext} disabled={!nextBtnEnabled}>
          <ArrowForwardIosOutlinedIcon />
        </IconButton>
      </Stack>
    </div>
  );
};

export default EmblaCarousel;
