import { useEffect, useState } from "react";
import "./CreateTodo.scss";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';


function CreateTodo() {

const navigate = useNavigate();

const [formData,setFormData] = useState({title:"",details:""});  
const {userid,todoid} = useParams();

const getDetails= async()=>{
  try {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/gettodo/${userid}/${todoid}`,{withCredentials:true});
    if(response.status===200){
      setFormData({title:response.data.data.title,details:response.data.data.details})
    }
  } catch (error) {
    console.log(error)
  }
}

useEffect(()=>{
  if(todoid){
    getDetails();
  }
},[])

const handleDataChange =(e)=>{
  setFormData({...formData,[e.target.name]:e.target.value});
  
}

const todohandleSubmit = async()=>{
  if(todoid){
    try {
  
      if((formData.title.length===0)||(formData.details.length===0)){

        toast.warn(`Fields cannot be empty`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
       
      }else{
        setLoading(true)
        const todores = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/updatetodo/${userid}/${todoid}`,formData,{withCredentials:true});
        if(todores.status===200){
          setLoading(false)
          navigate(`/api/gettodos/${userid}`);
          
        }
      }
     
    
    } catch (error) {
      console.log(error)
    }
  }else{
    try {
      if((formData.title.length===0)||(formData.details.length===0)){
        toast.warn(`Fields cannot be empty`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }else{
        const createTodo = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/createtodo/${userid}`,formData,{ withCredentials:true })
      if(createTodo.status===201){
        navigate(`/api/gettodos/${userid}`);
      }
      }
      
    } catch (error) {
      console.log(error)
    }
  }
}

const [isLoading, setLoading] = useState(false);
  return (
    <div className="createtodo-wrapper">
     <div className="form-wrapper">
     <Form className="form">
        <FormGroup>
          <Label for="title">TodoTitle</Label>
          <Input
            id="title"
            name="title"
            placeholder="Name your todo.."
            type="text"
            autoComplete="off"
            value={formData.title}
            onChange={handleDataChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="textarea">Details</Label>
          <Input id="textarea" name="details" type="textarea" autoComplete="off" value={formData.details} onChange={handleDataChange} />
        </FormGroup>
        {
            isLoading ? (<Button className="login-button spinner" disabled>
            <FontAwesomeIcon icon={faSpinner} spin size="xl" style={{color: "#121212",}} />
           </Button>) : 
           (
           <Button onClick={todohandleSubmit}>Post</Button>
           )
        }
      </Form>
     </div>
     <ToastContainer />
    </div>
  );
}

export default CreateTodo;
