// Demo types
export interface ContentGeneratorInput {
  topic: string;
  type: 'blog_post' | 'social_caption' | 'email';
  tone?: 'professional' | 'casual' | 'witty';
}

export interface ContentGeneratorOutput {
  title: string;
  content: string;
  hashtags?: string[];
  status: 'draft' | 'approved' | 'rejected';
}

export interface DocumentAnalysisInput {
  text: string;
  type: 'review' | 'document' | 'feedback';
}

export interface DocumentAnalysisOutput {
  sentiment: 'positive' | 'negative' | 'neutral' | 'mixed';
  sentimentScore: number;
  keyPoints: string[];
  suggestedResponse: string;
  topics: string[];
}

export interface MeetingNotesInput {
  transcript: string;
}

export interface MeetingNotesOutput {
  summary: string;
  actionItems: ActionItem[];
  decisions: string[];
  nextSteps: string[];
}

export interface ActionItem {
  task: string;
  owner: string;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
}

export interface LeadQualifierMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface LeadQualificationReport {
  score: number;
  tier: 'hot' | 'warm' | 'cold';
  companySize: string;
  budget: string;
  timeline: string;
  needs: string[];
  recommendation: string;
}

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
  saved: boolean;
}

// Database types
export interface DemoResult {
  id: string;
  demo_type: string;
  input_data: Record<string, unknown>;
  output_data: Record<string, unknown>;
  ip_hash: string;
  created_at: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  ai_analysis: Record<string, unknown>;
  ai_response: string;
  created_at: string;
}

export interface DemoAnalytics {
  id: string;
  demo_type: string;
  usage_count: number;
  date: string;
}

// API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
