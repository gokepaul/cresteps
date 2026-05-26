import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    return Response.json(
      { message: "Payment service not configured. Please add PAYSTACK_SECRET_KEY." },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const { email, amount, metadata, callback_url } = body;

    if (!email || !amount) {
      return Response.json({ message: "Email and amount are required." }, { status: 400 });
    }

    const paystackRes = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, amount, metadata, callback_url }),
    });

    const data = await paystackRes.json();

    if (!data.status) {
      return Response.json({ message: data.message ?? "Paystack error." }, { status: 500 });
    }

    return Response.json({
      authorization_url: data.data.authorization_url,
      reference: data.data.reference,
    });
  } catch {
    return Response.json({ message: "Internal server error." }, { status: 500 });
  }
}
