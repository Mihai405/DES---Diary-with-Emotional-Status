import { MoodData } from '../../types';
import { MoodCard } from './MoodCard';
import SearchOffIcon from '@mui/icons-material/SearchOff';

export function MoodHistory({
    moodHistory,
    date,
}: {
    moodHistory: MoodData[];
    date?: Date;
}) {
    const isToday = date?.toDateString() === new Date().toDateString();

    let title = 'Your History';
    let moodHistoryFiltered = moodHistory;
    if (isToday) {
        title = 'Today';
        moodHistoryFiltered = moodHistory.filter(
            moodData =>
                new Date(moodData.date).toDateString() ===
                new Date().toDateString()
        );
    } else if (date) {
        title = date.toISOString().split('T')[0];
        moodHistoryFiltered = moodHistory.filter(
            moodData =>
                new Date(moodData.date).toDateString() === date.toDateString()
        );
    }

    return (
        <div className="moodHistory-container">
            <h1>{title}</h1>
            {moodHistoryFiltered.map(moodData => (
                <MoodCard moodData={moodData} />
            ))}
            {moodHistoryFiltered.length === 0 && (
                <div style={{ textAlign: 'center', marginTop: '120px' }}>
                    <SearchOffIcon style={{ fontSize: '60px' }} />
                    <h3>
                        {isToday ? (
                            <>
                                No moods today yet.
                                <br />
                                <br />
                                Add a mood to get started.
                            </>
                        ) : (
                            'No moods on this day'
                        )}
                    </h3>
                </div>
            )}
        </div>
    );
}
