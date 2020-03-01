import {ArticlesEdit, ArticlesList} from '../../../views/Articles'

export default [
    {
        path: '/articles/create',
        name: 'articlesCreate',
        component: ArticlesEdit
    },
    {
        path: '/articles/edit/:id',
        name: 'articlesEdit',
        component: ArticlesEdit,        
        props: true,
    },
    {
        path: '/articles/list',
        name: 'articlesList',
        component: ArticlesList
    },
]