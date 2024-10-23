import { getFormDataImages } from "@/utils/image";
import ImageCropPicker from "react-native-image-crop-picker";

function useImagePicker() {

    const handleChange = () => {
        ImageCropPicker.openPicker({
          mediaType: 'photo',
          multiple: true,
          includeBase64: true,
          maxFiles: 5,
          cropperChooseText: '완료',
          cropperCancelText: '취소',
        }).then(images => {
            const formData = getFormDataImages('images', images);
    
          })
      };
}

export default useImagePicker;