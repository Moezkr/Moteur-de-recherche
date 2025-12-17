import { Document, SearchResult } from "./types"
import { documents, termFreq, idf, tokenize } from "./indexer"

class VectorSpaceSearch {
  private documents: Document[] = []
  private vocabulary: string[] = []
  private termIndex: Map<string, number> = new Map()

  constructor() {
    this.documents = documents

    const vocabSet = new Set<string>()
    for (const doc of this.documents) {
      const tf = termFreq.get(doc.url)
      if (!tf) continue
      for (const term of tf.keys()) vocabSet.add(term)
    }

    this.vocabulary = [...vocabSet]
    this.vocabulary.forEach((t, idx) => this.termIndex.set(t, idx))
  }

  private buildVector(tfMap: Map<string, number>): number[] {
    const vec = new Array(this.vocabulary.length).fill(0)
    const maxTF = Math.max(...tfMap.values(), 1)

    for (const [term, tf] of tfMap.entries()) {
      const i = this.termIndex.get(term)
      if (i !== undefined) {
        const idfVal = idf.get(term) || 0
        vec[i] = (tf / maxTF) * idfVal
      }
    }

    return vec
  }

  private cosine(v1: number[], v2: number[]): number {
    let dot = 0, m1 = 0, m2 = 0

    for (let i = 0; i < v1.length; i++) {
      dot += v1[i] * v2[i]
      m1 += v1[i] ** 2
      m2 += v2[i] ** 2
    }

    if (m1 === 0 || m2 === 0) return 0
    return dot / (Math.sqrt(m1) * Math.sqrt(m2))
  }

  public search(query: string): SearchResult[] {
    const qTerms = tokenize(query)
    const qTF = new Map<string, number>()

    for (const t of qTerms) qTF.set(t, (qTF.get(t) || 0) + 1)

    const qVec = this.buildVector(qTF)
    const results: SearchResult[] = []

    for (const doc of this.documents) {
      const dTF = termFreq.get(doc.url) || new Map()
      const dVec = this.buildVector(dTF)

      const score = this.cosine(qVec, dVec)

      if (score > 0) results.push({ document: doc, score })
    }

    return results.sort((a, b) => b.score - a.score)
  }
}

const vectorSearch = new VectorSpaceSearch()
export default vectorSearch