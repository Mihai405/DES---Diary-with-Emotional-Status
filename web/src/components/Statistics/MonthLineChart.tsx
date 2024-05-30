import { MoodData } from '../../types';
import { LineChart } from '@mui/x-charts';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { capitalizeFirstLetter } from '../../utils';
import { DatePicker } from '@mui/x-date-pickers';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import * as React from 'react';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];
export function MonthLineChart({ moodHistory }: { moodHistory: MoodData[] }) {
    const [year, setYear] = useState<Dayjs | null>(dayjs());

    const filteredMoodHistoryBasedOnYear = moodHistory.filter(moodData =>
        year?.isSame(dayjs(moodData.date), 'year')
    );

    const moodCountsPerMonth: { [key: string]: number[] } = {
        Angry: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        Sad: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        Neutral: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        Happy: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        Excited: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    };

    filteredMoodHistoryBasedOnYear.forEach(moodData => {
        moodCountsPerMonth[capitalizeFirstLetter(moodData.mood)][
            dayjs(moodData.date).month()
        ]++;
    });

    return (
        <div className="mood-container">
            <h1>Mood Development Chart</h1>
            <DatePicker
                views={['year']}
                openTo="year"
                disableFuture={true}
                slotProps={{
                    textField: {
                        variant: 'standard',
                    },
                }}
                value={year}
                onChange={date => setYear(date)}
            />
            {filteredMoodHistoryBasedOnYear.length === 0 && (
                <div style={{ textAlign: 'center', marginTop: '120px' }}>
                    <SearchOffIcon style={{ fontSize: '60px' }} />
                    <h3>'No moods on this year'</h3>
                </div>
            )}
            <LineChart
                sx={{
                    display:
                        filteredMoodHistoryBasedOnYear.length === 0
                            ? 'none'
                            : '',
                }}
                width={500}
                height={300}
                series={[
                    {
                        data: moodCountsPerMonth.Angry,
                        label: '😡',
                        color: 'red',
                    },
                    {
                        data: moodCountsPerMonth.Sad,
                        label: '😞',
                        color: 'pink',
                    },
                    {
                        data: moodCountsPerMonth.Neutral,
                        label: '😐',
                        color: 'gray',
                    },
                    {
                        data: moodCountsPerMonth.Happy,
                        label: '😊',
                        // color: 'yellow',
                    },
                    {
                        data: moodCountsPerMonth.Excited,
                        label: '🤩',
                        color: 'blue',
                    },
                ]}
                xAxis={[{ scaleType: 'point', data: xLabels }]}
            />
        </div>
    );
}
