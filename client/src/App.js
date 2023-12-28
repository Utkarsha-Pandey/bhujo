import {Route, Routes, useNavigate} from 'react-router-dom';
import DashBoard from './pages/DashBoard';
import Signup from './pages/signup';
import Signin from './pages/Signin';



function App() {
  const Navigate = useNavigate();
  return (
    <>
      <Routes>
        <Route path="/" element={
          <ProtectedRoutes>
            <DashBoard />
          </ProtectedRoutes>
            
         } 
         />
        <Route path='/signup' element={ <Signup /> } />
        <Route path='/signin' element={ <Signin /> } />
      </Routes>
    </>
  );
}

export function ProtectedRoutes(props){
  if(localStorage.getItem('user')){
    return props.Children;
  }else{
    return <Navigate to="/signin"/>
  }
}

export default App;
