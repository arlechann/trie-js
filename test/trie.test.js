import assert from 'node:assert';
import { Trie } from '../src/trie.js';

const assertStrictEqual = (expect, acctual) => {
    assert.strictEqual(expect, acctual, `Expect ${JSON.stringify(expect)}, but accutualy get ${JSON.stringify(acctual)}.`);
}

const test = () => {
    console.log('Start tests.')

    const trie = new Trie;
    const dictTexts = ['', 'a', 'abcde', 'javascript', 'ジャバスクリプト', '🤔'];
    dictTexts.forEach(text => trie.insert(text));

    const testCases = [
        { text: '', expect: '' },
        { text: 'a', expect: 'a' },
        { text: 'javascript', expect: 'javascript' },
        { text: 'ジャバスクリプト', expect: 'ジャバスクリプト' },
        { text: '🤔', expect: '🤔' },
        { text: 'bcd', expect: undefined },
        { text: 'abc', expect: undefined },
        { text: 'java', expect: undefined },
        { text: 'script', expect: undefined },
        { text: 'じゃばすくりぷと', expect: undefined },
        { text: '🤗', expect: undefined },
    ];
    testCases.forEach(({ text, expect }) => {
        assertStrictEqual(expect, trie.find(text));
    });

    console.log('All tests is suceeded.')
}

test();