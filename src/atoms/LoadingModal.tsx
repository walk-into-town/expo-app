import React from 'react'
import { Image } from 'react-native-elements';
import Modal from 'react-native-modal';

const loadingGif = [
    require('../../assets/loading/america.gif'),
    require('../../assets/loading/daft.gif'),
    require('../../assets/loading/fiesta.gif'),
    require('../../assets/loading/j5.gif'),
    require('../../assets/loading/mexinyan.gif'),
    require('../../assets/loading/nyancoin.gif'),
    require('../../assets/loading/paddy.gif'),
    require('../../assets/loading/retro.gif'),
    require('../../assets/loading/technyancolor.gif'),
    require('../../assets/loading/zombie.gif'),
    require('../../assets/loading/balloon.gif'),
    require('../../assets/loading/dub.gif'),
    require('../../assets/loading/jamaicnyan.gif'),
    require('../../assets/loading/mummy.gif'),
    require('../../assets/loading/nyandoge.gif'),
    require('../../assets/loading/pikanyan.gif'),
    require('../../assets/loading/sad.gif'),
    require('../../assets/loading/vday.gif'),
    require('../../assets/loading/bday.gif'),
    require('../../assets/loading/easter.gif'),
    require('../../assets/loading/gb.gif'),
    require('../../assets/loading/jazz.gif'),
    require('../../assets/loading/nyaninja.gif'),
    require('../../assets/loading/pirate.gif'),
    require('../../assets/loading/star.gif'),
    require('../../assets/loading/wtf.gif'),
    require('../../assets/loading/breakfast.gif'),
    require('../../assets/loading/elevator.gif'),
    require('../../assets/loading/grumpy.gif'),
    require('../../assets/loading/melon.gif'),
    require('../../assets/loading/nyan-cat-1.gif'),
    require('../../assets/loading/original.gif'),
    require('../../assets/loading/pumpkin.gif'),
    require('../../assets/loading/tacnayn.gif'),
    require('../../assets/loading/xmas.gif')
]

interface Props {
    loading: boolean;
}
const LoadingModal = ({ loading }: Props) => {
    const gifUri = loadingGif[Math.floor(Math.random() * loadingGif.length)]

    return (
        <Modal
            isVisible={loading}
            style={{ justifyContent: "center", alignItems: "center" }}
            animationIn={'tada'}
            animationInTiming={1000}
            animationOut={'slideOutRight'}
            animationOutTiming={1000}
            >
                <Image
                    source={gifUri}
                    style={{ width: "40%", aspectRatio: 1, resizeMode: "contain" }} />
        </Modal>
    )
}

export default LoadingModal
