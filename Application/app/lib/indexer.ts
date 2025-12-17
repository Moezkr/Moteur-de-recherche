import { Document } from "./types.js"
import documentsData from "../archive_org_metadata.json" 

export const documents: Document[] = documentsData as Document[]

const stopWords = new Set([
  "a", "an", "and", "are", "as", "at", "be", "by", "for", "from", "has", "he",
  "in", "is", "it", "its",
  "of", "on", "that", "the", "to", "was", "were",
  "will", "with", "what", "how", "when", "where", "your", "https://", "http",
  "you", "about", "watch", "buy", "check", "get", "ep", "more", "new", "this"
])

export function tokenize(text: string): string[] {
  if (!text) return []
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter((w: string) => w.length > 2 && !stopWords.has(w))
}

export const invertedIndex: Map<string, Set<string>> = new Map()
export const termFreq: Map<string, Map<string, number>> = new Map()
export const idf: Map<string, number> = new Map()
export const allDocUrls: Set<string> = new Set()

export function buildIndex() {
  const docFreq: Map<string, number> = new Map()

  for (const doc of documents) {
    const text = `${doc.title} ${doc.description}`
    const terms = tokenize(text) 

    allDocUrls.add(doc.url)

    const tfMap = new Map<string, number>()
    for (const term of terms) {
      tfMap.set(term, (tfMap.get(term) || 0) + 1) 

      if (!invertedIndex.has(term)) {
        invertedIndex.set(term, new Set())
      }
      invertedIndex.get(term)!.add(doc.url)
    }
    termFreq.set(doc.url, tfMap)

    const uniqueTerms = new Set(terms)
    uniqueTerms.forEach((term) => {
      docFreq.set(term, (docFreq.get(term) || 0) + 1)
    })
  }

  const totalDocs = documents.length

  for (const [term, df] of docFreq.entries()) {
    const idfValue = Math.log((totalDocs + 1) / (df + 1)) 
    idf.set(term, idfValue)
  }
}

buildIndex()