import React, { Component } from 'react';
import PubSub from 'pubsub-js';

class InputCustom extends Component {

    constructor(){
        super();
        this.state = {
            msg_erro: ""
        }
    }

    componentDidMount(){
        PubSub.subscribe('erros-validacao', function(topico, erro) {
            if (erro.field === this.props.name){
                this.setState({msg_erro: erro.defaultMessage});
            }         
        }.bind(this));

        PubSub.subscribe('limpar-erros', function(topico) {
            this.setState({msg_erro: ''});    
        }.bind(this));
    }
    

    render(){
        return (
            <div className="pure-control-group">
                <label>{this.props.label}</label>
                <input name={this.props.name} id={this.props.id} type={this.props.type} value={this.props.value} onChange={this.props.onChange} />
                <span>{this.state.msg_erro}</span>
            </div>
        );
    }
}
 
export default InputCustom;


