import React, { Component } from 'react'
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import ListItemText from "@material-ui/core/ListItemText";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItem from "@material-ui/core/ListItem";
import { withStyles } from "@material-ui/core/styles";
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    btnDelete: {
        color: "#ff0015"
    },
});

class UserItem extends Component {
    render() {
        const { user, handleDelete, classes } = this.props
        const { city, state } = user.address
        return (
            <div>
                <ListItem key={user.id}>
                    <ListItemAvatar>
                        <Avatar>
                            <PersonIcon style={{ color: "black"}} />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={user.name}
                        secondary={
                            user.email
                        }
                    />
                    <ListItemAvatar>
                        <Avatar>
                            <PersonPinCircleIcon style={{ color: "black"}}/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary="Endereço"
                        secondary={
                            city + ' - ' + state
                        }
                    />
                    <IconButton className={classes.btnDelete} component="span" onClick={() => handleDelete(user.id)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItem>
                <Divider />
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(UserItem)
