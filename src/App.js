import Todo from "./component/To-Do"
import Signup from "./component/Login_Signup_Form/Singup"
import Login from "./component/Login_Signup_Form/Login"
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </div>
  )
}

export default App
