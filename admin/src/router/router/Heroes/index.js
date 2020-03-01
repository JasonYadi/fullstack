import {HeroesEdit, HeroesList} from '../../../views/Heroes/'

export default [
    {
        path: '/heroes/create',
        name: 'heroesCreate',
        component: HeroesEdit
    },
    {
        path: '/heroes/edit/:id',
        name: 'heroesEdit',
        component: HeroesEdit,        
        props: true,
    },
    {
        path: '/heroes/list',
        name: 'heroesList',
        component: HeroesList
    },
]