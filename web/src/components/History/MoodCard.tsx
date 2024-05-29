import { MoodData } from '../../types';
import { moods } from '../MoodForm/MoodButtons';
import { Button } from '@mui/material';
import './styles.css';
import { capitalizeFirstLetter } from '../../utils';
import { AuthContext } from '../../store/auth-context';
import { useContext } from 'react';
import { mutate } from 'swr';

export function MoodCard({ moodData }: { moodData: MoodData }) {
    const authCtx = useContext(AuthContext);

    async function deleteMood(id: number) {
        const response = await fetch(`http://localhost:8080/mood/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
            },
        });
        if (response.ok) {
            await mutate('http://localhost:8080/mood');
        } else {
            console.error('Failed to delete mood');
        }
    }

    return (
        <div className="moodCard-container">
            <div className="moodCard-header">
                <div className="moodCard-mood">
                    <div style={{ fontSize: '36px' }}>
                        {moods[capitalizeFirstLetter(moodData.mood)]}
                    </div>
                    <b style={{ fontSize: '24px' }}>{moodData.mood}</b>
                </div>
                <Button
                    sx={{ color: '#FF0000', fontWeight: 550, fontSize: '14px' }}
                    onClick={async () => {
                        await deleteMood(moodData.id);
                    }}
                >
                    Delete
                </Button>
            </div>
            <div style={{ fontSize: '14px', marginBottom: '8px' }}>
                {moodData.date.toString().split('T')[0]}
            </div>
            <div style={{ fontSize: '18px' }}>
                Because of <b>{moodData.reason}</b>
            </div>
            <div style={{ fontSize: '14px', marginTop: '16px' }}>
                {moodData.explanation}
            </div>
        </div>
    );
}
