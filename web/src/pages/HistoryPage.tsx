import { MoodHistory } from '../components/History/MoodHistory';
import { StaticDatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import dayjs from 'dayjs';
import { MoodData } from '../types';
import useSWR from 'swr';
import { CircularProgress } from '@mui/material';

export function HistoryPage() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const { data: moods, isLoading } = useSWR<MoodData[]>(
        'http://localhost:8080/mood'
    );

    // if the request is still ongoing
    if (isLoading || !moods) {
        return <CircularProgress />;
    }

    return (
        <>
            <StaticDatePicker
                value={dayjs(selectedDate)}
                onChange={value => {
                    if (value) {
                        setSelectedDate(value.toDate());
                    }
                }}
                disableFuture={true}
                slotProps={{
                    actionBar: { sx: { display: 'none' } },
                    layout: {
                        sx: {
                            alignItems: 'center',
                            padding: '48px',
                            borderRadius: '16px',
                            backgroundColor: '#f1f8fb',
                        },
                    },
                }}
                orientation={'portrait'}
            />
            <MoodHistory moodHistory={moods} date={selectedDate ?? undefined} />
        </>
    );
}
