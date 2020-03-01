import {AdminUsersEdit, AdminUsersList} from '../../../views/AdminUsers/'

export default [
    {
        path: '/admin_users/create',
        name: 'AdminUsersCreate',
        component: AdminUsersEdit
    },
    {
        path: '/admin_users/edit/:id',
        name: 'AdminUsersEdit',
        component: AdminUsersEdit,        
        props: true,
    },
    {
        path: '/admin_users/list',
        name: 'AdminUsersList',
        component: AdminUsersList
    },
]