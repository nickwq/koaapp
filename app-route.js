var koa = require('koa');
var app = new koa();

var route = require('koa-route');
var parse = require('co-body');

var monk = require('monk');
var wrap = require('co-monk');
var db = monk('localhost/koa_users');
var users = wrap(db.get('users'));

app.use(route.post('/user', saveUser));
app.use(route.get('/user/:id', getUser));

function *saveUser() {
    console.log('loging...save user')

    var userFromRequest = yield parse(this);
    var user = yield users.insert(userFromRequest);

    this.body = user;
    this.status = 201;
    this.set('location', '/user/' + user._id);
}

function *getUser(id) {
    var user = yield users.findById(id);
    this.body = user;
    this.status = 200;
}

app.listen(7000);
console.log('Server started at port 7000');
