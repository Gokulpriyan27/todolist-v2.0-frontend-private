import "./Register.scss";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"

const initialValues = {
  username:"",
  email:"",
  password:"",
}

function Register() {



  const navigate = useNavigate();

  const [registerFormValues,setRegisterFormValues] = useState(initialValues)

  const registerHandlechange = (e)=>{
    setRegisterFormValues({...registerFormValues,[e.target.name]:e.target.value})
  } 

  const registerHandleSubmit = async()=>{
    try {
      setisLoading(true);
      const payload = registerFormValues;
      if((!payload.username)||(!payload.email)||(!payload.password)){
       
          toast.warn(`Username, email, password is mandatory`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
          setisLoading(false);
      }else{
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`,payload,{withCredentials:true})
      if(response.status===201){
        setisLoading(false);
     
        toast.success(`${response.data.message}`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
        setTimeout(() => {
          navigate("/");
        }, 3000);
        
      }
      }
      
    } catch (error) {
      setisLoading(false);
      console.log(error)
      toast.error(`${error.response.data.message}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
  }

  const google = async()=>{
    window.open("http://localhost:4000/auth/google","_self")
  }

  const [isLoading, setisLoading] = useState(false);

  return (
    <div className="register-wrapper">
      <Container className="register-container">
        <Form className="register-form">
          <FormGroup floating>
            <Input
              id="username"
              name="username"
              placeholder="Username"
              type="text"
              autoComplete="off"
              value={registerFormValues.username}
              onChange={registerHandlechange}
            />
            <Label for="username">Username</Label>
          </FormGroup>
          <FormGroup floating>
            <Input id="email" name="email" placeholder="Email" type="email" value={registerFormValues.email}
              onChange={registerHandlechange} autoComplete="off" />
            <Label for="email">Email</Label>
          </FormGroup>{" "}
          <FormGroup floating>
            <Input
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              autoComplete="off"
              value={registerFormValues.password}
              onChange={registerHandlechange}
            />
            <Label for="password">Password</Label>
          </FormGroup>{" "}
          {
            isLoading ? 
            (<Button className="register-button" disabled>
            <FontAwesomeIcon icon={faSpinner} spin size="xl" style={{color: "#121212",}} />
           </Button>)
            : 
            (<Button className="register-button" onClick={registerHandleSubmit}>Register</Button>)
          }
          <div className="loginitems">
          <h6>Already registered ?</h6>
          <h6 className="signin" onClick={()=>navigate("/")}>Sign in</h6>
        </div>
          <hr />
          <h6>Or register with</h6>
         
          <div className="other-signin">
            <Button className="google-button" onClick={(e)=>e.preventDefault()}>Google</Button>
            <Button className="github-button" onClick={(e)=>e.preventDefault()}>Github</Button>
          </div>
        </Form>

       
      </Container>
      <ToastContainer />
    </div>
  );
}

export default Register;
