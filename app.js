var koa = require('koa');
var app = koa();

app.use(function * () {
    this.body = "Hello world!";
});
app.listen(7000);
console.log('server start');