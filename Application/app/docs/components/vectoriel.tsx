"use client";

export default function VectorielDoc() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-blue-400 mb-6 text-center">
        Vector Space Model (VSM)
      </h2>

      <div className="space-y-4 text-gray-300 text-base break-words">
        <p>
          The Vector Space Model (VSM) represents both documents and search queries as vectors
          in a multi-dimensional space. The dimensions of this space are defined by all unique
          terms (the vocabulary) in the collection. The key idea is that documents and queries 
          are ranked based on the geometric proximity (similarity) of their corresponding vectors.
        </p>
        <p>
          We use the **TF-IDF (Term Frequency–Inverse Document Frequency)** scheme to calculate 
          the weight of each term in the vector, determining its importance both within the 
          document and across the entire corpus.
        </p>

        <h4 className="text-xl font-semibold text-white pt-2">
          How Our Code Works (VSM with Cosine Similarity):
        </h4>
        
        <p>
          Our Vector Space implementation (`VectorSpaceSearch`) works in two phases: Indexing (Vectorization) and Searching (Similarity Calculation).
        </p>

        <ul className="list-disc list-outside pl-6 space-y-3">
          <li>
            <strong className="text-gray-100">
              1. Indexing & Vector Creation:
            </strong>
            <br />
            This step happens once at initialization, creating a normalized vector for every document.
            <ul className="list-decimal list-outside pl-6 mt-2 space-y-1">
              <li>
                Text is tokenized by converting to lowercase, removing punctuation, and filtering stop words.
              </li>
              <li>
                The system calculates the Term Frequency (TF) for each word in the document, normalized by the maximum term frequency in that document.
              </li>
              <li>
                The Inverse Document Frequency (IDF) is calculated for every word in the collection: 
              </li>
              <li>
                Each document vector uses normalized TF-IDF as the term weight: Norm TF multiplié par IDF.
              </li>
            </ul>
          </li>

          <li>
            <strong className="text-gray-100">
              2. Searching & Ranking by Cosine Similarity:
            </strong>
            <br />
            When a query is entered, it is transformed into a vector and compared against all document vectors.
            <ul className="list-decimal list-outside pl-6 mt-2 space-y-1">
              <li>
                The user's query is tokenized and converted into a Query Vector (Q) using the same TF-IDF weighting scheme.
              </li>
              <li>
                For every Document Vector (D), the score is calculated using **Cosine Similarity**, which measures the angle between D and Q:
              </li>
              <li>
                <div className="text-red-500 font-mono mt-2 mb-4 text-sm md:text-base p-2 bg-gray-900 rounded-md overflow-x-auto">
                    Score(D, Q) = (Vector D point Vector Q) / (Magnitude de D * Magnitude de Q)
                </div>
              </li>
              <li>
                A score of 1 means the vectors are identical (highly similar content), and a score of 0 means the content is completely different (orthogonal).
              </li>
              <li>
                The final results are sorted by the Cosine Similarity score from highest to lowest to provide the most relevant documents first.
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}