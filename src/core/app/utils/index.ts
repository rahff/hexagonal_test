import {v4 as uuid} from 'uuid';

export const generateId = (): string => uuid();

export const generateRandom = (): number => Math.floor(Math.random() * 150);

export const generateRandomString = (length: number): string => {
    let string: string = "";
    for (let index = 0; index <length; index++) {
        const seq = [generateRandom(), generateRandom(), generateRandom()]
       string += String.fromCharCode(...seq);
    }
    return string.trim();
}