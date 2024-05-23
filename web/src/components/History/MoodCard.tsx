import { MoodData } from '../../types';
import { moods } from '../MoodForm/MoodButtons';
import { Button } from '@mui/material';
import './styles.css';

export function MoodCard({ moodData }: { moodData: MoodData }) {
    return (
        <div className="moodCard-container">
            <div className="moodCard-header">
                <div className="moodCard-mood">
                    <div style={{ fontSize: '36px' }}>
                        {moods[moodData.mood]}
                    </div>
                    <b style={{ fontSize: '24px' }}>{moodData.mood}</b>
                </div>
                <Button
                    sx={{ color: '#FF0000', fontWeight: 550, fontSize: '14px' }}
                >
                    Delete
                </Button>
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
