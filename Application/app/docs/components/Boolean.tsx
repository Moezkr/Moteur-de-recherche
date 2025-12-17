"use client";

export default function BooleanDoc() {
  return (
    <div>
    
      <h2 className="text-3xl font-bold text-cyan-400 mb-6 text-center">
        Boolean Search Algorithm
      </h2>

      <div className="space-y-4 text-gray-300 text-base">
        <p>
          The Boolean Search model is a classic retrieval method that finds
          documents using exact-match rules. It relies on the operators AND
          (implicit), OR, and NOT to combine search terms.
        </p>

        <p>
          Unlike TF-IDF, this model does not rank documents by relevance. A
          document either matches the query (score: 1) or it does not
          match (score: 0).
        </p>
        
        <h4 className="text-xl font-semibold text-white pt-2">
          How Our Code Works:
        </h4>

        <p>
          Our BooleanSearch class is built around an Inverted Index.
        </p>

        <ul className="list-disc list-outside pl-6 space-y-3">
          <li>
            <strong className="text-gray-100">
              1. Indexing (in the constructor and index functions):
            </strong>
            <br />
            This step runs once when the app starts.
            <ul className="list-decimal list-outside pl-6 mt-2 space-y-1">
              <li>
                It creates an Inverted Index, which maps each tokenized term to
                the set of document URLs that contain it.
              </li>
              <li>
                It also stores all document URLs in a separate set (allDocUrls)
                so the search can handle queries that begin with NOT.
              </li>
            </ul>
          </li>
          
          <li>
            <strong className="text-gray-100">
              2. Searching (in the search function):
            </strong>
            <br />
            The search logic follows a clear order:
            <ul className="list-decimal list-outside pl-6 mt-2 space-y-1">
              <li>
                Step 1 (OR): The query is split by the OR operator. Each part
                becomes its own group. For example, "machine learning" OR "ai"
                becomes two groups.
              </li>
              <li>
                Step 2 (NOT): Each group is then split by the NOT operator. For
                example, "machine learning NOT robotics" becomes the include part
                and the exclude part.
              </li>
              <li>
                Step 3 (Implicit AND): The include part is tokenized, and all
                tokens must appear in a document. For example, "machine learning"
                means the document must contain both words.
              </li>
              <li>
                Step 4 (Set operations): The search engine applies set
                operations (intersection, difference, union) to combine and
                filter the results according to the logic.
              </li>
              <li>
                Step 5 (Result): It returns all documents that satisfy the
                conditions, assigning each one a score of 1.
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
