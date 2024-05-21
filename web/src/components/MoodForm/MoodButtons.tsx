import { Button } from '@mui/material';
import { ReactNode } from 'react';

const moods = ['😡', '😞', '😐', '😊', '🤩'];
export const MoodButtons = ({
    selected,
    onClick,
}: {
    selected: number;
    onClick: (index: number) => void;
}) => {
    return (
        <div className="mood-buttons-container">
            {moods.map((mood, index) => (
                <MoodButton
                    key={index}
                    selected={selected === index}
                    onClick={() => onClick(index)}
                >
                    {mood}
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
