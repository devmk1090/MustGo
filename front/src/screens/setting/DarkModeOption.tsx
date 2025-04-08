import { CompoundOption } from '@/components/common/CompoundOption';
import React from 'react';
import {StyleSheet, View} from 'react-native';

interface DarkModeOptionProps {
    isVisible: boolean;
    hideOption: () => void;
}

const DarkModeOption = ({isVisible, hideOption}: DarkModeOptionProps) => {

    const handlePressLight = () => {
    }

    const handlePressDark = () => {
    }

    const handlePressSystem = () => {
    }
  return (
    <CompoundOption isVisible={isVisible} hideOption={hideOption}>
        <CompoundOption.Background>
            <CompoundOption.Container>
                <CompoundOption.Button onPress={handlePressLight}>라이트 모드</CompoundOption.Button>
                <CompoundOption.Divider />
                <CompoundOption.Button onPress={handlePressDark}>다크 모드</CompoundOption.Button>
                <CompoundOption.Divider />
                <CompoundOption.Button onPress={handlePressSystem}>시스템 기본값 모드</CompoundOption.Button>
            </CompoundOption.Container>
            <CompoundOption.Container>
            <CompoundOption.Button onPress={hideOption}>취소</CompoundOption.Button>
            </CompoundOption.Container>
        </CompoundOption.Background>
    </CompoundOption>
)
}

const styles = StyleSheet.create({});

export default DarkModeOption;