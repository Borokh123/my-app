import React, { useState } from 'react';
import styles from './Paginator.module.css';

const Paginator = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let portionCount = Math.ceil(pagesCount / props.portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionNumber = (portionNumber - 1) * props.portionSize + 1;
    let rightPortionNumber = portionNumber * props.portionSize;

    return (

        <div className={styles.paginator}>
            {portionNumber > 1 &&
                <button onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button>}
            {pages
                .filter(p => p >= leftPortionNumber && p <= rightPortionNumber)
                .map((p) => {
                    return <span
                        className={`${props.currentPage === p ? styles.selectedPage : ''} ${styles.pageNumber}`}
                        key={p}
                        onClick={() => {
                            props.onPageChanged(p);
                        }}>
                        {p}
                    </span>
                })}
            {portionCount > portionNumber &&
                <button onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</button>}
        </div>
    )
}

export default Paginator;
