import { MoodFormStepperWrapper } from '../components/MoodForm/MoodFormStepperWrapper';
import { MoodHistory } from '../components/History/MoodHistory';
import { MoodData } from '../types';
import useSWR from 'swr';
import { CircularProgress } from '@mui/material';

export function HomePage() {
    const { data: moods, isLoading } = useSWR<MoodData[]>(
        'http://localhost:8080/mood'
    );

    // if the request is still ongoing
    if (isLoading || !moods) {
        return <CircularProgress />;
    }

    return (
        <>
            <MoodFormStepperWrapper />
            <MoodHistory moodHistory={moods} date={new Date()} />
        </>
    );
}
