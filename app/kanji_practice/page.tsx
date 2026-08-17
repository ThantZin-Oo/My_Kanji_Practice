"use client";

import { useState } from "react";
import Link from "next/link";
import kanjiData from "../data/kanji.json";

const ITEMS_PER_PAGE = 5;

export default function KanjiPracticePage() {
  // Show all Kanji by default
  const [practiceData, setPracticeData] = useState(kanjiData);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Range inputs
  const [startNumber, setStartNumber] = useState("");
  const [endNumber, setEndNumber] = useState("");

  // Apply range
  const applyRange = () => {
    const start = Number(startNumber);
    const end = Number(endNumber);

    // If both inputs are empty, show all Kanji
    if (!startNumber && !endNumber) {
      setPracticeData(kanjiData);
      setCurrentPage(1);
      return;
    }

    // Require both numbers
    if (!startNumber || !endNumber) {
      alert("Please enter both start and end numbers.");
      return;
    }

    // Validate range
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

    setPracticeData(selectedKanji);
    setCurrentPage(1);
  };

  // Reset range
  const resetRange = () => {
    setStartNumber("");
    setEndNumber("");
    setPracticeData(kanjiData);
    setCurrentPage(1);
  };

  // Pagination
  const totalPages = Math.ceil(
    practiceData.length / ITEMS_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) * ITEMS_PER_PAGE;

  const currentKanji = practiceData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-8 dark:bg-black">
      <div className="mx-auto max-w-5xl">

        {/* =========================
            TOP BAR
        ========================== */}
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
              <span className="text-lg font-bold">
                Kanji Practice
              </span>
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

        {/* =========================
            PAGE TITLE
        ========================== */}
        {/* <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Kanji Practice
          </h1>

          <p className="mt-2 text-zinc-500">
            Study 5 Kanji at a time.
          </p>
        </div> */}

        {/* =========================
            PAGINATION INFO
        ========================== */}
        <div className="mb-5 flex items-center justify-between text-sm text-zinc-500">

          <span>
            Showing{" "}
            {startIndex + 1}-
            {Math.min(
              startIndex + ITEMS_PER_PAGE,
              practiceData.length
            )}{" "}
            of {practiceData.length}
          </span>

          <span>
            Page {currentPage} / {totalPages}
          </span>

        </div>

        {/* =========================
            KANJI CARDS
        ========================== */}
        <div className="space-y-6">

          {currentKanji.map((item) => (
            <div
              key={item.number}
              className="rounded-2xl bg-white p-6 shadow-sm dark:bg-zinc-900"
            >

              {/* Kanji Header */}
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

                {/* Number */}
                <div className="text-sm font-medium text-zinc-400">
                  #{item.number}
                </div>

                {/* Kanji */}
                <div className="text-7xl font-bold">
                  {item.kanji}
                </div>

                {/* Readings */}
                <div className="space-y-2 text-lg">

                  <p>
                    <span className="font-semibold">
                      On'yomi:
                    </span>{" "}
                    {item.onyomi || "-"}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Kun'yomi:
                    </span>{" "}
                    {item.kunyomi || "-"}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Meaning:
                    </span>{" "}
                    {item.meaning || "-"}
                  </p>

                </div>
              </div>

              {/* =========================
                  VOCABULARY
              ========================== */}
              <div className="mt-6 border-t border-zinc-200 pt-6 dark:border-zinc-700">

                <h2 className="mb-4 text-lg font-semibold">
                  Vocabulary
                </h2>

                <div className="grid gap-3 sm:grid-cols-2">

                  {item.vocabulary.map(
                    (word, index) => (
                      <div
                        key={index}
                        className="rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800"
                      >

                        <div className="flex flex-wrap items-center gap-3">

                          <span className="text-xl font-bold">
                            {word.japanese}
                          </span>

                          <span className="text-zinc-500">
                            {word.reading}
                          </span>

                        </div>

                        <p className="mt-2 text-sm">
                          {word.english}
                        </p>

                        <p className="mt-1 text-sm text-zinc-500">
                          {word.myanmar}
                        </p>

                      </div>
                    )
                  )}

                </div>
              </div>

            </div>
          ))}

        </div>

        {/* =========================
            PAGINATION
        ========================== */}
        <div className="mt-8 flex items-center justify-center gap-4">

          {/* Previous */}
          <button
            onClick={() =>
              setCurrentPage(
                (page) => page - 1
              )
            }
            disabled={currentPage === 1}
            className="rounded-xl bg-zinc-200 px-5 py-3 font-medium transition hover:bg-zinc-300 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          >
            ← Previous
          </button>

          {/* Page */}
          <span className="rounded-xl bg-white px-5 py-3 shadow-sm dark:bg-zinc-900">
            {currentPage} / {totalPages}
          </span>

          {/* Next */}
          <button
            onClick={() =>
              setCurrentPage(
                (page) => page + 1
              )
            }
            disabled={
              currentPage === totalPages
            }
            className="rounded-xl bg-zinc-200 px-5 py-3 font-medium transition hover:bg-zinc-300 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          >
            Next →
          </button>

        </div>

      </div>
    </main>
  );
}
