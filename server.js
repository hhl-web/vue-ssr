
const fs= require('fs');
const path =require('path');
const express =require('express');
const { createServer: createViteServer } = require('vite')

async function createServicer(root=process.cwd(),isProd = process.env.NODE_ENV === "production"){
    const app = express();
    let vite;
    if(isProd){
        app.use(require("compression")());
        app.use(
            require("serve-static")(resolve("dist/client"), {
                index: false,
            })
        )
    }else{
        vite = await createViteServer({
            root,
            server: { 
                middlewareMode: 'ssr', 
                watch:{
                   usePolling:true,
                   interval:100
                }
            }
        })
        app.use(vite.middlewares)
    }
     // 模版
    const indexHtml = isProd ? fs.readFileSync(resolve("dist/client/index.html"), "utf-8") : "";
     // 映射文件
    const manifest = isProd ? require("./dist/client/ssr-manifest.json") : {};

    app.use('*', async (req, res) => {
        const url = req.originalUrl;
        console.log(`[server] ${new Date()} - ${url}`);

        try {
            let template,render;
            if(isProd){
                template = indexHtml;
                render = require('./dist/server/entry-server.js').render();
            }else{
                // 1. 读取 index.html
                template = fs.readFileSync(
                    path.resolve(__dirname, 'index.html'),
                    'utf-8'
                )
                // 2. 应用 Vite HTML 转换
                template = await vite.transformIndexHtml(url, template);
                // 3. 加载服务器入口。
                render  = (await vite.ssrLoadModule('/src/entry-server.ts')).render
            }
          // 4. 渲染应用的 HTML
          const {appHtml,links,state} = await render(url,manifest,req);
          // 5. 注入渲染后的应用程序 HTML 到模板中。
          const html = template
                            .replace(`<!-- app-preload-links -->`,links)
                            .replace(`<!-- app-script -->`,`
                                <script type="application/javascript">window.__IS_FROM_SSR__=true;window.__INIT_STATE__=${state}</script>
                            `)
                            .replace(`<!--ssr-html-->`, appHtml);
          // 6. 返回渲染后的 HTML。
          res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
        } catch (e) {
          vite.ssrFixStacktrace(e)
          res.status(500).end(e.message)
        }
    })

    return app;
}

createServicer().then(app=>{
    app.listen(3000,()=>{
        console.log("[server] http://localhost:3000")
    })
})