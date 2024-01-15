import './application-details.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export function CommentSendField(): JSX.Element {
    const onSend = submitEvent => {

        return false;
    };
    return (
        <Box onSubmit={onSend}
            component="form"
            sx={{
                '& .MuiTextField-root': {  width: '50ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    sx={{
                        '& .MuiTextField-root': { minHeight: '100%', width: '50ch', height: '30ch' },
                    }}
                    id="outlined-required"
                    label="Комментарий"
                    color="warning"
                />

            </div>
            <button className="sendBtn" type="submit">Отправить</button>
        </Box>
);
}
