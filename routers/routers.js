const docsRouter = require('./docsRouter')

const routers = [
    {
        path : '/api/docs',
        handler : docsRouter
    },
    {
        path : '/',
        handler : (req,res) =>{
            res.json({
                status : 200,
                success : true,
                message : 'Server successfully running...'
            })
        }
    }
]

const applyRouter = (app) =>{
    routers.map(r=>{
        if(r.path === '/'){
            app.get(r.path,r.handler)
        }else{
            app.use(r.path,r.handler)
        }
    })
}

module.exports = applyRouter