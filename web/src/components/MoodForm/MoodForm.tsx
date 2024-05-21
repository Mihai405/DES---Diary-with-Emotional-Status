import './styles.css';
import { MoodFormStep1 } from './MoodFormSteps/MoodFormStep1';

export function MoodForm({
    activeStep,
    setDisabled,
}: {
    activeStep: number;
    setDisabled: (disabled: boolean) => void;
}) {
    return (
        <div className="centered-form-flex-wrapper">
            {activeStep === 0 && <MoodFormStep1 setDisabled={setDisabled} />}
            {/*{activeStep === 1 && <MoodFormStep2 />}*/}
            {/*{activeStep === 2 && <MoodFormStep3 />}*/}
        </div>
    );
}
