import React from "react"
import styles from '../css/CenterForm.module.css'
import Button from "./Button";
import {withContext} from "./Context";
import {ReactComponent as Svg} from "../images/cancel.svg";
import Select from 'react-select'

class CenterForm extends React.Component {
    state = {
        deviceTypes: [],
        image: '',
        center: {
            name: '',
            description: '',
            address: {
                city: '',
                district: '',
                street: '',
                house: '',
            },
            phone: '',
            mail: '',
            date: '',
            status: false,
            inn: '',
            schedule: [
                {
                  day: 0,
                  startTime: '',
                  endTime: '',
                  isHoliday: false,
                },
                {
                    day: 1,
                    startTime: '',
                    endTime: '',
                    isHoliday: false,
                },
                {
                    day: 2,
                    startTime: '',
                    endTime: '',
                    isHoliday: false,
                },
                {
                    day: 3,
                    startTime: '',
                    endTime: '',
                    isHoliday: false,
                },
                {
                    day: 4,
                    startTime: '',
                    endTime: '',
                    isHoliday: false,
                },
                {
                    day: 5,
                    startTime: '',
                    endTime: '',
                    isHoliday: false,
                },
                {
                    day: 6,
                    startTime: '',
                    endTime: '',
                    isHoliday: false,
                },
            ],
            images: [],
            deviceTypes: [],
            deviceCompanies: [],
        }
    }

    componentDidMount() {
        this.props.context.getAllDeviceTypes().then(deviceTypes => {
            this.setState({deviceTypes})
        })
    }

    companyOptions = list => list.map(el => {
        const companies = el.companies.map(comp => {
            return {
                value: comp._id,
                label: comp.title,
            }
        })
        return {
            label: el.title,
            options: companies
        }
    })

    typeOptions = list => list.map(el => {
        return {
            value: el._id,
            label: el.title,
            companies: el.companies
        }
    })

    validateCenter = async (context) => {
        const {center} = this.state
        const {exitCallBack} = this.props

        center.dateInApp = new Date()
        center.ownerId = context.user._id
        center.rating = 5

        const noExist = await context.postCenter(center)
        if (noExist) {
            exitCallBack()
            context.setToner(false)
        } else {
            alert('Такой сервисный центр уже существует!')
        }

    }

