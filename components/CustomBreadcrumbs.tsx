import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export type CustomBreadcrumbsProps = {
  breadcrumbsArr: any
};




const CustomBreadcrumbs = ({breadcrumbsArr}: CustomBreadcrumbsProps ) => {

  function handleClick(e: any) {
  }

  return (
    <Stack spacing={2}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbsArr.map((e: any, index: number) => {
          if (e.path) {
            return  <Link underline="hover" key={index} color="inherit" href={e.path} onClick={() => handleClick(e.path)}>
            {e.label}
          </Link>
        }
        else {
          return <Typography key={index} color="text.primary">
          {e.label}
        </Typography>
        }
        
        })}
      </Breadcrumbs>
    </Stack>
  );
};


export default CustomBreadcrumbs;