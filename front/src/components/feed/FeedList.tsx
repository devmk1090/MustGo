import useGetInfinitePosts from "@/hooks/queries/useGetInfinitePosts";
import { FlatList, StyleSheet, View } from "react-native";
import FeedItem from "./FeedItem";
import { useState } from "react";

function FeedList() {
    const {
      data: posts,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      refetch,
    } = useGetInfinitePosts();
    const [isRefreshing, setIsRefreshing] = useState(false);
  
    const handleRefresh = async () => {
      setIsRefreshing(true);
      await refetch();
      setIsRefreshing(false);
    };
  
    const handleEndReached = () => { //스크롤이 페이지의 끝에 닿았을때
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };
  
    return (
      <FlatList
        data={posts?.pages.flat()}
        renderItem={({item}) => <FeedItem post={item} />}
        keyExtractor={item => String(item.id)}
        numColumns={2}
        contentContainerStyle={styles.contentContainer}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5} //완전히 닿기 전에 데이터를 가져오는 설정
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        scrollIndicatorInsets={{right: 1}} //스크롤바 고정(ios에서 간혹 버그있음)
        indicatorStyle="black" //다크 모드: white
      />
    );
  }
  
  const styles = StyleSheet.create({
    contentContainer: {
      padding: 15,
    },
  });
  
  export default FeedList;