import React, { Component } from 'react';
import api from '../../services/services';
import './info.css';
import Button from '@material-ui/core/Button';


export default class Usuario extends Component {
    state = {
        usuario: {
            nome: "",
            matricula: 0,
            endereco: {
                cidade: "",
                estado: ""
            }
        },
    };
    async componentDidMount() {
        const { id } = this.props.match.params;
        const response = await api.get(`/usuarios/${id}`);

        this.setState({ usuario: response.data });
    }
    render() {
        const { usuario } = this.state;

        if (usuario.ativo) {
            usuario.ativo = "Usuário Ativo";
        } else {
            usuario.ativo = "Usuário Inativo";
        }
        return (
            <div className="actions" className="usuario-info">
                <article>
                {usuario.nome} <br/>
                {usuario.ativo} <br/>
                {usuario.matricula} <br/>
                {usuario.endereco.cidade} <br/>
                {usuario.endereco.estado} <br/>
                <div className="actions" className="usuario-info">
                
                <Button variant="contained" color="primary" size="small" href={`/`}> Voltar </Button>
                <Button variant="contained" color="primary" size="small" href={`/EditarUsuario/${usuario._id}`}> Editar </Button>
                <Button variant="contained" color="secondary" size="small" href={`/DeletarUsuario/${usuario._id}`}> Deletar </Button>
                </div>
                </article>
                
            </div>
        );
    }
}