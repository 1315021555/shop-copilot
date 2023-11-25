export async function imageUrlToBase64(imageUrl: string): any {
    try {
        const response = await fetch(imageUrl);
        if (!response.ok) {
        throw new Error('Network response was not ok.');
        }

        const blob = await response.blob();

        return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
            resolve(reader.result);
            } else {
            reject(new Error('Failed to convert the image.'));
            }
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export const fileToBase64 = function(file: File):any {
/*     return new Promise(function (resolve, reject){
        const reader = new FileReader();

        // 读取文件完成时的回调
        reader.onloadend = function () {
        if (typeof reader.result === 'string') {
            resolve(reader.result);
        } else {
            reject(new Error('Failed to convert the image.'));
        }
        };

        // 读取文件出错时的回调
        reader.onerror = reject;
        // 读取图片文件并转为Base64
        reader.readAsDataURL(file);
    }); */
}
