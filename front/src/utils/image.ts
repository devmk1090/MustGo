import type { Image } from 'react-native-image-crop-picker';

function getFormDataImages(key: string = 'images', images: Image[]) {
    
    const formData = new FormData(); //이미지 변환

    images.forEach(({ path, mime }) => {
        const file = {
            uri: path,
            type: mime,
            name: path.split('/').pop(),
        };

        formData.append(key, file);
    });

    return formData;
}

export { getFormDataImages };