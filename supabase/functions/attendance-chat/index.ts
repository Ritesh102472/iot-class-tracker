import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.76.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch attendance data to provide context
    const { data: attendanceData, error: attendanceError } = await supabase
      .from('attendance')
      .select('id, date, status, student_id, students(name, roll)')
      .order('date', { ascending: false })
      .limit(100);

    if (attendanceError) {
      console.error('Error fetching attendance:', attendanceError);
    }

    // Fetch students data
    const { data: studentsData, error: studentsError } = await supabase
      .from('students')
      .select('*')
      .order('name', { ascending: true });

    if (studentsError) {
      console.error('Error fetching students:', studentsError);
    }

    // Prepare context for the AI
    const contextMessage = `You are an AI assistant for a Smart Attendance Management System. You have access to the following data:

STUDENTS:
${JSON.stringify(studentsData, null, 2)}

RECENT ATTENDANCE RECORDS (last 100):
${JSON.stringify(attendanceData, null, 2)}

Help users with queries about:
- Student attendance records
- Attendance statistics and percentages
- Finding specific student information
- Analyzing attendance patterns
- Answering questions about present/absent students

Always be concise, helpful, and accurate. Format dates clearly and provide percentages when relevant.`;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: contextMessage },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', response.status, errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ response: aiResponse }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in attendance-chat function:', error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
