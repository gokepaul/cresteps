import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  const reference = req.nextUrl.searchParams.get("reference");

  if (!secretKey) {
    return Response.json({ message: "Payment service not configured." }, { status: 500 });
  }

  if (!reference) {
    return Response.json({ message: "Missing reference." }, { status: 400 });
  }

  try {
    const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${secretKey}` },
    });

    const data = await res.json();

    if (!data.status || data.data.status !== "success") {
      return Response.json({ verified: false, message: "Payment not successful." });
    }

    return Response.json({
      verified: true,
      amount: data.data.amount / 100,
      email: data.data.customer.email,
      reference: data.data.reference,
      metadata: data.data.metadata,
    });
  } catch {
    return Response.json({ message: "Internal server error." }, { status: 500 });
  }
}
