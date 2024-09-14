import { readFile } from 'fs/promises';

const filepath = 'src/lib/data/available-words.txt';

export async function getWords(){
    const words = await readFile(filepath, 'utf-8');
    const wordsArray = words.split('\n').map(word => word.trim().toUpperCase());
    return wordsArray;
}
