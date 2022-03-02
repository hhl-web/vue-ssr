import { createSSRApp } from 'vue'
import App from './App.vue'
import {createRouter} from './router/index';
import  {createStore} from './store/index'

// 生成vue实例
export function createApp(){
    const app =createSSRApp(App);
    const router =createRouter();
    const store=createStore();
    app.use(router).use(store)
    return {app,router,store};
}