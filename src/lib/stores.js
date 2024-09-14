import {writable} from 'svelte/store';

export const gameState = writable("playing");
export const userUUID = writable('');
export const currentRow = writable(0);
export const currentCol = writable(0);
export const board = writable(
    Array.from({ length: 6 }, 
        () => Array.from({ length: 5 }, 
            () => ({ value: '', color: '' }))
    )
);
export const guessWord = writable('');
export const toast = writable({
    message: '',
    delay: 0
});
