import { Route, Routes, Navigate } from 'react-router-dom';
import DashBoard from './pages/dashboard'
import Signup from './pages/signup';
import Login from './pages/signin';
import UserProfile from './pages/profile';




function App() {
  return (
    <>
      <Routes>
        {/* Add a route for the root path */}

        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/dashboard" element={
          <ProtectedRoutes>
            <DashBoard />
          </ProtectedRoutes>
        }
        />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Login />} />
        <Route path="/profile/:userId" element={<UserProfile />} />
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
