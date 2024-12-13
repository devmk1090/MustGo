import { createPost } from "@/api";
import queryClient from "@/api/queryClient";
import { queryKeys } from "@/constants";
import { Marker, UseMutationCustomOptions } from "@/types";
import { useMutation } from "@tanstack/react-query";

function useMutateCreatePost(mutationOptions?: UseMutationCustomOptions) {
    return useMutation({
        mutationFn: createPost,
        onSuccess: newPost => {

            //쿼리를 무효화해서 상태를 업데이트하는 방법(invalidateQueries)
            queryClient.invalidateQueries({
                queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
            })
            queryClient.invalidateQueries({
                queryKey: [queryKeys.POST, queryKeys.GET_CALENDAR_POSTS, new Date(newPost.date).getFullYear(), new Date(newPost.date).getMonth() + 1]
            })
            //서버에서 응답값을 내려주면 직접 캐시를 업데이트하는 방법
            queryClient.setQueryData<Marker[]>(
                [queryKeys.MARKER, queryKeys.GET_MARKERS],
                existingMarkers => {
                    const newMarker = {
                        id: newPost.id,
                        latitude: newPost.latitude,
                        longitude: newPost.longitude,
                        color: newPost.color,
                        score: newPost.score,
                    };

                    return existingMarkers
                        ? [...existingMarkers, newMarker]
                        : [newMarker];
                },
            );
        },
        ...mutationOptions
    });
}

export default useMutateCreatePost;