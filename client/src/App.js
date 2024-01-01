<<<<<<< HEAD
import {Route, Routes, Navigate} from 'react-router-dom';
import DashBoard from './pages/DashBoard';
import Signup from './pages/signup';
import Signin from './pages/Signin';
import Test from './pages/test';
=======
import {Route, Routes, useNavigate} from 'react-router-dom';
import DashBoard from './pages/dashboard';
import Signup from './pages/signup';
import Signin from './pages/signin';
>>>>>>> 678a57aada0d4b78589e98dea0a0070052f5f614



function App() {
<<<<<<< HEAD
=======
  
>>>>>>> 678a57aada0d4b78589e98dea0a0070052f5f614
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={
          
            <ProtectedRoutes>
            <DashBoard />
            </ProtectedRoutes>
          
            
         } 
         />
        <Route path='/signup' element={ <Signup /> } />
        <Route path='/signin' element={ <Signin /> } />
        <Route path='/test' element={ <Test /> } />
      </Routes>
    </>
  );
}
<<<<<<< HEAD
export function ProtectedRoutes(props) {
  if (localStorage.getItem("user")) {
    return props.children;
  } else {
    return <Navigate to="/signin" />;
=======

export function ProtectedRoutes(props){
  const Navigate = useNavigate();
  if(localStorage.getItem('user')){
    return props.Children;
  }else{
    return <Navigate to="/signin"/>
>>>>>>> 678a57aada0d4b78589e98dea0a0070052f5f614
  }
}

export default App;
