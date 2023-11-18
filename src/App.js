import './App.css';
import H from './screens/H';
import Login from './screens/Login';
import Signup from './screens/Signup';
import {
  BrowserRouter as Router,
  Routes,
  Route,
 
} from "react-router-dom";

import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    
    <Router>
    <div>
    <Routes>
     <Route exact path="/" element={<H></H>}></Route>
     <Route exact path="/Login" element={<Login></Login>}></Route>
     <Route exact path="/createuser" element={<Signup></Signup>}></Route>

     </Routes>
    </div>
    </Router>
  );
}

export default App;
