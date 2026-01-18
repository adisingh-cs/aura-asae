import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const WEBHOOK_URL = 'https://n8n-test-y4fo.onrender.com/webhook/0c47ffbf-4225-4dce-9c57-50bc6faf1e1b';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    
    // Extract server-side data from request headers
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('cf-connecting-ip') || 
                     req.headers.get('x-real-ip') || 
                     'unknown';
    
    const country = req.headers.get('cf-ipcountry') || 'unknown';
    const city = req.headers.get('cf-ipcity') || 'unknown';
    const region = req.headers.get('cf-region') || 'unknown';
    
    // Enrich data with server-side information
    const enrichedData = {
      ...body,
      server: {
        ip: clientIP,
        country,
        city,
        region,
        timestamp: new Date().toISOString(),
        user_agent: req.headers.get('user-agent') || 'unknown',
      }
    };

    console.log('Analytics event received:', JSON.stringify(enrichedData, null, 2));

    // Forward to webhook
    const webhookResponse = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enrichedData),
    });

    if (!webhookResponse.ok) {
      console.error('Webhook forward failed:', webhookResponse.status, await webhookResponse.text());
    } else {
      console.log('Analytics forwarded to webhook successfully');
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Analytics tracking error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
