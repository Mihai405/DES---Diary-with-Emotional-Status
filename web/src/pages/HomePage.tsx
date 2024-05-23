import NavBar from '../components/NavBar/NavBar';
import { MoodFormStepperWrapper } from '../components/MoodForm/MoodFormStepperWrapper';
import { MoodHistory } from '../components/History/MoodHistory';
import { CalendarMoodChart } from '../components/Calendar/CalendarMoodChart';
import { MoodData } from '../types';

const mockMoodData: MoodData[] = [
    {
        mood: 'Happy',
        reason: 'Work',
        explanation: 'I worked hard and it paid off',
        date: new Date(),
    },
    {
        mood: 'Sad',
        reason: 'School',
        explanation: 'I failed my test',
        date: new Date(),
    },
    {
        mood: 'Angry',
        reason: 'Friend',
        explanation: 'My friend was mean to me',
        date: new Date('2024-03-01'),
    },
    {
        mood: 'Neutral',
        reason: 'Weather',
        explanation: 'It was a cloudy day',
        date: new Date('2024-03-05'),
    },
    {
        mood: 'Excited',
        reason: 'Birthday',
        explanation: 'It was my birthday',
        date: new Date('2024-03-10'),
    },
    {
        mood: 'Happy',
        reason: 'Work',
        explanation: 'I worked hard and it paid off',
        date: new Date('2024-03-15'),
    },
    {
        mood: 'Sad',
        reason: 'School',
        explanation: 'I failed my test',
        date: new Date('2024-02-20'),
    },
    {
        mood: 'Angry',
        reason: 'Friend',
        explanation: 'My friend was mean to me',
        date: new Date('2024-02-25'),
    },
    {
        mood: 'Neutral',
        reason: 'Weather',
        explanation: 'It was a cloudy day',
        date: new Date('2024-02-29'),
    },
    {
        mood: 'Excited',
        reason: 'Birthday',
        explanation: 'It was my birthday',
        date: new Date('2024-01-29'),
    },
];

export function HomePage() {
    return (
        <div>
            <NavBar />
            <div className="homeScreen-container">
                <MoodFormStepperWrapper />
                <MoodHistory moodHistory={mockMoodData} />
                <CalendarMoodChart moodHistory={mockMoodData} />
            </div>
        </div>
    );
}
