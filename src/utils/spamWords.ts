export interface SpamWord {
  word: string;
  category: 'urgency' | 'shady' | 'overpromise' | 'money' | 'unnatural';
}

export const spamWords: SpamWord[] = [
  // Urgency words
  { word: 'asap', category: 'urgency' },
  { word: 'urgent', category: 'urgency' },
  { word: 'immediately', category: 'urgency' },
  { word: 'limited time', category: 'urgency' },
  { word: 'expires soon', category: 'urgency' },
  { word: 'act now', category: 'urgency' },
  { word: 'don\'t miss out', category: 'urgency' },
  { word: 'hurry up', category: 'urgency' },
  { word: 'last chance', category: 'urgency' },
  { word: 'urgently', category: 'urgency' },
  { word: 'time sensitive', category: 'urgency' },
  { word: 'urgent action required', category: 'urgency' },
  { word: 'urgent notice', category: 'urgency' },
  { word: 'urgent request', category: 'urgency' },
  { word: 'urgent response needed', category: 'urgency' },
  
  // Shady words
  { word: 'guarantee', category: 'shady' },
  { word: 'private', category: 'shady' },
  { word: 'dear friend', category: 'shady' },
  { word: 'privately owned funds', category: 'shady' },
  { word: 'confidential', category: 'shady' },
  { word: 'secret', category: 'shady' },
  { word: 'exclusive', category: 'shady' },
  { word: 'privileged', category: 'shady' },
  { word: 'restricted', category: 'shady' },
  { word: 'classified', category: 'shady' },
  { word: 'undisclosed', category: 'shady' },
  { word: 'private and confidential', category: 'shady' },
  { word: 'strictly confidential', category: 'shady' },
  { word: 'for your eyes only', category: 'shady' },
  { word: 'top secret', category: 'shady' },
  
  // Overpromise words
  { word: 'guaranteed', category: 'overpromise' },
  { word: 'long term investments', category: 'overpromise' },
  { word: 'guaranteed 5%', category: 'overpromise' },
  { word: 'risk-free', category: 'overpromise' },
  { word: 'no risk', category: 'overpromise' },
  { word: 'guaranteed returns', category: 'overpromise' },
  { word: 'double your money', category: 'overpromise' },
  { word: 'triple your investment', category: 'overpromise' },
  { word: '100% guaranteed', category: 'overpromise' },
  { word: 'no obligation', category: 'overpromise' },
  { word: 'free trial', category: 'overpromise' },
  { word: 'lifetime guarantee', category: 'overpromise' },
  { word: 'money-back guarantee', category: 'overpromise' },
  { word: 'satisfaction guaranteed', category: 'overpromise' },
  { word: 'guaranteed success', category: 'overpromise' },
  
  // Money related words
  { word: 'investment', category: 'money' },
  { word: 'funds', category: 'money' },
  { word: 'per annum', category: 'money' },
  { word: 'roi', category: 'money' },
  { word: 'finance', category: 'money' },
  { word: 'inheritance', category: 'money' },
  { word: 'lottery', category: 'money' },
  { word: 'prize', category: 'money' },
  { word: 'million', category: 'money' },
  { word: 'billion', category: 'money' },
  { word: 'fortune', category: 'money' },
  { word: 'wealth', category: 'money' },
  { word: 'profit', category: 'money' },
  { word: 'earnings', category: 'money' },
  { word: 'dividend', category: 'money' },
  
  // Unnatural language
  { word: 'please answer', category: 'unnatural' },
  { word: 'kindly', category: 'unnatural' },
  { word: 'dear sir/madam', category: 'unnatural' },
  { word: 'greetings', category: 'unnatural' },
  { word: 'good day', category: 'unnatural' },
  { word: 'i hope this email finds you well', category: 'unnatural' },
  { word: 'i am writing to inform you', category: 'unnatural' },
  { word: 'this is to inform you', category: 'unnatural' },
  { word: 'please be informed', category: 'unnatural' },
  { word: 'i would like to bring to your attention', category: 'unnatural' },
  { word: 'i am pleased to inform you', category: 'unnatural' },
  { word: 'i regret to inform you', category: 'unnatural' },
  { word: 'i trust this email finds you well', category: 'unnatural' },
  { word: 'i am reaching out to you', category: 'unnatural' },
  { word: 'i hope you are doing well', category: 'unnatural' }
];

export interface SpamAnalysis {
  score: 'Very Poor' | 'Poor' | 'Fair' | 'Good' | 'Excellent';
  wordCount: number;
  readTime: string;
  categories: {
    urgency: number;
    shady: number;
    overpromise: number;
    money: number;
    unnatural: number;
  };
  foundWords: {
    word: string;
    category: string;
  }[];
}

export function analyzeText(text: string): SpamAnalysis {
  const words = text.toLowerCase().split(/\s+/);
  const wordCount = words.length;
  
  const foundWords: { word: string; category: string }[] = [];
  const categories = {
    urgency: 0,
    shady: 0,
    overpromise: 0,
    money: 0,
    unnatural: 0
  };
  
  // Check for spam words
  spamWords.forEach(spamWord => {
    if (text.toLowerCase().includes(spamWord.word.toLowerCase())) {
      foundWords.push({
        word: spamWord.word,
        category: spamWord.category
      });
      categories[spamWord.category]++;
    }
  });
  
  // Calculate score
  const totalSpamWords = Object.values(categories).reduce((a, b) => a + b, 0);
  const score = 
    totalSpamWords === 0 ? 'Excellent' :
    totalSpamWords <= 2 ? 'Good' :
    totalSpamWords <= 4 ? 'Fair' :
    totalSpamWords <= 6 ? 'Poor' : 'Very Poor';
  
  // Calculate read time
  const readTime = `about ${Math.max(1, Math.ceil(wordCount / 200))} minute${wordCount > 200 ? 's' : ''}`;
  
  return {
    score,
    wordCount,
    readTime,
    categories,
    foundWords
  };
} 