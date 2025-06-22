// import { NextRequest } from "next/server";
// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.SUPABASE_SERVICE_ROLE_KEY!
// );

// export async function POST(req: NextRequest) {
//   const body = await req.json();
//   const { user_email } = body;

//   const { data, error } = await supabase
//     .from("appointments")
//     .select("*")
//     .eq("user_email", user_email);

//   if (error) {
//     return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
//   }
//   return new Response(JSON.stringify({ success: true, appointments: data }), { status: 200 });
// }
