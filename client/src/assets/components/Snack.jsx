import {
    Snackbar,
    Alert
} from '@mui/material';

const Snack = ({handleClose,sn_open})=>{

    return(
    <Snackbar 
        open={sn_open.open} 
        autoHideDuration={6000} 
        onClose={handleClose}
    >
        <Alert 
            onClose={handleClose} 
            severity={sn_open.sev} 
            sx={{ width: '100%' }}
        >
            {sn_open.text}
        </Alert>
    </Snackbar>
    )
}

export default Snack;