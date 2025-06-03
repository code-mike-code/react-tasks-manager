import React from 'react';

const singleTaskData = {
    name: '',
    id: null,
    time: 0,
    isRunning: false,
    isDone: false,
    isRemoved: false,
}
class TasksManager extends React.Component {
    state = {
        tasks: [],
        newTask: '',
    }

    onClick = () => {
        const { tasks } = this.state;
        console.log( tasks)
    }

    inputChangeHandler = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value,
        })
    }

    createNewTask(taskName) {
        return {
            ...singleTaskData,
            name: taskName,
            time: 0,
        }
    }

    submitHandler = (e) => {
         e.preventDefault()

         const newTask = this.createNewTask(this.state.newTask)
    }

    render() {
        return (
            <>
            <h1 onClick={ this.onClick }>TasksManager</h1>
            <form onSubmit={this.submitHandler}>
                <input
                    name='taskName'
                    value={this.state.newTask}
                    onChange={this.inputChangeHandler}
                    placeholder='New task name' 
                />
                <button type='submit'>Add task</button>
            </form>
            </>
        )
    }
}

export default TasksManager;