const Koa = require( 'koa' )
const IO = require( 'koa-socket' )
const path=require('path');
const Router=require('koa-router');
const Static=require('koa-static')
const body=require('koa-better-body');


const app = new Koa()
const io = new IO()
let router=new Router();
app.use(Static(path.resolve('./static')));
app.use(body());
// router.get('/',ctx=>{
    
// })
// app.use( ... )
 
io.attach( app )
 
io.on( 'connection', ( content, data ) => {
  console.log( '连接上了' )
  io.broadcast('msg1','我是服务器来的');
});
//接受用户的消息
io.on('sendMsg',(context,data)=>{
    //context.socket(客户端的那个连接)
    // context.socketID 私聊用的
    console.log('消息来了',data);
    io.broadcast('msg2',data);

})



// router.post('/chat',ctx=>{
//     let msgData=ctx.request.fields.msgData;
//     console.log(msgData);
//     ctx.body='你好';
// });
 
app.listen(8888);

app.use(router.routes());
