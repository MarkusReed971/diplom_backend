import React from "react"
import styles from "../css/Rating.module.css";
import {ReactComponent as Svg} from "../images/star.svg";

const Rating = ({rating}) => {
    return (
        <div className={styles.rating}>
            {rating >= 4 ?
                <div>
                    <Svg fill={'#00FF00'} className={styles.svg} />
                    <span style={{color: '#00FF00'}}>{rating}</span>
                </div> :
                <div>
                    <Svg fill={'#FF0000'} className={styles.svg} />
                    <span style={{color: '#FF0000'}}>{rating}</span>
                </div>
                }
        </div>
    )
}

export default Rating
