// component
import Iconify from '../../components/Iconify';

import configData from '../../config.json'

// ----------------------------------------------------------------------

const getIcon = (name) => < Iconify icon = { name }
width = { 22 }
height = { 22 }
/>;

const navConfig = [{
        title: 'dashboard',
        path: configData.DASHBOARD_URL,
        icon: getIcon('material-symbols-light:dashboard-rounded'),
    },
    {
        title: 'groups',
        path: configData.USER_GROUPS_URL,
        icon: getIcon('material-symbols-light:groups-2'),
    },
    {
        title: 'Create Group',
        path: configData.CREATE_GROUP_URL,
        icon: getIcon('fa6-solid:users-gear'),
    },
    {
        title: 'Contacts',
        path: configData.CONTACT_URL,
        icon: getIcon('material-symbols-light:contacts-product'),
    },
];

export default navConfig;