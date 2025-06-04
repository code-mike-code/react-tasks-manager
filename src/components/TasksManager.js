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
        const visibleTasks = tasks.filter(task => !task.isRemoved)

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
                {visibleTasks.map(task => (
                    <section>
                        <header>{ task.name }, { this.convertSecondsToTime(task.time) }</header>
                        <footer>
                            <button 
                                onClick={() => this.startStopHandler(task.id)}
                                disabled={task.isDone}
                            >
                                { task.isRunning ? 'stop' : 'start' }</button>
                            <button 
                                onClick={() => this.taskFinishedHandler(task.id)}
                                disabled={task.isDone}
                            >
                                finished</button>
                            <button 
                                onClick={() => this.taskRemoveHandler(task.id)}
                                disabled={!task.isDone}
                            >
                                delate</button>
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

    incrementTime() {
        this.setState(state => {
            const newTasks = state.tasks.map(task => {
                if (task.isRunning) {
                    return {...task, time: task.time + 1}
                }
                return task
            })
            return { tasks: newTasks }
        })
    }

    startStopHandler = async (id) => {
        const taskToUpdate = this.state.tasks.find(task => task.id === id)

        const updatedTask = {
            ...taskToUpdate,
            isRunning: !taskToUpdate.isRunning,
        }

        const response = await fetch(`http://localhost:3005/data/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        })
        
        if (response.ok) {
            this.setState(state => ({
                tasks: state.tasks.map(task => {
                    if (task.id === id) {
                        return updatedTask
                    }
                    return task
                })
            }))
        } 
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

    taskFinishedHandler = async (id) => {
        const taskToUpdate = this.state.tasks.find(task => task.id === id)

        const updatedTask = {
            ...taskToUpdate,
            isDone: true,
            isRunning: false,
        }

        const response = await fetch(`http://localhost:3005/data/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        })

        if (response.ok) {
            this.setState(state => {
                const updatedTasks = state.tasks.map(task => {
                    if (task.id === id) {
                        return updatedTask
                    }
                    return task
                })
                return { 
                    tasks: updatedTasks.sort(( task1, task2 ) => {
                        if (task1.isDone === task2.isDone) return 0;
                        if (task1.isDone) return 1;
                        return -1;
                })}
            })
        }
    }

    taskRemoveHandler = async (id) => {
        const taskToUpdate = this.state.tasks.find(task => task.id === id)

        const updatedTask = {
            ...taskToUpdate,
            isRemoved: true,
           
        }

        const response = await fetch(`http://localhost:3005/data/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        })

        if (response.ok) {
            this.setState(state => ({
                tasks: state.tasks.map(task => {
                    if (task.id === id) {
                        return updatedTask
                    }
                    return task
                })
            }))
        }
    }

}

export default TasksManager;