import { json } from '@sveltejs/kit';
import { getWords } from '$lib/words.js';

export async function POST({request}) {
    const wordArray = await getWords();
    const { guessWord } = await request.json();
    if(wordArray.includes(guessWord)){
        return json(true);
    }
    return json(false);
}