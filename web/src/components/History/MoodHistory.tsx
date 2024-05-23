import { MoodData } from '../../types';
import { MoodCard } from './MoodCard';

export function MoodHistory({ moodHistory }: { moodHistory: MoodData[] }) {
    return (
        <div className="moodHistory-container">
            <h1>Your History</h1>
            {moodHistory.map(moodData => (
                <MoodCard moodData={moodData} />
            ))}
        </div>
    );
}
