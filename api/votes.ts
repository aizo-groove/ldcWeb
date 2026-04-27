import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Redis } from "@upstash/redis";

const kv = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const VALID_ITEMS = ["tablets", "linux", "kds", "cloud", "multipos"];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method === "GET") {
    const counts = await Promise.all(
      VALID_ITEMS.map(async (id) => {
        const count = (await kv.get<number>(`votes:${id}`)) ?? 0;
        return [id, count];
      })
    );
    return res.json(Object.fromEntries(counts));
  }

  if (req.method === "POST") {
    const { id } = req.body as { id?: string };
    if (!id || !VALID_ITEMS.includes(id)) {
      return res.status(400).json({ error: "Invalid item" });
    }

    const ip =
      req.headers["x-forwarded-for"]?.toString().split(",")[0].trim() ??
      "unknown";
    const rateLimitKey = `rl:${ip}:${id}`;

    const alreadyVoted = await kv.get(rateLimitKey);
    if (alreadyVoted) {
      return res.status(429).json({ error: "Already voted" });
    }

    await kv.set(rateLimitKey, 1, { ex: 86400 });
    const newCount = await kv.incr(`votes:${id}`);
    return res.json({ id, count: newCount });
  }

  return res.status(405).end();
}
