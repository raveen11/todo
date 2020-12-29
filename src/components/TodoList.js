import React,{useEffect,useState} from 'react'
import firebase from 'firebase'
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import './Todo.css'
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

 

export default function TodoList() {
    const[list,setList]=useState();
    const[itemId,setItemId]=useState();
    const [modalIsOpen,setIsOpen] =useState(false);
    const [update,setUpdate] =useState();
    const openModal=(id)=> {
      setIsOpen(true);
      setItemId(id);
      }
   
   
    function closeModal(){
      setIsOpen(false);
    }

    const handleUpdateChange=(event)=>{
      setUpdate(event.target.value)
    }

    const updateBtn=()=>{
      
      firebase.firestore().collection("todo-app").doc(itemId).set({
        text:update
       });
       
       setIsOpen(false);
       userFeedback();
      
    }
;
    
    const getListData=async()=>{
        const firestore=firebase.firestore();
        const snapshot=await firestore.collection("todo-app").get();
        return snapshot.docs.map(doc=>doc)
    }
    useEffect(()=>{
      userFeedback();
    },[true])
    const userFeedback=()=>{
        getListData().then(function(data){
            setList(data)
        })
    }

    let listingobject;
    if(list){
        listingobject=list.map((item,index)=>
                <div className="card" key={index}>
                  <div>
                    <div className="text">{item.data().text}</div>
                    <span className="btns">
                       <IconButton aria-label="delete">
                         <DeleteIcon fontSize="large"  onClick={()=>onDeletedItem(item.id)} />
                      </IconButton>
                      <Button variant="outlined"onClick={()=>openModal(item.id)} color="primary">
                          Edit
                      </Button>
                  </span>

                  
                </div>
                </div>
        
        )
    }

    const onDeletedItem=(id)=>{
        console.log(id)
        setItemId(id)
        firebase.firestore().collection("todo-app").doc("/"+itemId).delete().then(function() {
            
            alert("Document successfully deleted!",itemId);
            userFeedback();
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
        
    }
    const customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
      };
    return (
        <div>
          <h1 style={{textAlign:'center'}}>Your Todo List !!</h1>
            {listingobject}
      
            <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
 
          <button onClick={closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input value={update} onChange={handleUpdateChange} />
            <button onClick={updateBtn}>Update</button>
          </form>
        </Modal>
      
      
        </div>
    )
}
