import React, { Component } from 'react'
import axios from "axios"
import { Consumer } from './context'
export default class Addtodo extends Component {
    state = {
        id: 4,
        title: "",
        complete: false
    }

    update = (e) => {
        this.setState({
            title: e.target.value
        })

    }

    add = (dispatch, e) => {
        e.preventDefault()
        const newTodo = this.state
        axios.post("/todos", newTodo)
            .then(res => dispatch({ type: "ADD", payload: res.data }))

        this.setState({ title: "" })
    }
    render() {
        return (
            <Consumer>{value => {
                const { dispatch } = value
                return <form onSubmit={this.add.bind(this, dispatch)}>
                    <input type="text" className='form-control rounded-0' placeholder='Enter your text' onChange={this.update} value={this.state.title} />
                    <button className='form-control rounded-5 btn-dark' type='submit'>Enter To-do</button>
                </form>
            }}
            </Consumer>
        )
    }
}
