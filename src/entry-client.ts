import { createApp } from "./main";
import { RouteRecordNormalized } from "vue-router";
const { app,router,store } = createApp();

function getMatchedComponents(list:RouteRecordNormalized[]){
    return list.map(({components})=>{
        return components.default
    })
}

router.isReady().then(()=>{
    // 客户端可以直接在store获取到状态，这是因为服务端渲染之前预取了数据。
    router.beforeResolve(async (to:any,from:any)=>{
        let toMatchedComponents = getMatchedComponents(to.matched);
        let fromMatchedComponents = getMatchedComponents(from.matched);
    
        let isSame =false;
        let components = toMatchedComponents.filter((component,index)=>{
            return isSame || (isSame = fromMatchedComponents[index]!==component)
        })
        console.log(components)
        // 需要执行async的组件
        components.length &&
        (await Promise.all(
            components.map((component) => {
                // @ts-ignore
                if (component.asyncData) {
                    console.log('1233',store.state,to)
                    // @ts-ignore
                    return component.asyncData({ store, route: to });
                }
            })
        ));
    });
    // @ts-ignore
    if(!import.meta.env.SSR && window && window.__INIT__STATE__){
        // @ts-ignore
        console.log(window)
        // @ts-ignore
        store.replaceState(JSON.parse(window.__INIT__STATE__));
    }
    app.mount('#app');
});


