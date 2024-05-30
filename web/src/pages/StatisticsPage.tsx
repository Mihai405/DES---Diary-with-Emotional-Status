import { MonthlyMoodChart } from '../components/Statistics/MonthlyMoodChart';
import { YearlyPieChart } from '../components/Statistics/YearlyPieChart';
import useSWR from 'swr';
import { MoodData } from '../types';
import { CircularProgress } from '@mui/material';
import { MonthLineChart } from '../components/Statistics/MonthLineChart';

export function StatisticsPage() {
    const { data: moods, isLoading } = useSWR<MoodData[]>(
        'http://localhost:8080/mood'
    );

    // if the request is still ongoing
    if (isLoading || !moods) {
        return <CircularProgress />;
    }

    return (
        <>
            <YearlyPieChart moodHistory={moods} />
            <MonthlyMoodChart moodHistory={moods} />
            <MonthLineChart moodHistory={moods} />
        </>
    );
}
