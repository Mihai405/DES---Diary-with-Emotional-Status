import * as React from 'react';
import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { MoodForm } from './MoodForm';
import { MoodData } from '../../types';
import { mutate } from 'swr';
import { AuthContext } from '../../store/auth-context';

const steps = ['Mood', 'Reason', 'Explanation'];

export function MoodFormStepperWrapper() {
    const [activeStep, setActiveStep] = useState(0);
    const [disabled, setDisabled] = useState(true);
    const [moodData, setMoodData] = useState<MoodData>({
        id: 0,
        mood: '',
        reason: '',
        explanation: '',
        date: new Date(),
    });

    const authCtx = useContext(AuthContext);

    async function postMood(moodData: MoodData) {
        const response = await fetch('http://localhost:8080/mood', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authCtx.isLoggedIn ? authCtx.token : ''}`,
            },
            body: JSON.stringify(moodData),
        });
        await response.json();
        // trigger a revalidation (refetch) of the data
    }

    async function handleNext() {
        setDisabled(true);
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        if (activeStep === steps.length - 1) {
            // send mood data to the server
            await postMood(moodData);
            await mutate('http://localhost:8080/mood');
            handleReset();
        }
    }

    const handleBack = () => {
        setDisabled(false);
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleReset = () => {
        setMoodData({
            id: 0,
            mood: '',
            reason: '',
            explanation: '',
            date: new Date(),
        });
        setActiveStep(0);
    };

    return (
        <div className="mood-form-container">
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep}>
                    {steps.map(label => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: {
                            optional?: React.ReactNode;
                        } = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>

                <MoodForm
                    activeStep={activeStep}
                    setDisabled={setDisabled}
                    moodData={moodData}
                    setMoodData={setMoodData}
                />

                {activeStep !== steps.length && (
                    <React.Fragment>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                pt: 2,
                            }}
                        >
                            {activeStep !== 0 && (
                                <Button
                                    color="inherit"
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Back
                                </Button>
                            )}
                            <Box sx={{ flex: '1 1 auto' }} />

                            <Button onClick={handleNext} disabled={disabled}>
                                {activeStep === steps.length - 1
                                    ? 'Finish'
                                    : 'Next'}
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Box>
        </div>
    );
}
