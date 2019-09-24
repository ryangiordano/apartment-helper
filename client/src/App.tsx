import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import ChartPage from './Pages/Chart';


const App: React.FC = () => {
  return (
    <div className="container">
      <Router>

        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={ChartPage} />

      </Router>
    </div>


  );
}

export default App;
