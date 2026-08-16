"use client";

import { useState } from "react";
import Link from "next/link";
import kanjiData from "../data/kanji.json";


export default function FlashCardPage() {
  // Kanji used for the current practice session
  const [practiceKanji, setPracticeKanji] =
    useState(kanjiData);

  // Current Kanji
  const [currentIndex, setCurrentIndex] = useState(0);

  // Flash card step
  // 1 = Kanji only
  // 2 = Readings
  // 3 = Vocabulary
  const [step, setStep] = useState(1);

  // Range
  const [startNumber, setStartNumber] = useState("");
  const [endNumber, setEndNumber] = useState("");

  const currentKanji = practiceKanji[currentIndex];

  // Apply Kanji range
  const applyRange = () => {
    const start = Number(startNumber);
    const end = Number(endNumber);

    // Empty range = use all Kanji
    if (!startNumber && !endNumber) {
      setPracticeKanji(kanjiData);
      setCurrentIndex(0);
      setStep(1);
      return;
    }

    // Require both
    if (!startNumber || !endNumber) {
      alert("Please enter both start and end numbers.");
      return;
    }

    // Validate
    if (start > end) {
      alert("Start number must be smaller than end number.");
      return;
    }

    // Find Kanji in range
    const selectedKanji = kanjiData.filter(
      (item) =>
        item.number >= start &&
        item.number <= end
    );

    if (selectedKanji.length === 0) {
      alert("No Kanji found in this range.");
      return;
    }

    // Start from first Kanji in selected range
    setPracticeKanji(selectedKanji);
    setCurrentIndex(0);
    setStep(1);
  };

  // Reset to all Kanji
  const resetRange = () => {
    setStartNumber("");
    setEndNumber("");

    setPracticeKanji(kanjiData);
    setCurrentIndex(0);
    setStep(1);
  };

  // Click flash card
  const handleCardClick = () => {
    if (step < 3) {
      setStep((currentStep) => currentStep + 1);
    }
  };

  // Next Kanji
  const nextKanji = () => {
    if (currentIndex < practiceKanji.length - 1) {
      setCurrentIndex(
        (index) => index + 1
      );

      setStep(1);
    }
  };

  // Previous Kanji
  const previousKanji = () => {
    if (currentIndex > 0) {
      setCurrentIndex(
        (index) => index - 1
      );

      setStep(1);
    }
  };

  // If data is empty
  if (!currentKanji) {
    return (
      <main className="min-h-screen bg-zinc-50 dark:bg-black">
        <div className="mx-auto max-w-5xl px-4 py-8">

          <div className="flex items-center justify-between">

            <Link
              href="/"
              className="text-2xl font-bold"
            >
              <img
              src="/logo.png"
              alt="TZ"
              className="h-15 w-15 object-contain"
              />
            </Link>

          </div>

          <div className="mt-20 text-center">
            No Kanji available.
          </div>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-8 dark:bg-black">

      <div className="mx-auto max-w-5xl">

        {/* =================================
            TOP NAVIGATION
        ================================== */}
        <div className="mb-8 flex items-center justify-between">

          {/* Logo - Top Left */}
          <Link
            href="/"
            className="text-2xl font-bold transition-opacity hover:opacity-70"
          >
              <img
              src="/logo.png"
              alt="TZ"
              className="h-15 w-15 object-contain"
              />
          </Link>

          {/* Range Search - Top Right */}
          <div className="flex items-center gap-2">

            {/* Start */}
            <input
              type="number"
              value={startNumber}
              onChange={(e) =>
                setStartNumber(e.target.value)
              }
              placeholder="Start"
              className="w-20 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-black dark:border-zinc-700 dark:bg-zinc-900"
            />

            {/* Dash */}
            <span className="text-zinc-400">
              -
            </span>

            {/* End */}
            <input
              type="number"
              value={endNumber}
              onChange={(e) =>
                setEndNumber(e.target.value)
              }
              placeholder="End"
              className="w-20 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-black dark:border-zinc-700 dark:bg-zinc-900"
            />

            {/* Apply */}
            <button
              onClick={applyRange}
              className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Apply
            </button>

            {/* Reset */}
            <button
              onClick={resetRange}
              className="rounded-lg bg-zinc-200 px-3 py-2 text-sm font-medium transition hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700"
            >
              Reset
            </button>

          </div>
        </div>

        {/* =================================
            PAGE TITLE
        ================================== */}
        {/* <div className="mb-6 text-center">

          <h1 className="text-3xl font-bold">
            Kanji Flash Card
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Click the card to reveal the readings
            and vocabulary.
          </p>

        </div> */}

        {/* =================================
            PROGRESS
        ================================== */}
        <div className="mb-6 text-center text-sm text-zinc-500">

          {currentIndex + 1} /{" "}
          {practiceKanji.length}

        </div>

        {/* =================================
            FLASH CARD
        ================================== */}
        <div
          onClick={handleCardClick}
          className="mx-auto w-full max-w-2xl cursor-pointer rounded-3xl bg-white p-8 shadow-lg transition hover:shadow-xl dark:bg-zinc-900"
        >

          {/* Kanji Number */}
          <div className="mb-4 text-center text-sm font-medium text-zinc-400">
            Kanji #{currentKanji.number}
          </div>

          {/* =================================
              KANJI
          ================================== */}
          <div className="text-center">

            <div className="text-9xl font-bold">
              {currentKanji.kanji}
            </div>

            {step === 1 && (
              <p className="mt-6 text-sm text-zinc-400">
                Click to reveal
              </p>
            )}

          </div>

          {/* =================================
              READINGS
          ================================== */}
          {step >= 2 && (
            <div className="mt-8 border-t border-zinc-200 pt-8 dark:border-zinc-700">

              <h2 className="mb-5 text-center text-xl font-bold">
                Readings
              </h2>

              <div className="space-y-3 text-center text-xl">

                <p>
                  <span className="font-semibold">
                    On'yomi:
                  </span>{" "}
                  {currentKanji.onyomi || "-"}
                </p>

                <p>
                  <span className="font-semibold">
                    Kun'yomi:
                  </span>{" "}
                  {currentKanji.kunyomi || "-"}
                </p>

              </div>

              {step === 2 && (
                <p className="mt-6 text-center text-sm text-zinc-400">
                  Click again to reveal vocabulary
                </p>
              )}

            </div>
          )}

          {/* =================================
              VOCABULARY
          ================================== */}
          {step >= 3 && (
            <div className="mt-8 border-t border-zinc-200 pt-8 dark:border-zinc-700">

              <h2 className="mb-5 text-center text-2xl font-bold">
                Vocabulary
              </h2>

              <div className="space-y-4">

                {currentKanji.vocabulary.map(
                  (word, index) => (
                    <div
                      key={index}
                      className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-800"
                    >

                      {/* Japanese */}
                      <div className="flex flex-wrap items-center gap-3">

                        <span className="text-xl font-bold">
                          {word.japanese}
                        </span>

                        <span className="text-zinc-500">
                          {word.reading}
                        </span>

                      </div>

                      {/* English */}
                      <p className="mt-2 text-zinc-700 dark:text-zinc-200">
                        {word.english}
                      </p>

                      {/* Myanmar */}
                      <p className="mt-1 text-sm text-zinc-500">
                        {word.myanmar}
                      </p>

                    </div>
                  )
                )}

              </div>

            </div>
          )}

        </div>

        {/* =================================
            NAVIGATION
        ================================== */}
        <div className="mt-8 flex justify-center gap-4">

          {/* Previous */}
          <button
            onClick={previousKanji}
            disabled={currentIndex === 0}
            className="rounded-xl bg-zinc-200 px-6 py-3 font-medium transition hover:bg-zinc-300 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          >
            ← Previous
          </button>

          {/* Next */}
          <button
            onClick={nextKanji}
            disabled={
              currentIndex ===
              practiceKanji.length - 1
            }
            className="rounded-xl bg-black px-6 py-3 font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Next →
          </button>

        </div>

      </div>

    </main>
  );
}
