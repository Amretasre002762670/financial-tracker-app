import './App.css';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../src/components/Login/Login';
import PageNotFound from '../src/components/PageNotFound/PageNotFound';
import Transaction from '../src/components/Transaction/Transaction'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Transaction />} />
          <Route path="*" element={<PageNotFound />} />
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
