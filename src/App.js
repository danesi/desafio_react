import React, {Component} from "react";
import './App.css';
import {last, isEmpty} from 'lodash'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import {withStyles} from "@material-ui/core/styles";
import UserItem from "./components/UserItem";
import Alert from './components/CustomAlert'

const styles = theme => ({
    button: {
        margin: 30
    },
    input: {
        marginLeft: 50
    },
    container: {
        backgroundColor: "#f5f5f5"
    }
});


class App extends Component {
    constructor(props) {
        super(props);

        this.handleAdd = this.handleAdd.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleAlert = this.handleAlert.bind(this)
        this.handleChange = this.handleChange.bind(this)

        this.state = {
            auxName: '',
            auxEmail: '',
            auxCity: '',
            auxState: '',
            alert: false,
            typeAlert: '',
            textAlert: '',
            users: []
        }
    }

    handleAdd() {
        const {users, auxName, auxEmail, auxCity, auxState} = this.state
        let lastId = 0;
        if (users.length !== 0) {
            lastId = last(users).id
        }

        const newUser = {
            id: lastId + 1,
            name: auxName,
            email: auxEmail,
            address: {
                city: auxCity,
                state: auxState
            }
        }

        if (this.validateForm()) {
            this.setState(prevState => ({
                ...prevState,
                users: [...users, newUser]
            }))
            this.handleAlert('success', 'Usuário salvo com sucesso!')
        } else {
            this.handleAlert('error', 'Preencha todos os campos!')
        }

    }

    handleDelete(id) {
        const newItems = this.state.users.filter(user => user.id !== id)
        this.setState(prevState => ({...prevState, users: newItems}))
        this.handleAlert('success', 'Usuário deletado com sucesso')
    }

    handleChange(e) {
        switch (e.target.name) {
            case 'name':
                this.setState(prevState => ({...prevState, auxName: e.target.value}))
                break
            case 'email':
                this.setState(prevState => ({...prevState, auxEmail: e.target.value}))
                break
            case 'city':
                this.setState(prevState => ({...prevState, auxCity: e.target.value}))
                break
            case 'state':
                this.setState(prevState => ({...prevState, auxState: e.target.value}))
                break
        }
    }

    handleAlert(type, text) {
        this.setState(prevState => ({
            ...prevState,
            alert: true,
            typeAlert: type,
            textAlert: text,
        }))
        setTimeout(() => {
            this.setState(prevState => ({...prevState, alert: false}))
        }, 2000)
    }

    validateForm() {
        const {auxName, auxEmail, auxCity, auxState} = this.state
        return auxName !== '' && auxEmail !== '' && auxCity !== '' && auxState !== '';
    }

    render() {
        const {
            users,
            auxName,
            auxEmail,
            auxCity,
            auxState,
            alert,
            typeAlert,
            textAlert
        } = this.state
        const {classes} = this.props
        return (
            <Container>
                <div className="container">
                    <Grid item xs={12}>
                        <Paper elevation={3} className={classes.container}>
                            <Alert
                                alert={alert}
                                textAlert={textAlert}
                                typeAlert={typeAlert}
                            />
                            <h1>Inserir usuário</h1>
                            <Grid container spacing={10}>
                                <Grid item>
                                    <TextField
                                        id="outlined-basic"
                                        label="Nome"
                                        variant="outlined"
                                        type="text"
                                        name="name"
                                        className={classes.input}
                                        value={auxName}
                                        onChange={this.handleChange}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="outlined-basic"
                                        label="Email"
                                        variant="outlined"
                                        type="email"
                                        name="email"
                                        value={auxEmail}
                                        onChange={this.handleChange}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="outlined-basic"
                                        label="Cidade"
                                        variant="outlined"
                                        type="text"
                                        name="city"
                                        value={auxCity}
                                        onChange={this.handleChange}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        id="outlined-basic"
                                        label="Estado"
                                        variant="outlined"
                                        type="text"
                                        name="state"
                                        value={auxState}
                                        onChange={this.handleChange}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<SaveIcon/>}
                                className={classes.button}
                                onClick={this.handleAdd}
                            >
                                Salvar
                            </Button>
                            <h1>Usuários</h1>
                            <List>
                                {
                                    isEmpty(users)
                                        ?
                                            (<h2>Nenhum usuário cadastrado</h2>)
                                        :
                                            (users.map((user) => {
                                                return (
                                                <UserItem
                                                    user={user}
                                                    handleDelete={this.handleDelete}
                                                />
                                                )
                                            }))
                                }
                            </List>
                        </Paper>
                    </Grid>
                </div>
            </Container>
        )
    }
}

export default withStyles(styles, {withTheme: true})(App);
