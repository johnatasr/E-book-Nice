import React, { Component } from 'react';


export default class CustomTable extends Component {
    render() {
        return (
            <div>
              <table className="pure-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                  </tr>
                </thead>
                <tbody>
                  
                    {
                      this.state.lista.map( function(autor){
                        return (
                          <tr key={autor.id}>
                            <td>{autor.nome}</td>
                            <td>{autor.email}</td>
                          </tr>
                        );
                      })
                    }
                  
                </tbody>
              </table>
            </div>
        );
    }
} 