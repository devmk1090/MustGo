import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';

import ImageCarousel from '@/components/common/ImageCarousel';
import {feedNavigations} from '@/constants';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import useDetailStore from '@/store/useDetailPostStore';

type ImageZoomScreenProps = StackScreenProps<
  FeedStackParamList,
  typeof feedNavigations.IMAGE_ZOOM
>;

function ImageZoomScreen({route}: ImageZoomScreenProps) {
  const {index} = route.params; //어떤 이미지를 선택했는지
  const {detailPost} = useDetailStore();

  return (
    <ImageCarousel images={detailPost?.images ?? []} pressedIndex={index} />
  );
}

export default ImageZoomScreen;