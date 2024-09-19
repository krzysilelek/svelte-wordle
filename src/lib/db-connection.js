import Database  from 'better-sqlite3';

const database = new Database(':memory:');

database.exec(`
  CREATE TABLE data(
    UUID TEXT,
    word TEXT
  )
`);

const insert = database.prepare('INSERT INTO data (UUID, word) VALUES (?, ?)');
const query = database.prepare('SELECT word FROM data WHERE UUID = ?');


export function saveUser(userUUID, word){
    insert.run(userUUID, word);
}

export function readUserWord(UUID){
    return query.get(UUID)?.word;
}
