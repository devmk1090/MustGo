import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { Platform, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';

import useAuth from "@/hooks/queries/useAuth";
import { colors, mainNavigations, settingNavigations } from '@/constants';
import { ThemeMode } from "@/types";
import useThemeStorage from "@/hooks/useThemeStorage";

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { theme } = useThemeStorage()
  const styles = styling(theme)

  const { getProfileQuery } = useAuth();
  const { email, nickname, imageUri, kakaoImageUri } = getProfileQuery.data || {};

  const handlePressSetting = () => {
    props.navigation.navigate(mainNavigations.SETTING, {
      screen: settingNavigations.SETTING_HOME,
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.userInfoContainer}>
          <Pressable style={styles.userImageContainer}>
            {imageUri === null && kakaoImageUri === null && (
              <FastImage
                source={require('@/assets/user-default.png')}
                style={styles.userImage}
                resizeMode={FastImage.resizeMode.cover}
              />
            )}
            {imageUri === null && !!kakaoImageUri && (
              <FastImage
                source={{
                  uri: `${Platform.OS === 'ios'
                      ? 'http://localhost:3030/'
                      : 'http://10.0.2.2:3030/'
                    }${kakaoImageUri}`,
                }}
                style={styles.userImage}
              />
            )}
            {imageUri !== null && (
              <FastImage
                source={{
                  uri: `${Platform.OS === 'ios'
                      ? 'http://localhost:3030/'
                      : 'http://10.0.2.2:3030/'
                    }${imageUri}`,
                }}
                style={styles.userImage}
              />
            )}
          </Pressable>

          <Text style={styles.nameText}>{nickname ?? email}</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={styles.bottomContainer}>
        <Pressable style={styles.bottomMenu} onPress={handlePressSetting}>
          <MaterialIcons name={'settings'} color={colors[theme].GRAY_700} size={18} />
          <Text style={styles.bottomMenuText}>설정</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      backgroundColor: colors[theme].WHITE,
    },
    nameText: {
      color: colors[theme].BLACK,
    },
    userInfoContainer: {
      alignItems: 'center',
      marginTop: 15,
      marginBottom: 30,
      marginHorizontal: 15,
    },
    userImageContainer: {
      width: 70,
      height: 70,
      borderRadius: 35,
      marginBottom: 10,
    },
    userImage: {
      width: '100%',
      height: '100%',
      borderRadius: 35,
    },
    bottomContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderTopWidth: 1,
      borderTopColor: colors[theme].GRAY_200,
    },
    bottomMenu: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    bottomMenuText: {
      fontWeight: '600',
      fontSize: 15,
      color: colors[theme].GRAY_700,
    },
  });

export default CustomDrawerContent;