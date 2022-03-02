import {
    createRouter as _createRouter,
    RouteRecordRaw,createMemoryHistory,
    createWebHistory
} from 'vue-router'
const routes :Array<RouteRecordRaw> =[
    {
        path:'/',
        alias:'/index',
        component:()=>import('../pages/index.vue')
    },
    {
        path:'/about',
        component:()=>import('../pages/about.vue')
    },{
        path:'/like',
        component:()=>import('../pages/like.vue')
    }
]


export function createRouter(){
    return _createRouter({
        routes,
        history: import.meta.env.SSR?createMemoryHistory():createWebHistory()
    })
}