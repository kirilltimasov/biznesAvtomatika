import React, {useContext} from "react";
import {
    Paper,
    Toolbar,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {ContextApp, SET_SELECTED_USER} from "../../reducers/mainReducer";

const useStyles = makeStyles({
    toolbar: {
        borderBottom: '1px solid rgba(224, 224, 224, 1)',
    },
    head: {
        fontWeight: '600',
    },
    row: {
        cursor: 'pointer',
    },
});

const MyTable = props => {
    const {_dispatch, localState} = useContext(ContextApp);
    const classes = useStyles();

    const handleClick = (user) => {
        if (localState.selectedUser && localState.selectedUser.id === user.id){
            _dispatch({type: SET_SELECTED_USER, data: null});
        } else {
            _dispatch({type: SET_SELECTED_USER, data: user});
        }
    };

    return (
        <Paper>
            <Toolbar
                className={classes.toolbar}
                variant='dense'
            />
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center' className={classes.head}>#</TableCell>
                            <TableCell align="left" className={classes.head}>UserName</TableCell>
                            <TableCell align="left" className={classes.head}>Department</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {localState.users.map((row) => (
                            <TableRow
                                key={row.id}
                                hover onClick={() => handleClick(row)}
                                selected={localState.selectedUser && row.id === localState.selectedUser.id}
                                className={classes.row}
                            >
                                <TableCell component="th" scope="row" align='center'>
                                    {row.id}
                                </TableCell>
                                <TableCell align="left">{row.userName}</TableCell>
                                <TableCell align="left">{row.department}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
};

export default MyTable;