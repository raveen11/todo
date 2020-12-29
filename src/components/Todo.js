import React from 'react'
import {useState} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';

import firebase from 'firebase'

import './Todo.css';

function Todo() {
    const [selectedDate, setSelectedDate] =useState(new Date());
    const useStyles = makeStyles((theme) => ({
        button: {
          margin: theme.spacing(1),
        },
      }));
      const classes = useStyles();
       
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

     
    const [text, setText] = useState('');


      const createTodo=()=>{
          let firestore=firebase.firestore();
          firestore.collection("todo-app").add({
              text:text,
              time:selectedDate
          }).then(function(){
              alert('success')
          }).catch(function(err){
              alert(err)
          })
      }  

    return (
        <div>
            
        <div className="create_todo">
            <div className="head"><h1>TODO APP</h1></div>
            <TextField className="search" id="filled-search" 
             value={text} label="Add Todo" 
             onChange={event => setText(event.target.value)} 
             type="search" variant="filled" />
            <br/>
            <TextField
                id="datetime-local"
                label="Choose Date & time  of the work "
                type="datetime-local"
                defaultValue="2017-05-24 & 10:30"
                onChange={handleDateChange}
                value={selectedDate}
                style={{marginRight:'870px',marginTop:'10px'}}
                
                InputLabelProps={{
                shrink: true,}}
            />
            <Button
                    style={{marginTop:'10px'}}
                    variant="contained"
                    color="primary"
                    onClick={createTodo}
                    className={classes.button}
                    endIcon={<Icon>add</Icon>}
                >
                    Add
            </Button>
            
        </div>
        </div>
    )
}

export default Todo
