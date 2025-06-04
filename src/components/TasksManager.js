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

    submitHandler = async (e) => {
         e.preventDefault()

         const newTask = this.createNewTask(this.state.newTask)
         const newTaskItem = await this.addTaskToAPI(newTask)

         if ( newTaskItem ) {
            this.setState(state => ({
                tasks: [...state.tasks, newTaskItem],
                newTask: '',
            }))
         }
    }

    render() {
        return (
            <>
            <h1 onClick={ this.onClick }>TasksManager</h1>
            <form onSubmit={this.submitHandler}>
                <input
                    name='newTask'
                    value={this.state.newTask}
                    onChange={this.inputChangeHandler}
                    placeholder='New task name' 
                />
                <button type='submit'>Add task</button>
            </form>

            <div>
                {tasks.map(task => (
                    <section>
                        <header>Task number 1, 00:00:00</header>
                        <footer>
                            <button>start/stop</button>
                            <button>finished</button>
                            <button disabled="true">delate</button>
                        </footer>
                    </section>
                ))}
            </div>
            </>
        )
    }

    addTaskToAPI = async (task) => {
        const response = await fetch('http://localhost:3005/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        const data = await response.json()
        console.log(data)
        return data;
    }

    componentDidMount() {
        this.fetchTasks()
    }

    fetchTasks = async () => {
        const response = await fetch('http://localhost:3005/data')
        const tasks = await response.json()
        console.log(tasks);
        this.setState({ tasks })
    }

}

export default TasksManager;