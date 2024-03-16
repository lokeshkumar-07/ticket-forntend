import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Signin from './pages/Signin'
import Home from './pages/Home'
import Register from './pages/Register'
import Layout from './components/Layout'
import CreateMovie from './pages/CreateMovie'
import CreateTheatre from './pages/CreateTheatre'
import CreateShow from './pages/CreateShow'
import MovieShows from './pages/MovieShows'
import ShowsDisplay from './pages/ShowsDisplay'
import SeatSelction from './pages/SeatSelction'
import Checkout from './pages/Checkout'
import Bookings from './pages/Bookings'
import Admin from './pages/Admin'
import { useSelector } from 'react-redux'
import NotAdmin from './pages/NotAdmin'

function App() {
  const [count, setCount] = useState(0)
  const {currentUser} = useSelector((state) => state.auth)

  const AdminRoute = ({ element }) => {
    if (currentUser && currentUser.role === 'admin') {
      return element;
    } else {
      return <Navigate to="/notadmin" />;
    }
  };

  const UserRoute = ({element}) => {
    if(currentUser){
      return element
    }else{
      return <Navigate to="/login" />
    }
  }

  const AlreadyLogin = ({element}) => {
    if(currentUser){
      return <Navigate to='/' />
    }else{
      return element
    }
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/createmovie' element={<AdminRoute element={ <CreateMovie />} />} />
            <Route path='/createtheatre' element={<AdminRoute element={<CreateTheatre />} />} />
            <Route path='/createshow' element={<AdminRoute element={<CreateShow />} /> }/>
            <Route path='/movie/:movieName' element={<MovieShows />} />
            <Route path='/booking/:movieName' element={<ShowsDisplay />} />
            <Route path='/bookshow/:showId' element={<UserRoute element={<SeatSelction /> } /> } />
            <Route path='/checkout/:showId' element={<Checkout />} />
            <Route path='/bookings/my' element={<UserRoute element={<Bookings />} /> } />
            <Route path='/admin' element={<AdminRoute element={<Admin />} />} />
            <Route path='/notadmin' element={<NotAdmin />} />
          </Route>
          
          <Route path='/login' element={<AlreadyLogin element={<Signin />} /> } />
          <Route path='/register' element={<AlreadyLogin element={<Register />} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