    render() {
        return (
            <div className={'form ' + styles.centerForm}>
                <Svg
                    onClick={() => {
                        this.props.context.setToner(false)
                        this.props.exitCallBack()
                    }}
                    fill={'#999'}
                    className={'svg'}
                />
                <h1>Регистрация сервисного центра</h1>
                {/*<p>{JSON.stringify(this.state.center.schedule)}</p>*/}

                <div className={styles.flexCenter}>
                    <div className={styles.scroll}>
                        <div className={styles.column}>
                            <input
                                name={'name'}
                                type={'text'}
                                className={'input'}
                                placeholder={'Название'}
                                value={this.state.center.name}
                                onChange={event =>
                                    this.setState(prev =>
                                        ({
                                            center: {
                                                ...prev.center,
                                                name: event.target.value
                                            }
                                        }))
                                }
                            />
                            <input
                                name={'inn'}
                                type={'text'}
                                className={'input'}
                                placeholder={'Инн'}
                                value={this.state.center.inn}
                                onChange={event =>
                                    this.setState(prev =>
                                        ({
                                            center: {
                                                ...prev.center,
                                                inn: event.target.value
                                            }
                                        }))
                                }
                            />
                            <input
                                name={'city'}
                                type={'text'}
                                className={'input'}
                                placeholder={'Город'}
                                value={this.state.center.address.city}
                                onChange={event =>
                                    this.setState(prev =>
                                        ({
                                            center: {
                                                ...prev.center,
                                                address: {
                                                    ...prev.center.address,
                                                    city: event.target.value
                                                }
                                            }
                                        }))
                                }
                            />
                            <input
                                name={'district'}
                                type={'text'}
                                className={'input'}
                                placeholder={'Район'}
                                value={this.state.center.address.district}
                                onChange={event =>
                                    this.setState(prev =>
                                        ({
                                            center: {
                                                ...prev.center,
                                                address: {
                                                    ...prev.center.address,
                                                    district: event.target.value
                                                }
                                            }
                                        }))
                                }
                            />
                            <input
                                name={'street'}
                                type={'text'}
                                className={'input'}
                                placeholder={'Улица'}
                                value={this.state.center.address.street}
                                onChange={event =>
                                    this.setState(prev =>
                                        ({
                                            center: {
                                                ...prev.center,
                                                address: {
                                                    ...prev.center.address,
                                                    street: event.target.value
                                                }
                                            }
                                        }))
                                }
                            />
                            <input
                                name={'house'}
                                type={'text'}
                                className={'input'}
                                placeholder={'Дом'}
                                value={this.state.center.address.house}
                                onChange={event =>
                                    this.setState(prev =>
                                        ({
                                            center: {
                                                ...prev.center,
                                                address: {
                                                    ...prev.center.address,
                                                    house: event.target.value
                                                }
                                            }
                                        }))
                                }
                            />
                            <input
                                name={'date'}
                                type={'date'}
                                className={'input'}
                                placeholder={'Дата регистрации'}
                                value={this.state.center.date}
                                onChange={event =>
                                    this.setState(prev =>
                                        ({
                                            center: {
                                                ...prev.center,
                                                date: event.target.value
                                            }
                                        }))
                                }
                            />
                            <input
                                name={'phone'}
                                type={'text'}
                                className={'input'}
                                placeholder={'Телефон'}
                                value={this.state.center.phone}
                                onChange={event =>
                                    this.setState(prev =>
                                        ({
                                            center: {
                                                ...prev.center,
                                                phone: event.target.value
                                            }
                                        }))
                                }
                            />
                            <input
                                name={'mail'}
                                type={'text'}
                                className={'input'}
                                placeholder={'Электронная почта'}
                                value={this.state.center.mail}
                                onChange={event =>
                                    this.setState(prev =>
                                        ({
                                            center: {
                                                ...prev.center,
                                                mail: event.target.value
                                            }
                                        }))
                                }
                            />
                            <textarea
                                name={'description'}
                                className={'input ' + styles.descInput}
                                placeholder={'Описание'}
                                value={this.state.center.description}
                                onChange={event =>
                                    this.setState(prev =>
                                        ({
                                            center: {
                                                ...prev.center,
                                                description: event.target.value
                                            }
                                        })
                                    )}
                            />
                            <label className={styles.check}>
                                <input
                                    name={'status'}
                                    type={'checkbox'}
                                    checked={this.state.center.status}
                                    onChange={() => this.setState(prevState =>
                                        ({center: {...prevState.center, status: !prevState.center.status}}))}
                                />
                                <p>Авторизован производителем</p>
                            </label>

                        </div>
                        <div className={styles.column}>
                            <div className={styles.schedule}>
                                <div className={styles.scheduleLeft}>
                                    <p style={{marginBottom: 15}}>Рассписание</p>
                                    <div className={styles.scheduleItem}>
                                        <p>Понедельник</p>
                                        <div>
                                            <input
                                                name={'ponStart'}
                                                type={'text'}
                                                className={'input ' + styles.timeInput}
                                                placeholder={'С'}
                                                value={this.state.center.schedule[0].startTime}
                                                onChange={event => {
                                                    let schedule = this.state.center.schedule
                                                    schedule[0].startTime = event.target.value
                                                    this.setState(prev =>
                                                        ({
                                                            center: {
                                                                ...prev.center,
                                                                schedule,
                                                            }
                                                        }))
                                                }}
                                            />
                                            <input
                                                name={'ponEnd'}
                                                type={'text'}
                                                className={'input ' + styles.timeInput}
                                                placeholder={'До'}
                                                value={this.state.center.schedule[0].endTime}
                                                onChange={event => {
                                                    let schedule = this.state.center.schedule
                                                    schedule[0].endTime = event.target.value
                                                    this.setState(prev =>
                                                        ({
                                                            center: {
                                                                ...prev.center,
                                                                schedule,
                                                            }
                                                        }))
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.scheduleItem}>
                                        <p>Вторник</p>
                                        <div>
                                            <input
                                                name={'vtStart'}
                                                type={'text'}
                                                className={'input ' + styles.timeInput}
                                                placeholder={'С'}
                                                value={this.state.center.schedule[1].startTime}
                                                onChange={event => {
                                                    let schedule = this.state.center.schedule
                                                    schedule[1].startTime = event.target.value
                                                    this.setState(prev =>
                                                        ({
                                                            center: {
                                                                ...prev.center,
                                                                schedule,
                                                            }
                                                        }))
                                                }}
                                            />
                                            <input
                                                name={'vtEnd'}
                                                type={'text'}
                                                className={'input ' + styles.timeInput}
                                                placeholder={'До'}
                                                value={this.state.center.schedule[1].endTime}
                                                onChange={event => {
                                                    let schedule = this.state.center.schedule
                                                    schedule[1].endTime = event.target.value
                                                    this.setState(prev =>
                                                        ({
                                                            center: {
                                                                ...prev.center,
                                                                schedule,
                                                            }
                                                        }))
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.scheduleItem}>
                                        <p>Среда</p>
                                        <div>
                                            <input
                                                name={'srStart'}
                                                type={'text'}
                                                className={'input ' + styles.timeInput}
                                                placeholder={'С'}
                                                value={this.state.center.schedule[2].startTime}
                                                onChange={event => {
                                                    let schedule = this.state.center.schedule
                                                    schedule[2].startTime = event.target.value
                                                    this.setState(prev =>
                                                        ({
                                                            center: {
                                                                ...prev.center,
                                                                schedule,
                                                            }
                                                        }))
                                                }}
                                            />
                                            <input
                                                name={'srEnd'}
                                                type={'text'}
                                                className={'input ' + styles.timeInput}
                                                placeholder={'До'}
                                                value={this.state.center.schedule[2].endTime}
                                                onChange={event => {
                                                    let schedule = this.state.center.schedule
                                                    schedule[2].endTime = event.target.value
                                                    this.setState(prev =>
                                                        ({
                                                            center: {
                                                                ...prev.center,
                                                                schedule,
                                                            }
                                                        }))
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.scheduleItem}>
                                        <p>Четверг</p>
                                        <div>
                                            <input
                                                name={'chetStart'}
                                                type={'text'}
                                                className={'input ' + styles.timeInput}
                                                placeholder={'С'}
                                                value={this.state.center.schedule[3].startTime}
                                                onChange={event => {
                                                    let schedule = this.state.center.schedule
                                                    schedule[3].startTime = event.target.value
                                                    this.setState(prev =>
                                                        ({
                                                            center: {
                                                                ...prev.center,
                                                                schedule,
                                                            }
                                                        }))
                                                }}
                                            />
                                            <input
                                                name={'chetEnd'}
                                                type={'text'}
                                                className={'input ' + styles.timeInput}
                                                placeholder={'До'}
                                                value={this.state.center.schedule[3].endTime}
                                                onChange={event => {
                                                    let schedule = this.state.center.schedule
                                                    schedule[3].endTime = event.target.value
                                                    this.setState(prev =>
                                                        ({
                                                            center: {
                                                                ...prev.center,
                                                                schedule,
                                                            }
                                                        }))
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.scheduleItem}>
                                        <p>Пятница</p>
                                        <div>
                                            <input
                                                name={'pyatStart'}
                                                type={'text'}
                                                className={'input ' + styles.timeInput}
                                                placeholder={'С'}
                                                value={this.state.center.schedule[4].startTime}
                                                onChange={event => {
                                                    let schedule = this.state.center.schedule
                                                    schedule[4].startTime = event.target.value
                                                    this.setState(prev =>
                                                        ({
                                                            center: {
                                                                ...prev.center,
                                                                schedule,
                                                            }
                                                        }))
                                                }}
                                            />
                                            <input
                                                name={'pyatEnd'}
                                                type={'text'}
                                                className={'input ' + styles.timeInput}
                                                placeholder={'До'}
                                                value={this.state.center.schedule[4].endTime}
                                                onChange={event => {
                                                    let schedule = this.state.center.schedule
                                                    schedule[4].endTime = event.target.value
                                                    this.setState(prev =>
                                                        ({
                                                            center: {
                                                                ...prev.center,
                                                                schedule,
                                                            }
                                                        }))
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.scheduleItem}>
                                        <p>Суббота</p>
                                        <div>
                                            <input
                                                name={'subStart'}
                                                type={'text'}
                                                className={'input ' + styles.timeInput}
                                                placeholder={'С'}
                                                value={this.state.center.schedule[5].startTime}
                                                onChange={event => {
                                                    let schedule = this.state.center.schedule
                                                    schedule[5].startTime = event.target.value
                                                    this.setState(prev =>
                                                        ({
                                                            center: {
                                                                ...prev.center,
                                                                schedule,
                                                            }
                                                        }))
                                                }}
                                            />
                                            <input
                                                name={'subEnd'}
                                                type={'text'}
                                                className={'input ' + styles.timeInput}
                                                placeholder={'До'}
                                                value={this.state.center.schedule[5].endTime}
                                                onChange={event => {
                                                    let schedule = this.state.center.schedule
                                                    schedule[5].endTime = event.target.value
                                                    this.setState(prev =>
                                                        ({
                                                            center: {
                                                                ...prev.center,
                                                                schedule,
                                                            }
                                                        }))
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.scheduleItem}>
                                        <p>Воскресенье</p>
                                        <div>
                                            <input
                                                name={'vsStart'}
                                                type={'text'}
                                                className={'input ' + styles.timeInput}
                                                placeholder={'С'}
                                                value={this.state.center.schedule[6].startTime}
                                                onChange={event => {
                                                    let schedule = this.state.center.schedule
                                                    schedule[6].startTime = event.target.value
                                                    this.setState(prev =>
                                                        ({
                                                            center: {
                                                                ...prev.center,
                                                                schedule,
                                                            }
                                                        }))
                                                }}
                                            />
                                            <input
                                                name={'vsEnd'}
                                                type={'text'}
                                                className={'input ' + styles.timeInput}
                                                placeholder={'До'}
                                                value={this.state.center.schedule[6].endTime}
                                                onChange={event => {
                                                    let schedule = this.state.center.schedule
                                                    schedule[6].endTime = event.target.value
                                                    this.setState(prev =>
                                                        ({
                                                            center: {
                                                                ...prev.center,
                                                                schedule,
                                                            }
                                                        }))
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {/*<p>{JSON.stringify(this.state.center.schedule)}</p>*/}
                                </div>
                                <div className={styles.scheduleRight}>
                                    <p style={{marginBottom: 15}}>Выходной</p>
                                    <input
                                        className={styles.scheduleCheck}
                                        name={'holiday'}
                                        type={'checkbox'}
                                        checked={this.state.center.schedule[0].isHoliday}
                                        onChange={() => {
                                            const schedule = this.state.center.schedule
                                            schedule[0].isHoliday = !schedule[0].isHoliday
                                            this.setState(prevState =>
                                                ({
                                                    center: {
                                                    ...prevState.center,
                                                    schedule
                                                    }
                                                })
                                            )}
                                        }

                                    />
                                    <input
                                        className={styles.scheduleCheck}
                                        name={'holiday'}
                                        type={'checkbox'}
                                        checked={this.state.center.schedule[1].isHoliday}
                                        onChange={() => {
                                            const schedule = this.state.center.schedule
                                            schedule[1].isHoliday = !schedule[1].isHoliday
                                            this.setState(prevState =>
                                                ({
                                                    center: {
                                                        ...prevState.center,
                                                        schedule
                                                    }
                                                })
                                            )}
                                        }

                                    />
                                    <input
                                        className={styles.scheduleCheck}
                                        name={'holiday'}
                                        type={'checkbox'}
                                        checked={this.state.center.schedule[2].isHoliday}
                                        onChange={() => {
                                            const schedule = this.state.center.schedule
                                            schedule[2].isHoliday = !schedule[2].isHoliday
                                            this.setState(prevState =>
                                                ({
                                                    center: {
                                                        ...prevState.center,
                                                        schedule
                                                    }
                                                })
                                            )}
                                        }

                                    />
                                    <input
                                        className={styles.scheduleCheck}
                                        name={'holiday'}
                                        type={'checkbox'}
                                        checked={this.state.center.schedule[3].isHoliday}
                                        onChange={() => {
                                            const schedule = this.state.center.schedule
                                            schedule[3].isHoliday = !schedule[3].isHoliday
                                            this.setState(prevState =>
                                                ({
                                                    center: {
                                                        ...prevState.center,
                                                        schedule
                                                    }
                                                })
                                            )}
                                        }

                                    />
                                    <input
                                        className={styles.scheduleCheck}
                                        name={'holiday'}
                                        type={'checkbox'}
                                        checked={this.state.center.schedule[4].isHoliday}
                                        onChange={() => {
                                            const schedule = this.state.center.schedule
                                            schedule[4].isHoliday = !schedule[4].isHoliday
                                            this.setState(prevState =>
                                                ({
                                                    center: {
                                                        ...prevState.center,
                                                        schedule
                                                    }
                                                })
                                            )}
                                        }

                                    />
                                    <input
                                        className={styles.scheduleCheck}
                                        name={'holiday'}
                                        type={'checkbox'}
                                        checked={this.state.center.schedule[5].isHoliday}
                                        onChange={() => {
                                            const schedule = this.state.center.schedule
                                            schedule[5].isHoliday = !schedule[5].isHoliday
                                            this.setState(prevState =>
                                                ({
                                                    center: {
                                                        ...prevState.center,
                                                        schedule
                                                    }
                                                })
                                            )}
                                        }

                                    />
                                    <input
                                        className={styles.scheduleCheck}
                                        name={'holiday'}
                                        type={'checkbox'}
                                        checked={this.state.center.schedule[6].isHoliday}
                                        onChange={() => {
                                            const schedule = this.state.center.schedule
                                            schedule[6].isHoliday = !schedule[6].isHoliday
                                            this.setState(prevState =>
                                                ({
                                                    center: {
                                                        ...prevState.center,
                                                        schedule
                                                    }
                                                })
                                            )}
                                        }

                                    />
                                </div>
                            </div>
                            <Select
                                options={this.typeOptions(this.state.deviceTypes)}
                                isMulti={true}
                                className={styles.select}
                                onChange={value => {
                                    const deviceTypes = value.map(val => {
                                        return {
                                            _id: val.value,
                                            title: val.label,
                                            companies: val.companies
                                        }
                                    })
                                    this.setState(prev => ({
                                        center: {
                                            ...prev.center,
                                            deviceTypes
                                        }
                                    }))
                                }}
                            />
                            {/*<p>{JSON.stringify(this.state.center.deviceTypes)}</p>*/}
                            <Select
                                options={this.companyOptions(this.state.center.deviceTypes)}
                                isMulti={true}
                                className={styles.select}
                                onChange={value => {
                                    const deviceCompanies = value.map(val => val.value)
                                    this.setState(prev => ({
                                        center: {
                                            ...prev.center,
                                            deviceCompanies
                                        }
                                    }))
                                }}
                            />
                            {/*<p>{JSON.stringify(this.state.center.deviceCompanies)}</p>*/}
                            <input
                                name={'image'}
                                type={'text'}
                                className={'input'}
                                placeholder={'Изображение'}
                                value={this.state.image}
                                onChange={event =>
                                    this.setState({image: event.target.value})}
                            />
                            <div style={{marginTop: -20, height: 40}}>
                                {this.state.center.images.map((img, i) =>
                                    <div onClick={() => {
                                        const images = this.state.center.images
                                        images.splice(i,1)
                                        this.setState(prev => ({
                                            center: {
                                                ...prev.center,
                                                images,
                                            }
                                        }))
                                    }} className={styles.square}>x</div>)}
                            </div>
                            {this.state.center.images.length < 4 ?
                                <Button
                                    title={'Добавить изображение'}
                                    event={() => {
                                        const imageList = this.state.center.images
                                        imageList.push(this.state.image)
                                        this.setState(prev => ({
                                            center: {
                                                ...prev.center,
                                                images: imageList
                                            }
                                        }))
                                    }}
                                    className={styles.button}
                                /> :
                                <Button
                                    title={'Добавить изображение'}
                                    event={() => {}}
                                    color={'#999'}
                                    className={styles.button}
                                />
                            }
                            {/*<p>{JSON.stringify(this.state.center.images)}</p>*/}

                        </div>
                    </div>

                </div>

                <Button
                    className={'button'}
                    title={'Продолжить'}
                    event={() => this.validateCenter(this.props.context)}
                />
            </div>
        )
    }
}

export default withContext(CenterForm)
