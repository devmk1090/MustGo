import {PropsWithChildren, ReactNode, createContext, useContext} from 'react';
import {
  GestureResponderEvent,
  Modal,
  ModalProps,
  Pressable,
  PressableProps,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '@/constants';
import useThemeStorage from '@/hooks/useThemeStorage';
import { ThemeMode } from '@/types';

interface OptionContextValue {
  onClickOutSide?: (event: GestureResponderEvent) => void;
}

const OptionContext = createContext<OptionContextValue | undefined>(undefined);

interface OptionMainProps extends ModalProps {
  children: ReactNode;
  isVisible: boolean;
  hideOption: () => void;
  animationType?: ModalProps['animationType'];
}

function OptionMain({
  children,
  isVisible,
  hideOption,
  animationType = 'slide',
  ...props
}: OptionMainProps) {
  const onClickOutSide = (event: GestureResponderEvent) => {
    if (event.target === event.currentTarget) {
      hideOption();
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType={animationType}
      onRequestClose={hideOption}
      {...props}>
      <OptionContext.Provider value={{onClickOutSide}}>
        {children}
      </OptionContext.Provider>
    </Modal>
  );
}

//컴포넌트 사이에서 어떤 함수를 공유하려면 Context API 이용
function Background({children}: PropsWithChildren) {
  const {theme} = useThemeStorage();
  const styles = styling(theme);

  const optionContext = useContext(OptionContext);

  return (
    <SafeAreaView
      style={styles.optionBackground}
      onTouchEnd={optionContext?.onClickOutSide}>
      {children}
    </SafeAreaView>
  );
}

function Container({children}: PropsWithChildren) {
  const {theme} = useThemeStorage();
  const styles = styling(theme);

  return <View style={styles.optionContainer}>{children}</View>;
}

interface ButtonProps extends PressableProps {
  children: ReactNode;
  isDanger?: boolean;
  isChecked?: boolean;
}

function Button({children, isDanger = false, isChecked = false, ...props}: ButtonProps) {
  const { theme } = useThemeStorage()
  const styles = styling(theme)

  return (
    <Pressable
      style={({pressed}) => [
        pressed && styles.optionButtonPressed,
        styles.optionButton,
      ]}
      {...props}>
      <Text style={[styles.optionText, isDanger && styles.dangerText]}>
        {children}
      </Text>
      {isChecked && <Ionicons name={'checkmark'} color={colors[theme].BLUE_500} size={20} />}
    </Pressable>
  );
}

function Title({children}: PropsWithChildren) {
  const { theme } = useThemeStorage()
  const styles = styling(theme)

  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>{children}</Text>
    </View>
  );
}

function Divider() {
  const { theme } = useThemeStorage()
  const styles = styling(theme)

  return <View style={styles.border} />;
}

//각각의 컴포넌트들을 하나로 묶음
export const CompoundOption = Object.assign(OptionMain, {
  Container,
  Background,
  Button,
  Title,
  Divider,
});

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    optionBackground: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0 0 0 / 0.5)',
  },
  optionContainer: {
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: colors[theme].GRAY_100,
    overflow: 'hidden',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    gap: 5,
  },
  optionButtonPressed: {
    backgroundColor: colors[theme].GRAY_200,
  },
  optionText: {
    fontSize: 17,
    color: colors[theme].BLUE_500,
    fontWeight: '500',
  },
  dangerText: {
    color: colors[theme].RED_500,
  },
  titleContainer: {
    alignItems: 'center',
    padding: 15,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors[theme].BLACK,
  },
  border: {
    borderBottomColor: colors[theme].GRAY_200,
    borderBottomWidth: 1,
  },
});