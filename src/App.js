import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import {Route,Routes} from "react-router-dom"
function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/home' element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
