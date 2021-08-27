import React, {Fragment} from "react"
import styles from '../css/SearchPage.module.css'
import Filter from "./Filter";
import CenterCard from "./CenterCard";
import Sort from "./Sort";
import {withContext} from "./Context";

class SearchPage extends React.Component {
    state = {
        sort: true,
        onlyAuth: false,
        selectedType: {
            _id: null
        },
        selectedCompany: {
            _id: null
        },
        deviceTypes: null,
        center: {
            name: '',
            city: '',
            deviceType: {_id: null},
            deviceCompany: {_id: null},
            status: false,
        },
        centers: []
    }

    componentDidMount() {
        this.props.context.getAllDeviceTypes().then(deviceTypes => {
            this.setState({deviceTypes})
        })
        let {sort} = this.state
        sort ? sort = '-rating' : sort = 'name'
        this.props.context.getAllCentersByName(0, 8, sort, this.state.center)
            .then(centers => this.setState({centers}))
    }

    clickHandler = () => {
        let {sort} = this.state
        sort ? sort = '-rating' : sort = 'name'
        this.props.context.getAllCentersByName(0, 8, sort, this.state.center)
            .then(centers => this.setState({centers}))
    }

    Centers = (centers) => centers.map(center => <CenterCard key={center._id} center={center} />)

    render() {
        return (
            <Fragment>
                <div className={styles.searchBox}>
                    <h1>Поиск сервисных центров</h1>
                    <div className={styles.search}>
                        <input
                            name={'title'}
                            type={'text'}
                            className={styles.title_input}
                            placeholder={'Введите название сервисного центра'}
                            value={this.state.center.name}
                            onChange={event => this.setState(prevState =>
                                ({center: {...prevState.center ,name: event.target.value}}))
                            }
                        />
                        <input
                            name={'city'}
                            type={'text'}
                            className={styles.city_input}
                            placeholder={'Город'}
                            value={this.state.center.city}
                            onChange={event =>
                                this.setState(prevState =>
                                    ({center: {...prevState.center, city: event.target.value}}))
                            }
                        />
                        <div onClick={this.clickHandler}>Найти</div>
                    </div>
                    <div className={styles.sortBox}>
                        <Sort label1={'по рейтингу'} label2={'по алфавиту'} callBack={(sort) => this.setState({sort})} />
                        <label className={styles.check}>
                            <input
                                name={'status'}
                                type={'checkbox'}
                                checked={this.state.center.status}
                                onChange={(event) => this.setState(prevState =>
                                    ({center: {...prevState.center, status: !prevState.center.status}}))}
                            />
                            <p>только авторизованные</p>
                        </label>
                    </div>
                </div>

                <div className={styles.content}>
                    <div>
                        <div className={styles.flex}>
                            <h1>Фильтры</h1>
                            {this.state.center.deviceType._id ?
                            // {this.state.selectedType ?
                                <span
                                    onClick={() =>
                                        // this.setState({selectedType: null, selectedCompany: null,})}
                                        this.setState(prevState =>
                                            ({
                                                center: {...prevState.center, deviceType: {_id: null}, deviceCompany: {_id: null}}
                                            }))
                                    }
                                    className={styles.reset}
                                >Сбросить</span> : null
                            }
                        </div>
                        {this.state.deviceTypes ?
                            <Filter
                                title={'Тип устройства'}
                                list={this.state.deviceTypes}
                                callback={deviceType =>
                                    this.setState(prevState =>
                                        ({center: {...prevState.center, deviceType}}))
                                }
                                selected={this.state.center.deviceType}
                            /> : null
                        }

                        {this.state.center.deviceType._id ?
                            <Filter
                                title={'Производитель устройства'}
                                list={this.state.center.deviceType.companies}
                                callback={deviceCompany =>
                                    this.setState(prevState =>
                                        ({center: {...prevState.center, deviceCompany}}))
                                }
                                selected={this.state.center.deviceCompany}
                            /> : null
                        }


                    </div>
                    <div className={styles.results}>
                        <h1>Результаты поиска</h1>
                        <div className={styles.cards}>
                            {typeof this.state.centers === typeof [] && this.state.centers.length > 0 ?
                                this.Centers(this.state.centers) :
                                <p>Нет результатов...</p>
                            }
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }


}

export default withContext(SearchPage)
