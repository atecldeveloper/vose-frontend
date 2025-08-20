import * as React from 'react';
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  Tab,
  Button,
  Divider,
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PanelContainerLayout from '../../components/PanelContainerLayout';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {getArrayObjByValue, setStateHelper} from '../../utils';
import {STATIC_VARIABLE} from '../../src/constants/staticData';
import {SnackBarType, MissionItems} from '../../src/constants';
import {handleGetDashboardAPI} from '../../src/controller/account';
import {useProps} from '../../src/context/state';
import {useSnackbarContext} from '../../src/context/snackbar';
import MissionCard from '../../components/MissionCard';
import TooltipIcon from '../../components/TooltipIcon';
import {useTranslations} from 'next-intl';

const Dashboard = () => {
  const {_handleChange} = useProps();
  const {handleOpenSnackbar} = useSnackbarContext();
  const [mainState, setMainState] = React.useState({
    coins: 0,
    points: 0,
    shopPoint: 0,
    totalFirstLinePoint: 0,
    totalSecondLinePoint: 0,
    level: 1,
    isShop: false,
    referralCode: '',
    downline: 0,
    secondDownline: 0,
    coinRate: 1,
    pointRate: 1,
    levelConfig: {
      firstLayer: {
        min: 0,
        max: 0,
      },
      secondLayer: {
        min: 0,
        max: 0,
      },
      shop: {
        min: 0,
        max: 0,
      },
    },
    completeMission: [],
    unCompleteMission: [],
    targetDirectStr: '',
    targetUpgradeProgress: '',
  });

  const td: any = useTranslations('Dashboard');
  const [value, setValue] = React.useState('1');
  const levelBadge = getArrayObjByValue(
    STATIC_VARIABLE.levelStatusArray,
    mainState.level,
  ).label;

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(mainState.referralCode).then(() => {
      handleOpenSnackbar('Copied!', SnackBarType.Success);
    });
  };

  const handleGetDashboard = async () => {
    await handleGetDashboardAPI({
      setMainState: setStateHelper(setMainState),
      changeContext: _handleChange,
      handleOpenSnackbar,
    });
  };

  React.useEffect(() => {
    handleGetDashboard();
  }, []);

  return (
    <PanelContainerLayout>
      <Box>
        <Typography
          variant="h2"
          sx={{
            color: t => t.palette.secondary.main,
            mb: 3,
            fontSize: 32,
            fontWeight: 500,
          }}
        >
          {td('TITLE')}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper
              elevation={3}
              sx={{backgroundColor: t => t.palette.background.default, p: 3}}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography
                  sx={{
                    color: t => t.palette.secondary.main,
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}
                >
                  {td('SHOPPING_D')}
                </Typography>
                <TooltipIcon
                  text={
                    <div>
                      <Typography sx={{fontSize: 14, fontWeight: 'bold'}}>
                        🌟 {mainState.coinRate / 100} {td('SHOPPING_D')} = RM 1
                      </Typography>
                      <Typography sx={{fontSize: 14}}>
                        {td('SHOPPING_CLAIM')}
                      </Typography>
                    </div>
                  }
                />
              </Stack>
              <Typography
                sx={{
                  color: t => t.palette.gary.light,
                  fontSize: 20,
                  textAlign: 'center',
                  py: 3,
                }}
              >
                {mainState.coins} Coins
              </Typography>
            </Paper>
          </Grid>
          {/*<Grid item xs={6}>
            <Paper elevation={3} sx={{ backgroundColor: (t) => t.palette.background.default, p: 3 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography sx={{ color: (t) => t.palette.secondary.main, fontSize: 20, fontWeight: "bold" }}>
                  {td('TOTAL_PV')}
                </Typography>
                <TooltipIcon text={
                <div>
                  <Typography sx={{fontSize: 14,fontWeight: 'bold'}}>🌟 {mainState.pointRate/100} {td('POINT')} = RM 1</Typography>
                  <Typography sx={{fontSize: 14}}>{td('PV_CLAIM')}</Typography>
                </div>
              }/>
              </Stack>
              <Typography
                sx={{ color: (t) => t.palette.gary.light, fontSize: 20, textAlign: "center", py: 3 }}
              >
                {mainState.points} Point
              </Typography>
            </Paper>
            </Grid>*/}

          {(mainState.level === 2 || mainState.level === 3) && (
            <Grid item xs={6}>
              <Paper
                elevation={3}
                sx={{backgroundColor: t => t.palette.background.default, p: 3}}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography
                    sx={{
                      color: t => t.palette.secondary.main,
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}
                  >
                    {td('FIRST_LINE_P')}
                  </Typography>
                  <TooltipIcon
                    text={
                      <div>
                        {/*<Typography sx={{fontSize: 14,fontWeight: 'bold'}}>🌟 {mainState.pointRate/100} Point = RM 1</Typography>*/}
                        {/*<Typography sx={{fontSize: 14}}>{td('PV_CLAIM')}</Typography>*/}
                        <Typography sx={{fontSize: 14}}>
                          {td('FIRST_DOWN_DESC', {
                            target: mainState.targetDirectStr,
                          })}
                          <b>{mainState.levelConfig.firstLayer.max}%</b>
                          {td('SECOND_DOWN_DESC', {
                            target: mainState.targetDirectStr,
                          })}
                          <b>{mainState.levelConfig.firstLayer.min}%</b>
                          {td('THIRD_DOWN_DESC', {
                            target: mainState.targetDirectStr,
                          })}
                        </Typography>
                      </div>
                    }
                  />
                </Stack>
                <Typography
                  sx={{
                    color: t => t.palette.gary.light,
                    fontSize: 20,
                    textAlign: 'center',
                    py: 3,
                  }}
                >
                  {mainState.totalFirstLinePoint} Point
                </Typography>
              </Paper>
            </Grid>
          )}

          {mainState.level === 3 && (
            <Grid item xs={6}>
              <Paper
                elevation={3}
                sx={{backgroundColor: t => t.palette.background.default, p: 3}}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography
                    sx={{
                      color: t => t.palette.secondary.main,
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}
                  >
                    {td('SECOND_LINE_P')}
                  </Typography>
                  <TooltipIcon
                    text={
                      <div>
                        {/*<Typography sx={{fontSize: 14,fontWeight: 'bold'}}>🌟 {mainState.pointRate/100} Point = RM 1</Typography>*/}
                        {/*<Typography sx={{fontSize: 14}}>P{td('PV_CLAIM')}</Typography>*/}
                        <Typography sx={{fontSize: 14}}>
                          {td('FIRST_DOWN_DESC', {
                            target: mainState.targetDirectStr,
                          })}
                          <b>{mainState.levelConfig.secondLayer.max}%</b>
                          {td('SECOND_DOWN_DESC', {
                            target: mainState.targetDirectStr,
                          })}
                          <b>{mainState.levelConfig.secondLayer.min}%</b>
                          {td('THIRD_DOWN_DESC')}
                        </Typography>
                      </div>
                    }
                  />
                </Stack>
                <Typography
                  sx={{
                    color: t => t.palette.gary.light,
                    fontSize: 20,
                    textAlign: 'center',
                    py: 3,
                  }}
                >
                  {mainState.totalSecondLinePoint} Point
                </Typography>
              </Paper>
            </Grid>
          )}

          {mainState.isShop && (
            <Grid item xs={6}>
              <Paper
                elevation={3}
                sx={{backgroundColor: t => t.palette.background.default, p: 3}}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography
                    sx={{
                      color: t => t.palette.secondary.main,
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}
                  >
                    {td('SHOP_P')}
                  </Typography>
                  <TooltipIcon
                    text={
                      <div>
                        {/*<Typography sx={{fontSize: 14,fontWeight: 'bold'}}>🌟 {mainState.pointRate/100} Point = RM 1</Typography>*/}
                        {/*<Typography sx={{fontSize: 14}}>{td('PV_CLAIM')}</Typography>*/}
                        <Typography sx={{fontSize: 14}}>
                          {td('FIRST_DOWN_DESC', {
                            target: mainState.targetDirectStr,
                          })}
                          <b>{mainState.levelConfig.shop.max}%</b>
                          {td('SECOND_DOWN_DESC', {
                            target: mainState.targetDirectStr,
                          })}
                          <b>{mainState.levelConfig.shop.min}%</b>
                          {td('THIRD_DOWN_DESC')}
                        </Typography>
                      </div>
                    }
                  />
                </Stack>
                <Typography
                  sx={{
                    color: t => t.palette.gary.light,
                    fontSize: 20,
                    textAlign: 'center',
                    py: 3,
                  }}
                >
                  {mainState.shopPoint} Point
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>

        <Box sx={{width: '100%', mt: 3}}>
          <TabContext value={value}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab
                  sx={{fontSize: 18}}
                  label={td('WAY_TO_REDEEM')}
                  value="1"
                />
                <Tab
                  sx={{fontSize: 18}}
                  label={td('COMPLETED_REDEEM')}
                  value="2"
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Grid container spacing={3}>
                {mainState.unCompleteMission.map((e: any) => (
                  <Grid item xs={12} md={6}>
                    <MissionCard
                      title={e.content.title}
                      description={e.content.description}
                      progress={e.content.progress}
                      isComplete={e.done}
                    />
                  </Grid>
                ))}
              </Grid>
            </TabPanel>
            <TabPanel value="2">
              <Grid container spacing={3}>
                {mainState.completeMission.map((e: any) => (
                  <Grid item xs={12} md={6}>
                    <MissionCard
                      title={e.content.title}
                      description={e.content.description}
                      progress={e.content.progress}
                      isComplete={e.done}
                    />
                  </Grid>
                ))}
              </Grid>
            </TabPanel>
          </TabContext>
        </Box>
        <Typography
          sx={{
            color: t => t.palette.secondary.light,
            mt: 5,
            mb: 2,
            fontSize: 24,
          }}
        >
          {td('WAY_TO_EARN')}
        </Typography>
        <Divider />
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <Stack alignItems="center" sx={{py: 2, px: 7}}>
              <Typography sx={{color: t => t.palette.secondary.main}}>
                {td('REFER_T')}
              </Typography>
              <Typography
                sx={{
                  color: t => t.palette.gary.light,
                  fontSize: 16,
                  textAlign: 'center',
                  my: 1,
                }}
              >
                {td('REFER_D')}
              </Typography>
              <Stack
                alignItems="center"
                sx={{
                  py: 2,
                  width: '100%',
                  borderColor: t => t.palette.secondary.main,
                  borderStyle: 'solid',
                  borderWidth: 1,
                }}
              >
                <Button sx={{textTransform: 'inherit'}} onClick={handleCopy}>
                  <Stack>
                    <Typography
                      sx={{
                        color: t => t.palette.secondary.main,
                        fontWeight: 'bold',
                        mb: '-5px',
                      }}
                    >
                      {mainState.referralCode}
                    </Typography>
                    <Typography
                      sx={{color: t => t.palette.gary.light, fontSize: 16}}
                    >
                      {' '}
                      {td('COPY')}
                    </Typography>
                  </Stack>
                </Button>
              </Stack>
              <Typography sx={{color: t => t.palette.secondary.main, mt: 1}}>
                {mainState.downline}: {td('DOWNLINE')}
              </Typography>
              <Typography sx={{color: t => t.palette.secondary.main}}>
                {mainState.secondDownline}: {td('DOWNLINE_S')}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{
                height: '100%',
                my: 2,
                px: 10,
                borderColor: t => t.palette.secondary.main,
                borderStyle: 'solid',
                borderWidth: 1,
              }}
            >
              <Box
                sx={{
                  backgroundColor: t => t.palette.gary.light,
                  color: 'white',
                  fontWeight: 'bold',
                  pt: 1.2,
                  pb: 1,
                  px: 3,
                  borderRadius: 1,
                }}
              >
                <Typography sx={{fontSize: 40}}>{levelBadge}</Typography>
              </Box>
              <Typography sx={{color: t => t.palette.secondary.main, pt: 2}}>
                {td('CURRENT_T')}: <b>{levelBadge}</b>
              </Typography>
              <Typography
                sx={{
                  color: t => t.palette.gary.light,
                  fontSize: 16,
                  textAlign: 'center',
                  my: 1,
                }}
              >
                {mainState.level === 3 ? td('TIER_F') : td('TIER_D')}
              </Typography>

              <Typography
                sx={{
                  color: t => t.palette.gary.light,
                  fontSize: 16,
                  textAlign: 'center',
                  my: 1,
                }}
              >
                {mainState.targetUpgradeProgress}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
        <Box sx={{m: 5}} />
      </Box>
    </PanelContainerLayout>
  );
};

export default Dashboard;

export const getServerSideProps = ({locale, locales}) => {
  return {
    props: {
      messages: {
        ...require(`../../messages/${locale}.json`),
      },
    },
  };
};
