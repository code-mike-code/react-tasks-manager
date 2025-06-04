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
        const { tasks } = this.state
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
                        <header>{ task.name }, 00:00:00</header>
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
        this.intervalId = setInterval(() => {
            this.incrementTime()
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    incrementTime(id) {
        this.setState(state => {
            const newTasks = state.tasks.map(task => {
                if (task.id === id) {
                    return {...task, time: task.time + 1}
                }
                return task
            })
            return { tasks: newTasks }
        })
    }

    convertSecondsToTime(seconds) {
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor((seconds - (hours * 3600)) / 60)
        const sec = seconds - (hours * 3600) - (minutes * 60)

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
    }

    fetchTasks = async () => {
        const response = await fetch('http://localhost:3005/data')
        const tasks = await response.json()
        console.log(tasks);
        this.setState({ tasks })
    }

}

export default TasksManager;