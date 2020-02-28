var port = process.env.PORT || 4000;
var express = require('express');
var app = require('express')();
//var path = require('path');
var http =  require('http').Server(app);
var io = require('socket.io')(http);
//var io = socketIO(app);

app.get('/', function(req, res) {
    //res.sendfile('index.html');
	//app.use("/",express.static(path.join('E:/my-messanger',"index.html")));
	//app.use((req,res) => res.sendFile('/my-messanger/index.html',{ 'my-messanger' : __dirname}));
	res.sendFile(--dirname,'/index.html');
});

users = [];
io.on('connection',function(socket){
	console.log('A user connected');
	socket.on('setusername',function(data){
		console.log(data);
		if(users.indexOf(data)>-1){
			socket.emit('userexists',data + ' username is already taken!');
		}
		else{
			users.push(data);
			socket.emit('userset', {username : data});
		}
	});
	
	socket.on('msg',function(data){
		io.sockets.emit('newmsg',data);
	});
});
//app.listen(process.env.PORT || 4000, function(){
  //  console.log('Your node js server is running');
//});

//app.listen(PORT, ()=> console.log(`server running at ${PORT}`));
http.listen(port, function(){
  console.log('listening on *:' + port);
});

//http.listen(4000);
//console.log('server running at : 127.0.0.1.5000');