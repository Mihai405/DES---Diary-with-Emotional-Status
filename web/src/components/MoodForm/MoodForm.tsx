import './styles.css';
import { MoodFormStep1 } from './MoodFormSteps/MoodFormStep1';
import { MoodFormStep2 } from './MoodFormSteps/MoodFormStep2';
import { MoodFormStep3 } from './MoodFormSteps/MoodFormStep3';

import { MoodData } from '../../types';

export function MoodForm({
    activeStep,
    setDisabled,
    moodData,
    setMoodData,
}: {
    activeStep: number;
    setDisabled: (disabled: boolean) => void;
    moodData: MoodData;
    setMoodData: (moodData: MoodData) => void;
}) {
    return (
        <div className="centered-form-flex-wrapper">
            {activeStep === 0 && (
                <MoodFormStep1
                    setDisabled={setDisabled}
                    moodData={moodData}
                    setMoodData={setMoodData}
                />
            )}
            {activeStep === 1 && (
                <MoodFormStep2
                    setDisabled={setDisabled}
                    moodData={moodData}
                    setMoodData={setMoodData}
                />
            )}
            {activeStep === 2 && (
                <MoodFormStep3
                    setDisabled={setDisabled}
                    moodData={moodData}
                    setMoodData={setMoodData}
                />
            )}
        </div>
    );
}
