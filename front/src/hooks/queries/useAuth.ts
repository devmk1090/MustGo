import { MutationFunction, useMutation, useQuery } from "@tanstack/react-query";
import { deleteAccount, editCategory, editProfile, getAccessToken, getProfile, kakaoLogin, logout, postLogin, postSignup, ResponseProfile, ResponseToken } from "@/api/auth";
import { UseMutationCustomOptions, UseQueryCustomOptions } from "@/types/common";
import { removeEncryptStorage, setEncryptStorage } from "@/utils";
import { removeHeader, setHeader } from "@/utils/header";
import { useEffect } from "react";
import queryClient from "@/api/queryClient";
import { numbers, queryKeys, storageKeys } from "@/constants";
import { Category, Profile } from "@/types";

function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    throwOnError: error => Number(error.response?.status) >= 500,
    ...mutationOptions
  });
}

function useLogin<T>(
  loginAPI: MutationFunction<ResponseToken, T>,
  mutationOptions?: UseMutationCustomOptions,
) {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: ({ accessToken, refreshToken }) => {
      setHeader('Authorization', `Bearer ${accessToken}`);
      setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);
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

function useEmailLogin(mutationOptions?: UseMutationCustomOptions) {
  return useLogin(postLogin, mutationOptions);
}

function useKakaoLogin(mutationOptions?: UseMutationCustomOptions) {
  return useLogin(kakaoLogin, mutationOptions);
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

type ResponseSelectProfile = {categories: Category} & Profile;

const transformProfileCategory = (data: ResponseProfile): ResponseSelectProfile => {
  const {BLUE, GREEN, PURPLE, RED, YELLOW, ...rest} = data;
  const categories = {BLUE, GREEN, PURPLE, RED, YELLOW};

  return {categories, ...rest};
};

function useGetProfile(queryOptions?: UseQueryCustomOptions<ResponseProfile, ResponseSelectProfile>) {
  return useQuery({
    queryFn: getProfile,
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    select: transformProfileCategory,
    ...queryOptions,
  });
}

function useMutateCategory(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: editCategory,
    onSuccess: (newProfile) => {
      queryClient.setQueryData(
        [queryKeys.AUTH, queryKeys.GET_PROFILE],
        newProfile,
      );
    },
    ...mutationOptions,
  });
}

function useUpdateProfile(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: editProfile,
    onSuccess: newProfile => {
      queryClient.setQueryData(
        [queryKeys.AUTH, queryKeys.GET_PROFILE],
        newProfile,
      );
    },
    ...mutationOptions,
  });
}

function useLogout(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeHeader('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
      queryClient.resetQueries({ queryKey: [queryKeys.AUTH] })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.AUTH] });
    },
    ...mutationOptions,
  });
}

function useMutateDeleteAccount(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: deleteAccount,
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
  const loginMutation = useEmailLogin();
  const kakaoLoginMutation = useKakaoLogin();
  const logoutMutation = useLogout();
  const profileMutation = useUpdateProfile();
  const deleteAccountMutation = useMutateDeleteAccount({
    onSuccess: () => logoutMutation.mutate(null)
  });
  const categoryMutation = useMutateCategory();

  return {
    signupMutation,
    loginMutation,
    isLogin,
    getProfileQuery,
    logoutMutation,
    kakaoLoginMutation,
    profileMutation,
    deleteAccountMutation,
    categoryMutation,
  };
}

export default useAuth;