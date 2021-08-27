import React from "react"

export const ApiContext = React.createContext({});

export class ApiContextProvider extends React.Component {
    state = {
        url: 'http://localhost:3001',
        user: null,
        deviceTypes: null,
        workingCenter: null,
        centerRequests: null,
        masterRequests: null,
        userRequests: null,
        isToner: false,
    }

    getUserByAuth = async (username, password) => {
        return await fetch(`${this.state.url}/users/auth/${username}&&${password}`)
            .then(res => res.status === 200 ? res.json() : null)
            .then(res => this.setState({user: res}))
    }

    getUserById = async (id) => {
        return await fetch(`${this.state.url}/users/${id}`)
            .then(res => res.status === 200 ? res.json() : null)
    }

    getAllUserByCenterId = async (id) => {
        return await fetch(`${this.state.url}/users/centerId/${id}`)
            .then(res => res.status === 200 ? res.json() : null)
    }

    getAllDeviceTypes = async () => {
        return await fetch(`${this.state.url}/deviceTypes`)
            .then(res => res.json())
    }

    getAllCentersByName = async (skip, limit, sort, center) => {
        return await fetch(`${this.state.url}/centers/search/${skip}//${limit}//${sort}`, {
            method: 'post',
            body: JSON.stringify({
                payload: center
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
    }

    getCenterById = async (id) => {
        return await fetch(`${this.state.url}/centers/${id}`)
            .then(res => res.status === 200 ? res.json() : null)
    }

    getWorkingCenterById = async (id) => {
        return await fetch(`${this.state.url}/centers/${id}`)
            .then(res => res.status === 200 ? res.json() : null)
            .then(res => this.setState({workingCenter: res}))
    }

    getRequestListByCenterId = async () => {
        // alert(JSON.stringify(this.state.workingCenter))
        return await fetch(`${this.state.url}/requests/centerId/${this.state.workingCenter._id}`)
            .then(res => res.status === 200 ? res.json() : null)
            .then(res => this.setState({centerRequests: res}))
    }

    getRequestListByMasterId = async () => {
        // alert(JSON.stringify(this.state.workingCenter))
        return await fetch(`${this.state.url}/requests/masterId/${this.state.user._id}`)
            .then(res => res.status === 200 ? res.json() : null)
            .then(res => this.setState({masterRequests: res}))
    }

    getRequestListByUserId = async () => {
        // alert(JSON.stringify(this.state.workingCenter))
        return await fetch(`${this.state.url}/requests/userId/${this.state.user._id}`)
            .then(res => res.status === 200 ? res.json() : null)
            .then(res => this.setState({userRequests: res}))
    }

    updateUser = async () => {
        const  {user} = this.state
        return await fetch(`${this.state.url}/users/${user._id}`, {
            method: 'put',
            body: JSON.stringify({
                payload: user
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => res.json())
    }

    postUser = async (user) => {
        return await fetch(`${this.state.url}/users`, {
            method: 'post',
            body: JSON.stringify({
                payload: user
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => res.status === 200)
    }

    putUser = async (user) => {
        return await fetch(`${this.state.url}/users/${user._id}`, {
            method: 'put',
            body: JSON.stringify({
                payload: user
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => res.status === 200)
    }

    postCenter = async (center) => {
        return await fetch(`${this.state.url}/centers`, {
            method: 'post',
            body: JSON.stringify({
                payload: center
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => res.status === 200)
    }

    putCenter = async (center) => {
        return await fetch(`${this.state.url}/centers/${center._id}`, {
            method: 'put',
            body: JSON.stringify({
                payload: center
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => res.status === 200)
    }

    postRequest = async (request) => {
        return await fetch(`${this.state.url}/requests`, {
            method: 'post',
            body: JSON.stringify({
                payload: request
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => res.status === 200)
    }

    putRequest = async (id, request) => {
        return await fetch(`${this.state.url}/requests/${id}`, {
            method: 'put',
            body: JSON.stringify({
                payload: request
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => res.status === 200)
    }

    getCenterByOwnerId = async (id) => {
        return await fetch(`${this.state.url}/centers/owner/${this.state.user._id}`)
            .then(res => res.status === 200 ? res.json() : null)
    }

    setUser = (user) => {
        this.setState(prev => ({user: {...prev.user, ...user}}))
    }

    setToner = (isEnabled) => {
        this.setState({isToner: isEnabled})
    }

    signOut = () => {
        this.setState(prev => ({
            url: prev.url,
            deviceTypes: prev.deviceTypes,
            isToner: false,
            user: null,
        }))
    }

    render() {
        return (
            <ApiContext.Provider value={{
                ...this.state,
                getUserByAuth: this.getUserByAuth,
                getAllDeviceTypes: this.getAllDeviceTypes,
                getAllCentersByName: this.getAllCentersByName,
                getCenterById: this.getCenterById,
                getRequestListByCenterId: this.getRequestListByCenterId,
                getUserById: this.getUserById,
                getRequestListByMasterId: this.getRequestListByMasterId,
                getWorkingCenterById: this.getWorkingCenterById,
                updateUser: this.updateUser,
                setUser: this.setUser,
                setToner: this.setToner,
                signOut: this.signOut,
                postUser: this.postUser,
                postRequest: this.postRequest,
                getCenterByOwnerId: this.getCenterByOwnerId,
                postCenter: this.postCenter,
                putRequest: this.putRequest,
                getAllUserByCenterId: this.getAllUserByCenterId,
                getRequestListByUserId: this.getRequestListByUserId,
                putUser: this.putUser,
                putCenter: this.putCenter,
            }}>
                {this.props.children}
            </ApiContext.Provider>
        )
    }
}

export const withContext = (ChildComponent) => props => (
    <ApiContext.Consumer>
        {context => <ChildComponent {...props} context={context} />}
    </ApiContext.Consumer>
);
