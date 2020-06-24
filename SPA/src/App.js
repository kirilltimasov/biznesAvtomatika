import React, {useEffect, useReducer} from 'react';
import {
    Grid,
    CircularProgress,
    Container
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {
    actions,
    ContextApp,
    initialState,
    reducer,
    SET_INITIALIZE,
    SET_LOADED,
    SET_USERS
} from "./reducers/mainReducer";
import MyButtons from "./components/MyButtons/MyButtons";
import MyTable from "./components/MyTable/MyTable";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
    },
}));

function App() {
    const [localState, _dispatch] = useReducer(reducer, initialState);
    const dispatch = action => action(_dispatch);
    const classes = useStyles();

    useEffect(() => {
        if (!localState.isLoad) {
            _dispatch({type: SET_INITIALIZE, data: false});
            const promiseArray = [];
            promiseArray.push(dispatch(actions.getUsers()));
            promiseArray.push(dispatch(actions.getDepartments()));
            Promise.all(promiseArray)
                .then(() => {
                    _dispatch({type: SET_LOADED, data: true});
                });
        }
    }, [localState.isLoad]);

    useEffect(() => {
        if (localState.isLoad) {
            const users = localState.usersRaw.map(user => {
                user.department = localState.departments
                    .filter(department => department.id === user.departmentId)
                    .map(department => department.title);
                return user;
            });

            _dispatch({type: SET_USERS, data: users});
            _dispatch({type: SET_INITIALIZE, data: true});
        }
    }, [localState.isLoad, localState.departments, localState.usersRaw]);

    if (!localState.isInitialize) {
        return (
            <Grid
                container
                spacing={0}
                alignItems='center'
                justify='center'
                className={classes.root}
            >
                <CircularProgress />
            </Grid>
        )
    }

    return (
        <Container maxWidth="sm">
            <ContextApp.Provider value={{_dispatch, localState}}>
              <MyButtons/>
              <MyTable/>
            </ContextApp.Provider>
        </Container>
    );
}

export default App;
