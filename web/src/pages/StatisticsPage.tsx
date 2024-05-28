import { MonthlyMoodChart } from '../components/Statistics/MonthlyMoodChart';
import { mockMoodData } from './HomePage';
import { YearlyPieChart } from '../components/Statistics/YearlyPieChart';

export function StatisticsPage() {
    return (
        <>
            <YearlyPieChart moodHistory={mockMoodData} />
            <MonthlyMoodChart moodHistory={mockMoodData} />
        </>
    );
}
