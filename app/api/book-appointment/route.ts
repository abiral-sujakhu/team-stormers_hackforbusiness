import { createClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { user_email, doctor_id, doctor_name, date, time, type, notes } = body;

    if (!user_email || !doctor_id || !doctor_name || !date || !time || !type) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing required fields" }),
        { status: 400 }
      );
    }    // Check if appointment already exists
    const { data: existingAppointments, error: checkError } = await supabase
      .from("appointments")
      .select("id")
      .eq("user_email", user_email)
      .eq("doctor_id", doctor_id)
      .eq("date", date)
      .eq("time", time);

    if (checkError) {
      console.error("Error checking existing appointments:", checkError);
    }

    if (existingAppointments && existingAppointments.length > 0) {
      console.log("Duplicate appointment detected:", existingAppointments);
      return new Response(
        JSON.stringify({ success: false, message: "Appointment already exists for this date and time" }),
        { status: 400 }
      );
    }    console.log("Creating new appointment...");
    console.log("Appointment data:", {
      user_email,
      doctor_id,
      doctor_name,
      date,
      time,
      type,
      notes: notes || "",
      status: "upcoming",
    });
    
    const { error } = await supabase.from("appointments").insert([
      {
        user_email,
        doctor_id,
        doctor_name,
        date,
        time,
        type,
        notes: notes || "",
        status: "upcoming",
      },
    ]);    if (error) {
      console.error("Supabase insert error:", error);
      return new Response(
        JSON.stringify({ success: false, message: error.message }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Appointment booking error:", err);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: err instanceof Error ? err.message : "Server error" 
      }),
      { status: 500 }
    );
  }
}
