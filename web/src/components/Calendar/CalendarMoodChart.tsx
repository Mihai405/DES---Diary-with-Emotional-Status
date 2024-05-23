import { DatePicker } from '@mui/x-date-pickers';
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import './styles.css';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

export function CalendarMoodChart() {
    const [month, setMonth] = useState<Dayjs | null>(dayjs());
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
                        tickFontSize: 15,
                    },
                ]}
                series={[
                    { type: 'bar', data: [3, 1, 4, 6, 3], color: '#b3d4f4' },
                ]}
                width={500}
                height={300}
            />
        </div>
    );
}
