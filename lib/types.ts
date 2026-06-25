export interface AnalysisResult {
  fileName?: string;
  imageUrl?: string;

  verdict: string;
  confidence: number;
  confidence_level: string;
  metadata: any;
  reasons: any[];
  indicators: any[];
}