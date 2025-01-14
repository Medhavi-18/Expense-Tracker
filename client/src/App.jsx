import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Users from './Users';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';
import PieChartPage from './PieChartPage'; 
import Login from './Login';
import Signup from './Signup';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />


          <Route path="/" element={<Users />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/update/:id" element={<UpdateUser />} />
          <Route path="/chart" element={<PieChartPage />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
