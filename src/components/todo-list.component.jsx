import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = props => (
    <tr>
        <td className={props.todo.todo_completed ? 'completed-task' : ''}>{props.todo.todo_description}</td>
        <td className={props.todo.todo_completed ? 'completed-task' : ''}>{props.todo.todo_responsible}</td>
        <td className={props.todo.todo_completed ? 'completed-task' : ''}>{props.todo.todo_priority}</td>
        <td>
            <Link to={"/edit/"+props.todo._id} className="todo-action-button edit-todo-button btn">Edit</Link>
            <Link to={"/delete/"+props.todo._id} className="todo-action-button delete-todo-button btn">Delete</Link>
        </td>
    </tr>
)

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        };
    }

    componentDidMount() {
        axios.get('https://hjm-todo-app.herokuapp.com/todos/')
                .then(response => {
                    this.setState({todos: response.data});
                })
                .catch(function (error) {
                    console.log(error);
                })
    }

    // componentDidUpdate() {
    //     axios.get('http://localhost:5000/todos/')
    //             .then(response => {
    //                 this.setState({todos: response.data});
    //             })
    //             .catch(function (error) {
    //                 console.log(error);
    //             })
    // }

    todoList() {
        return this.state.todos.map(function(currentTodo, i) {
            return <Todo todo={currentTodo} key={i} />;
        });
    }

    render() { 
        return (
            <div className="todo-list-container component-container">
                <h2>Task List</h2>
                <div className="table-wrapper">
                    <table className="todo-list-table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Responsible</th>
                                <th>Priority</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.todoList() }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
 
export default TodoList;