import { Button, TextField } from '@mui/material';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { useState } from 'react';

export function MoodFormStep3({
    setDisabled,
}: {
    setDisabled: (disabled: boolean) => void;
}) {
    const [explanation, setExplanation] = useState<string>('');
    return (
        <>
            <h1>Describe what happened</h1>
            <p>Add your notes on any thought that reflecting your mood</p>
            <TextField
                sx={{ marginTop: '50px' }}
                label="Explanation"
                multiline
                fullWidth
                rows={4}
                value={explanation}
                onChange={e => {
                    if (e.target.value.length > 0) setDisabled(false);
                    if (e.target.value.length === 0) setDisabled(true);
                    setExplanation(e.target.value);
                }}
            />
            <Button sx={{ marginTop: '8px' }}>
                <KeyboardVoiceIcon />
            </Button>
        </>
    );
}
