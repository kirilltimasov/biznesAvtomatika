import React from "react";
import API from "../../../../api/api";
import {Form} from "react-final-form";
import {
    DialogContent,
    DialogActions,
    Button
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    buttons: {
        marginRight: theme.spacing(2),
    },
}));

const DeleteUser = props => {
    const {close, refresh, selectedUser} = props;
    const classes = useStyles();

    const onSubmit = () => {
        API.user.delete(selectedUser.id)
            .then(() => {
                close();
                refresh();
            });
    };

    return (
        <Form
            onSubmit={onSubmit}
            render={(
                {
                    handleSubmit,
                    submitting,
                    pristine,
                    invalid
                }) => (
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        Are you sure?
                    </DialogContent>
                    <DialogActions className={classes.buttons}>
                        <Button
                            type="submit"
                            disabled={submitting || invalid}
                            color='primary'
                            variant='contained'
                        >
                            Yes
                        </Button>
                        <Button
                            type="button"
                            onClick={close}
                            disabled={submitting || pristine}
                            color='primary'
                            variant='contained'
                        >
                            No
                        </Button>
                    </DialogActions>
                </form>
            )}
        />
    )
};

export default DeleteUser;