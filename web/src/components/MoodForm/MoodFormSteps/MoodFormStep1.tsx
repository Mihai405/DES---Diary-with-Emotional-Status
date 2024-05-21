import { useState } from 'react';
import { MoodButtons } from '../MoodButtons';

import { MoodData } from '../../../types';

export function MoodFormStep1({
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
            <h1>What's your mood now?</h1>
            <p>
                Select mood that reflects the most how you are feeling at this
                moment.
            </p>

            <MoodButtons
                selected={moodData.mood}
                onClick={index => {
                    if (moodData.mood === -1) setDisabled(false);
                    setMoodData({ ...moodData, mood: index });
                }}
            />
        </>
    );
}
