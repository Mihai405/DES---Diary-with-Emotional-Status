import { Button, TextField } from '@mui/material';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

import { MoodData } from '../../../types';
import { useEffect, useState } from 'react';

export function MoodFormStep3({
    setDisabled,
    moodData,
    setMoodData,
}: {
    setDisabled: (disabled: boolean) => void;
    moodData: MoodData;
    setMoodData: (moodData: MoodData) => void;
}) {
    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
    const mic = new SpeechRecognition();

    mic.continuous = true;
    mic.interimResults = true;
    mic.lang = 'en-US';

    const [isListening, setIsListening] = useState(false);

    // useEffect(() => {
    //     handleListen();
    // }, [isListening]);
    //
    // const handleListen = () => {
    //     if (isListening) {
    //         mic.start();
    //         mic.onend = () => {
    //             console.log('continue..');
    //             mic.start();
    //         };
    //     } else {
    //         mic.stop();
    //         mic.onend = () => {
    //             console.log('Stopped Mic on Click');
    //         };
    //     }
    //     mic.onstart = () => {
    //         console.log('Mics on');
    //     };
    //     // @ts-ignore
    //     mic.onresult = event => {
    //         const transcript = Array.from(event.results)
    //             // @ts-ignore
    //             .map(result => result[0])
    //             .map(result => result.transcript)
    //             .join('');
    //         console.log(transcript);
    //         setMoodData({ ...moodData, explanation: transcript });
    //         // @ts-ignore
    //         mic.onerror = event => {
    //             console.log(event.error);
    //         };
    //     };
    // };

    useEffect(() => {
        const handleListen = () => {
            if (isListening) {
                mic.start();
                mic.onend = () => {
                    console.log('Microphone has been stopped, restarting...');
                    if (isListening) {
                        mic.start();
                    }
                };
            } else {
                mic.stop();
                mic.onend = () => console.log('Microphone stopped');
            }

            mic.onstart = () => console.log('Microphone on');

            // @ts-ignore
            mic.onresult = event => {
                const transcript = Array.from(event.results)
                    // @ts-ignore
                    .map(result => result[0])
                    .map(result => result.transcript)
                    .join('');
                console.log(transcript);
                setMoodData({ ...moodData, explanation: transcript });
            };

            // @ts-ignore
            mic.onerror = event => console.log(event.error);
        };

        handleListen();

        // Cleanup function to stop the mic when isListening changes or component unmounts
        return () => {
            mic.stop();
            // You might also want to reset event handlers here if they can cause memory leaks
            mic.onend = null;
            mic.onstart = null;
            mic.onresult = null;
            mic.onerror = null;
        };
    }, [isListening]); // Only re-run the effect if isListening changes

    useEffect(() => {
        if (moodData.explanation.length > 0) setDisabled(false);
        if (moodData.explanation.length === 0) setDisabled(true);
    }, [moodData.explanation]);

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
                    setMoodData({ ...moodData, explanation: e.target.value });
                }}
            />
            <Button
                sx={{
                    marginTop: '8px',
                    backgroundColor: isListening ? '#FF0000' : '#00b140',
                    color: '#FFFFFF',
                }}
                onClick={() => setIsListening(prevState => !prevState)}
            >
                <KeyboardVoiceIcon />
            </Button>
        </>
    );
}
