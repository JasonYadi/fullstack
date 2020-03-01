import {GoodsEdit, GoodsList} from '../../../views/Goods/'

export default [
    {
        path: '/goods/create',
        name: 'goodsCreate',
        component: GoodsEdit
    },
    {
        path: '/goods/edit/:id',
        name: 'goodsEdit',
        component: GoodsEdit,        
        props: true,
    },
    {
        path: '/goods/list',
        name: 'goodsList',
        component: GoodsList
    },
]