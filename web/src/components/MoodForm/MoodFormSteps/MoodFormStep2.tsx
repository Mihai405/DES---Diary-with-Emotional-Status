import { ReactNode, useState } from 'react';
import { Chip } from '@mui/material';

const reasons = [
    'Work',
    'Family',
    'Friends',
    'Love',
    'Girlfriend',
    'Boyfriend',
    'Wife',
    'Husband',
    'Children',
    'Parents',
    'Health',
    'Money',
    'School',
];

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
}: {
    setDisabled: (disabled: boolean) => void;
}) {
    const [selectedReason, setSelectedReason] = useState<number>(-1);
    return (
        <>
            <h1>What’s the reason making you feel this way?</h1>
            <p>Select the strongest reason that caused your emotion</p>
            <div className="reasons-container">
                {reasons.map((reason, index) => (
                    <ReasonChip
                        key={index}
                        variant={
                            selectedReason === index ? 'filled' : 'outlined'
                        }
                        onClick={() => {
                            if (selectedReason === -1) setDisabled(false);
                            setSelectedReason(index);
                        }}
                    >
                        {reason}
                    </ReasonChip>
                ))}
            </div>
        </>
    );
}
