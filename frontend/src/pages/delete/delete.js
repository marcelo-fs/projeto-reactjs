import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import api from '../../services/services';
import Button from '@material-ui/core/Button';
import './delete.css';

class DeletarUsuario extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usuario: {},
            redirect: false
        };
    }

    async componentDidMount() {
        const { id } = this.props.match.params;

        const response = await api.get(`/usuarios/${id}`);

        this.setState({ usuario: response.data });
    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to="/" />;
        } else {
            return (
                    <div className="actions" className="usuario-delete">
                        <h3>Deletar Usuário</h3>
                        <article>
                        Nome: {this.state.usuario.nome} <br/>              
                        matricula: {this.state.usuario.matricula} <br/> <br/>                         
                        <Button variant="contained" color="primary" size="small" href={`/`}> Voltar </Button>
                        <Button variant="contained" color="secondary" size="small" onClick={this.handleClick}> Deletar </Button>
                        </article>
                    </div>
                    
            );
        }
    }

    handleClick = event => {
        const { id } = this.props.match.params;

        fetch(`http://localhost:3001/sistema/usuarios/${id}`, {
            method: "delete"
        })
        .then(data => {
            if (data.ok) {
                this.setState({ redirect: true });
            }
        })

        event.preventDefault();
    };
}

export default DeletarUsuario;
