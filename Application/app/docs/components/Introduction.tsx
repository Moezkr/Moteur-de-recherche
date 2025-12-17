"use client";

export default function IntroductionDoc() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-cyan-400 mb-4 text-center">
        Introduction
      </h2>

      <p className="text-gray-300 text-base">
        Welcome to the ArchiveSearch documentation. This project is a
        custom-built, high-performance search engine created to explore a large
        collection of documents scraped from Archive.org.
      </p>

      <p className="text-gray-300 text-base mt-4">
        The main goal is to build a modern and responsive web application that
        implements and compares fundamental search algorithms. In this project,
        we have implemented the <strong>Vector Space Model</strong> (using TF-IDF for weighting)
        and a <strong>Boolean Search model</strong>.
      </p>

      <p className="text-gray-300 text-base mt-4">
        This is an academic project developed for the “Indexation et Techniques
        de Référencement” exam. It is not intended for real-world use, as the
        data comes from scraped Archive.org pages and serves only to demonstrate
        how the studied algorithms can be implemented in practice.
      </p>
    </div>
  );
}
