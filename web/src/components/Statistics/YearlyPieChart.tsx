import { MoodData } from '../../types';
import { PieChart } from '@mui/x-charts';
import * as React from 'react';

export function YearlyPieChart({ moodHistory }: { moodHistory: MoodData[] }) {
    const moodCounts: { [key: string]: number } = {
        Angry: 0,
        Sad: 0,
        Neutral: 0,
        Happy: 0,
        Excited: 0,
    };

    moodHistory.forEach(moodData => {
        moodCounts[moodData.mood]++;
    });

    return (
        <div
            style={{
                backgroundColor: '#f1f8fb',
                borderRadius: '16px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <h1>Yearly Mood Pie Chart</h1>
            <PieChart
                series={[
                    {
                        data: [
                            {
                                id: 0,
                                value: moodCounts.Angry,
                                label: 'Angry 😡',
                            },
                            { id: 1, value: moodCounts.Sad, label: 'Sad 😞' },
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
