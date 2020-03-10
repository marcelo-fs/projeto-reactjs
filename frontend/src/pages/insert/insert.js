import React, { Component } from "react";
import './insert.css';
import { Redirect } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { TextField, Radio } from "@material-ui/core";

class CriarUsuario extends Component {
    constructor() {
        super();

        this.state = {
            usuario: {
                nome: "",
                matricula: 0,
                ativo: "true",
                endereco: {
                    cidade: "",
                    estado: ""
                }
            },
            redirect: false,
        };
    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    
                    <div className="usuario-insert">
                        <article>
                        <h3>Criar Usuário</h3>
                        <div>
                            <br/>
                            <TextField
                                variant="outlined"
                                name="nome"
                                id="nome"
                                label="Nome"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.usuario.nome}
                                onChange={this.handleInputChange}
                            />   
                        </div>
                        <div>
                            <br />
                            <TextField
                                variant="outlined"
                                name="nome"
                                id="matricula"
                                name="matricula"
                                label="Matrícula"
                                min="1"
                                max="99999"
                                required
                                value={this.state.usuario.matricula}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div>
                            <br />
                            <TextField
                                variant="outlined"
                                name="nome"
                                id="cidade"
                                name="cidade"
                                label="Cidade"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.usuario.endereco.cidade}
                                onChange={this.handleInputChangeEndereco}
                            />
                        </div>
                        <div>
                             <br/>
                            <TextField
                                variant="outlined"
                                name="nome"
                                type="text"
                                id="estado"
                                name="estado"
                                label="Estado"
                                minLength="2"
                                maxLength="2"
                                required
                                value={this.state.usuario.endereco.estado}
                                onChange={this.handleInputChangeEndereco}
                            />
                        </div>
                        <div>
                            <br/>
                            <Radio
                                name="nome"
                                type="radio"
                                name="ativo"
                                value= "true"
                                checked={this.state.usuario.ativo === "true"}
                                onChange={this.handleInputChange}
                                />
                                Ativo
                        </div>
                            <div> 
                                <Radio
                                    type="radio"
                                    value="false"
                                    name="ativo"
                                    checked={this.state.usuario.ativo === "false"}
                                    onChange={this.handleInputChange}
                                />
                                Inativo
                            </div>
                                
                        <Button variant="contained" color="primary" size="small" type="submit"> Cadastrar </Button>
                        </article>
                        </div>  
                </form>
                 
            );
            
        }
    }
    
    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState(prevState => ({
            usuario: { ...prevState.usuario, [name]: value }
        }));
    };

    handleInputChangeEndereco = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState(prevState => {
            const usuario = { ...prevState.usuario };
            usuario.endereco[name] = value;
            return { usuario }
        })
    };


    handleSubmit = event => {
        fetch("http://localhost:3001/sistema/usuarios", {
            method: "post",
            body: JSON.stringify(this.state.usuario),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true });
                }
            })


        event.preventDefault();
    };
}

export default CriarUsuario;
