import { Box, Button, Container, Divider, Fab, Grid, Link, Stack, styled, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getGroupDetailsService, getGroupExpenseService } from '../../services/groupServices';
import AlertBanner from '../AlertBanner';
import Iconify from '../Iconify';
import Loading from '../loading';
import useResponsive from '../../theme/hooks/useResponsive';
import { convertToCurrency, currencyFind, categoryIcon } from '../../utils/helper';
import { Link as RouterLink } from 'react-router-dom';
import dataConfig from '../../config.json';

const profile = JSON.parse(localStorage.getItem('profile'))
const emailId = profile?.emailId
var showCount = 10
export default function ViewContact() {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [group, setGroup] = useState({});
    const [groupExpense, setGroupExpense] = useState([]);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertExpense, setAlertExpense] = useState(false);
    const [alertExpenseMessage, setAlertExpenseMessage] = useState('');
    const [showAllExp, setShowAllExp] = useState(false);
    const [expFocus, setExpFocus] = useState(false);
    const [expenses, setExpenses] = useState()
    const [viewSettlement, setViewSettlement] = useState(0)

    const mdUp = useResponsive('up', 'md');

    const findUserSplit = (split) => {
        if (split) {
            split = split[0]
            return split[emailId]
        }
        return 0
    }

    useEffect(() => {
        const getGroupDetails = async () => {
            setLoading(true)
            const groupIdJson = {
                id: params.userId
            }
            const response_group = await getGroupDetailsService(groupIdJson, setAlert, setAlertMessage)
            const response_expense = await getGroupExpenseService(groupIdJson, setAlertExpense, setAlertExpenseMessage)

            response_group && setGroup(response_group?.data?.group)
            response_expense && setGroupExpense(response_expense?.data)
            response_expense?.data?.expense && setExpenses(response_expense?.data?.expense?.slice(0, 5))
            if (response_expense?.data?.expense?.length <= 5 || !response_expense)
                setShowAllExp(true)
            setLoading(false)
        }
        getGroupDetails()
    }, []);

    const CategoryStyle = styled('span')(({ theme }) => ({
        top: 22,
        left: -57,
        zIndex: 10,
        width: 35,
        height: 32,
        borderRadius: 50,
        position: 'relative'
    }));

    const LabelIconStyle = styled('div')(({ theme }) => ({
        borderRadius: 60,
        width: 60,
        height: 60,


    }))
    return (

        <Container>
            {loading ? <Loading /> :
                <>
                    <Box sx={{
                        bgcolor: (theme) => theme.palette['info'].lighter,
                        borderRadius: 2,
                        p: 2,
                        color: (theme) => theme.palette['primary'].darker,
                        pb: 3
                    }}>

                        <AlertBanner showAlert={alert} alertMessage={alertMessage} severity='error' />

                        
                        <Typography variant="h4" pb={1}>
                            {group?.groupName}
                        </Typography>
                        <Typography variant="subtitle2">
                            {group?.groupDescription}
                        </Typography>

                        <Box
                            sx={{
                                mb: -4,
                                ml: -2,
                                width: 80,
                                height: 36,
                                display: 'inline-block',
                                bgcolor: 'currentColor',
                                mask: `url(/static/icons/shape-avatar.svg) no-repeat center / contain`,
                                WebkitMask: `url(/static/icons/shape-avatar.svg) no-repeat center / contain`,
                                zIndex: 9,
                                color: 'background.paper'
                            }}
                        />
                        <CategoryStyle
                            sx={{
                                bgcolor: (theme) => theme.palette['primary'].lighter,
                                py: '6px',
                                px: '9px'
                            }}
                        >
                            <Iconify icon={categoryIcon(group?.groupCategory)} color={(theme) => theme.palette['primary'].darker}
                            />
                        </CategoryStyle>
                    </Box>

                    <Box sx={{
                        mt: -2, p: 2,
                        bgcolor: 'white',
                        minHeight: 50,
                        width: '100%'

                    }}>
                        <Grid container spacing={3} mt={'1px'}
                            sx={{
                                ...(mdUp && { px: 6 })
                            }}
                        >

                            <Grid item xs={12} md={4}>
                                <Stack spacing={2} direction='row'
                                    sx={{
                                        bgcolor: (theme) => theme.palette['primary'].lighter,
                                        borderRadius: 2,
                                        p: 3
                                    }}>
                                    <LabelIconStyle sx={{ bgcolor: (theme) => theme.palette['primary'].dark, py: '18px' }}>
                                        <Iconify icon=":nimbus:invoice" sx={{ width: '100%', height: '100%', color: 'white' }} />
                                    </LabelIconStyle>
                                    <Box>
                                        <Typography variant="h6"
                                            sx={{ color: (theme) => theme.palette['primary'].dark }}>
                                            Total expense b/w You & {group?.groupName}
                                        </Typography>
                                        <Typography variant="h5"
                                            sx={{ color: (theme) => theme.palette['primary'].darker }}>
                                            {currencyFind(group?.groupCurrency)} {groupExpense.total ? convertToCurrency(groupExpense.total) : 0}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Grid>

                            <Grid item xs={12} md={4}

                            >
                                <Stack spacing={2} direction='row' sx={{
                                    bgcolor: (theme) => theme.palette['success'].lighter,
                                    borderRadius: 2,
                                    p: 3
                                }} >
                                    <LabelIconStyle sx={{ bgcolor: (theme) => theme.palette['success'].dark, py: '18px' }}>
                                        <Iconify icon="mdi:cash-plus" sx={{ width: '100%', height: '100%', color: 'white' }} />
                                    </LabelIconStyle>
                                    <Box>
                                        <Typography variant="h6"
                                            sx={{ color: (theme) => theme.palette['success'].dark }}
                                        >
                                            You owed {group?.groupName}<br />
                                        </Typography>
                                        <Typography variant="h5"
                                            sx={{ color: (theme) => theme.palette['success'].darker }}>
                                            {currencyFind(group?.groupCurrency)} {findUserSplit(group?.split) > 0 ? convertToCurrency(findUserSplit(group?.split)) : 0}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Stack spacing={2} direction='row' sx={{
                                    bgcolor: (theme) => theme.palette['error'].lighter,
                                    borderRadius: 2,
                                    p: 3
                                }} >
                                    <LabelIconStyle sx={{ bgcolor: (theme) => theme.palette['error'].dark, py: '18px' }}>
                                        <Iconify icon="mdi:cash-minus" sx={{ width: '100%', height: '100%', color: 'white' }} />
                                    </LabelIconStyle>
                                    <Box>
                                        <Typography variant="h6"
                                            sx={{ color: (theme) => theme.palette['error'].dark }}
                                        >
                                            {group?.groupName} owe <br />
                                        </Typography>
                                        <Typography variant="h5"
                                            sx={{ color: (theme) => theme.palette['error'].darker }}>
                                            {currencyFind(group?.groupCurrency)} {findUserSplit(group?.split) < 0 ? convertToCurrency(Math.abs(findUserSplit(group?.split))) : 0}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Grid>

                        </Grid>
                    </Box>

                </>}
        </Container>
    )
}
