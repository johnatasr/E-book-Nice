import React, { Component } from 'react';
import api from './services/api'
import InputCustom from './components/inputCustom'
import PubSub from 'pubsub-js'
import TrataDados from './components/trataErros'

class FormularioAutor extends Component {
    constructor () {
        super();
        this.state ={
            nome: "",
            email: "",
            senha: ""
        }
        this.enviaForm = this.enviaForm.bind(this);
        this.handleCahnge = this.handleCahnge.bind(this);
    }

    async enviaForm (e) {
        e.preventDefault();
        console.log("Gravado");
        const data = {
          nome: this.state.nome,
          senha: this.state.senha,
          email: this.state.email
        }
        await api.post("autores", data)
          .then(function (response) {
            PubSub.publish('autor-lista-plubi', response.data);
            PubSub.publish('limpar-erros', {});
          })
   
          .catch(function (error) {
            new TrataDados().publicaErros(error.response.data);
          });
       
    }
    
    handleCahnge(input, e){
        this.setState({[input]: e.target.value})
    } 

    render() {
        return(
            <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} >
              <fieldset id='field-cad'>

                <InputCustom label="Nome" name="nome" id="nome" type="text" value={this.state.nome} onChange={this.handleCahnge.bind(this, 'nome')} />
                <InputCustom label="Senha" name="senha" id="senha" type="password" value={this.state.senha} onChange={this.handleCahnge.bind(this, 'senha')} />
                <InputCustom label="E-mail" name="email" id="email" type="email" value={this.state.email} onChange={this.handleCahnge.bind(this, 'email')} />

                <div className="pure-controls">
                    <button type="submit" className="pure-button pure-button-primary">Submit</button>
                </div>
                      
              </fieldset>
            </form>
        );
    }
}

class TabelaAutores extends Component {

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
                      this.props.lista.map(function(autor){
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

export class AutorBox extends Component {

    constructor() {
        super();
        this.state = { 
          lista: [], 
        };
        this.componentDidMount = this.componentDidMount.bind(this);    
        // this.atualizaListagem = this.atualizaListagem.bind(this);
    }
    
    async componentDidMount () {
        const response = await api.get('autores');
        this.setState({ lista: response.data })

        PubSub.subscribe('autor-lista-plubi', function(x, listaNova){
            this.setState({lista: listaNova})
        }.bind(this));
    }

    // atualizaListagem (novaLista){
    //     this.setState({lista: novaLista})
    // } 

    render() {
        return(
          <>
            <div className="header">
              <h1>Cadastro de autor</h1>
            </div>

            <div className='content'>
                <FormularioAutor />
                <TabelaAutores lista={this.state.lista}/>
            </div>
        </>
        );
    }
}