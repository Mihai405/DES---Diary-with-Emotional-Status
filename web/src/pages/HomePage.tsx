import NavBar from '../components/NavBar/NavBar';
import { MoodFormStepperWrapper } from '../components/MoodForm/MoodFormStepperWrapper';
import { MoodHistory } from '../components/History/MoodHistory';
import { CalendarMoodChart } from '../components/Calendar/CalendarMoodChart';

const mockMoodData = [
    {
        mood: 'Happy',
        reason: 'Work',
        explanation: 'I worked hard and it paid off',
    },
    {
        mood: 'Sad',
        reason: 'School',
        explanation: 'I failed my test',
    },
    {
        mood: 'Angry',
        reason: 'Friend',
        explanation: 'My friend was mean to me',
    },
    {
        mood: 'Neutral',
        reason: 'Weather',
        explanation: 'It was a cloudy day',
    },
    {
        mood: 'Excited',
        reason: 'Birthday',
        explanation: 'It was my birthday',
    },
    {
        mood: 'Happy',
        reason: 'Work',
        explanation: 'I worked hard and it paid off',
    },
    {
        mood: 'Sad',
        reason: 'School',
        explanation: 'I failed my test',
    },
    {
        mood: 'Angry',
        reason: 'Friend',
        explanation: 'My friend was mean to me',
    },
    {
        mood: 'Neutral',
        reason: 'Weather',
        explanation: 'It was a cloudy day',
    },
    {
        mood: 'Excited',
        reason: 'Birthday',
        explanation: 'It was my birthday',
    },
];

export function HomePage() {
    return (
        <div>
            <NavBar />
            <div className="homeScreen-container">
                <MoodFormStepperWrapper />
                <MoodHistory moodHistory={mockMoodData} />
                <CalendarMoodChart />
            </div>
        </div>
    );
}
