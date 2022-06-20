import { isValidRequest } from "@sanity/webhook";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

const secret = process.env.SANITY_WEBHOOK_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Must be POST request." });
  }

  if (!isValidRequest(req, secret!)) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  try {
    const {
      body: { type, slug, categorySlug },
    } = req;

    switch (type) {
      case "recipe":
        await res.unstable_revalidate(`/lista/${categorySlug}`);
        await res.unstable_revalidate(`/receita/${slug}`);
        return res.json({ message: `Revalidated "${type}": "${slug}"` });
      case "category":
        await res.unstable_revalidate(`/lista/${slug}`);
        await res.unstable_revalidate("/");
        return res.json({ message: `Revalidated "${type}"` });
    }

    return res.json({ message: "Unmanaged type" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error revalidating." });
  }
}
