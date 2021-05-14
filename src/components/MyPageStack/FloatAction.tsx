import React, { useState } from 'react'
import { SpeedDial } from 'react-native-elements'

interface Props {

}

const FloatAction = (props: Props) => {
    const [open, setOpen] = useState(false)
    return (
        <SpeedDial
            isOpen={open}
            icon={{ name: 'edit', color: "#FFF" }}
            openIcon={{ name: 'close', color: "#FFF" }}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
        >
            <SpeedDial.Action
                icon={{ name: "edit", color: "#FFF" }}
                title="프로필변경"
                onPress={() => console.log("프로필")}
            />
            <SpeedDial.Action
                icon={{ name: "edit", color: "#FFF" }}
                title="프로필변경"
                onPress={() => console.log("프로필")}
            />

        </SpeedDial>
    )
}

export default FloatAction
