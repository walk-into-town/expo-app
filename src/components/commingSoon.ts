import { DefaultAlert } from '../atoms'

const commingSoon = () => {
    DefaultAlert({
        title: "아직 제작 중에 있답니다",
        subTitle: "comming soon",
        btColor: "cancel"
    })
}

export default commingSoon
