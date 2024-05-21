import { Button, TextField } from '@mui/material';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { useState } from 'react';

import { MoodData } from '../../../types';

export function MoodFormStep3({
    setDisabled,
    moodData,
    setMoodData,
}: {
    setDisabled: (disabled: boolean) => void;
    moodData: MoodData;
    setMoodData: (moodData: MoodData) => void;
}) {
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
                value={moodData.explanation}
                onChange={e => {
                    if (e.target.value.length > 0) setDisabled(false);
                    if (e.target.value.length === 0) setDisabled(true);
                    setMoodData({ ...moodData, explanation: e.target.value });
                }}
            />
            <Button sx={{ marginTop: '8px' }}>
                <KeyboardVoiceIcon />
            </Button>
        </>
    );
}
