import { MoodHistory } from '../components/History/MoodHistory';
import { mockMoodData } from './HomePage';
import { StaticDatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import dayjs from 'dayjs';

export function HistoryPage() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    // const { data: moods,, isLoading } = useSWR<MoodData[]>('/mood');

    // // if the request is still ongoing
    // if (isLoading) {
    //     return <CircularProgress />;
    // }

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
            <MoodHistory
                moodHistory={mockMoodData}
                date={selectedDate ?? undefined}
            />
        </>
    );
}
