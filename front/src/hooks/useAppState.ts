import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";

function useAppState() {
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    const [isComeback, setIsComeback] = useState(false);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (
                // 현재 앱의 상태가 비활성 or 백그라운드였다가
                appState.current.match(/inactive|background/) &&
                // 그 다음 active가 되었다면
                nextAppState === 'active'
            ) {
                setIsComeback(true)
            }

            // 현재 앱의 상태가 활성화되었다가 백그라운드로 갔다면
            if (appState.current.match(/active/) && nextAppState === 'background') {
                setIsComeback(false);
            }
            appState.current = nextAppState;
            setAppStateVisible(appState.current);
        });

        return () => {
            subscription.remove();
        };
    }, []);

    return { isComeback, appStateVisible };
}

export default useAppState