import React, { Component } from 'react';
import api from '../../services/services';
import './index.css';
import Button from '@material-ui/core/Button';

export default class Usuarios extends Component {

    state = {
        usuarios: [],
        usuariosInfo: {},
        page: 1,
    };
    componentDidMount(){
        this.loadUsuarios();   
    }
    loadUsuarios = async (page = 1) => {

        const response = await api.get(`/usuarios?page=${page}`);

        const { docs, ...usuariosInfo } = response.data;
    
        this.setState ({ usuarios: docs, usuariosInfo, page});
    };
    prevPage = () => {
        const { page } = this.state;
        if(page === 1) return;

        const pageNumber = page - 1;
        this.loadUsuarios(pageNumber);
    }
    nextPage = () => {
        const { page, usuariosInfo } = this.state;
        if(page === usuariosInfo.pages) return;

        const pageNumber = page + 1;
        this.loadUsuarios(pageNumber);
    }
    render() {
        const { usuarios, usuariosInfo, page } = this.state;
        return (
            <div className="usuario-list">
                <div className="usuario-list">            
                <Button variant="contained" color="primary" size="small" href={'/CriarUsuarios'}> Cadastrar </Button>
                </div>
                {this.state.usuarios.map(usuario => (
                    <article key={usuario._id}>
                        <strong> {usuario.nome} </strong> 
                        <p> {usuario.matricula} </p>
                        <Button variant="contained" color="disabled" size="small" href={`/usuarios/${usuario._id}`} onClick={this.prevPage}>Informações</Button>
                    </article>
                ))}
                <Button variant="contained" color="disabled" size="small" href={page===1} onClick={this.prevPage}>Anterior</Button>
                <Button variant="contained" color="disabled" size="small" href={page===usuariosInfo.pages} onClick={this.nextPage}>Próxima</Button>
            </div>
            
        )
    }
}