import { DatePicker } from '@mui/x-date-pickers';
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import './styles.css';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { MoodData } from '../../types';
import { capitalizeFirstLetter } from '../../utils';
import SearchOffIcon from '@mui/icons-material/SearchOff';

export function MonthlyMoodChart({ moodHistory }: { moodHistory: MoodData[] }) {
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
        moodCounts[capitalizeFirstLetter(moodData.mood)]++;
    });

    return (
        <div className="monthly-mood-container">
            <h1>Monthly Mood Chart</h1>
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
            {filteredMoodHistoryBasedOnMonth.length === 0 && (
                <div style={{ textAlign: 'center', marginTop: '120px' }}>
                    <SearchOffIcon style={{ fontSize: '60px' }} />
                    <h3>'No moods on this month'</h3>
                </div>
            )}
            <BarChart
                sx={{
                    display:
                        filteredMoodHistoryBasedOnMonth.length === 0
                            ? 'none'
                            : '',
                }}
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
