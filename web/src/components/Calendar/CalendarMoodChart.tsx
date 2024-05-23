import { DatePicker } from '@mui/x-date-pickers';
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import './styles.css';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { MoodData } from '../../types';

export function CalendarMoodChart({
    moodHistory,
}: {
    moodHistory: MoodData[];
}) {
    const [month, setMonth] = useState<Dayjs | null>(dayjs());

    const filteredMoodHistoryBasedOnMonth = moodHistory.filter(moodData =>
        month?.isSame(dayjs(moodData.date), 'month')
    );

    const moodCounts: { [key: string]: number } = {
        Angry: 0,
        Sad: 0,
        Neutral: 0,
        Happy: 0,
        Excited: 0,
    };

    filteredMoodHistoryBasedOnMonth.forEach(moodData => {
        moodCounts[moodData.mood]++;
    });

    console.log(moodCounts);

    return (
        <div className="calendar-container">
            <h1>Mood Chart</h1>
            <DatePicker
                views={['year', 'month']}
                openTo="month"
                disableFuture={true}
                slotProps={{
                    textField: {
                        variant: 'standard',
                    },
                }}
                value={month}
                onChange={date => setMonth(date)}
            />
            <BarChart
                xAxis={[
                    {
                        scaleType: 'band',
                        data: [
                            'Angry 😡',
                            'Sad 😞',
                            'Neutral 😐',
                            'Happy 😊',
                            'Excited 🤩',
                        ],
                        tickFontSize: 14,
                    },
                ]}
                series={[
                    {
                        type: 'bar',
                        data: Object.values(moodCounts),
                        color: '#b3d4f4',
                    },
                ]}
                width={500}
                height={300}
            />
        </div>
    );
}
