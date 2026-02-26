export interface ContactFormInput {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export interface ContactFormOutput {
  aiAnalysis: {
    intent: string;
    urgency: 'high' | 'medium' | 'low';
    topics: string[];
  };
  personalizedResponse: string;
}

// API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
