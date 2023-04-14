import "./ContentPage.scss";
import { Alert, Button, Card, CardBody, CardHeader, CardText } from "reactstrap";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookBookmark,
  faPenToSquare,
  faPlus,
  faPowerOff,
  faSpinner,
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ContentPage() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const { userid } = useParams();

  const getContents = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/gettodos/${userid}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
      
        setData(response.data.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContents();
  }, []);

  const editContent = (e) => {
    navigate(`/api/getodo/${userid}/${e._id}`);
  };

  const deleteContent = async (e) => {
    try {
   
      const deleteres = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/deletetodo/${userid}/${e._id}`,
        { withCredentials: true }
      );
      if (deleteres.status === 201) {
    
        getContents();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  const createTodo = () => {
    navigate(`/api/createtodo/${userid}`);
  };

  return (
    <div className="body-wrapper">
      {isLoading ? (
        <div className="loading">
          <FontAwesomeIcon
            icon={faSpinner}
            spin
            size="2xl"
            className="loadingIcon"
          />
        </div>
      ) : (
        <div className="card-wrapper">
          <div className="content-wrapper">
            <div className="create-button">
           
              <Button color="success" outline onClick={createTodo} className="create">
                <FontAwesomeIcon icon={faPlus} size="xl" />
                
              </Button>
              <Button color="danger" outline className="logout" onClick={()=>navigate("/")}>
              <FontAwesomeIcon icon={faPowerOff} size="xl" />
              </Button>
            </div>

            <div className="content">
              {data.length>0 ? (
                data.map((element) => (
                  <Card color="dark" className="card-style" key={element._id}>
                    <CardHeader className="header-class">
                      <span className="title-class">{element.title}</span>
                      <Button
                        color="success"
                        outline
                        onClick={() => editContent(element)}
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </Button>
                      <Button
                        color="danger"
                        outline
                        onClick={() => deleteContent(element)}
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </Button>
                    </CardHeader>
                    <CardBody>
                      <CardText>{element.details}</CardText>
                    </CardBody>
                  </Card>
                ))
              ) : (
                <div className="empty">
                  <div className="alert">
                  <Alert color="secondary" className="alert-box">
                    No notes available! Create one...
                    
                  </Alert>
                  </div>
                  <div className="notebook">
                  <FontAwesomeIcon icon={faBookBookmark} beatFade size="2xl" className="notebookIcon"/>
                  </div>
                
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContentPage;
