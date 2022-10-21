import './App.css';
import Home from './Components/Home';
// import Todo from './Components/Todo';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from './Components/Auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from './Redux/Actions/Auth'
import { db } from './Firebase';
import { uid } from 'uid';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actions.authCheckState())
  })


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
