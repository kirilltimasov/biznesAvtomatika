import React, {useContext} from "react";
import API from "../../api/api";
import {
    ButtonGroup,
    Button,
    Box
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {
    ContextApp,
    SET_DIALOG_ADD,
    SET_DIALOG_DELETE,
    SET_DIALOG_EDIT,
    SET_LOADED
} from "../../reducers/mainReducer";
import MyDialog from "./MyDialog/MyDialog";
import UserForm from "./MyDialog/UserForm/UserForm";
import DeleteUser from "./MyDialog/DeleteUser/DeleteUser";

const useStyles = makeStyles({
    button: {
        textTransform: 'none',
    },
});

const MyButtons = props => {
    const {_dispatch, localState} = useContext(ContextApp);
    const classes = useStyles();

    const checkSelected = () => {
      if (localState.selectedUser) {
          return false;
      }
      return true;
    };

    const handleOpenCloseAdd = () => {
        _dispatch({type: SET_DIALOG_ADD, data: !localState.dialogs.add});
    };

    const handleOpenCloseEdit = () => {
        _dispatch({type: SET_DIALOG_EDIT, data: !localState.dialogs.edit});
    };

    const handleOpenCloseDelete = () => {
        _dispatch({type: SET_DIALOG_DELETE, data: !localState.dialogs.delete});
    };

    const refresh = () => {
        _dispatch({type: SET_LOADED, data: false});
    };

    const onSubmitAdd = values => {
        API.user.post(values)
            .then(() => {
                handleOpenCloseAdd();
                refresh();
            });
    };

    const onSubmitEdit = values => {
        API.user.put(values)
            .then(() => {
                handleOpenCloseEdit();
                refresh();
            });
    };

    return (
        <>
            <Box my={2}>
                <ButtonGroup>
                    <Button
                        className={classes.button}
                        onClick={handleOpenCloseAdd}
                    >Add
                    </Button>
                    <Button
                        className={classes.button}
                        disabled={checkSelected()}
                        onClick={handleOpenCloseEdit}
                    >
                        Edit
                    </Button>
                    <Button
                        className={classes.button}
                        disabled={checkSelected()}
                        onClick={handleOpenCloseDelete}
                    >
                        Delete
                    </Button>
                </ButtonGroup>
            </Box>
            <MyDialog
                name='Add'
                open={localState.dialogs.add}
                close={handleOpenCloseAdd}
                refresh={refresh}
                EditForm={UserForm}
                departments={localState.departments}
                onSubmit={onSubmitAdd}
            />
            <MyDialog
                name='Edit'
                open={localState.dialogs.edit}
                close={handleOpenCloseEdit}
                EditForm={UserForm}
                departments={localState.departments}
                selectedUser={localState.selectedUser}
                onSubmit={onSubmitEdit}
            />
            <MyDialog
                name='Delete'
                open={localState.dialogs.delete}
                close={handleOpenCloseDelete}
                refresh={refresh}
                EditForm={DeleteUser}
                selectedUser={localState.selectedUser}
            />
        </>
    )
};

export default MyButtons;