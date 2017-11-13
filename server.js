var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var app = express()

mongoose.connect('mongodb://localhost:27017/todos', {useMongoClient: true})

app.use(express.static('./public'))

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())

var todoSchema = new mongoose.Schema({
	text: {type: String, required: true}, 
	done: {type: Boolean}
})

var todoModel = mongoose.model('todoItem', todoSchema)

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html')
})

app.get('/allTodos', function(req, res) {
	todoModel.find({}, function(err, allTodos) {
		if (err) {console.error(err)}
		res.send(allTodos)
	})

})

app.post('/new-todo', function(req, res){
	var newTodo = new todoModel({
		text: req.body.newTodoKey
	})

	newTodo.save(function(err) {
		if (err) {console.error(err) }
		todoModel.find({}, function(err, allTodos) {
				if (err) {console.error(err)}
				res.send(allTodos)
		});
	})

})

app.post('/toggle', function(req, res) {
	todoModel.update({_id: req.body.todo._id}, 
		{ $set: { done: !req.body.todo.done } },
		 function(err, /*results*/) {
		 	if (err) {console.error(err)}
		 	todoModel.find({}, function(err, allTodos) {
				if (err) {console.error(err)}
				res.send(allTodos)
		})
	})
})

app.post('/remove', function(req, res) {
	todoModel.remove({_id: req.body.todo._id}, function(err, /*results*/ ) {
		if (err) {console.error(err)}
		todoModel.find({}, function(err, allTodos) {
				if (err) {console.error(err)}
				res.send(allTodos)
		})		
	})
})

app.listen(8080, function() {
	console.log('server is listening on 8080')
})














