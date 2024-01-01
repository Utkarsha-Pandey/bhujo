import {Route, Routes, Navigate} from 'react-router-dom';
import DashBoard from './pages/DashBoard';
import Signup from './pages/signup';
import Signin from './pages/Signin';
import Test from './pages/test';



function App() {
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
export function ProtectedRoutes(props) {
  if (localStorage.getItem("user")) {
    return props.children;
  } else {
    return <Navigate to="/signin" />;
  }
}

export default App;
