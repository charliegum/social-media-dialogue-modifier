import React, { useState, useRef } from 'react';

// Define types
interface Comment {
  id: number;
  role: 'original' | 'responder';
  text: string;
}

interface Variation {
  originalPost: string;
  comments: Comment[];
}

type LeetMapType = {
  [key: string]: string[];
};

type AlgospeakReplacementsType = {
  [key: string]: string[];
};

type TypoPattern = {
  pattern: string;
  replacement: string;
};

type PunctuationVariation = {
  from: string;
  to: string[];
};

const DialogueModifierGenerator = () => {
  // State for original post
  const [originalPost, setOriginalPost] = useState<string>('');
  
  // State for comments
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, role: 'original', text: '' },
    { id: 2, role: 'responder', text: '' },
    { id: 3, role: 'original', text: '' },
    { id: 4, role: 'responder', text: '' },
    { id: 5, role: 'original', text: '' },
    { id: 6, role: 'responder', text: '' },
    { id: 7, role: 'original', text: '' },
    { id: 8, role: 'responder', text: '' },
    { id: 9, role: 'original', text: '' },
    { id: 10, role: 'responder', text: '' },
  ]);
  
  // Modification settings
  const [numVariations, setNumVariations] = useState<number>(5);
  const [leetLevel, setLeetLevel] = useState<number>(20);
  const [algoLevel, setAlgoLevel] = useState<number>(20);
  const [emojiLevel, setEmojiLevel] = useState<number>(40);
  const [typoLevel, setTypoLevel] = useState<number>(15);
  const [capitalLevel, setCapitalLevel] = useState<number>(10);
  const [punctuationLevel, setPunctuationLevel] = useState<number>(30);
  
  // Generated content
  const [generatedVariations, setGeneratedVariations] = useState<Variation[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  
  // Ref for scrolling to results
  const resultsRef = useRef<HTMLDivElement>(null);

  // Handler for text input changes
  const handleTextChange = (id: number, text: string): void => {
    setComments(comments.map(comment => 
      comment.id === id ? { ...comment, text } : comment
    ));
  };

  // Handler for role changes
  const handleRoleChange = (id: number, role: 'original' | 'responder'): void => {
    setComments(comments.map(comment => 
      comment.id === id ? { ...comment, role } : comment
    ));
  };

  // Leet speak character maps (minimal to moderate replacements)
  const leetMap: LeetMapType = {
    'a': ['4', '@', 'а', 'α', 'a'],
    'b': ['b', '8', 'ь', 'в', 'b'],
    'c': ['c', 'с', '¢', 'c', 'c'],
    'd': ['d', 'ꓒ', 'ⅾ', 'd', 'd'],
    'e': ['3', 'е', 'ε', 'e', 'e'],
    'f': ['f', 'ƒ', 'f', 'f', 'f'],
    'g': ['g', '9', 'ϧ', 'g', 'g'],
    'h': ['h', 'н', 'ʜ', 'h', 'h'],
    'i': ['1', 'і', '!', 'i', 'i'],
    'j': ['j', 'ј', 'j', 'j', 'j'],
    'k': ['k', 'κ', 'к', 'k', 'k'],
    'l': ['l', '1', 'ӏ', 'l', 'l'],
    'm': ['m', 'м', 'ʍ', 'm', 'm'],
    'n': ['n', 'п', 'ɴ', 'n', 'n'],
    'o': ['0', 'о', 'օ', 'o', 'o'],
    'p': ['p', 'р', 'ρ', 'p', 'p'],
    'q': ['q', 'q', 'q', 'q', 'q'],
    'r': ['r', 'г', 'ʀ', 'r', 'r'],
    's': ['s', '$', 'ѕ', 's', 's'],
    't': ['t', 'т', '†', 't', 't'],
    'u': ['u', 'υ', 'ц', 'u', 'u'],
    'v': ['v', 'ѵ', 'v', 'v', 'v'],
    'w': ['w', 'ш', 'ԝ', 'w', 'w'],
    'x': ['x', 'х', '×', 'x', 'x'],
    'y': ['y', 'у', 'γ', 'y', 'y'],
    'z': ['z', 'z', 'ᴢ', 'z', 'z']
  };

  // Algospeak word replacements (mostly very subtle replacements)
  const algospeakReplacements: AlgospeakReplacementsType = {
    'sex': ['seggs', 's3x', 'sx', 'intimacy', 'adult fun'],
    'sexual': ['seggsy', 'adult', 'romantic', 'spicy', 'intimate'],
    'porn': ['spicy content', 'adult content', 'explicit content', 'mature content', 'nsfw'],
    'money': ['m0ney', 'funds', 'cash', 'earnings', 'income'],
    'earn': ['e4rn', 'make', 'receive', 'gain', 'get'],
    'bonus': ['b0nus', 'extra', 'reward', 'gift', 'incentive'],
    'profit': ['pr0fit', 'gain', 'return', 'yield', 'earnings'],
    'win': ['w1n', 'succeed', 'triumph', 'achieve', 'score'],
    'free': ['fr33', 'no cost', 'complementary', 'gratis', 'zero cost'],
    'gambling': ['gaming', 'playing', 'wagering', 'betting', 'chance games'],
    'casino': ['gaming site', 'entertainment platform', 'game center', 'play zone', 'fun house'],
    'bet': ['wager', 'stake', 'play', 'try', 'attempt'],
    'investment': ['opportunity', 'venture', 'placement', 'allocation', 'commitment'],
    'opportunity': ['chance', 'opening', 'prospect', 'occasion', 'potential'],
    'fantastic': ['amazing', 'incredible', 'wonderful', 'awesome', 'great'],
    'facebook': ['social media', 'platform', 'social site', 'community', 'online space'],
    'instagram': ['photo platform', 'social app', 'image sharing', 'visual media', 'social network'],
    'bank': ['account', 'institution', 'facility', 'repository', 'depository'],
    'deposit': ['transfer', 'add', 'place', 'put in', 'contribute'],
    'payment': ['transaction', 'transfer', 'remittance', 'settlement', 'contribution']
  };

  // Popular emojis - subtle and common ones
  const emojis: string[] = [
    '👍', '🙌', '✨', '👏', '😊', '🎉', '😃', '👀', '💪', '🤔',
    '😂', '🙏', '😎', '👊', '🚀', '💯', '🔥', '👌', '😁', '💡',
    '🌟', '💪', '👋', '🙂', '👇', '👆', '💭', '👉', '💖', '🤩'
  ];

  // Common typo patterns - subtle ones that look like genuine mistakes
  const typoPatterns: TypoPattern[] = [
    { pattern: 'th', replacement: 'ht' },
    { pattern: 'er', replacement: 're' },
    { pattern: 'you', replacement: 'yuo' },
    { pattern: 'and', replacement: 'adn' },
    { pattern: 'ing', replacement: 'ign' },
    { pattern: 'the', replacement: 'teh' },
    { pattern: 'for', replacement: 'fro' },
    { pattern: 'that', replacement: 'taht' },
    { pattern: 'with', replacement: 'wiht' },
    { pattern: 'this', replacement: 'tihs' },
    { pattern: 'have', replacement: 'ahve' },
    { pattern: 'about', replacement: 'abuot' }
  ];

  // Punctuation variation
  const punctuationVariations: PunctuationVariation[] = [
    { from: '!', to: ['!!', '!', '! ', '!!!'] },
    { from: '?', to: ['??', '?', '? ', '???'] },
    { from: '.', to: ['.', '..', '...', '. '] },
    { from: ',', to: [',', ',,', ', ', ','] }
  ];

  // Apply leetspeak to a word with variable intensity
  const applyLeetspeak = (word: string, intensity: number): string => {
    // Don't convert every word - check against the intensity level (percentage)
    if (Math.random() * 100 > intensity) return word;
    
    // Get the characters in the word
    let chars = word.split('');
    
    // Only replace a limited subset of characters (1-2 per word maximum) to keep it subtle
    const numToReplace = Math.min(Math.floor(Math.random() * 2) + 1, word.length);
    const positions: number[] = [];
    
    // Select random positions to replace
    for (let i = 0; i < numToReplace; i++) {
      let pos: number;
      do {
        pos = Math.floor(Math.random() * word.length);
      } while (positions.includes(pos));
      positions.push(pos);
    }
    
    // Replace characters at the selected positions
    positions.forEach(pos => {
      const char = word[pos].toLowerCase();
      if (leetMap[char]) {
        // Use weighted selection - first options are more common/subtle
        const options = leetMap[char];
        const selectedOption = options[Math.floor(Math.random() * Math.min(3, options.length))];
        chars[pos] = selectedOption;
      }
    });
    
    return chars.join('');
  };

  // Apply algospeak substitutions with variable intensity
  const applyAlgospeak = (text: string, intensity: number): string => {
    if (Math.random() * 100 > intensity) return text;
    
    Object.keys(algospeakReplacements).forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      if (regex.test(text)) {
        // Only replace if the random chance is within the intensity level
        if (Math.random() * 100 <= intensity) {
          const replacements = algospeakReplacements[word];
          const replacement = replacements[Math.floor(Math.random() * replacements.length)];
          text = text.replace(regex, replacement);
        }
      }
    });
    
    return text;
  };

  // Add emojis with variable intensity
  const addEmojis = (text: string, intensity: number): string => {
    if (Math.random() * 100 > intensity) return text;
    
    // Determine number of emojis to add (0-3 based on intensity)
    const maxEmojis = Math.ceil(intensity / 33); // Max 3 emojis at 100% intensity
    const numEmojis = Math.floor(Math.random() * (maxEmojis + 1));
    
    if (numEmojis === 0) return text;
    
    // Get random emojis
    let selectedEmojis = '';
    for (let i = 0; i < numEmojis; i++) {
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      selectedEmojis += emoji;
    }
    
    // Add emojis at the end (most common), beginning, or middle of text
    const position = Math.random();
    if (position < 0.7) {
      return text + ' ' + selectedEmojis;
    } else if (position < 0.9) {
      return selectedEmojis + ' ' + text;
    } else {
      const words = text.split(' ');
      if (words.length > 3) {
        const insertPos = Math.floor(Math.random() * (words.length - 2)) + 1;
        words.splice(insertPos, 0, selectedEmojis);
        return words.join(' ');
      } else {
        return text + ' ' + selectedEmojis;
      }
    }
  };

  // Apply typos with variable intensity
  const applyTypos = (text: string, intensity: number): string => {
    if (Math.random() * 100 > intensity) return text;
    
    // Apply at most one typo pattern per short text to keep it natural
    const pattern = typoPatterns[Math.floor(Math.random() * typoPatterns.length)];
    
    if (text.includes(pattern.pattern) && Math.random() * 100 <= intensity) {
      // Replace only the first occurrence to keep it subtle
      return text.replace(pattern.pattern, pattern.replacement);
    }
    
    // Occasionally add a doubled letter
    if (Math.random() * 100 <= intensity / 2) {
      const words = text.split(' ');
      const randomWord = words[Math.floor(Math.random() * words.length)];
      
      if (randomWord.length > 2) {
        const randomChar = Math.floor(Math.random() * (randomWord.length - 1));
        const newWord = randomWord.substring(0, randomChar) + 
                         randomWord[randomChar] + 
                         randomWord[randomChar] + 
                         randomWord.substring(randomChar + 1);
        words[Math.floor(Math.random() * words.length)] = newWord;
        return words.join(' ');
      }
    }
    
    return text;
  };

  // Vary capitalization
  const varyCapitalization = (text: string, intensity: number): string => {
    if (Math.random() * 100 > intensity) return text;
    
    const words = text.split(' ');
    
    // Randomly select a word to capitalize or modify capitalization
    const randomIndex = Math.floor(Math.random() * words.length);
    const word = words[randomIndex];
    
    if (word.length < 2) return text;
    
    const capType = Math.floor(Math.random() * 4);
    
    switch (capType) {
      case 0: // ALL CAPS for emphasis
        words[randomIndex] = word.toUpperCase();
        break;
      case 1: // First letter capitalization
        words[randomIndex] = word.charAt(0).toUpperCase() + word.slice(1);
        break;
      case 2: // Random letter capitalization
        const letterIndex = Math.floor(Math.random() * word.length);
        words[randomIndex] = word.substring(0, letterIndex) + 
                           word.charAt(letterIndex).toUpperCase() + 
                           word.substring(letterIndex + 1);
        break;
      case 3: // No caps
        words[randomIndex] = word.toLowerCase();
        break;
    }
    
    return words.join(' ');
  };

  // Vary punctuation
  const varyPunctuation = (text: string, intensity: number): string => {
    if (Math.random() * 100 > intensity) return text;
    
    punctuationVariations.forEach(variation => {
      const regex = new RegExp(`\\${variation.from}`, 'g');
      if (regex.test(text) && Math.random() > 0.7) {
        const replacement = variation.to[Math.floor(Math.random() * variation.to.length)];
        text = text.replace(regex, replacement);
      }
    });
    
    return text;
  };

  // Apply all text modifications
  const applyAllModifications = (text: string): string => {
    if (!text || text.trim() === '') return text;
    
    // First split into words to handle leetspeak
    let words = text.split(' ');
    words = words.map(word => applyLeetspeak(word, leetLevel));
    text = words.join(' ');
    
    // Apply other modifications
    text = applyAlgospeak(text, algoLevel);
    text = varyCapitalization(text, capitalLevel);
    text = varyPunctuation(text, punctuationLevel);
    text = applyTypos(text, typoLevel);
    text = addEmojis(text, emojiLevel);
    
    return text;
  };

  // Generate all variations
  const generateAllVariations = (): void => {
    setIsGenerating(true);
    
    // Check if at least the original post or one comment has text
    const hasContent = originalPost.trim() !== '' || 
                      comments.some(comment => comment.text.trim() !== '');
    
    if (!hasContent) {
      alert('Please enter text in the original post or at least one comment box');
      setIsGenerating(false);
      return;
    }
    
    // Generate the requested number of variations
    const variations: Variation[] = [];
    
    for (let i = 0; i < numVariations; i++) {
      // Modify original post
      const modifiedPost = originalPost.trim() !== '' ? 
                          applyAllModifications(originalPost) : '';
      
      // Modify comments (only those with text)
      const modifiedComments = comments
        .filter(comment => comment.text.trim() !== '')
        .map(comment => ({
          id: comment.id,
          role: comment.role,
          text: applyAllModifications(comment.text)
        }));
      
      variations.push({
        originalPost: modifiedPost,
        comments: modifiedComments
      });
    }
    
    setGeneratedVariations(variations);
    setIsGenerated(true);
    setIsGenerating(false);
    
    // Scroll to results
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Social Media Dialogue Modifier</h1>
      <p className="mb-6 text-center text-gray-600">
        Enter your text in the dialogue boxes below, and generate multiple variations with subtle text modifications.
      </p>
      
      <div className="mb-8">
        <div className="grid grid-cols-1 gap-6 mb-8">
          {/* Original Post Box */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-bold mb-4">Original Post</h2>
            <textarea
              className="w-full p-2 border rounded"
              rows={4}
              value={originalPost}
              onChange={(e) => setOriginalPost(e.target.value)}
              placeholder="Enter the original post text here"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Comment Boxes - Left Column */}
          <div className="space-y-4">
            {comments.slice(0, 5).map((comment, index) => (
              <div key={comment.id} className="border rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-semibold">Comment #{comment.id}</div>
                  <select
                    value={comment.role}
                    onChange={(e) => handleRoleChange(comment.id, e.target.value as 'original' | 'responder')}
                    className="border rounded p-1"
                  >
                    <option value="original">Original Poster</option>
                    <option value="responder">Responder</option>
                  </select>
                </div>
                
                <textarea
                  className="w-full p-2 border rounded"
                  rows={3}
                  value={comment.text}
                  onChange={(e) => handleTextChange(comment.id, e.target.value)}
                  placeholder={`Enter text for ${comment.role === 'original' ? 'Original Poster' : 'Responder'}`}
                />
              </div>
            ))}
          </div>
          
          {/* Comment Boxes - Right Column */}
          <div className="space-y-4">
            {comments.slice(5, 10).map((comment, index) => (
              <div key={comment.id} className="border rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-semibold">Comment #{comment.id}</div>
                  <select
                    value={comment.role}
                    onChange={(e) => handleRoleChange(comment.id, e.target.value as 'original' | 'responder')}
                    className="border rounded p-1"
                  >
                    <option value="original">Original Poster</option>
                    <option value="responder">Responder</option>
                  </select>
                </div>
                
                <textarea
                  className="w-full p-2 border rounded"
                  rows={3}
                  value={comment.text}
                  onChange={(e) => handleTextChange(comment.id, e.target.value)}
                  placeholder={`Enter text for ${comment.role === 'original' ? 'Original Poster' : 'Responder'}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4 mb-8">
        <h2 className="text-xl font-bold mb-4">Modification Settings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">
                Number of Variations:
                <input 
                  type="number" 
                  className="w-full p-2 border rounded"
                  value={numVariations}
                  onChange={(e) => setNumVariations(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
                  min="1"
                  max="50"
                />
              </label>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block mb-1">
                  <span className="font-medium">Character Substitution Level: {leetLevel}%</span>
                  <input 
                    type="range" 
                    className="w-full"
                    min="0"
                    max="100"
                    value={leetLevel}
                    onChange={(e) => setLeetLevel(parseInt(e.target.value))}
                  />
                </label>
                <p className="text-xs text-gray-500">Changes letters to similar-looking symbols and characters</p>
              </div>
              
              <div>
                <label className="block mb-1">
                  <span className="font-medium">Word Substitution Level: {algoLevel}%</span>
                  <input 
                    type="range" 
                    className="w-full"
                    min="0"
                    max="100"
                    value={algoLevel}
                    onChange={(e) => setAlgoLevel(parseInt(e.target.value))}
                  />
                </label>
                <p className="text-xs text-gray-500">Replaces certain words with alternative expressions</p>
              </div>
              
              <div>
                <label className="block mb-1">
                  <span className="font-medium">Emoji Level: {emojiLevel}%</span>
                  <input 
                    type="range" 
                    className="w-full"
                    min="0"
                    max="100"
                    value={emojiLevel}
                    onChange={(e) => setEmojiLevel(parseInt(e.target.value))}
                  />
                </label>
                <p className="text-xs text-gray-500">Adds emojis to the text</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="block mb-1">
                <span className="font-medium">Typo Level: {typoLevel}%</span>
                <input 
                  type="range" 
                  className="w-full"
                  min="0"
                  max="100"
                  value={typoLevel}
                  onChange={(e) => setTypoLevel(parseInt(e.target.value))}
                />
              </label>
              <p className="text-xs text-gray-500">Introduces natural-looking typos</p>
            </div>
            
            <div>
              <label className="block mb-1">
                <span className="font-medium">Capitalization Level: {capitalLevel}%</span>
                <input 
                  type="range" 
                  className="w-full"
                  min="0"
                  max="100"
                  value={capitalLevel}
                  onChange={(e) => setCapitalLevel(parseInt(e.target.value))}
                />
              </label>
              <p className="text-xs text-gray-500">Varies capitalization of letters and words</p>
            </div>
            
            <div>
              <label className="block mb-1">
                <span className="font-medium">Punctuation Level: {punctuationLevel}%</span>
                <input 
                  type="range" 
                  className="w-full"
                  min="0"
                  max="100"
                  value={punctuationLevel}
                  onChange={(e) => setPunctuationLevel(parseInt(e.target.value))}
                />
              </label>
              <p className="text-xs text-gray-500">Modifies punctuation marks (!, ?, ., ,)</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-6">
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg text-lg"
            onClick={generateAllVariations}
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate Variations'}
          </button>
        </div>
      </div>
      
      {isGenerated && (
        <div ref={resultsRef} className="bg-white rounded-lg shadow p-4 mb-8">
          <h2 className="text-2xl font-bold mb-4">Generated Variations ({generatedVariations.length})</h2>
          
          <div className="space-y-8">
            {generatedVariations.map((variation, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-bold text-lg mb-3">Variation #{index + 1}</h3>
                
                {variation.originalPost && (
                  <div className="mb-4 bg-yellow-50 p-3 rounded-lg">
                    <div className="font-semibold mb-1">Original Post:</div>
                    <div>{variation.originalPost}</div>
                  </div>
                )}
                
                {variation.comments.length > 0 && (
                  <div className="space-y-3">
                    {variation.comments.map((comment) => (
                      <div key={comment.id} className={`p-3 rounded-lg ${comment.role === 'original' ? 'bg-blue-50' : 'bg-gray-50'}`}>
                        <div className="font-semibold mb-1">
                          {comment.role === 'original' ? 'Original Poster' : 'Responder'} (Comment #{comment.id}):
                        </div>
                        <div>{comment.text}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DialogueModifierGenerator;
