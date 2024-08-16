/* eslint-disable import/no-duplicates */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import complete from '../../../../assets/images/complete.svg';
import unColoredLine from '../../../../assets/images/unColoredLine.svg';
import coloredLine from '../../../../assets/images/coloredLine.svg';
import dashedCircle from '../../../../assets/images/dashedCircle.svg';
import step2Icon from '../../../../assets/images/step2Icon.svg';

const Stepper2 = () => {
    const [currentStep, setCurrentStep] = useState(0);

    return (
        <div style={{ width: '90%', minWidth: '300px', margin: '0 auto' }}>
            <div
                style={{
                    borderRadius: '10px',
                    // border: '1px solid #e5e6e9',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ height: '35px', width: '35px', borderRadius: '50%', background: '#000' }}>
                        <img style={{ marginTop: '8px', marginLeft: '9px' }} src={complete} alt="doing" />
                    </div>
                    <div style={{ width: '100%', textAlign: 'center', fontSize: '0.875rem', fontWeight: 'bold', color: '#3b82f6' }}>
                        <p style={{ color: '#6E7478', fontWeight: '300' }}>STEP 1</p>
                        <p style={{ marginTop: '-10px', color: '#000' }}>Brand Details</p>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img style={{ marginTop: '18px' }} src={coloredLine} alt="coloredLine" />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ height: '35px', width: '35px', borderRadius: '50%', background: '#E5E8EB' }}>
                        <img style={{ marginTop: '8px', marginLeft: '9px' }} src={step2Icon} alt="doing" />
                    </div>
                    <div style={{ width: '100%', textAlign: 'center', fontSize: '0.875rem', fontWeight: 'bold', color: '#3b82f6' }}>
                        <p style={{ color: '#6E7478', fontWeight: '300' }}>STEP 2</p>
                        <p style={{ marginTop: '-10px', color: '#000' }}>Set Keywords</p>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img style={{ marginTop: '18px' }} src={unColoredLine} alt="doing" />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img style={{ height: '35px', width: '35px' }} src={dashedCircle} alt="circle" />
                    <div style={{ width: '100%', textAlign: 'center', fontSize: '0.875rem', fontWeight: 'bold', color: '#3b82f6' }}>
                        <p style={{ color: '#6E7478', fontWeight: '300' }}>STEP 3</p>
                        <p style={{ marginTop: '-10px', color: '#000' }}>Select Socials</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stepper2;
