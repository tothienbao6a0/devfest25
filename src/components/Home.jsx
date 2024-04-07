// Home.jsx
import React, { useState, useEffect } from 'react';
import styles from './Home.module.css'; // Make sure the path is correct

const Home = () => {
    // Get the current date and the next occurrence of February 15th
    const now = new Date();
    let yearOfNextFebruary = now.getFullYear();
    if (now > new Date(yearOfNextFebruary, 1, 15)) {
      yearOfNextFebruary++;
    }
    //CHANGE COUNTDOWN DATE BASED ON WHEN DEVFEST 25 IS
    const endDate = new Date(yearOfNextFebruary, 1, 15); 
  
    // State to store the countdown
    const [countdown, setCountdown] = useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

  useEffect(() => {
    // Update the countdown every second
    const intervalId = setInterval(() => {
      const now = new Date();
      const difference = endDate - now;

      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      // Update state with the new countdown time
      setCountdown({ days, hours, minutes, seconds });

      // If we reached our target date, clear the interval
      if (difference < 0) {
        clearInterval(intervalId);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    // Clean up the interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.heroSection}>
          <img src="/images/icons/adi-logo.png" alt="ADI Logo" className={styles.logo} />
          <h1>DevFest 2025</h1>
          <h2>Coming soon...</h2>
          <div className={styles.countdown}>
            <span>{`${countdown.days}d ${countdown.hours}h ${countdown.minutes}m ${countdown.seconds}s`}</span>
          </div>
          <h2 className={styles.contactHeader}>Questions? Contact</h2>
          <h2 className={styles.contactEmail}>devfestcu@gmail.com</h2>
          <h3>Past DevFest Sites:</h3>
          <a href="https://2024.devfestcu.com/" className={styles.pastDevfestLink}>
            <img src="/images/icons/devfest-24.svg" alt="DevFest 24 Icon" width="70%"/>
            <p>DevFest 2024</p>
          </a>
          <a href="https://2023.devfestcu.com/" className={styles.pastDevfestLink}>
            <p>DevFest 2023</p>
          </a>
        </div>
      </div>
    </main>
  );
};

export default Home;
