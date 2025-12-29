import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface QuizSubmission {
  email: string;
  answers: Record<string, any>;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { email, answers }: QuizSubmission = await req.json();

    if (!email || !answers) {
      return new Response(
        JSON.stringify({ error: "Email and answers are required" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { error: dbError } = await supabase
      .from("quiz_submissions")
      .insert({ email, answers });

    if (dbError) {
      throw new Error(`Database error: ${dbError.message}`);
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY not configured");
    }

    const answersHtml = Object.entries(answers)
      .map(([question, answer]) => `
        <div style="margin-bottom: 20px;">
          <strong style="color: #333;">${question}</strong><br>
          <span style="color: #666;">${typeof answer === 'object' ? JSON.stringify(answer) : answer}</span>
        </div>
      `)
      .join("");

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Quiz Submission</h2>
        <p style="color: #666; margin-bottom: 30px;">
          <strong>Email:</strong> ${email}<br>
          <strong>Submitted:</strong> ${new Date().toLocaleString()}
        </p>
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px;">
          <h3 style="color: #333; margin-top: 0;">Quiz Answers:</h3>
          ${answersHtml}
        </div>
      </div>
    `;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "AI Coachbox <onboarding@resend.dev>",
        to: "coachme@gabrielomat.com",
        subject: `New Quiz Submission from ${email}`,
        html: emailHtml,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      throw new Error(`Resend API error: ${errorText}`);
    }

    const resendData = await resendResponse.json();

    return new Response(
      JSON.stringify({ success: true, emailId: resendData.id }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});