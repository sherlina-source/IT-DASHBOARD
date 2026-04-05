// src/components/DailyReviewCard.jsx
import React, { useState, useEffect, useRef } from 'react';

function DailyReviewCard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [todayData, setTodayData] = useState([]);
  const [lastReviewDate, setLastReviewDate] = useState(null);
  const [isLocked, setIsLocked] = useState(false);

  const playedSoundRef = useRef(false);
  const intervalRef = useRef(null);

  const targetNames = [
    "Agung Prasetyo",
    "Citra Aurelia Putri",
    "Farizki Adi Pratama",
    "Andre Wijaksono",
    "Antika Lorien",
    "Reza Zhainal Abhidin",
    "Rico Widiyatma",
    "Banu Susanto",
    "Muhamad Khoirul Irvan"
  ];

  const formatDate = (date) => {
    return new Date(date).toISOString().split('T')[0];
  };

  // 🔓 UNLOCK AUDIO
  useEffect(() => {
    const unlockAudio = () => {
      const audio = new Audio('/Sound/notification.wav');
      audio.volume = 0;

      audio.play().then(() => {
        audio.pause();
        audio.currentTime = 0;
        audio.volume = 1;
      }).catch(() => {});
    };

    document.addEventListener('click', unlockAudio, { once: true });

    return () => {
      document.removeEventListener('click', unlockAudio);
    };
  }, []);

  // 🔥 CHECK LOCK TIME (11:00)
  const checkLockTime = () => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();

    const locked = hour > 11 || (hour === 11 && minute >= 0);
    setIsLocked(locked);

    if (locked && !playedSoundRef.current) {
      const audio = new Audio('/Sound/notification.wav');
      audio.volume = 1;
      audio.currentTime = 0;

      audio.play().catch(() => {});
      playedSoundRef.current = true;
    }
  };

  // 🔄 FETCH DATA
  const fetchData = async () => {
    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);

      const params = new URLSearchParams({
        start_date: formatDate(startDate),
        end_date: formatDate(endDate)
      });

      const response = await fetch(
        `https://serviceitchecklist.salokapark.app/api/activity-reviews?${params}`
      );

      if (!response.ok) throw new Error(`HTTP error ${response.status}`);

      const result = await response.json();

      if (result.status === 'success') {
        setData(result.data);
      } else {
        throw new Error('Data tidak valid');
      }
    } catch (err) {
      console.error(err);
      setError('Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  // 🔄 PROCESS DATA (FIX: TIDAK ADA FALLBACK)
  const processData = () => {
    if (!data.length) return;

    const todayStr = formatDate(new Date());
    const todayEntries = data.filter(d => d.review_date === todayStr);

    setTodayData(todayEntries);
    setLastReviewDate(todayStr);
  };

  // 🔄 INIT
  useEffect(() => {
    fetchData();

    intervalRef.current = setInterval(fetchData, 10000);
    const timeInterval = setInterval(checkLockTime, 1000);

    checkLockTime();

    return () => {
      clearInterval(intervalRef.current);
      clearInterval(timeInterval);
    };
  }, []);

  // 🔄 UPDATE DATA
  useEffect(() => {
    processData();
  }, [data]);

  // 🔄 RESET SOUND HARIAN
  useEffect(() => {
    const reset = () => {
      playedSoundRef.current = false;
    };

    const now = new Date();
    const msToMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - now;

    const timeout = setTimeout(() => {
      reset();
      setInterval(reset, 86400000);
    }, msToMidnight);

    return () => clearTimeout(timeout);
  }, []);

  // 🔄 ORDER LIST
  const getOrderedList = () => {
    const submitted = targetNames.filter(name =>
      todayData.some(d => d.nama_karyawan === name)
    );

    const notSubmitted = targetNames.filter(name =>
      !todayData.some(d => d.nama_karyawan === name)
    );

    const submittedWithTime = submitted.map(name => {
      const entry = todayData.find(d => d.nama_karyawan === name);
      return {
        name,
        updatedAt: entry ? new Date(entry.updated_at).getTime() : 0
      };
    });

    submittedWithTime.sort((a, b) => b.updatedAt - a.updatedAt);

    const orderedSubmitted = submittedWithTime.map(i => i.name);

    return isLocked
      ? [...notSubmitted, ...orderedSubmitted]
      : [...orderedSubmitted, ...notSubmitted];
  };

  const orderedNames = getOrderedList();

  if (loading) return <div className="card">Loading...</div>;
  if (error) return <div className="card">{error}</div>;

  const notFilledCount = targetNames.filter(
    n => !todayData.some(d => d.nama_karyawan === n)
  ).length;

  const isEmptyToday = todayData.length === 0;

  return (
    <div className="card daily-review-card">
      <div className="daily-review-header">
        <h2>📋 DAILY REVIEW</h2>
        {isLocked && <span className="lock-badge">🔒</span>}
      </div>

      <div className="daily-review-list">
        {orderedNames.map(name => {
          const filled = todayData.some(d => d.nama_karyawan === name);
          return (
            <div key={name} className="review-item">
              <span>{name}</span>
              <span>{filled ? '✅' : '❌'}</span>
            </div>
          );
        })}
      </div>

      <div className="daily-review-footer">
        {isEmptyToday && (
          <span className="no-data">
            📭 Belum Ada yang Mengisi Hari Ini
          </span>
        )}

        <span>
          {notFilledCount === 0
            ? '✅ Semua Sudah Mengisi'
            : `⚠️ ${notFilledCount} Karyawan Belum Mengisi`}
        </span>
      </div>
    </div>
  );
}

export default DailyReviewCard;