import React from 'react';
import preloader from '../../../assets/images/loading.gif';
import styles from './Preloader.module.css'; // Подключаем CSS файл


const Preloader = () => {
  return (
    <div className={styles.preloaderOverlay}>
      <img src={preloader} alt="Loading..." className={styles.preloaderImg} />
    </div>
  );
};

export default Preloader;