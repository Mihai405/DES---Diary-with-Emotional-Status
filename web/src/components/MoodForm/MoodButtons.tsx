import { Button } from '@mui/material';
import { ReactNode } from 'react';

export const moods: { [key: string]: string } = {
    angry: '😡',
    sad: '😞',
    neutral: '😐',
    happy: '😊',
    excited: '🤩',
};
export const MoodButtons = ({
    selected,
    onClick,
}: {
    selected: string;
    onClick: (mood: string) => void;
}) => {
    return (
        <div className="mood-buttons-container">
            {Object.keys(moods).map((mood, index) => (
                <MoodButton
                    key={index}
                    selected={selected === mood}
                    onClick={() => onClick(mood)}
                >
                    {moods[mood]}
                </MoodButton>
            ))}
        </div>
    );
};

function MoodButton({
    children,
    selected,
    onClick,
}: {
    children: ReactNode;
    selected: boolean;
    onClick: () => void;
}) {
    return (
        <Button
            sx={{
                fontSize: '64px',
                paddingInline: '24px',
                backgroundColor: selected ? '#88c3f1' : null,
            }}
            onClick={onClick}
        >
            {children}
        </Button>
    );
}
