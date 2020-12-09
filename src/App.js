import React, {Component} from "react";
import './App.css';
import {last, isEmpty} from 'lodash'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import {withStyles} from "@material-ui/core/styles";
import UserItem from "./components/UserItem";
import Collapse from '@material-ui/core/Collapse';

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
        this.handleAlertAdd = this.handleAlertAdd.bind(this)
        this.handleAlertDelete = this.handleAlertDelete.bind(this)
        this.handleAlertFormValidate = this.handleAlertFormValidate.bind(this)
        this.handleChange = this.handleChange.bind(this)

        this.state = {
            auxName: '',
            auxEmail: '',
            auxCity: '',
            auxState: '',
            alertAdd: false,
            alertDelete: false,
            alertForm: false,
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
            this.handleAlertAdd()
        } else {
            this.handleAlertFormValidate()
        }

    }

    handleDelete(id) {
        const newItems = this.state.users.filter(user => user.id !== id)
        this.setState(prevState => ({...prevState, users: newItems}))
        this.handleAlertDelete()
    }

    handleChange(e) {
        const name = e.target.name
        switch (name) {
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

    handleAlertAdd() {
        this.setState(prevState => ({...prevState, alertAdd: true}))
        setTimeout((e) => {
            this.setState(prevState => ({...prevState, alertAdd: false}))
        }, 1500)
    }

    handleAlertDelete() {
        this.setState(prevState => ({...prevState, alertDelete: true}))
        setTimeout((e) => {
            this.setState(prevState => ({...prevState, alertDelete: false}))
        }, 1500)
    }

    handleAlertFormValidate() {
        this.setState(prevState => ({...prevState, alertForm: true}))
        setTimeout((e) => {
            this.setState(prevState => ({...prevState, alertForm: false}))
        }, 1500)
    }

    validateForm() {
        const {auxName, auxEmail, auxCity, auxState} = this.state
        if (auxName !== '' && auxEmail !== '' && auxCity !== '' && auxState !== '' ) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        const {
            users,
            auxName,
            auxEmail,
            auxCity,
            auxState,
            alertAdd,
            alertDelete,
            alertForm
        } = this.state
        const {classes} = this.props
        return (
            <Container>
                <div className="container">
                    <Grid item xs={12}>
                        <Paper elevation={3} className={classes.container}>
                            <Collapse in={alertAdd}>
                                <Alert
                                    variant="filled"
                                    severity="success"
                                >
                                    Usuário salvo com sucesso!
                                </Alert>
                            </Collapse>
                            <Collapse in={alertDelete}>
                                <Alert
                                    variant="filled"
                                    severity="success"
                                >
                                    Usuário deletado com sucesso!
                                </Alert>
                            </Collapse>
                            <Collapse in={alertForm}>
                                <Alert
                                    variant="filled"
                                    severity="error"
                                >
                                    Preencha todos os campos!
                                </Alert>
                            </Collapse>
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
