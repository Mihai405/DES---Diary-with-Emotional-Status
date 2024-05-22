import NavBar from '../components/NavBar/NavBar';
import { MoodFormStepperWrapper } from '../components/MoodForm/MoodFormStepperWrapper';
import { MoodCard } from '../components/History/MoodCard';

export function HomePage() {
    return (
        <div>
            <NavBar />
            <MoodFormStepperWrapper />
            <MoodCard />
        </div>
    );
}
