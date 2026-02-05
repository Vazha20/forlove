"use client";

import { useEffect, useState } from "react";
import styles from "./LovePage.module.css";

const START_DATE = new Date("2025-11-05T20:30:00");

type Time = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function calculateTimeTogether(): Time {
  const now = new Date();
  const diff = Math.max(now.getTime() - START_DATE.getTime(), 0);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function LovePage() {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState<Time>(calculateTimeTogether());

  const photos = [
    { src: "firstdate.png", caption: "დღე, როცა დრო გაჩერდა ⏳ 05.11.2025" },
    { src: "2.jpg", caption: "დღე, როცა დრო გაჩერდა ⏳" },
    { src: "3.jpg", caption: "უბრალოდ ჩვენ, უბრალოდ ბედნიერები ✨" },
    { src: "4.jpg", caption: "მოგონება, რომელიც ყოველთვის გულშია ❤️" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateTimeTogether());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className={styles.container}>
      <section className={styles.card}>
        {/* floating hearts */}
        <span className={styles.floatingHeart1}>💕</span>
        <span className={styles.floatingHeart2}>💕</span>

        <h1 className={styles.title}>ჩემი სიყვარული ხარ</h1>

        <p className={styles.text}>
          გვერდი რომელიც ჩვენი ემოციების საცავი იქნება 
        </p>

        {!open ? (
          <button
            className={styles.button}
            onClick={() => setOpen(true)}
            aria-label="გახსენი"
          >
            გახსენი
          </button>
        ) : (
          <>
            {/* TIMER */}
            <section className={styles.timer}>
    <div className={styles.ecgContainer}>
  <svg
    viewBox="0 0 100 20"
    className={styles.ecgLine}
    xmlns="http://www.w3.org/2000/svg"
  >
    <polyline
      className={styles.ecgPolyline}
      points="0,10 10,10 12,5 15,15 20,10 30,10 32,5 35,15 40,10 50,10 52,5 55,15 60,10 70,10 72,5 75,15 80,10 90,10 92,5 95,15 100,10"
      fill="none"
      stroke="red"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>

</div>



              <div className={styles.timerGrid}>
                <TimeBox label="დღე" value={time.days} />
                <TimeBox label="საათი" value={time.hours} />
                <TimeBox label="წუთი" value={time.minutes} />
                <TimeBox label="წამი" value={time.seconds} />
              </div>

              <p className={styles.timerDate}>05.11.2025 20:30:00 დან ❤️</p>
            </section>

            {/* MESSAGE */}
            <section className={styles.message}>
      
        
              <div className={styles.heart}>💗</div>
            </section>

            {/* PHOTOS */}
            <section className={styles.photosSection}>
              <h2 className={styles.photosTitle}>ჩვენი მომენტები 📸</h2>

              <div className={styles.photosGrid}>
                {photos.map((photo) => (
                  <figure key={photo.src} className={styles.photoCard}>
                    <img
                      src={`/photos/${photo.src}`}
                      alt={photo.caption}
                      loading="lazy"
                    />
                    <div className={styles.photoOverlay}>
                      <figcaption className={styles.photoCaption}>
                        {photo.caption}
                      </figcaption>
                    </div>
                  </figure>
                ))}
              </div>
            </section>
          </>
        )}
      </section>
    </main>
  );
}

function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <div className={styles.timeBox}>
      <span className={styles.timeValue}>{String(value).padStart(2, "0")}</span>
      <span className={styles.timeLabel}>{label}</span>
    </div>
  );
}
