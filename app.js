//var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var usersData = [
	{ UserID: 1, FirstName: "Yoni", LastName: "Cohen", UserName: "yoni@gmail.com", Password: "yoni1234", UserRole: "user" },
	{ UserID: 2, FirstName: "Dan", LastName: "Halevi", UserName: "dan@gmail.com", Password: "dan1234", UserRole: "user" },
	{ UserID: 3, FirstName: "Elad", LastName: "Shmueli", UserName: "elad@gmail.com", Password: "elad1234", UserRole: "user" },
	{ UserID: 4, FirstName: "Shalom", LastName: "Avivi", UserName: "shalom@gmail.com", Password: "shalom1234", UserRole: "user" },
	{ UserID: 5, FirstName: "Yosef", LastName: "Dana", UserName: "yosef@gmail.com", Password: "yosef1234", UserRole: "admin" },
	{ UserID: 6, FirstName: "Sapir", LastName: "David", UserName: "sapir@gmail.com", Password: "sapir1234", UserRole: "user" },
	{ UserID: 7, FirstName: "Gil", LastName: "Braun", UserName: "gil@gmail.com", Password: "gil1234", UserRole: "user" },
	{ UserID: 8, FirstName: "Sara", LastName: "HaCohen", UserName: "sara@gmail.com", Password: "sara1234", UserRole: "admin" },
	{ UserID: 9, FirstName: "Zeev", LastName: "Laks", UserName: "zeev@gmail.com", Password: "zeev1234", UserRole: "admin" },
	{ UserID: 10, FirstName: "Udi", LastName: "Shushan", UserName: "udi@gmail.com", Password: "udi1234", UserRole: "user" },	
  ];

  var usersOrders = [
	{ UserID: 1, OrderId: 11, Amount: 5, Price:300,Date:"12/12/21",Status:"completed" },
	{ UserID: 2, OrderId: 21, Amount: 2, Price:100,Date:"15/12/21",Status:"completed" },
	{ UserID: 3, OrderId: 31, Amount: 3, Price:50,Date:"12/12/21",Status:"completed" },
	{ UserID: 4, OrderId: 41, Amount: 1, Price:20,Date:"11/12/21",Status:"completed" },
	{ UserID: 5, OrderId: 51, Amount: 5, Price:100,Date:"28/11/21",Status:"completed" },
	{ UserID: 1, OrderId: 12, Amount: 2, Price:80,Date:"03/12/21",Status:"completed" },
	{ UserID: 4, OrderId: 42, Amount: 3, Price:90,Date:"20/12/21",Status:"completed" },
	{ UserID: 1, OrderId: 13, Amount: 3, Price:120,Date:"22/12/21",Status:"completed" },
	
  ];
  

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
//app.use(bodyParser.json());
app.use(express.json());

app.use(express.static(path.join(__dirname,'public')));

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/public/login.html'));
});

app.post('/users', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	var flag=false;
	for(var i=0;i<usersData.length;i++){
		if(usersData[i].UserName==username && usersData[i].Password==password){
			flag=true;
		}
	}
	console.log(username+" "+password)
	//אם קיים
	if(flag){
		response.sendFile(path.join(__dirname+'/public' + '/usersPage.html'));
	}
	else{
		response.sendFile(path.join(__dirname + '/public/login.html'));
		
	}
	//else להציג שגיאה
});

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

app.post('/data',async function(req,res){
	
	//res.sendFile(path.join(__dirname + '/public/x.html'));
	console.log(JSON.stringify(usersData))
	res.end(JSON.stringify(usersData));
})
var ordersData=[];
app.post('/ordersData',async function(req,res){
	console.log("ordersData");
	// var userId=req.body.UserId;
	// console.log(userId);
    ordersData=usersOrders.filter(item => item.UserID ==params);
	console.log(JSON.stringify(ordersData))
	res.end(JSON.stringify(ordersData));
})
var query,params;
app.get('/users/:id',function(req,res){	
	console.log("ordersPage");
	query=req.query.UserName;
	params=req.params.id;
	console.log("query:"+query);
	console.log("params:"+params);
	 res.sendFile(path.join(__dirname + '/public/userOrders.html'));
// 	app.use(express.static(path.join(__dirname, 'public')));
// res.render(__dirname + '/public/userOrders.html');
})


app.listen(3000);