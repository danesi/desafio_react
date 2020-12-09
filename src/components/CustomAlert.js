import React, { Component } from 'react'
import Collapse from "@material-ui/core/Collapse";
import Alert from "@material-ui/lab/Alert";


class CustomAlert extends Component {
    render() {
        const { alert, textAlert, typeAlert } = this.props
        return (
            <div>
                <Collapse in={alert}>
                    <Alert
                        variant="filled"
                        severity={typeAlert}
                    >
                        {textAlert}
                    </Alert>
                </Collapse>
            </div>
        )
    }
}

export default CustomAlert
