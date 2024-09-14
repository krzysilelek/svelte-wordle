import { readFile, writeFile } from 'fs/promises';

const filepath = 'src/lib/data/db.json';
let db;

export async function reloadDB(){
    const fileContent = await readFile(filepath, 'utf-8');
    try{    
        db = JSON.parse(fileContent);
    }catch{
        db = JSON.parse('[]');
    }
}

export async function saveUser(userUUID, word){
    await reloadDB();
    const newUser = {
        UUID: userUUID,
        word: word
    }
    db.push(newUser);
    await writeFile(filepath, JSON.stringify(db));
}

export async function readUserWord(UUID){
    await reloadDB();
    const user = db.find(user => user.UUID == UUID);

    if(!user){
        return '';
    }

    return user.word;
}
