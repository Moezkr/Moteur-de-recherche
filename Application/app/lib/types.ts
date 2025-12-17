
export interface Document {
    topic: string;
    title: string;
    description: string;
    url: string;
  }
  
 
  export interface SearchResult {
    document: Document;
    score: number;
  }