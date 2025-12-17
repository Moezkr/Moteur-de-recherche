import { Document, SearchResult } from "./types"

import {
  invertedIndex,
  allDocUrls,
  documents,
  tokenize,
} from "./indexer"

class BooleanSearch {
  private documentsMap: Map<string, Document> = new Map()

  constructor() {
    for (const doc of documents) {
      this.documentsMap.set(doc.url, doc)
    }
  }

  private union(setA: Set<string>, setB: Set<string>): Set<string> {
    return new Set([...setA, ...setB])
  }

  private intersect(setA: Set<string>, setB: Set<string>): Set<string> {
    return new Set([...setA].filter(x => setB.has(x)))
  }

  private difference(setA: Set<string>, setB: Set<string>): Set<string> {
    return new Set([...setA].filter(x => !setB.has(x)))
  }

  private getDocsForTerm(term: string): Set<string> {
    return invertedIndex.get(term) || new Set()
  }

  public search(query: string): SearchResult[] {
    const orGroups = query.split(/ OR /i)
    let finalResults: Set<string> = new Set()

    for (const orGroup of orGroups) {
      const notGroups = orGroup.split(/ NOT /i)
      const mustHaveQuery = notGroups[0]
      const mustNotHaveQueries = notGroups.slice(1)

      const mustHaveTerms = tokenize(mustHaveQuery)

      let groupResults: Set<string>

      if (mustHaveTerms.length > 0) {
        groupResults = this.getDocsForTerm(mustHaveTerms[0])

        for (let i = 1; i < mustHaveTerms.length; i++) {
          groupResults = this.intersect(
            groupResults,
            this.getDocsForTerm(mustHaveTerms[i])
          )
        }
      } else if (notGroups.length > 1) {
        groupResults = new Set(allDocUrls)
      } else {
        continue
      }

      for (const notQuery of mustNotHaveQueries) {
        const notTerms = tokenize(notQuery)
        let docsToExclude: Set<string> = new Set()
        
        for (const notTerm of notTerms) {
          docsToExclude = this.union(
            docsToExclude,
            this.getDocsForTerm(notTerm)
          )
        }
        groupResults = this.difference(groupResults, docsToExclude)
      }

      finalResults = this.union(finalResults, groupResults)
    }

    return Array.from(finalResults)
      .map(url => this.documentsMap.get(url)!)
      .filter(Boolean)
      .map(doc => ({ document: doc, score: 1 }))
  }
}

const booleanSearch = new BooleanSearch()
export default booleanSearch