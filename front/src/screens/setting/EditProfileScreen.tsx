import InputField from '@/components/common/InputField';
import { colors } from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import useForm from '@/hooks/useForm';
import useImagePicker from '@/hooks/useImagePicker';
import useModal from '@/hooks/useModal';
import { SettingStackParamList } from '@/navigations/stack/SettingStackNavigator';
import { validateEditProfile } from '@/utils';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'react-native-reanimated/lib/typescript/Animated';
import Ionicons from 'react-native-vector-icons/Ionicons';

type EditProfileScreenProps = StackScreenProps<SettingStackParamList>;

const EditProfileScreen = ({ navigation }: EditProfileScreenProps) => {
    const { getProfileQuery, profileMutation } = useAuth();
    const { nickname, imageUri, kakaoImageUri } = getProfileQuery.data || {};

    const imageOption = useModal();
    const imagePicker = useImagePicker({
        initialImages: imageUri ? [{ uri: imageUri }] : [],
        mode: 'single',
    });

    const editProfile = useForm({
        initialValue: { nickname: nickname ?? '' },
        validate: validateEditProfile,
    });

    const handlePressImage = () => {
      };

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Pressable
                    style={[styles.imageContainer, styles.emptyImageContainer]}
                    onPress={handlePressImage}>
                    {imagePicker.imageUris.length === 0 && !kakaoImageUri && (
                        <Ionicons name="camera-outline" size={30} color={colors.GRAY_500} />
                    )}
                    {imagePicker.imageUris.length === 0 && kakaoImageUri && (
                        <>
                            <Image
                                source={{
                                    uri: `${Platform.OS === 'ios'
                                        ? 'http://localhost:3030/'
                                        : 'http://10.0.2.2:3030/'
                                        }${kakaoImageUri}`,
                                }}
                                style={styles.image}
                                resizeMode="cover"
                            />
                        </>
                    )}
                    {imagePicker.imageUris.length > 0 && (
                        <>
                            <Image
                                source={{
                                    uri: `${Platform.OS === 'ios'
                                        ? 'http://localhost:3030/'
                                        : 'http://10.0.2.2:3030/'
                                        }${imagePicker.imageUris[0]?.uri}`,
                                }}
                                style={styles.image}
                                resizeMode="cover"
                            />
                        </>
                    )}
                </Pressable>
            </View>
            <InputField
                {...editProfile.getTextInputProps('nickname')}
                error={editProfile.errors.nickname}
                touched={editProfile.touched.nickname}
                placeholder="닉네임을 입력해주세요."
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    profileContainer: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 40,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
    },
    imageContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    emptyImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.GRAY_200,
        borderRadius: 50,
        borderWidth: 1,
    },
    deleteAccountContainer: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        right: 20,
        bottom: 70,
        backgroundColor: colors.GRAY_100,
        borderRadius: 10,
        padding: 10,
    },
    deleteAccountText: {
        color: colors.RED_500,
        fontSize: 15,
    },
});

export default EditProfileScreen;