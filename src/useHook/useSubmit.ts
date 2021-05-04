import React, { useEffect, useState } from 'react'

interface Props {
    submitFunc: () => void
}
type UseSubmit = (props: Props) => {
    isSubmit: boolean,
    onSubmit: () => void
}
const useSubmit: UseSubmit = (props) => {
    // submit할 때 perventGoBack를 방지하기 위한 코드 
    // 더 좋은 방법이 있는지 고민 좀 해봐야겠다..
    const [isSubmit, setIsSubmit] = useState(false);
    useEffect(() => {
        if (isSubmit) {
            props.submitFunc();
            setIsSubmit(false);
        }
    }, [isSubmit])

    const onSubmit = () => setIsSubmit(true);
    return { isSubmit, onSubmit };
}

export default useSubmit;