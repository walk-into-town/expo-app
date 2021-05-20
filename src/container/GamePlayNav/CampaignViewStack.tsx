import React from 'react'
import { Container } from '../../atoms/elements/layouts';
import CampaignView from '../../components/GameStack/CampaignView';
import { useAuthContext } from '../../useHook';

interface Props {

}


const CampaignViewStack = (props: Props) => {
    //const { auth: { userToken } } = useAuthContext();

    return (
        <Container>
            <CampaignView />
        </Container>

    )


}

export default CampaignViewStack;