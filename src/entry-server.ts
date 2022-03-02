import {createApp} from './main'
import {renderToString} from '@vue/server-renderer';
import {getAsyncData} from './hook/ssr-hook'
// import serialize from 'serialize-javascript';

export async function render(url:any,manifest:any,reqConfig:any){
    const {app,router,store} = createApp();
    console.log('---app----',url);
    router.push(url);
    await router.isReady();
    // 数据预取
    await getAsyncData(router,store,reqConfig);
    const ctx:any ={};
    const html =await renderToString(app,ctx)
    let links=renderPreloadLinks(ctx.modules,manifest);
    return {app,html,state:JSON.stringify(store.state),links}
}

function renderPreloadLinks(modules:any,manifest:any){
    let links ="";
    const seen= new Set();
    try{
        modules.forEach((id:string)=>{
            const files =  manifest[id];
            if(files){
                files.forEach((item:any)=>{
                    if(!seen.has(item)){
                        seen.add(item);
                        links+=renderPreloadLink(item)
                    }
                })
            }
        })
    }catch(e:any){
        console.log(e,'err')
    }
    return links;
}

function renderPreloadLink(item:any){
    if(item.endsWith('js') || item.endsWith('ts')){
        return `<link rel="modulepreload" crossorigin href="${item}"`;
    }else if(item.endsWith('.css')){
        return `<link rel="stylesheet" href="${item}">`;
    }else{
        return ''
    }
}