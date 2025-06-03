import React from 'react';

class TasksManager extends React.Component {
    state = {
        tasks: [],
        newTask: '',
    }

    onClick = () => {
        const { tasks } = this.state;
        console.log( tasks)
    }

    render() {
        return (
            <>
            <h1 onClick={ this.onClick }>TasksManager</h1>
            <form>
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