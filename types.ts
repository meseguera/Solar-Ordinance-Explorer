
export interface Ordinance {
  title: string;
  jurisdiction: string;
  summary: string;
  key_points: string[];
  source_url: string | null;
}

export interface GeminiResponse {
  ordinances: Ordinance[];
}
