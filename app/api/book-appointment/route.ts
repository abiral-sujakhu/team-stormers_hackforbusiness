// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.SUPABASE_SERVICE_ROLE_KEY
// );

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { user_email, doctor_id, doctor_name, date, time, type, notes } = body;

//     if (!user_email || !doctor_id || !doctor_name || !date || !time || !type) {
//       return new Response(
//         JSON.stringify({ success: false, message: "Missing required fields" }),
//         { status: 400 }
//       );
//     }

//     const { error } = await supabase.from("appointments").insert([
//       {
//         user_email,
//         doctor_id,
//         doctor_name,
//         date,
//         time,
//         type,
//         notes: notes || "",
//         status: "upcoming",
//       },
//     ]);

//     if (error) {
//       return new Response(
//         JSON.stringify({ success: false, message: error.message }),
//         { status: 500 }
//       );
//     }

//     return new Response(JSON.stringify({ success: true }), { status: 200 });
//   } catch (err) {
//     return new Response(
//       JSON.stringify({ success: false, message: err.message || "Server error" }),
//       { status: 500 }
//     );
//   }
// }
