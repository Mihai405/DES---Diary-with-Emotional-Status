import { useState } from 'react';
import { MoodButtons } from '../MoodButtons';

export function MoodFormStep1({
    setDisabled,
}: {
    setDisabled: (disabled: boolean) => void;
}) {
    const [selectedMood, setSelectedMood] = useState<number>(-1);
    return (
        <>
            <h1>What's your mood now?</h1>
            <p>
                Select mood that reflects the most how you are feeling at this
                moment.
            </p>

            <MoodButtons
                selected={selectedMood}
                onClick={index => {
                    if (selectedMood === -1) setDisabled(false);
                    setSelectedMood(index);
                }}
            />
        </>
    );
}
