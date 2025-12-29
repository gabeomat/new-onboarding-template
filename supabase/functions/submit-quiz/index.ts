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

    const userName = answers.name || "there";

    const answersHtml = Object.entries(answers)
      .filter(([question]) => question !== 'name')
      .map(([question, answer]) => `
        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 16px;">
          <div style="font-weight: 700; color: #1a1a1a; margin-bottom: 8px; font-size: 14px;">
            ${question}
          </div>
          <div style="color: #ff6b35; font-size: 15px;">
            ${typeof answer === 'object' ? JSON.stringify(answer) : answer}
          </div>
        </div>
      `)
      .join("");

    const userConfirmationHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="font-size: 32px; font-weight: 700; color: #1a1a1a; margin-bottom: 24px;">
          Hey ${userName}, you're in! 🎉
        </h1>

        <p style="font-size: 16px; color: #4a4a4a; line-height: 1.6; margin-bottom: 32px;">
          Give me 24 hours and I'll send a Loom video showing you exactly what to focus on in the community to hit the ground running!
        </p>

        <div style="background: linear-gradient(135deg, #a8dadc 0%, #f1c0e8 100%); padding: 32px; border-radius: 16px; margin-bottom: 32px;">
          <h2 style="font-size: 24px; font-weight: 700; color: #1a1a1a; margin-bottom: 20px; margin-top: 0;">
            Your Quiz Responses:
          </h2>
          ${answersHtml}
        </div>

        <div style="margin-bottom: 32px;">
          <h3 style="font-size: 20px; font-weight: 700; color: #1a1a1a; margin-bottom: 16px;">
            What to do now:
          </h3>
          <ol style="color: #4a4a4a; line-height: 1.8; padding-left: 20px;">
            <li style="margin-bottom: 12px;">If you don't have the Skool App downloaded on your phone, do it now. Just search "Skool" on your iPhone or Android.</li>
            <li style="margin-bottom: 12px;">Introduce yourself in the community to get to level 2 right away!</li>
            <li style="margin-bottom: 12px;">Browse around the classroom, beginning with the Start Here module.</li>
          </ol>
        </div>

        <div style="text-align: center; margin-bottom: 32px;">
          <a href="https://www.skool.com/futureproof" style="display: inline-block; background: linear-gradient(90deg, #ff6b6b 0%, #ff8c42 100%); color: white; text-decoration: none; padding: 16px 32px; border-radius: 30px; font-weight: 600; font-size: 16px;">
            Take me to Futureproof
          </a>
        </div>

        <p style="font-size: 15px; color: #666; line-height: 1.6; font-style: italic; margin-bottom: 24px;">
          I'm really excited you're here and can't wait to help you evolve your business, using AI as an amplifier, NOT a replacement for you and your genius.
        </p>

        <p style="font-size: 14px; color: #999; margin-top: 32px;">
          Questions? Just reply to this email.
        </p>
      </div>
    `;

    const adminAnswersHtml = Object.entries(answers)
      .map(([question, answer]) => `
        <div style="margin-bottom: 20px;">
          <strong style="color: #333;">${question}</strong><br>
          <span style="color: #666;">${typeof answer === 'object' ? JSON.stringify(answer) : answer}</span>
        </div>
      `)
      .join("");

    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Quiz Submission</h2>
        <p style="color: #666; margin-bottom: 30px;">
          <strong>Email:</strong> ${email}<br>
          <strong>Submitted:</strong> ${new Date().toLocaleString()}
        </p>
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px;">
          <h3 style="color: #333; margin-top: 0;">Quiz Answers:</h3>
          ${adminAnswersHtml}
        </div>
      </div>
    `;

    const userEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Gabriel from AI Coachbox <onboarding@resend.dev>",
        to: email,
        subject: `Hey ${userName}, you're in! 🎉`,
        html: userConfirmationHtml,
      }),
    });

    if (!userEmailResponse.ok) {
      const errorText = await userEmailResponse.text();
      console.error(`Failed to send confirmation email to user: ${errorText}`);
    }

    const adminEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "AI Coachbox <onboarding@resend.dev>",
        to: "coachme@gabrielomat.com",
        subject: `New Quiz Submission from ${email}`,
        html: adminEmailHtml,
      }),
    });

    if (!adminEmailResponse.ok) {
      const errorText = await adminEmailResponse.text();
      console.error(`Failed to send admin notification: ${errorText}`);
    }

    const resendData = await userEmailResponse.json();

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