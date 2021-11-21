export interface ContextParams {
  userId: number;
}

export interface CountryDTO {
  id: number;
  description?: string;
}

export interface PlanDTO {
  id: number;
  title: string;
  description: string;
  value?: number;
  expiration_days?: number;
}
