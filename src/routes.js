import React, { Component } from 'react';
import App from './App';
import Home from './Home';
import { AutorBox } from './Autor'; 
import  LivrosBox  from './Livros'; 
import { BrowserRouter, Route, Switch} from 'react-router-dom';


export default class Routes extends Component {
  
    render () {
        return (
            <>
                <BrowserRouter>
                    <App />
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/autores' component={AutorBox}/>
                        <Route path='/livros' component={LivrosBox}/>
                    </Switch>                                               
                </BrowserRouter>  
            </>        
        )
    }
}

