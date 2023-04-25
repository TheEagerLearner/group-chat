import {
    TextField
} from '@mui/material';

const InputBar = ({label,value,onChange}) => {

    return(
    <TextField
        autoFocus
        margin="dense"
        label={label}
        type="text"
        fullWidth
        variant="standard"
        value={value}
        onChange={onChange}
    />
    );
}

export default InputBar;