import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function saveDemoResult(
  demoType: string,
  inputData: Record<string, unknown>,
  outputData: Record<string, unknown>,
  ipHash: string
) {
  const { error } = await supabase.from('demo_results').insert({
    demo_type: demoType,
    input_data: inputData,
    output_data: outputData,
    ip_hash: ipHash,
  });

  if (error) {
    console.error('Failed to save demo result:', error);
  }
}

export async function saveContact(
  name: string,
  email: string,
  company: string | null,
  message: string,
  aiAnalysis: Record<string, unknown>,
  aiResponse: string
) {
  const { error } = await supabase.from('contacts').insert({
    name,
    email,
    company,
    message,
    ai_analysis: aiAnalysis,
    ai_response: aiResponse,
  });

  if (error) {
    console.error('Failed to save contact:', error);
  }
}

export async function trackDemoUsage(demoType: string) {
  const today = new Date().toISOString().split('T')[0];

  const { data } = await supabase
    .from('demo_analytics')
    .select('id, usage_count')
    .eq('demo_type', demoType)
    .eq('date', today)
    .single();

  if (data) {
    await supabase
      .from('demo_analytics')
      .update({ usage_count: data.usage_count + 1 })
      .eq('id', data.id);
  } else {
    await supabase.from('demo_analytics').insert({
      demo_type: demoType,
      usage_count: 1,
      date: today,
    });
  }
}
