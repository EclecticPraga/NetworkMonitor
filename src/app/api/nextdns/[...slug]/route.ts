import { NextResponse } from "next/server";

export async function fetchNextDns<T = any>(path: string, init?: RequestInit): Promise<T> {
  const url = `https://api.nextdns.io/profiles/${process.env.NEXTDNS_PROFILE_ID}/${path}`;

  const response = await fetch(
    url,
    {
      headers: {
        'Content-Type': 'application/json',
        "x-api-key": process.env.NEXTDNS_API_KEY || '',
      },
      ...init
    }
  );

  return await response.json() as T;
}

export async function GET(request: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const path = (await params).slug.join('/');

  const data = await fetchNextDns(`${path}?${request.url.split('?')[1]}`);
  return NextResponse.json(data);
}