mainVm = new Vue({
	el: '#app',
	data: {
		allTodos: [],
		newTodo: '',
		doneStyle: 'text-decoration: line-through',

	},
	methods: {
		submitTodo: function(event) {
			event.preventDefault()
			console.log(this.newTodo)
			$.post('/new-todo', {newTodoKey: this.newTodo}, (dataFromServer) => {
				console.log(dataFromServer)
				this.allTodos = dataFromServer
			})

		},
		strike: function(todo) {
			$.post('/toggle', {todo}, (dataFromServer) => {
				this.allTodos = dataFromServer
			})
		},
		removeTodo: function(todo) {
			$.post('/remove', {todo}, (dataFromServer) => {
				this.allTodos = dataFromServer
			})
		}
	},

	mounted() {
		$.get('/allTodos', (dataFromServer) => {
			this.allTodos = dataFromServer
		})
	}

})