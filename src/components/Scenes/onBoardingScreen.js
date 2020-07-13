import React from 'react';
import { View, Image } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { useDispatch } from 'react-redux';
import { onBoardingDone } from '@store/modules/user/actions';
import { OWNSPACE_LIGHT_GRAY } from '@constants/';
import i18n from '@i18n/i18n';

/**
 * The OnBoardingScreen component
 * @param {string} user - The user id 
 */
const OnBoardingScreen = ({ user }) => {
    const dispatch = useDispatch();

    /**
     * Go to home screen
     */
    const _goToHome = () => {
        const payload = {
            id: user
        }
        dispatch(onBoardingDone(payload))
    }

    /**
    * Render Onboarding component
    * @returns {React.Component} - Onboarding component
    */
    return (
        <Onboarding
            onSkip={() => _goToHome()}
            onDone={() => _goToHome()}
            bottomBarColor={OWNSPACE_LIGHT_GRAY}
            pages={[
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('@images/onboarding_1.png')} style={{ height: 250, width: 250 }} />,
                    title: i18n.t('onBoarding.titlePageOne'),
                    subtitle: i18n.t('onBoarding.subTitlePageOne'),
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('@images/onboarding_2.png')} style={{ height: 250, width: 250 }} />,
                    title: i18n.t('onBoarding.titlePageTwo'),
                    subtitle: i18n.t('onBoarding.subTitlePageTwo'),
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('@images/onboarding_3.png')} style={{ height: 250, width: 250 }} />,
                    title: i18n.t('onBoarding.titlePageThree'),
                    subtitle: i18n.t('onBoarding.subTitlePageThree'),
                }
            ]}
        />
    )
}

export default OnBoardingScreen;