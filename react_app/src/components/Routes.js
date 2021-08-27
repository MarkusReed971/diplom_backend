import React from 'react'
import {Redirect, Route, Switch} from "react-router-dom";
import SearchPage from "./SearchPage";
import WorkingPage from "./WorkingPage";
import ManagementPage from "./ManagementPage";
import CenterPage from "./CenterPage";
import ProfilePage from "./ProfilePage";

export const useRoutes = user => {
    if (user) {
        return (
            <Switch>
                <Route path={'/search'} exact>
                    <SearchPage />
                </Route>
                <Route path={'/center/:id'}>
                    <CenterPage />
                </Route>
                <Route path={'/profile'}>
                    <ProfilePage />
                </Route>
                {user.type.indexOf('admin') !== -1 || user.type.indexOf('master') !== -1 ?
                    <Route path={'/working'}>
                        <WorkingPage />
                    </Route> : null
                }
                {user.type.indexOf('owner') !== -1 ?
                    <Route path={'/management'}>
                        <ManagementPage />
                    </Route> : null
                }
                <Redirect to={'/search'} />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path={'/search'} exact>
                <SearchPage />
            </Route>
            <Route path={'/center/:id'}>
                <CenterPage />
            </Route>
            <Redirect to={'/search'} />
        </Switch>
    )
}
