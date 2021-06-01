import { Campaign, SearchCampaign } from "@types";


// FormData imgs
interface OBJ { [key: string]: string }
export const jsonstringToFormdata = (obj: OBJ) => {
    const formData = new FormData();
    Object.keys(obj).forEach(key => {
        formData.append(key, obj[key])
    });
    return formData;
}
export const formAppendImgs = (formData: FormData, imgs: string[], option?: { formName: string }) => {
    // https://stackoverflow.com/questions/42521679/how-can-i-upload-a-photo-with-expo
    // https://github.com/g6ling/React-Native-Tips/issues/1
    imgs.forEach(img => {
        if (img === "") return;

        const fileName = img.split('/').pop();
        const fileType = img.split('.').pop();

        const file = JSON.parse(JSON.stringify({
            uri: img,
            name: fileName,
            type: `image/${fileType}`
        }))
        formData.append(option?.formName || "imgs", file);
    })
}
export const formAppendImg = (formData: FormData, img: string, option?: { formName: string }) => {
    if (img === "") return;

    const fileName = img.split('/').pop();
    const fileType = img.split('.').pop();

    const file = JSON.parse(JSON.stringify({
        uri: img,
        name: fileName,
        type: `image/${fileType}`
    }))
    formData.append(option?.formName || "img", file);
}


// demmy
export const getDummySearchCampaign = (id: string): SearchCampaign => {
    return {
        id,
        ownner: "",
        name: "",
        imgs: [],
        description: "",
        updateTime: "",
        region: "",
        pinpoints: [],
        coupons: [],
        comments: []
    }
}