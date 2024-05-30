import { ReactNode } from 'react';
import { Chip } from '@mui/material';

import { MoodData } from '../../../types';
import { reasons } from '../../../constants';

function ReasonChip({
    onClick,
    variant,
    children,
}: {
    onClick: () => void;
    variant: 'filled' | 'outlined';
    children: ReactNode;
}) {
    return (
        <Chip
            sx={{ fontSize: '16px' }}
            onClick={onClick}
            label={children}
            variant={variant}
        />
    );
}

export function MoodFormStep2({
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
            <h1>What’s the reason making you feel this way?</h1>
            <p>Select the strongest reason that caused your emotion</p>
            <div className="reasons-container">
                {reasons.map((reason, index) => (
                    <ReasonChip
                        key={index}
                        variant={
                            moodData.reason === reason.toUpperCase()
                                ? 'filled'
                                : 'outlined'
                        }
                        onClick={() => {
                            if (moodData.reason === '') setDisabled(false);
                            setMoodData({
                                ...moodData,
                                reason: reason.toUpperCase(),
                            });
                        }}
                    >
                        {reason}
                    </ReasonChip>
                ))}
            </div>
        </>
    );
}
