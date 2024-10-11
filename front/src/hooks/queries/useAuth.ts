import { useMutation, useQuery } from "@tanstack/react-query";
import { getAccessToken, getProfile, logout, postLogin, postSignup, ResponseProfile } from "@/api/auth";
import { UseMutationCustomOptions, UseQueryCustomOptions } from "@/types/common";
import { removeEncryptStorage, setEncryptStorage } from "@/utils";
import { removeHeader, setHeader } from "@/utils/header";
import { useEffect } from "react";
import queryClient from "@/api/queryClient";
import { numbers, queryKeys, storageKeys } from "@/constants";

function useSignup(mutationOptions?: UseMutationCustomOptions) {
    return useMutation({
        mutationFn: postSignup,
        ...mutationOptions
    });
}

function useLogin(mutationOptions?: UseMutationCustomOptions) {
    return useMutation({
        mutationFn: postLogin,
        onSuccess: ({ accessToken, refreshToken }) => {
            setEncryptStorage('refreshToken', refreshToken)
            setHeader('Authorization', `Bearer ${accessToken}`);
        },
        onSettled: () => {
            queryClient.refetchQueries({
                queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
            });
            queryClient.invalidateQueries({
                queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
            });
        },
        ...mutationOptions,
    });
}

function useGetRefreshToken() {
    const { isSuccess, data, isError } = useQuery({ //5버전 부터는 객체를 만들어서 반환받는 값을 이용해서 처리
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
        queryFn: getAccessToken,
        staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
        refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME, // 시간에 따라 리패치하는 옵션
        refetchOnReconnect: true, // 리패치 true/false
        refetchIntervalInBackground: true, // 다시 연결되거나 백그라운드에서 연결되도록
    })

    useEffect(() => {
        if (isSuccess) {
            setHeader('Authorization', `Bearer ${data.accessToken}`);
            setEncryptStorage(storageKeys.REFRESH_TOKEN, data.refreshToken);
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            removeHeader('Authorization');
            removeEncryptStorage(storageKeys.REFRESH_TOKEN);
        }
    }, [isError]);

    return { isSuccess, isError };
}

function useGetProfile(queryOptions?: UseQueryCustomOptions<ResponseProfile>) {
    return useQuery({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
        queryFn: getProfile,
        ...queryOptions,
    });
}

function useLogout(mutationOptions?: UseMutationCustomOptions) {
    return useMutation({
      mutationFn: logout,
      onSuccess: () => {
        removeHeader('Authorization');
        removeEncryptStorage(storageKeys.REFRESH_TOKEN);
      },
      onSettled: () => {
        queryClient.invalidateQueries({queryKey: [queryKeys.AUTH]});
      },
      ...mutationOptions,
    });
  }

function useAuth() {
    const signupMutation = useSignup();
    const refreshTokenQuery = useGetRefreshToken();
    const getProfileQuery = useGetProfile({
        enabled: refreshTokenQuery.isSuccess, // refreshToken이 성공한다면
    });
    const isLogin = getProfileQuery.isSuccess;
    const loginMutation = useLogin();
    const logoutMutation = useLogout();

    return {
        signupMutation,
        loginMutation,
        isLogin,
        getProfileQuery,
        logoutMutation,
    };
}

export default useAuth;