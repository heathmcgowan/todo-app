import React, { Component } from 'react';
import axios from 'axios';

class EditTodo extends Component {
    constructor(props) {
        super(props);

        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);

        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        }
    }

    componentDidMount() {
        axios.get('https://hjm-todo-app.herokuapp.com/todos/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    todo_description: response.data.todo_description,
                    todo_responsible: response.data.todo_responsible,
                    todo_priority: response.data.todo_priority,
                    todo_completed: response.data.todo_completed
                })
            })
            .catch(function(error) {
                console.log(error);
            })
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

    onChangeTodoCompleted(e) {
        this.setState({
            todo_completed: !this.state.todo_completed
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const obj = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        };

        axios.post('https://hjm-todo-app.herokuapp.com/todos/update/'+this.props.match.params.id, obj)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/');
            });
    }

    onDelete() {
        axios.delete('https://hjm-todo-app.herokuapp.com/todos/'+this.props.match.params.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/');
            });
    }
    render() { 
        return (
            <div className="create-todo-container component-container">
                <h2>Edit Task</h2>
                <form onSubmit={this.onSubmit} autoComplete="off" className="create-todo-form">
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
                    <div className="form-check">
                        <input  type="checkbox" 
                                id="completed-checkbox"
                                name="completed-checkbox"
                                onChange={ this.onChangeTodoCompleted }
                                checked={ this.state.todo_completed }
                                value={ this.state.todo_completed }   
                        />
                        <label htmlFor="completed-checkbox" className="form-check-label">
                            Completed
                        </label>
                    </div>
                    <input type="submit" value="Update Task" className="btn create-todo-submit" />
                </form>
                <button onClick={this.onDelete}>Delete</button>
            </div>
        );
    }
}
 
export default EditTodo;