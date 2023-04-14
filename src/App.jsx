import {BrowserRouter,Routes,Route} from "react-router-dom"
import './App.css'
import Login from "./Components/LoginPage/Login"
import Register from "./Components/Register/Register"
import ContentPage from "./Components/ContentPage/ContentPage"
import CreateTodo from "./Components/CreateTodo/CreateTodo"

function App() {
  

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/api/gettodos/:userid" element={<ContentPage />} />
          <Route path="/api/createtodo/:userid" element={<CreateTodo />} />
          <Route path="/api/getodo/:userid/:todoid" element={<CreateTodo />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
