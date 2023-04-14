import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import 'react-toastify/dist/ReactToastify.css';

import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Spinner,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

function Login() {

  const navigate = useNavigate();

  const [loginFormData,setLoginFormData]=useState({
    username:"",
    password:"",
  });

  const loginhandleChange = (e)=>{
    setLoginFormData({...loginFormData,[e.target.name]:e.target.value});
  }


  const loginHandleSubmit = async()=>{
    setisLoading(true)
    const payload = loginFormData;
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`,payload,{ withCredentials: true })
      if(response){
        setisLoading(false)
     
        navigate(`/api/gettodos/${response.data.data.userid}`);
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


  const [isLoading, setisLoading] = useState(false);
  return (
    <div className="login-wrapper">
      <Container className="login-container">
        <Form className="login-form">
          <FormGroup floating>
            <Input
              id="username"
              name="username"
              placeholder="Username"
              type="text"
              autoComplete="off"
              value={loginFormData.username}
              onChange={loginhandleChange}
            />
            <Label for="username">Username</Label>
          </FormGroup>{" "}
          <FormGroup floating>
            <Input
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              autoComplete="off"
              value={loginFormData.password}
              onChange={loginhandleChange}
            />
            <Label for="password">Password</Label>
          </FormGroup>{" "}
          <Link className="link-tag">Forget Password</Link>

          {
            isLoading ? 
            (<Button className="login-button spinner" disabled>
           <FontAwesomeIcon icon={faSpinner} spin size="xl" style={{color: "#121212",}} />
          </Button>): 
          (<Button className="login-button normal" onClick={loginHandleSubmit}>
            <span>Log in</span>
          </Button>)
          }

          
          
        </Form>
        <hr />
        <div className="registeritems">
          <h6>Not registered ?</h6>
          <h6 className="signup" onClick={() => navigate("/register")}>
            Sign up
          </h6>
        </div>
      </Container>
      <ToastContainer />
    </div>
  );
}

export default Login;
