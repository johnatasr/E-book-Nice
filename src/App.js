import React, { Component } from 'react';
import './App.css';
import './css/pure-min.css';
import './css/side-menu.css';
import { Link } from 'react-router-dom';


class App extends Component {

  render () {
    return (
      <div id="layout">
      
      <a id="menuLink" className="menu-link">
          <span></span>
      </a>
  
      <div id="menu">
          <div className="pure-menu">
              <a className="pure-menu-heading">E-Book Nice</a>
  
              <ul className="pure-menu-list">
                  <li className="pure-menu-item"><Link to="/" className="pure-menu-link">Home</Link></li>
                  <li className="pure-menu-item"><Link to="/autores" className="pure-menu-link">Autor</Link></li>
                  <li className="pure-menu-item"><Link to='/livros' className="pure-menu-link">Livros</Link></li>
              </ul>
          </div>
      </div>
  
      <div id="main">
          
      </div>
  </div>
    );
  }
  
}

export default App;

