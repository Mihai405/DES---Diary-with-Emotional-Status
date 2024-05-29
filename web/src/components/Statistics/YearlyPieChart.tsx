import { MoodData } from '../../types';
import { PieChart } from '@mui/x-charts';
import * as React from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { moods } from '../MoodForm/MoodButtons';
import { capitalizeFirstLetter } from '../../utils';
import SearchOffIcon from '@mui/icons-material/SearchOff';

export function YearlyPieChart({ moodHistory }: { moodHistory: MoodData[] }) {
    const [year, setYear] = useState<Dayjs | null>(dayjs());

    const filteredMoodHistoryBasedOnYear = moodHistory.filter(moodData =>
        year?.isSame(dayjs(moodData.date), 'year')
    );

    const moodCounts: { [key: string]: number } = {
        Angry: 0,
        Sad: 0,
        Neutral: 0,
        Happy: 0,
        Excited: 0,
    };

    filteredMoodHistoryBasedOnYear.forEach(moodData => {
        moodCounts[capitalizeFirstLetter(moodData.mood)]++;
    });

    return (
        <div className="mood-container">
            <h1>Yearly Mood Chart</h1>
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
            <PieChart
                sx={{
                    display:
                        filteredMoodHistoryBasedOnYear.length === 0
                            ? 'none'
                            : '',
                }}
                series={[
                    {
                        data: [
                            {
                                id: 0,
                                value: moodCounts.Angry,
                                label: 'Angry 😡',
                            },
                            {
                                id: 1,
                                value: moodCounts.Sad,
                                label: 'Sad 😞',
                            },
                            {
                                id: 2,
                                value: moodCounts.Neutral,
                                label: 'Neutral 😐',
                            },
                            {
                                id: 3,
                                value: moodCounts.Happy,
                                label: 'Happy 😊',
                            },
                            {
                                id: 4,
                                value: moodCounts.Excited,
                                label: 'Excited 🤩',
                            },
                        ],
                        highlightScope: {
                            faded: 'global',
                            highlighted: 'item',
                        },
                        faded: {
                            innerRadius: 30,
                            additionalRadius: -30,
                            color: 'gray',
                        },
                    },
                ]}
                width={400}
                height={200}
            />
        </div>
    );
}
