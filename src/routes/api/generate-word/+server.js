import { json } from '@sveltejs/kit';
import {v4 as generateUUID} from 'uuid';
import { getWords } from '$lib/words.js';
import { saveUser } from '$lib/db-connection.js';

export async function GET() {
    const wordArray = await getWords();
    const randomWord = wordArray[Math.floor(Math.random() * wordArray.length)];
    const uuid = generateUUID();
    saveUser(uuid, randomWord);
    return json(uuid);
}