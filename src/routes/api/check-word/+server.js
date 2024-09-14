import { json } from '@sveltejs/kit';
import { readUserWord } from '$lib/db-connection.js';


export async function POST({request}) {
    const { UUID, guessWord } = await request.json();
    const correctWord = await readUserWord(UUID);
    const colors = new Array(5);

    for(let i = 0; i<correctWord.length; i++){
        if(guessWord[i] === correctWord[i]){
            colors[i] = 'green';
        }else if(correctWord.includes(guessWord[i])){
            colors[i] = 'yellow';
        }else{
            colors[i] = 'gray';
        }
    }
    return json(colors);
}