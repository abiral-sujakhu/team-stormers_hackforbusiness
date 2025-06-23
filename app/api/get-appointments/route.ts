import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { user_email } = body;

    if (!user_email) {
      return new Response(
        JSON.stringify({ success: false, message: "User email is required" }),
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("user_email", user_email)
      .order("date", { ascending: true });

    if (error) {
      console.error("Get appointments error:", error);
      return new Response(
        JSON.stringify({ success: false, message: error.message }), 
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, appointments: data || [] }), 
      { status: 200 }
    );
  } catch (err) {
    console.error("Get appointments error:", err);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: err instanceof Error ? err.message : "Server error" 
      }),
      { status: 500 }
    );
  }
}
