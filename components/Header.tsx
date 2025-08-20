import {
  Box,
  Container,
  Grid,
  IconButton,
  Stack,
  useTheme,
  useMediaQuery,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Menu,
  Badge,
  Button,
} from "@mui/material";
import * as React from "react";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import Link from "next/link";
import clsx from "clsx";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import {useProps} from "../src/context/state";
import {useTranslations} from "next-intl";

const useStyles: any = makeStyles(
  (theme: any) => {
    return {
      link_active: {
        borderBottom: `2px solid ${theme.palette.primary.main}`,
      },
      font_active: {
        color: theme.palette.primary.main,
      },
      phone_font_active: {
        color: "white",
      },
    };
  },
  {
    name: "CutomizeHeader",
  }
);

const Header: React.FC = () => {
  const { isLogin, account, localCart } = useProps();
  const t: any = useTranslations("Menu");
  const classes = useStyles();
  const history = useRouter();
  const { locales, locale, pathname, query, asPath } = useRouter();
  const theme = useTheme();
  const timeoutRef = React.useRef<any>();
  const [isSticky, setNavBarSticky] = React.useState<any>(false);
  const [anchorEl, setAnchorEl] = React.useState<any>(null);
  // @ts-ignore
  const otherLocales = locales.filter((l) => l !== locale); // Find all the locales apart from the current locale.
  const isShopNotReady = account.shopStatus == 3;
  let isShopUncompleted = false;

  if (account && account.isShop && account.shopStatus == 2) {
    isShopUncompleted = true;
  }

  const isZh = locale == 'cn';
  const MENUITEMS = [
    {
      name: t('HOME'),
      path: "/",
      size: 1.3
    },
    {
      name: t('STORE'),
      path: "/product",
      size: isZh ? 2 : 2.5,
      children: [
        {
          name: t('PRODUCT'),
          path: "/product/booster",
        },
        {
          name: t('PRODUCT_OTHER'),
          path: "/product",
        },
      ]
    },
    {
      name: t('BRAND_STORY'),
      path: "/brand/story",
      size: isZh ? 2.2 : 1.7,
      children: [
        {
          name: t('BRAND_STORY'),
          path: "/brand/story",
        },
        {
          name: t('BRAND_PRINCIPLE'),
          path: "/brand/formula",
        },
        {
          name: t('BRAND_LOVE'),
          path: "/brand/care",
        }
      ]
    },
    {
      name: t('TESTIMONIAL'),
      path: "/testimonial",
      size: 2
    },
    {
      name: t('FAQ'),
      path: "/faq",
      size: isZh ? 2 : 1
    },
    {
      name: t('CONTACT'),
      path: "/contact_us",
      size: 2
    },
  ];


  React.useEffect(() => {
    changeSticky();
    window.addEventListener("scroll", changeSticky);
  }, []);
  const sameCurrentPath = (path: string) => {
    return history.pathname === path;
  };

  let isPhoneSize = false;
  if (useMediaQuery(theme.breakpoints.down("md"))) {
    isPhoneSize = true;
  }

  const changeSticky = () => {
    if (window.scrollY >= 30) {
      //start with fixed header
      setNavBarSticky(true);
    } else {
      setNavBarSticky(false);
    }
  };

  let headerStyle: any = {
    position: "fixed",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: {md: "110px", xs: "75px"},
    backgroundColor: "white",
    top: 0,
    left: 0,
    right: 0,
  };

  if (isSticky) {
    headerStyle = {
      position: "fixed",
      display: "flex",
      zIndex: 100,
      top: 10,
      left: 0,
      right: 0,
      alignItems: "center",
      justifyContent: "space-between",
      height: "70px",
      width: "100%",
      backgroundColor: 'white',
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      // borderRadius: 5,
    };
  }

  const handleCleanTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  const handleClick = (event: any) => {
    handleCleanTimeout()
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClickNoDropdown = (event: any) => {
      setAnchorEl(null);
  };


  const handleClose = (event: any) => {
    handleCleanTimeout()
    timeoutRef.current = setTimeout(() => {
      setAnchorEl(null)
    }, 500);
  };

  const handleAccountClick = () => {
    const pathAction = isLogin ? '/panel/dashboard' : '/login'
    history.push(pathAction)
  }

  const handleShopClick = () => {
    let path: string;

    if (isLogin) {
      if (account.isShop) {
        if (account.shopStatus == 2) {
          path = '/shop-panel/purchase'
        } else if (account.shopStatus == 3) {
          path = '/register-shop-pending'
        }
        else {
          path = '/shop-panel/profile'
        }
      } else {
        path = '/register-shop'
      }
    } else {
      path = '/register-shop'
    }

    history.push(path)
  }

  return (
    <Container
      maxWidth={false}
      sx={{
        position: "fixed",
        backgroundColor: isSticky ? "transparent" : "white",
        height: '110px',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
      }}
    >
      <Container sx={headerStyle} style={{ transition: 'all 0.2s'}}>
        <img src={"/assets/VOSE-02.png"} style={{ width: "175px", objectFit: "cover" }} />
        {!isPhoneSize && (
          <Grid container spacing={0} sx={{ maxWidth: "700px" }}>
            {MENUITEMS.map((e) => {
              let selectedID: any  = anchorEl ? anchorEl.id  : undefined;
              return (
                <Grid item sm={e.size}>
                  <Box
                    id={e.name}
                    sx={{
                      cursor: "pointer",
                      color: (t) => t.palette.primary.main,
                      fontFamily: (t) => t.typography.fontFamily,
                      fontWeight: (t) => t.typography.fontWeightMedium,
                      fontSize: { md: "16px", sx: "13px" },
                      textAlign: "center",
                      "&:hover": {
                        "& span": {
                          borderBottom: (t) => `2px solid ${t.palette.primary.main}`,
                        },
                      },
                    }}
                    onMouseOver={e.children ? handleClick : handleClickNoDropdown}
                    onMouseLeave={handleClose}
                  >
                    <span className={clsx(sameCurrentPath(e.path) && classes.link_active)}>
                      <Link href={e.path}>
                        <span className={clsx(sameCurrentPath(e.path) && classes.font_active)}>{e.name}</span>
                      </Link>
                    </span>
                  </Box>
                  {e.children && selectedID == e.name && (
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      sx={{
                        zIndex: '0 !important',
                        ".MuiPaper-root": {
                          zIndex: '1000 !important',
                          backgroundColor: "white",
                          borderStyle: "solid",
                          borderWidth: 1,
                          borderColor: (t) => t.palette.primary.main,
                        },
                      }}
                      PaperProps={{
                        style: {
                          transform: isSticky ? "translateY(35px)" : "translateY(45px)",
                        },
                      }}
                      MenuListProps={{
                        onMouseOver: handleCleanTimeout,
                        onMouseLeave: handleClose,
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      {e.children
                        ? e.children.map((i) => {
                            return (
                              <Link href={i.path}>
                              <MenuItem
                                sx={{
                                  color: (t) => t.palette.primary.main,
                                  "&:hover": {
                                    backgroundColor: (t) => t.palette.primary.main,
                                    color: "white",
                                  },
                                }}
                              >
                               {i.name}
                              </MenuItem>
                              </Link>
                            );
                          })
                        : null}
                    </Menu>
                  )}
                </Grid>
              );
            })}
          </Grid>
        )}
        <Stack direction="row">
          {isPhoneSize && <PhoneMenuDrawer />}
          <Stack>
            {!isPhoneSize &&
              otherLocales.map((locale) => (
                <Link href={{ pathname, query }} as={asPath} locale={locale}>
                  <Button variant='text'>
                     {locale == 'cn' ? '中文' : 'English'}
                  </Button>
                </Link>
              ))
            }
          </Stack>
          {
            isLogin &&
            <IconButton onClick={handleShopClick}>
              <StorefrontOutlinedIcon />
            </IconButton>
          }

          <IconButton disabled={isShopUncompleted} onClick={handleAccountClick}>
            <PersonOutlineOutlinedIcon />
          </IconButton>
          {/* <IconButton disabled={isShopUncompleted} onClick={() => {history.push('/order/cart')}}>
            <Badge badgeContent={localCart ? localCart.length : 0} color="primary">
            <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton> */}
        </Stack>
      </Container>
    </Container>
  );
};

export const PhoneMenuDrawer = () => {
  const t = useTranslations("Menu");
  const [isOpen, setOpen] = React.useState(false);
  const { locales, locale, pathname, query, asPath } = useRouter();
  const classes = useStyles();
  const theme = useTheme();
  const isSmallSize = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useRouter();
  const isZh = locale === 'cn';
  // @ts-ignore
  const otherLocales = locales.filter((l) => l !== locale); // Find all the locales apart from the current locale.

  const MENUITEMS = [
    {
      name: t('HOME'),
      path: "/",
      size: 1.5
    },
    {
      name: t('STORE'),
      path: "/product",
      size: isZh ? 2 : 2.5,
      children: [
        {
          name: t('PRODUCT'),
          path: "/product/booster",
        },
        {
          name: t('PRODUCT_OTHER'),
          path: "/product",
        },
      ]
    },
    {
      name: t('BRAND_STORY'),
      path: "/brand/story",
      size: 2,
      children: [
        {
          name: t('BRAND_STORY'),
          path: "/brand/story",
        },
        {
          name: t('BRAND_PRINCIPLE'),
          path: "/brand/formula",
        },
        {
          name: t('BRAND_LOVE'),
          path: "/brand/care",
        }
      ]
    },
    {
      name: t('TESTIMONIAL'),
      path: "/testimonial",
      size: 2
    },
    {
      name: t('FAQ'),
      path: "/faq",
      size: isZh ? 2 : 1
    },
    {
      name: t('CONTACT'),
      path: "/contact_us",
      size: 2
    },
  ];

  const sameCurrentPath = (path: string) => {
    return history.pathname === path;
  };

  const toggleDrawer = (open: boolean) => {
    setOpen(open);
  };

  const list = () => (
    <Popper
      style ={{
        top: isSmallSize ? "12vh" : "10vh",
        left: 0,
        right: 0,
        zIndex: 100,
        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.16)",
      }}
      open={isOpen}
      role={undefined}
      transition
      disablePortal
    >
      {({ TransitionProps, placement }) => (
        <Grow {...TransitionProps} style={{ transformOrigin: "center top" }}>
          <Paper>
            <ClickAwayListener onClickAway={() => toggleDrawer(false)}>
              <MenuList
                sx={{ backgroundColor: (t) => t.palette.background.default, pt: 0 }}
                autoFocusItem={isOpen}
                id="menu-list-grow"
                onKeyDown={(event: any) => {
                  console.log(event);
                }}
              >
                {MENUITEMS.map((e) => {
                  return (
                    <>
                    <Link href={e.path}>
                      <MenuItem
                        sx={{
                          height: 40,
                          cursor: "pointer",
                          color: (t) => t.palette.primary.main,
                          fontFamily: (t) => t.typography.fontFamily,
                          fontWeight: (t) => t.typography.fontWeightMedium,
                          fontSize: { md: "16px", sx: "13px" },
                          backgroundColor: (t) =>
                            sameCurrentPath(e.path) ? t.palette.primary.main : "white",
                          "&:hover": {
                            backgroundColor: (t) => t.palette.primary.main,
                            color: "white !important",
                          },
                        }}
                      >
                          <span className={clsx(sameCurrentPath(e.path) && classes.phone_font_active)}>
                            {e.name}
                          </span>
                      </MenuItem>
                      </Link>
                      {e.children &&
                        e.children.map((i: any) => {
                          return(<Link href={i.path}>
                            <MenuItem
                              sx={{
                                pl: 4,
                                height: 40,
                                cursor: "pointer",
                                color: (t) => t.palette.primary.main,
                                fontFamily: (t) => t.typography.fontFamily,
                                fontWeight: (t) => t.typography.fontWeightMedium,
                                fontSize: { md: "16px", sx: "13px" },
                                backgroundColor: (t) =>
                                  sameCurrentPath(i.path) ? t.palette.primary.main : "white",
                                "&:hover": {
                                  backgroundColor: (t) => t.palette.primary.main,
                                  color: "white !important",
                                },
                              }}
                            >
                              <span className={clsx(sameCurrentPath(i.path) && classes.phone_font_active)}>
                                {i.name}
                              </span>
                            </MenuItem>
                          </Link>)
                        })}
                    </>
                  );
                })}

                {otherLocales.map((locale) => (
                    <Link href={{ pathname, query }} as={asPath} locale={locale} onClick={() => {console.log('wtf')}}>
                      <MenuItem
                          sx={{
                            height: 40,
                            cursor: "pointer",
                            color: (t) => t.palette.primary.main,
                            fontFamily: (t) => t.typography.fontFamily,
                            fontWeight: (t) => t.typography.fontWeightMedium,
                            fontSize: { md: "16px", sx: "13px" },
                            backgroundColor: (t) => "white",
                            "&:hover": {
                              backgroundColor: (t) => t.palette.primary.main,
                              color: "white !important",
                            },
                          }}
                      >
                        <span>
                          {locale == 'cn' ? '中文' : 'English'}
                        </span>
                      </MenuItem>
                    </Link>
                ))}

              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );

  return (
    <div>
      <React.Fragment>
        <IconButton onClick={() => toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        {list()}
      </React.Fragment>
    </div>
  );
};

export default Header;
