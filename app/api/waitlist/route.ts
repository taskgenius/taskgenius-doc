import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import { z } from "zod";

/**
 * 閭楠岃瘉 Schema
 * 浣跨敤 Zod 杩涜涓ユ牸鐨勭被鍨嬪拰鏍煎紡楠岃瘉
 */
const emailSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .min(5, "Email too short")
    .max(255, "Email too long")
    .toLowerCase()
    .trim(),
});

/**
 * POST /api/waitlist
 * 鎻愪氦閭鍒扮瓑鍊欏垪琛?
 *
 * @param request - Next.js Request 瀵硅薄
 * @returns JSON 鍝嶅簲锛屽寘鍚垚鍔?閿欒淇℃伅
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();

    // 1. 瑙ｆ瀽璇锋眰浣?
    const body = await request.json();

    // 2. 楠岃瘉閭鏍煎紡锛堝鎴风 + 鏈嶅姟绔弻閲嶉獙璇侊級
    const validation = emailSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Invalid email address",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { email } = validation.data;

    // 3. 妫€鏌ラ偖绠辨槸鍚﹀凡瀛樺湪锛堥槻閲嶅锛?
    const { data: existingEntry, error: checkError } = await supabase
      .from("waitlist")
      .select("email")
      .eq("email", email)
      .maybeSingle();

    if (checkError) {
      console.error("Database query error:", checkError);
      return NextResponse.json(
        { error: "Database error occurred" },
        { status: 500 }
      );
    }

    if (existingEntry) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 } // 409 Conflict
      );
    }

    // 4. 鎻掑叆鏂伴偖绠卞埌鏁版嵁搴?
    const { data, error: insertError } = await supabase
      .from("waitlist")
      .insert({
        email,
        metadata: {
          source: "desktop-waitlist",
          userAgent: request.headers.get("user-agent") || "unknown",
          submittedAt: new Date().toISOString(),
        },
      })
      .select()
      .single();

    if (insertError) {
      console.error("Database insert error:", insertError);

      // 澶勭悊鍞竴绾︽潫鍐茬獊锛堝苟鍙戣姹傚満鏅級
      if (insertError.code === "23505") {
        return NextResponse.json(
          { error: "Email already registered" },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: "Failed to register email" },
        { status: 500 }
      );
    }

    // 5. 鎴愬姛鍝嶅簲
    return NextResponse.json(
      {
        success: true,
        message: "Successfully joined waitlist",
        data: {
          id: data.id,
          email: data.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/waitlist
 * 鑾峰彇绛夊€欏垪琛ㄧ粺璁′俊鎭紙鍙€夊姛鑳斤級
 */
export async function GET() {
  try {
    const supabase = getSupabaseClient();

    const { count, error } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("Database count error:", error);
      return NextResponse.json(
        { error: "Failed to fetch stats" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      total: count || 0,
    });
  } catch (error) {
    console.error("Waitlist stats error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
