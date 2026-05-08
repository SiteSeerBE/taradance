import { NextResponse } from 'next/server';

const TOKEN_LENGTH = 8;

const hashString = (value: string): string => {
	let hash = 5381;
	for (let i = 0; i < value.length; i++) {
		hash = (hash * 33) ^ value.charCodeAt(i);
	}
	return Math.abs(hash >>> 0).toString(36).toUpperCase();
};

export async function GET() {
	const accessSecret = process.env.MUSIC_ACCESS_SECRET;
	const targetUrl = process.env.MUSIC_TARGET_URL;

	if (!accessSecret || !targetUrl) {
		return NextResponse.json({ error: 'Music service not configured' }, { status: 500 });
	}

	const minuteBucket = Math.floor(Date.now() / 60000);
	const token = hashString(`${minuteBucket}:${accessSecret}`)
		.padStart(TOKEN_LENGTH, '0')
		.slice(0, TOKEN_LENGTH);

	return NextResponse.redirect(`${targetUrl}?id=${token}`);
}
