import {CategoiesEdit, CategoiesList} from '../../../views/Category/'

export default [
    {
        path: '/category/create',
        name: 'categoryCreate',
        component: CategoiesEdit
    },
    {
        path: '/category/edit/:id',
        name: 'categoryEdit',
        component: CategoiesEdit,        
        props: true,
    },
    {
        path: '/category/list',
        name: 'categoryList',
        component: CategoiesList
    },
]