import { alerts } from "@/constants";
import { useEffect } from "react";
import { Alert, Linking, Platform } from "react-native";
import { check, Permission, PERMISSIONS, request, RESULTS } from "react-native-permissions";

type PermissionType = 'LOCATION' | 'PHOTO';

type PermissionOS = {
    [key in PermissionType]: Permission;
};

const androidPermissons: PermissionOS = {
    LOCATION: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    PHOTO: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
};

const iosPermissons: PermissionOS = {
    LOCATION: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    PHOTO: PERMISSIONS.IOS.PHOTO_LIBRARY,
};

function usePermission(type: PermissionType) {
    useEffect(() => {
        (async () => {
            const isAndroid = Platform.OS === 'android';
            const permissionOS = isAndroid ? androidPermissons : iosPermissons;
            const checked = await check(permissionOS[type]);

            const showPermissonAlert = () => {
                Alert.alert(
                    // type에 따라 메세지 출력
                    alerts[`${type}_PERMISSION`].TITLE,
                    alerts[`${type}_PERMISSION`].DESCRIPTION,
                    [
                        {
                            text: '설정하기',
                            onPress: () => Linking.openSettings(), // 권한 설정 오픈
                        },
                        {
                            text: '취소',
                            style: 'cancel',
                        },
                    ],
                );
            };

            switch (checked) {
                case RESULTS.DENIED: // Android에서는 거부하면 DENIED 상태가 됨
                    if (isAndroid) {
                        showPermissonAlert();
                        return;
                    }

                    await request(permissionOS[type]);
                    break;
                case RESULTS.BLOCKED:
                case RESULTS.LIMITED:
                    showPermissonAlert();
                    break;
                default:
                    break;
            }
        })();
    }, []);
}

export default usePermission;