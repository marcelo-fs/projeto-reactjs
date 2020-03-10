import React, { Component } from "react";
import './update.css';
import { Redirect } from "react-router-dom";
import api from '../../services/services';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class EditarUsuario extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usuario: {
                nome: "",
                matricula: 0,
                endereco: {
                    cidade: "",
                    estado: ""
                }
            },
            redirect: false,
        };
        
    }
    
    async componentDidMount () {
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
                <form onSubmit={this.handleSubmit}>
                    
                        <div className="usuario-update">
                        <article>
                        <h3>Atualizar Usuário</h3> 
                        <div>
                            <br />
                            <TextField
                                variant="outlined"
                                name="nome"
                                label="Nome"
                                minLength="3"
                                maxLength="100"
                                value={this.state.usuario.nome}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div>
                            <br/>
                            <TextField
                                variant="outlined"
                                name="cidade"
                                label="Cidade"
                                minLength="3"
                                maxLength="100"
                                value={this.state.usuario.endereco.cidade}
                                onChange={this.handleInputChangeEndereco}
                            />
                        </div>
                        <div>
                            <br />
                            <TextField
                                variant="outlined"
                                name="estado"
                                label="Estado"
                                minLength="2"
                                maxLength="2"
                                value={this.state.usuario.endereco.estado}
                                onChange={this.handleInputChangeEndereco}
                            />
                            
                        </div> <br/>                        
                        <Button variant="contained" color="primary" size="small" href={'/'}> Voltar </Button>
                        <Button variant="contained" color="primary" size="small" type="submit"> Atualizar </Button>
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
        const { id } = this.props.match.params;

        fetch(`http://localhost:3001/sistema/usuarios/${id}`, {
            method: "put",
            id: id,
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

export default EditarUsuario;
