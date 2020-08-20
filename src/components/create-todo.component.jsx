import React, { Component } from 'react';
import axios from 'axios';

class CreateTodo extends Component {
    constructor(props) {
        super(props);

        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        }
    }

    onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        });
    }

    onChangeTodoResponsible(e) {
        this.setState({
            todo_responsible: e.target.value
        });
    }

    onChangeTodoPriority(e) {
        this.setState({
            todo_priority: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Form Submitted: `);
        console.log(`Todo Description: ${this.state.todo_description}`);
        console.log(`Todo Responsible: ${this.state.todo_responsible}`);
        console.log(`Todo Priority: ${this.state.todo_priority}`);
        console.log(`Todo Completed: ${this.state.todo_completed}`);

        const newTodo = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        }

        axios.post('https://hjm-todo-app.herokuapp.com/todos/add', newTodo)
                .then(res => console.log(res.data));

        this.setState({
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        });
    }

    render() { 
        return (
            <div className="create-todo-container component-container">
                <h2>Create New Task</h2>
                <form onSubmit={ this.onSubmit } autoComplete="off" className="create-todo-form">
                    <div className="form-group">
                        <label htmlFor="input-description">Description: </label>
                        <input  type="text" 
                                className="form-control"
                                id="input-description"
                                value={ this.state.todo_description }
                                onChange={ this.onChangeTodoDescription }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="input-responsible">Responsible: </label>
                        <input  type="text" 
                                className="form-control"
                                id="input-responsible"
                                value={ this.state.todo_responsible }
                                onChange={ this.onChangeTodoResponsible }
                        />
                    </div>
                    <div className="form-group radio-group">
                        <div>
                            <input  type="radio"
                                    className="form-check-input"
                                    name = "priorityOptions"
                                    id = "priorityLow"
                                    value="Low"
                                    checked={ this.state.todo_priority === 'Low' }
                                    onChange={ this.onChangeTodoPriority }
                            />
                            <label htmlFor="priorityLow">Low</label>
                        </div>
                        <div>
                            <input  type="radio"
                                    className="form-check-input"
                                    name = "priorityOptions"
                                    id = "priorityMedium"
                                    value="Medium"
                                    checked={ this.state.todo_priority === 'Medium' }
                                    onChange={ this.onChangeTodoPriority }
                            />
                            <label htmlFor="priorityMedium">Medium</label>
                        </div>
                        <div>
                            <input  type="radio"
                                    className="form-check-input"
                                    name = "priorityOptions"
                                    id = "priorityHigh"
                                    value="High"
                                    checked={ this.state.todo_priority === 'High' }
                                    onChange={ this.onChangeTodoPriority }
                            />
                            <label htmlFor="priorityHigh">High</label>
                        </div>         
                    </div>
                    <input type="submit" value="Create Task" className="btn create-todo-submit" />
                </form>
            </div>
        );
    }
}
 
export default CreateTodo;