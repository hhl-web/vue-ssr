import  {Router} from 'vue-router'

export async function getAsyncData(router:Router,store:any,reqConfig:any){
        // 在这里也可以做一些路由和状态特殊定制
        const {matched,query}=router.currentRoute.value;
        
		const componentsMap = matched.map((i) => {
			return i.components.default;
		})
        const asyncDatas=componentsMap.filter(
            (component: any) => typeof component.asyncData === 'function'
        );
        return Promise.all(
            asyncDatas.map((i:any) => {
                return i.asyncData({
                    route: router.currentRoute.value,
                    store,
                    router,
                });
            })
        );
}