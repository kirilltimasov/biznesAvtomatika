import React from "react";
import {Field, Form} from "react-final-form";
import {
    DialogContent,
    DialogActions,
    MenuItem,
    Button,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import TextFieldAdapter from "../../../../Helpers/TextFieldAdapter";

const useStyles = makeStyles((theme) => ({
    buttons: {
        marginRight: theme.spacing(2),
    },
    field: {
        marginBottom: theme.spacing(2),
    },
}));

const UserForm = props => {
    const {departments, selectedUser, onSubmit} = props;
    const classes = useStyles();

    const getInitialValues = () => {
      if (!selectedUser) return null;
      return {
          id: selectedUser.id,
          userName: selectedUser.userName,
          departmentId: selectedUser.departmentId
      }

    };

    const required = value => (value ? undefined : 'Required')

    return (
        <Form
            onSubmit={onSubmit}
            initialValues={getInitialValues()}
            render={(
                {
                    handleSubmit,
                    form,
                    submitting,
                    pristine,
                    values,
                    invalid
                }) => (
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <Field
                            name="userName"
                            component={TextFieldAdapter}
                            validate={required}
                            label='Username'
                            variant='outlined'
                            fullWidth
                            className={classes.field}
                        />
                        <Field
                            name="departmentId"
                            component={TextFieldAdapter}
                            validate={required}
                            label='Department'
                            variant='outlined'
                            fullWidth
                            select
                            className={classes.field}
                        >
                            <MenuItem value=''>Not selected</MenuItem>
                            {departments.map(item => {
                                return (
                                    <MenuItem key={`department_${item.id}`} value={item.id}>{item.title}</MenuItem>
                                )
                            })}
                        </Field>
                    </DialogContent>
                    <DialogActions className={classes.buttons}>
                        <Button
                            type="submit"
                            disabled={submitting || invalid}
                            color='primary'
                            variant='contained'
                        >
                            Save
                        </Button>
                        <Button
                            type="button"
                            onClick={form.reset}
                            disabled={submitting || pristine}
                            color='primary'
                            variant='contained'
                        >
                            Reset
                        </Button>
                    </DialogActions>
                </form>
            )}
        />
    )
};

export default UserForm;
