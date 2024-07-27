// @mui
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Card, CardContent, Typography, Box, AvatarGroup, Avatar, Stack, Grid } from '@mui/material';
import { convertToCurrency, currencyFind} from '../../utils/helper';
// utils
// components
import Iconify from '../Iconify';
import gravatarUrl from 'gravatar-url';
import configData from '../../config.json'


const CategoryStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  width: 35,
  height: 32,
  position: 'absolute',
  left: 22,
  top: 130,
  background: "red",
  borderRadius: 50
}));


ContactCards.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  contactUrl: PropTypes.string,
  share: PropTypes.number,
  currencyType: PropTypes.string,
  groupCategory: PropTypes.string,
  isContactActive: PropTypes.bool,
  sx: PropTypes.object,
};

export default function ContactCards({ name, email, contactUrl, share, currencyType, isContactActive, icon, color = 'primary', sx, ...other }) {
  return (
    <Card
      sx={{
        p: 0,
        boxShadow: 5,
        borderRadius: 2,
        position: 'relative',
        ...sx,
      }}
      {...other}
    >

      <Box
        component="span"
        sx={{
          width: 80,
          height: 36,
          display: 'inline-block',
          bgcolor: 'currentColor',
          mask: `url(/static/icons/shape-avatar.svg) no-repeat center / contain`,
          WebkitMask: `url(/static/icons/shape-avatar.svg) no-repeat center / contain`,
          zIndex: 9,
          top: 125,
          position: 'absolute',
          color: 'background.paper'
        }}
      />
      <CategoryStyle
        sx={{
          bgcolor: (theme) => theme.palette[color].lighter,
          py: '6px',
          px: '9px'
        }}
      >
        <Iconify icon={'mdi:user'} color={(theme) => theme.palette[color].darker}
        />
      </CategoryStyle>

      <Box pt={6} px={2} pb={3}
        sx={{
          bgcolor: (theme) => theme.palette[color].lighter,
          color: (theme) => theme.palette[color].darker
        }}
      >
        <Typography noWrap variant="h3" fontSize={30} sx={{ opacity: 0.72 }}>
          {name}
        </Typography>
        <Typography noWrap variant="subtitle2" fontSize={14} color={'text.secondary'}>
          {email} &nbsp;</Typography>
      </Box>
      <CardContent
        sx={{
          pt: 3,
          px: 1
        }}

      >
        <Stack direction="row" spacing={2} p={1} mt={1}>
          <Typography sx={{
            bgcolor: isContactActive ? (theme) => theme.palette['error'].lighter : (theme) => theme.palette['success'].lighter,
            p: 1,
            borderRadius: 1,
            color: isContactActive ? (theme) => theme.palette['error'].darker : (theme) => theme.palette['success'].darker
          }}>
            {isContactActive ? (<b>Not Settled</b>) : (<b>Settled</b>)}
          </Typography>

          <Typography sx={{
            bgcolor: share < 0 ? (theme) => theme.palette['error'].lighter : (theme) => theme.palette['success'].lighter,
            p: 1,
            borderRadius: 1,
            color: share < 0 ? (theme) => theme.palette['error'].darker : (theme) => theme.palette['success'].darker
          }}>
            <b> {share < 0? <>You owe</> : <>You are owed</>} : &nbsp;
              {currencyFind(currencyType)} {convertToCurrency(Math.abs(Math.floor(share)))}</b>
          </Typography>
        </Stack>
        <Grid container direction="row" spacing={1} p={1}>
          <AvatarGroup max={3} sx={{ width: '100%' }}>
            <Avatar key={contactUrl} alt={contactUrl.toUpperCase()} src={gravatarUrl(contactUrl, { size: 350 ,default: configData.USER_DEFAULT_LOGO_URL})} />
          </AvatarGroup>
        </Grid>

      </CardContent>

    </Card>
  );
}
