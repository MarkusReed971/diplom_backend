import React, {Fragment, useState} from "react"
import {Link} from "react-router-dom";
import styles from '../css/Header.module.css'
import logo_icon from '../images/logo_icon.svg'
import call from '../images/call.svg'
import user_icon from '../images/user_icon.svg'
import {useLocation} from 'react-router-dom'
import AuthForm from "./AuthForm";
import UserCard from "./UserCard";
import {withContext} from "./Context";

const Header = ({context}) => {
    const [authForm, setAuthForm] = useState(false)

    let user = context.user

    const clickHandler = (event) => {
        event.preventDefault()
        context.setToner(true)
        setAuthForm(true)
    }

    const location = useLocation()

    const StyledLink = (title, to, disabled) => {
       if (location.pathname === to) {
           return (
               <Link
                   className={[styles.link, styles.selected].join(' ')}
                   to={to}>{title}
               </Link>
           )
       } else if (disabled) {
           return (
               <p className={[styles.link, styles.disabled].join(' ')}>{title}</p>
           )
       } else {
           return (
               <Link
                   className={styles.link}
                   to={to}>{title}
               </Link>
           )
       }
    }

    const NavLinkList = (user) => {
        let isMaster = false
        let isAdmin = false
        if (user) {
            isMaster = user.type.indexOf('master') !== -1
            isAdmin = user.type.indexOf('admin') !== -1
        }
        return (
            <Fragment>
                {StyledLink('Поиск', '/search', false)}
                {StyledLink('Работа', '/working', !isMaster)}
                {StyledLink('Управление', '/management', !isAdmin)}
            </Fragment>
        )
    }

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <img src={logo_icon}  alt={'logo'}/>
                <span>Fix_it</span>
            </div>
            <nav className={styles.navbar}>
                {NavLinkList(user)}
            </nav>
            <div className={styles.contacts}>
                <img src={call} alt={'call'}/>
                <p>+7 (917) 555 88 33</p>
            </div>
            {!user ?
                <div className={styles.auth}>
                    <img src={user_icon} alt={'user_icon'}/>
                    <p onClick={clickHandler}>Вход / Регистрация</p>
                </div> :
                <UserCard user={user} chatEnabled={false} isHeader={true} />
            }
            {authForm ? <AuthForm exitCallBack={() => {setAuthForm(false)}} /> : null}
        </header>
    )
}

export default withContext(Header)
