import React, { useState } from 'react';
import styles from './Paginator.module.css';

type PropsType = {
    totalUsersCount: number;
    pageSize: number;
    portionSize?: number;
    currentPage: number;
    onPageChanged: (pageNumber: number) => void;
};

const Paginator: React.FC<PropsType> = ({
    totalUsersCount,
    pageSize,
    portionSize = 10, // Значение по умолчанию
    currentPage,
    onPageChanged
}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionNumber = portionNumber * portionSize;

    return (
        <div className={styles.paginator}>
            {portionNumber > 1 && (
                <button onClick={() => setPortionNumber(portionNumber - 1)}>PREV</button>
            )}
            {pages
                .filter((p) => p >= leftPortionNumber && p <= rightPortionNumber)
                .map((p) => (
                    <span
                        className={`${currentPage === p ? styles.selectedPage : ''} ${styles.pageNumber}`}
                        key={p}
                        onClick={() => onPageChanged(p)}
                    >
                        {p}
                    </span>
                ))}
            {portionCount > portionNumber && (
                <button onClick={() => setPortionNumber(portionNumber + 1)}>NEXT</button>
            )}
        </div>
    );
};

export default Paginator;