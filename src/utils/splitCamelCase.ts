export const splitCamelCase = (input: string): string => {
    const words: string[] = [];

    let currentWord: string = '';

    for (let i = 0; i < input.length; i++) {
        const char = input[i];

        if (char === char.toUpperCase() && currentWord !== '') {
            words.push(currentWord);
            currentWord = '';
        }

        currentWord += char;
    }

    if (currentWord !== '') {
        words.push(currentWord);
    }

    return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
};
