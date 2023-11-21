import {Route, Routes} from 'react-router-dom';
import DashBoard from './pages/dashboard';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={ <DashBoard /> } />
      </Routes>
    </>
  );
}

export default App;
