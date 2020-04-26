import React, { Component } from 'react';
import api from './services/api'
import InputCustom from './components/inputCustom'
import PubSub from 'pubsub-js'
import TrataDados from './components/trataErros'

class FormularioLivro extends Component {
    constructor () {
        super();
        this.state ={
            titulo: "",
            preco: "",
            autorId: ""
        }
        this.enviaForm = this.enviaForm.bind(this);
        this.handleCahnge = this.handleCahnge.bind(this);
    }

    async enviaForm (e) {
        e.preventDefault();
        console.log("Gravado");
        const data = {
          titulo: this.state.titulo,
          preco: this.state.preco,
          autorId: this.state.autorId
        }
        await api.post("livros", data)
          .then(function (response) {
            PubSub.publish('livro-lista-plubi', response.data);
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

                <InputCustom label="Título" name="titulp" id="titulo" type="text" value={this.state.titulo} onChange={this.handleCahnge.bind(this, 'titulo')} />
                <InputCustom label="Preço" name="preco" id="preco" type="text" value={this.state.preco} onChange={this.handleCahnge.bind(this, 'preco')} />
                <div className="pure-control-group">
                    <label>Autor</label>
                    <select style={{width: '24.5%'}} value={this.state.autorId} onChange={this.handleCahnge.bind(this, 'autorId')}>
                        <option value="">Selecione o autor</option>

                        {
                            this.props.autores.map(function (autor) {
                                return <option key={autor.id} value={autor.id}>{autor.nome}</option>
                            })
                        }

                    </select>
                </div>               
                <div className="pure-controls">
                    <button type="submit" className="pure-button pure-button-primary">Salvar</button>
                </div>
                      
              </fieldset>
            </form>
        );
    }
}

class TabelaLivros extends Component {

    render() {
        return (
            <div>
              <table className="pure-table">
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Preço</th>
                    <th>Autor</th>
                    <th>E-mail</th>
                  </tr>
                </thead>
                <tbody>
                  
                    {
                      this.props.lista.map(function(livro){
                        return (
                          <tr key={livro.id}>
                            <td>{livro.titulo}</td>
                            <td>{livro.preco}</td>
                            <td>{livro.autor.nome}</td>
                            <td>{livro.autor.email}</td>
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


export default class LivrosBox extends Component {
    
    constructor() {
        super();
        this.state = { 
          lista: [], 
          autores: []
        };
        this.componentDidMount = this.componentDidMount.bind(this);    
        // this.atualizaListagem = this.atualizaListagem.bind(this);
    }
    
    async componentDidMount () {
        const response_livros = await api.get('livros');
        this.setState({ lista: response_livros.data })

        const response_autores = await api.get('autores');
        this.setState({ autores: response_autores.data })

        PubSub.subscribe('livro-lista-plubi', function(x, listaNova){
            this.setState({lista: listaNova})
        }.bind(this));
    }

    render() {
        return(
            <>
                <div className="header">
                    <h1>Cadastre seu livro</h1>
                </div>
                <div className='content'>
                    <FormularioLivro autores={this.state.autores}/> 
                    <TabelaLivros lista={this.state.lista}/>
                </div>
            </>
        );
    }

}