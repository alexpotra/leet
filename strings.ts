// 01. Find word count
type WordCount = { word: string; count: number };
function wordCount(words: string[]): WordCount[] {
  const result: WordCount[] = [];
  const wordMap = new Map<string, number>();

  // Add entries to map to remove duplicates
  for (const word of words) {
    // Initialize entry if needed
    if (!wordMap.has(word)) {
      wordMap.set(word, 0);
    }

    const newCount = wordMap.get(word) + 1;
    wordMap.set(word, newCount);
  }

  // Construct the result
  wordMap.forEach((count, word) => {
    result.push({ word, count });
  });

  return result;
}

console.log(`01 - Word Count: ${JSON.stringify(wordCount(["I", "like", "to", "code", "like", "a", "lot"]))}`);

// 02. Find substring with longest unique characters
function longestUniqueSubstring(s: string): number {
  let result = 0;
  let left = 0;

  const currentSubstringChars: { [key: string]: number } = {};

  // Use a map to keep track of each character in the current substring
  for (let right = 0; right < s.length; right++) {
    const char = s.charAt(right);
    currentSubstringChars[char] = (currentSubstringChars[char] ?? 0) + 1;

    // If we encountered a duplicate start removing from the left until we skip it
    while (currentSubstringChars[char] > 1) {
      const removedChar = s.charAt(left++);
      currentSubstringChars[removedChar]--;
    }

    // Update our current found length if bigger
    result = Math.max(result, right - left + 1);
  }

  return result;
}
console.log(`02 - Longest unique substring: ${longestUniqueSubstring("aabcdea")}`);

// 03. Convert an integer to Roman numeral
function intToRoman(n: number): string {
  let result = "";

  const addParticle = (count: number, one: string, five: string, ten: string) => {
    switch (count) {
      case 0:
        return "";
      case 1:
        return one;
      case 2:
        return one + one;
      case 3:
        return one + one + one;
      case 4:
        return one + five;
      case 5:
        return five;
      case 6:
        return five + one;
      case 7:
        return five + one + one;
      case 8:
        return five + one + one + one;
      case 9:
        return one + ten;
      default:
        return "";
    }
  };

  // Thousands
  if (n >= 4000) {
    return "";
  }

  // TODO: Make a loop
  let units = Math.floor(n / 1000);
  n = n % 1000;
  result += addParticle(units, "M", "", "");

  units = Math.floor(n / 100);
  n = n % 100;
  result += addParticle(units, "C", "D", "M");

  units = Math.floor(n / 10);
  n = n % 10;
  result += addParticle(units, "X", "L", "C");

  units = n;
  result += addParticle(units, "I", "L", "X");

  return result;
}

console.log(`03 - Roman numerals 3033 = ${intToRoman(3033)}`);

// 04 - Roman to integer
function romanToInt(n: string): number {
  let result = 0;
  const numerals = {
    M: 1000,
    D: 500,
    C: 100,
    L: 50,
    X: 10,
    V: 5,
    I: 1,
  };

  let i = 0;
  while (i < n.length) {
    let value = numerals[n.charAt(i)] ?? 0;
    if (i < n.length - 1) {
      const nextValue = numerals[n.charAt(i + 1)] ?? 0;
      if (nextValue > value) {
        value = nextValue - value;
        i++;
      }
    }
    result += value;
    i++;
  }

  return result;
}

// 05 - Longest common prefix
function longestPrefix(words: string[]): string {
  let result = "";
  let index = 0;
  let found = true;

  while (found) {
    let current = "";

    // Try to find the same character across all words
    for (let i = 0; i < words.length; i++) {
      // Check if current word hasn't finished
      if (index < words[i].length) {
        // Check if not the first word in list
        if (current) {
          if (words[i].charAt(index) != current) {
            found = false;
            break;
          }
        } else {
          // Initialize for first word
          current = words[i].charAt(index);
        }
      } else {
        found = false;
        break;
      }
    }

    if (found) {
      result += current;
    }

    index++;
  }

  return result;
}
console.log(`05 - Longest prefix ${longestPrefix(["flower", "flow", "flock"])}`);

// 06 - Valid parentheses
function validParen(s: string): boolean {
  const open = "{[(";
  const closed = {
    "{": "}",
    "[": "]",
    "(": ")",
  };
  const stack = [];

  for (let i = 0; i < s.length; i++) {
    const current = s.charAt(i);
    if (open.indexOf(current) >= 0) {
      stack.push(closed[current]);
    } else {
      const match = stack.pop();
      if (current !== match) {
        return false;
      }
    }
  }

  return true;
}
console.log(`06 - Valid parentheses ${validParen("{[()]}{}")}`);

// 07 - Full justify
function fullJustify(words: string[], maxWidth: number): string[] {
  const result: string[] = [];

  let firstWord = 0;
  let lastWord = 0;
  let length = 0;

  while (lastWord < words.length) {
    length = 0;
    while (lastWord < words.length) {
      length += words[lastWord].length;
      if (length < maxWidth) {
        lastWord++;
      } else {
        break;
      }
    }

    // Remove extra words to accommodate word breaks
    while (length + (lastWord - firstWord) > maxWidth && lastWord > firstWord) {
      length -= words[lastWord].length;
      lastWord--;
    }

    if (lastWord < firstWord) {
      // Can't justify since the current word doesn't fit
      return [];
    }

    let line = "";
    const breaks = lastWord - firstWord;
    const minSpace = Math.floor((maxWidth - length) / breaks);
    let extras = (maxWidth - length) % breaks;

    while (firstWord < lastWord) {
      line += words[firstWord];

      // Check if last line or not
      if (lastWord < words.length) {
        line += " ".repeat(minSpace);
        if (extras > 0) {
          line += " ";
          extras--;
        }
      } else {
        line += " ";
      }

      firstWord++;
    }

    line += words[firstWord++];
    result.push(line);

    lastWord = firstWord;
  }

  return result;
}
