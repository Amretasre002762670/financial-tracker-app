import './App.css';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from '../src/components/Login/Login';
import AuthForm from '../src/components/AuthForm/AuthForm';
import PageNotFound from '../src/components/PageNotFound/PageNotFound';
import Transaction from '../src/components/Transaction/Transaction'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<AuthForm mode="login" />} />
          <Route path="/signup" element={<AuthForm mode="signup" />} />
          <Route path="/home" element={<Transaction />} />
          <Route path="*" element={<PageNotFound errorType='pageNotFound'/>} />
          <Route path="/serverError" element={<PageNotFound errorType='serverError'/>} />
        </Routes>
      </Router>
    </div>
  );

  // return (
  //   <div className="bg-blue-500 text-white p-10 text-center text-2xl">
  //     If you see a blue box — Tailwind is working ✅
  //   </div>
  // );
}

export default App;
