import React, { Component } from 'react'
import axios from "axios"
import { Consumer } from './context';
export default class Todo extends Component {

    style=()=>{
        const {complete}=this.props.todo
        return {textDecoration:complete ? "line-through" :"none"}
    }

    // toggle = (id,dispatch)=>{
    //     dispatch({type:"TOGGLE", payload:id});
    // }

    remove = (id,dispatch)=>{
        axios.delete(`/todos/${id}`)
        .then(()=> dispatch({type:"REMOVE", payload:id}))
       

    }

    taskStatus = (id, complete, dispatch) => {
        if (!complete) {
          dispatch({type: "DONE", payload: id});
        } else {
          dispatch({type: "UNDO", payload: id});
        }
    }

    render() {
        const {title ,_id}=this.props.todo
        return (
            <Consumer>{value=>{
                const {dispatch} = value
                return <h3 className="text-dark text-center p-1 bg-light border-bottom" style={this.style()}>
                    
                    <button className='delete' onClick={this.remove.bind(this,_id,dispatch)}>X</button>
                    <span className="Task">{title}</span>
                    <input type="checkbox" className='m-2 float-right' onChange={this.taskStatus.bind(this,_id,dispatch)}/>
                </h3>
            }}</Consumer>
           
        )
    }
}
