import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import mainContext from './context/mainContext';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import Toolbar from './components/Toolbar';
import FilterPage from './pages/FilterPage';
import SwipePage from './pages/SwipePage';
import MyLikesPage from './pages/MyLikesPage';
import GotLikesPage from './pages/GotLikesPage';

function App() {

  const [onlineUser, setOnlineUser] = useState(null)

  const states = {
    onlineUser,
    setOnlineUser
  }

  return (
    <mainContext.Provider value={states}>
      <div>
        <BrowserRouter>
          {onlineUser && <Toolbar/>}
          <Routes>
            <Route path='/' element={<LoginPage/>}/>
            <Route path='/signup' element={<SignUpPage/>}/>
            <Route path='/profile' element={<ProfilePage/>}/>
            <Route path='/filter' element={<FilterPage/>}/>
            <Route path='/swipe' element={<SwipePage/>}/>
            <Route path='/mylikes' element={<MyLikesPage/>}/>
            <Route path='/gotlikes' element={<GotLikesPage/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </mainContext.Provider>
  );
}

export default App;
