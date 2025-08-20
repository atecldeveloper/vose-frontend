// eslint-disable-next-line no-unused-vars
import { CSSProperties } from 'react'
import { createTheme, responsiveFontSizes } from '@mui/material'
import { zhCN } from '@mui/material/locale';

declare module '@mui/material/styles' {
  interface Palette {
    gary: Palette['primary']
    brown: Palette['primary']
    pink: Palette['primary']
    footerBg: Palette['primary']
    brownLight: Palette['primary']
  }
  interface PaletteOptions {
    gary: PaletteOptions['primary']
    brown: PaletteOptions['primary']
    pink: PaletteOptions['primary']
    footerBg: PaletteOptions['primary']
    brownLight: PaletteOptions['primary']

  }
  interface TypographyVariants {
    linkText: CSSProperties
    bold: CSSProperties
    normal: CSSProperties
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    linkText?: CSSProperties
    bold?: CSSProperties
    normal?: CSSProperties
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    icon: true
    linkText: true
    price: true
    bold: true
    normal: true
  }
}

let theme = createTheme(
  {
  palette: {
    primary: {
      main: '#757e65',
      light: '#a7b195'
    },
    secondary: {
      main: '#594f47',
      light: '#817563'
    },
    gary: {
      main: '#F7F7F7',
      light: '#777777'
    },
    pink: {
      main: '#f0d7cb'
    },
    brown: {
      main: '#d5a47f',
      light: '#847361'
    },
    brownLight: {
      main: '#cfb6a1',
    },
    footerBg: {
      main: '#827463'
    },
    background: {
      default: '#f4f4f4',
      paper: '#e6e6e6'
    }
  },
  typography: {
    allVariants: {
      fontFamily: 'Calibri',
    },
    fontFamily: 'Calibri',
    h2: {
      marginTop: '10px',
      fontFamily: 'BemboStd',
      fontSize: 38
    },
    linkText: {
      textDecoration: 'underline',
      fontSize: 14
    },
    fontWeightMedium: 500,
    fontWeightBold: 900,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Calibri';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Calibri'), local('Calibri-Regular'), url('/fonts/Calibri.woff2') format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        @font-face {
          font-family: 'BemboStd';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('BemboStd'), local('BemboStd-Regular'), url('/fonts/BemboStd.woff2') format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
})

theme.typography.h1 = {
  fontSize: '3.5rem',
  fontFamily: 'BemboStd',
  [theme.breakpoints.down('md')]: {
    fontFamily: 'BemboStd',
    fontSize: '2.5rem',
  },
};

theme.typography.h2 = {
  fontSize: 38,
  fontFamily: 'BemboStd',
  [theme.breakpoints.down('md')]: {
    fontFamily: 'BemboStd',
    fontSize: 28,
  },
};

theme.typography.body1 = {
  fontSize: 18,
  fontFamily: 'Calibri',
  [theme.breakpoints.down('sm')]: {
    fontFamily: 'Calibri',
    fontSize: 14,
  },
};

// theme = responsiveFontSizes(theme)

export { theme }
