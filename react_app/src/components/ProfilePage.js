import React, {useEffect, useState} from "react"
import styles from '../css/Profile.module.css'
import {withContext} from "./Context";
import UserFullCard from "./UserFullCard";
import Button from "./Button";
import CenterCard from "./CenterCard";
import CenterForm from "./CenterForm";
import Request from "./Request";
import VacancyCard from "./VacancyCard";

const ProfilePage = ({context}) => {
    const [createCenterForm, setCreateCenterForm] = useState(false)
    const [center, setCenter] = useState(null)
    const [selectedRequest, setSelectedRequest] = useState(null)

    useEffect(() => {
        context.getCenterByOwnerId(context.user._id).then(res => setCenter(res))
        context.getRequestListByUserId()
    })

    const clickHandler = () => {
        context.setToner(true)
        setCreateCenterForm(true)
    }

    const requestHandler = async (selectedRequest) => {
        // const selectedMaster = selectedRequest.masterId ?
        //     await context.getUserById(selectedRequest.masterId) :
        //     null

        setSelectedRequest(selectedRequest)
        // this.setState({
        //     selectedRequest,
        //     selectedUser: await context.getUserById(selectedRequest.userId),
        //     selectedMaster,
        // })
    }


    const Requests = (requests) => requests.map(request =>
        <Request
            request={request}
            selectedId={selectedRequest ? selectedRequest._id : -1}
            callBack={requestHandler}
            forClient={true}
        />)

    return (
        <div className={styles.profilePage}>
           <div className={styles.profile}>
               <UserFullCard user={context.user} withId={true} withChange={true} />
               <h1>Организация</h1>

               {center ?
                   <CenterCard center={center} /> :
                   <Button
                       title={'Зарегистрировать серисный центр'}
                       event={clickHandler}
                   />
               }

               {context.user.vacancy.length > 0 ?
                   <div>
                       <h1>Вакансии</h1>
                       {context.user.vacancy.map(vac => <VacancyCard vacancy={vac} />)}
                   </div>
                    : null
               }
           </div>
           <div className={styles.content}>
               {context.userRequests ? Requests(context.userRequests) : null}
           </div>
            {createCenterForm ? <CenterForm exitCallBack={() => setCreateCenterForm(false)} /> : null}
        </div>
    )
}

export default withContext(ProfilePage)
