import React from "react";
import {
    useMediaQuery,
    useTheme,
    withStyles,
    Dialog,
    DialogTitle as MuiDialogTitle,
    Typography,
    IconButton
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const MyDialog = props => {
  const {open, close, name, EditForm} = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
      <Dialog
          open={open}
          maxWidth='md'
          fullWidth={true}
          fullScreen={fullScreen}
      >
          <DialogTitle onClose={close}>{name}</DialogTitle>
          <EditForm {...props}/>
      </Dialog>
  )
};

export default MyDialog;