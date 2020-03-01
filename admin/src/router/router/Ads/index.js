import {AdsEdit, AdsList} from '../../../views/Ads/'

export default [
    {
        path: '/Ads/create',
        name: 'AdsCreate',
        component: AdsEdit
    },
    {
        path: '/Ads/edit/:id',
        name: 'AdsEdit',
        component: AdsEdit,        
        props: true,
    },
    {
        path: '/Ads/list',
        name: 'AdsList',
        component: AdsList
    },
]