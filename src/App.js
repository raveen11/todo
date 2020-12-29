
import React, { Component } from 'react';
import './App.css';
import Todo from './components/Todo';
import TodoList from './components/TodoList';
import firebase from 'firebase'


class App extends Component {
  constructor(props){
    super(props)
  }

 initFireBase=()=>{
  const firebaseConfig = {
    apiKey: "AIzaSyBBS4zOZY5-RLqqqhE5xxknEzwRnOL2tfU",
    authDomain: "todo-b12c7.firebaseapp.com",
    projectId: "todo-b12c7",
    storageBucket: "todo-b12c7.appspot.com",
    messagingSenderId: "902002879409",
    appId: "1:902002879409:web:80d1eb9c4df9a4cde6eb90",
    measurementId: "G-P1MJE0MGCT"
  };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
 } 


componentDidMount(){
    this.initFireBase();
}

  render() {
    return (
      <div>
        <Todo/>
        <TodoList/>
      </div>
    );
  }
}

export default App;