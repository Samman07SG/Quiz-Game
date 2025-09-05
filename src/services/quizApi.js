// Open Trivia DB API configuration
const API_BASE_URL = 'https://opentdb.com/api.php';
const CATEGORIES = {
  'general': 9,
  'books': 10,
  'film': 11,
  'music': 12,
  'musicals': 13,
  'television': 14,
  'video_games': 15,
  'board_games': 16,
  'science_nature': 17,
  'science_computers': 18,
  'science_mathematics': 19,
  'mythology': 20,
  'sports': 21,
  'geography': 22,
  'history': 23,
  'politics': 24,
  'art': 25,
  'celebrities': 26,
  'animals': 27,
  'vehicles': 28,
  'comics': 29,
  'science_gadgets': 30,
  'anime_manga': 31,
  'cartoon_animation': 32
};

const DIFFICULTY_LEVELS = {
  'easy': 'easy',
  'medium': 'medium',
  'hard': 'hard'
};

// Large sample set of questions for all categories
const FALLBACK_QUESTIONS = {
  general: [
    {
      question: "What is the capital of France?",
      correct_answer: "Paris",
      incorrect_answers: ["London", "Berlin", "Madrid"],
      category: "Geography",
      difficulty: "easy",
      type: "multiple"
    },
    {
      question: "Which planet is known as the Red Planet?",
      correct_answer: "Mars",
      incorrect_answers: ["Venus", "Jupiter", "Saturn"],
      category: "Science",
      difficulty: "easy",
      type: "multiple"
    },
    {
      question: "Who painted the Mona Lisa?",
      correct_answer: "Leonardo da Vinci",
      incorrect_answers: ["Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
      category: "Art",
      difficulty: "medium",
      type: "multiple"
    },
    {
      question: "What is the largest mammal in the world?",
      correct_answer: "Blue whale",
      incorrect_answers: ["African elephant", "Giraffe", "Hippopotamus"],
      category: "Science",
      difficulty: "easy",
      type: "multiple"
    },
    {
      question: "In which year did World War II end?",
      correct_answer: "1945",
      incorrect_answers: ["1944", "1946", "1947"],
      category: "History",
      difficulty: "medium",
      type: "multiple"
    },
    {
      question: "What is the currency of Japan?",
      correct_answer: "Yen",
      incorrect_answers: ["Won", "Dollar", "Euro"],
      category: "Geography",
      difficulty: "easy",
      type: "multiple"
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      correct_answer: "William Shakespeare",
      incorrect_answers: ["Charles Dickens", "Jane Austen", "Mark Twain"],
      category: "Literature",
      difficulty: "medium",
      type: "multiple"
    },
    {
      question: "What is the smallest country in the world?",
      correct_answer: "Vatican City",
      incorrect_answers: ["Monaco", "Liechtenstein", "San Marino"],
      category: "Geography",
      difficulty: "medium",
      type: "multiple"
    },
    {
      question: "Which ocean is the largest?",
      correct_answer: "Pacific Ocean",
      incorrect_answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
      category: "Geography",
      difficulty: "easy",
      type: "multiple"
    },
    {
      question: "What is the chemical symbol for water?",
      correct_answer: "H2O",
      incorrect_answers: ["CO2", "NaCl", "O2"],
      category: "Science",
      difficulty: "easy",
      type: "multiple"
    }
  ],
  science: [
    {
      question: "What is the chemical symbol for gold?",
      correct_answer: "Au",
      incorrect_answers: ["Go", "Gd", "Ag"],
      category: "Science",
      difficulty: "medium",
      type: "multiple"
    },
    {
      question: "What is the speed of light in vacuum?",
      correct_answer: "299,792,458 m/s",
      incorrect_answers: ["300,000,000 m/s", "299,000,000 m/s", "301,000,000 m/s"],
      category: "Science",
      difficulty: "hard",
      type: "multiple"
    },
    {
      question: "What is the smallest unit of matter?",
      correct_answer: "Atom",
      incorrect_answers: ["Molecule", "Cell", "Particle"],
      category: "Science",
      difficulty: "easy",
      type: "multiple"
    },
    {
      question: "What gas makes up most of Earth's atmosphere?",
      correct_answer: "Nitrogen",
      incorrect_answers: ["Oxygen", "Carbon dioxide", "Argon"],
      category: "Science",
      difficulty: "medium",
      type: "multiple"
    },
    {
      question: "What is the powerhouse of the cell?",
      correct_answer: "Mitochondria",
      incorrect_answers: ["Nucleus", "Ribosome", "Chloroplast"],
      category: "Science",
      difficulty: "medium",
      type: "multiple"
    },
    {
      question: "What is the hardest natural substance?",
      correct_answer: "Diamond",
      incorrect_answers: ["Gold", "Iron", "Quartz"],
      category: "Science",
      difficulty: "easy",
      type: "multiple"
    },
    {
      question: "What is the process by which plants make their food?",
      correct_answer: "Photosynthesis",
      incorrect_answers: ["Respiration", "Digestion", "Fermentation"],
      category: "Science",
      difficulty: "easy",
      type: "multiple"
    },
    {
      question: "What is the center of an atom called?",
      correct_answer: "Nucleus",
      incorrect_answers: ["Core", "Center", "Hub"],
      category: "Science",
      difficulty: "medium",
      type: "multiple"
    },
    {
      question: "What is the most abundant gas in the universe?",
      correct_answer: "Hydrogen",
      incorrect_answers: ["Helium", "Oxygen", "Nitrogen"],
      category: "Science",
      difficulty: "hard",
      type: "multiple"
    },
    {
      question: "What is the study of living organisms called?",
      correct_answer: "Biology",
      incorrect_answers: ["Chemistry", "Physics", "Geology"],
      category: "Science",
      difficulty: "easy",
      type: "multiple"
    }
  ],
  history: [
    {
      question: "Who was the first President of the United States?",
      correct_answer: "George Washington",
      incorrect_answers: ["Thomas Jefferson", "John Adams", "Benjamin Franklin"],
      category: "History",
      difficulty: "easy",
      type: "multiple"
    },
    {
      question: "In which year did the Berlin Wall fall?",
      correct_answer: "1989",
      incorrect_answers: ["1987", "1991", "1993"],
      category: "History",
      difficulty: "medium",
      type: "multiple"
    },
    {
      question: "Who discovered America?",
      correct_answer: "Christopher Columbus",
      incorrect_answers: ["Vasco da Gama", "Ferdinand Magellan", "Marco Polo"],
      category: "History",
      difficulty: "easy",
      type: "multiple"
    },
    {
      question: "Which empire was ruled by Julius Caesar?",
      correct_answer: "Roman Empire",
      incorrect_answers: ["Greek Empire", "Byzantine Empire", "Persian Empire"],
      category: "History",
      difficulty: "medium",
      type: "multiple"
    },
    {
      question: "When did World War I begin?",
      correct_answer: "1914",
      incorrect_answers: ["1912", "1916", "1918"],
      category: "History",
      difficulty: "medium",
      type: "multiple"
    },
    {
      question: "Who was the last Tsar of Russia?",
      correct_answer: "Nicholas II",
      incorrect_answers: ["Alexander III", "Peter the Great", "Catherine the Great"],
      category: "History",
      difficulty: "hard",
      type: "multiple"
    },
    {
      question: "Which ancient wonder was located in Alexandria?",
      correct_answer: "Lighthouse of Alexandria",
      incorrect_answers: ["Hanging Gardens", "Colossus of Rhodes", "Temple of Artemis"],
      category: "History",
      difficulty: "hard",
      type: "multiple"
    },
    {
      question: "Who wrote 'The Communist Manifesto'?",
      correct_answer: "Karl Marx",
      incorrect_answers: ["Vladimir Lenin", "Friedrich Engels", "Joseph Stalin"],
      category: "History",
      difficulty: "medium",
      type: "multiple"
    },
    {
      question: "In which year was the Magna Carta signed?",
      correct_answer: "1215",
      incorrect_answers: ["1210", "1220", "1225"],
      category: "History",
      difficulty: "hard",
      type: "multiple"
    },
    {
      question: "Who was the first woman to fly solo across the Atlantic?",
      correct_answer: "Amelia Earhart",
      incorrect_answers: ["Bessie Coleman", "Harriet Quimby", "Jacqueline Cochran"],
      category: "History",
      difficulty: "medium",
      type: "multiple"
    }
  ],
  geography: [
    {
      question: "What is the longest river in the world?",
      correct_answer: "Nile River",
      incorrect_answers: ["Amazon River", "Mississippi River", "Yangtze River"],
      category: "Geography",
      difficulty: "medium",
      type: "multiple"
    },
    {
      question: "Which country has the most natural lakes?",
      correct_answer: "Canada",
      incorrect_answers: ["Russia", "United States", "Finland"],
      category: "Geography",
      difficulty: "hard",
      type: "multiple"
    },
    {
      question: "What is the highest mountain in the world?",
      correct_answer: "Mount Everest",
      incorrect_answers: ["K2", "Kangchenjunga", "Lhotse"],
      category: "Geography",
      difficulty: "easy",
      type: "multiple"
    },
    {
      question: "Which desert is the largest in the world?",
      correct_answer: "Sahara Desert",
      incorrect_answers: ["Arabian Desert", "Gobi Desert", "Kalahari Desert"],
      category: "Geography",
      difficulty: "easy",
      type: "multiple"
    },
    {
      question: "What is the capital of Australia?",
      correct_answer: "Canberra",
      incorrect_answers: ["Sydney", "Melbourne", "Perth"],
      category: "Geography",
      difficulty: "medium",
      type: "multiple"
    },
    {
      question: "Which continent is known as the 'Dark Continent'?",
      correct_answer: "Africa",
      incorrect_answers: ["Asia", "South America", "Antarctica"],
      category: "Geography",
      difficulty: "easy",
      type: "multiple"
    },
    {
      question: "What is the smallest ocean?",
      correct_answer: "Arctic Ocean",
      incorrect_answers: ["Indian Ocean", "Southern Ocean", "Atlantic Ocean"],
      category: "Geography",
      difficulty: "medium",
      type: "multiple"
    },
    {
      question: "Which country is known as the 'Land of the Rising Sun'?",
      correct_answer: "Japan",
      incorrect_answers: ["China", "South Korea", "Thailand"],
      category: "Geography",
      difficulty: "easy",
      type: "multiple"
    },
    {
      question: "What is the largest country by area?",
      correct_answer: "Russia",
      incorrect_answers: ["Canada", "China", "United States"],
      category: "Geography",
      difficulty: "medium",
      type: "multiple"
    },
    {
      question: "Which river flows through London?",
      correct_answer: "Thames",
      incorrect_answers: ["Seine", "Rhine", "Danube"],
      category: "Geography",
      difficulty: "medium",
      type: "multiple"
    }
  ],
  sports: [
    {
      question: "How many players are on a basketball team?",
      correct_answer: "5",
      incorrect_answers: ["6", "7", "8"],
      category: "Sports",
      difficulty: "easy",
      type: "multiple"
    },
    {
      question: "Which country won the FIFA World Cup in 2018?",
      correct_answer: "France",
      incorrect_answers: ["Croatia", "Brazil", "Germany"],
      category: "Sports",
      difficulty: "medium",
      type: "multiple"
    },
    {
      question: "In which sport would you perform a slam dunk?",
      correct_answer: "Basketball",
      incorrect_answers: ["Volleyball", "Tennis", "Badminton"],
      category: "Sports",
      difficulty: "easy",
      type: "multiple"
    },
    {
      question: "How many rings are in the Olympic symbol?",
      correct_answer: "5",
      incorrect_answers: ["4", "6", "7"],
      category: "Sports",
      difficulty: "easy",
      type: "multiple"
    },
    {
      question: "Which sport is played at Wimbledon?",
      correct_answer: "Tennis",
      incorrect_answers: ["Golf", "Cricket", "Rugby"],
      category: "Sports",
      difficulty: "easy",
      type: "multiple"
    },
    {
      question: "What is the maximum score in a single frame of snooker?",
      correct_answer: "147",
      incorrect_answers: ["155", "140", "150"],
      category: "Sports",
      difficulty: "hard",
      type: "multiple"
    },
    {
      question: "Which country invented cricket?",
      correct_answer: "England",
      incorrect_answers: ["Australia", "India", "South Africa"],
      category: "Sports",
      difficulty: "medium",
      type: "multiple"
    },
    {
      question: "How many holes are on a standard golf course?",
      correct_answer: "18",
      incorrect_answers: ["9", "27", "36"],
      category: "Sports",
      difficulty: "easy",
      type: "multiple"
    },
    {
      question: "Which sport uses a shuttlecock?",
      correct_answer: "Badminton",
      incorrect_answers: ["Tennis", "Squash", "Table Tennis"],
      category: "Sports",
      difficulty: "easy",
      type: "multiple"
    },
    {
      question: "What is the distance of a marathon?",
      correct_answer: "26.2 miles",
      incorrect_answers: ["24.2 miles", "28.2 miles", "30.2 miles"],
      category: "Sports",
      difficulty: "medium",
      type: "multiple"
    }
  ],
  art: [
    {
      question: "Who painted 'The Starry Night'?",
      correct_answer: "Vincent van Gogh",
      incorrect_answers: ["Pablo Picasso", "Claude Monet", "Salvador Dalí"],
      category: "Art",
      difficulty: "medium",
      type: "multiple"
    },
    {
      question: "Which art movement was led by Pablo Picasso?",
      correct_answer: "Cubism",
      incorrect_answers: ["Impressionism", "Surrealism", "Expressionism"],
      category: "Art",
      difficulty: "hard",
      type: "multiple"
    },
    {
      question: "Who sculpted 'David'?",
      correct_answer: "Michelangelo",
      incorrect_answers: ["Leonardo da Vinci", "Donatello", "Raphael"],
      category: "Art",
      difficulty: "medium",
      type: "multiple"
    },
    {
      question: "Which museum houses the Mona Lisa?",
      correct_answer: "Louvre",
      incorrect_answers: ["Metropolitan Museum", "Uffizi Gallery", "Tate Modern"],
      category: "Art",
      difficulty: "easy",
      type: "multiple"
    },
    {
      question: "Who painted 'The Scream'?",
      correct_answer: "Edvard Munch",
      incorrect_answers: ["Vincent van Gogh", "Pablo Picasso", "Salvador Dalí"],
      category: "Art",
      difficulty: "medium",
      type: "multiple"
    },
    {
      question: "Which art style is characterized by bright colors and bold brushstrokes?",
      correct_answer: "Fauvism",
      incorrect_answers: ["Cubism", "Impressionism", "Realism"],
      category: "Art",
      difficulty: "hard",
      type: "multiple"
    },
    {
      question: "Who designed the Sydney Opera House?",
      correct_answer: "Jørn Utzon",
      incorrect_answers: ["Frank Lloyd Wright", "Le Corbusier", "I.M. Pei"],
      category: "Art",
      difficulty: "hard",
      type: "multiple"
    },
    {
      question: "Which artist is known for his melting clocks?",
      correct_answer: "Salvador Dalí",
      incorrect_answers: ["Pablo Picasso", "René Magritte", "Max Ernst"],
      category: "Art",
      difficulty: "medium",
      type: "multiple"
    },
    {
      question: "What is the technique of painting on wet plaster called?",
      correct_answer: "Fresco",
      incorrect_answers: ["Tempera", "Oil painting", "Watercolor"],
      category: "Art",
      difficulty: "hard",
      type: "multiple"
    },
    {
      question: "Who painted 'Guernica'?",
      correct_answer: "Pablo Picasso",
      incorrect_answers: ["Salvador Dalí", "Joan Miró", "Francisco Goya"],
      category: "Art",
      difficulty: "medium",
      type: "multiple"
    }
  ],
  music: [
    {
      question: "Who composed 'The Four Seasons'?",
      correct_answer: "Antonio Vivaldi",
      incorrect_answers: ["Johann Sebastian Bach", "Wolfgang Amadeus Mozart", "Ludwig van Beethoven"],
      category: "Music",
      difficulty: "medium",
      type: "multiple"
    },
    {
      question: "Which instrument has 88 keys?",
      correct_answer: "Piano",
      incorrect_answers: ["Organ", "Harpsichord", "Celesta"],
      category: "Music",
      difficulty: "easy",
      type: "multiple"
    },
    {
      question: "Who is known as the 'King of Rock and Roll'?",
      correct_answer: "Elvis Presley",
      incorrect_answers: ["Chuck Berry", "Little Richard", "Jerry Lee Lewis"],
      category: "Music",
      difficulty: "easy",
      type: "multiple"
    },
    {
      question: "Which band released 'Bohemian Rhapsody'?",
      correct_answer: "Queen",
      incorrect_answers: ["The Beatles", "Led Zeppelin", "Pink Floyd"],
      category: "Music",
      difficulty: "easy",
      type: "multiple"
    },
    {
      question: "How many strings does a standard guitar have?",
      correct_answer: "6",
      incorrect_answers: ["4", "5", "7"],
      category: "Music",
      difficulty: "easy",
      type: "multiple"
    },
    {
      question: "Who composed 'Symphony No. 9' (Ode to Joy)?",
      correct_answer: "Ludwig van Beethoven",
      incorrect_answers: ["Johann Sebastian Bach", "Wolfgang Amadeus Mozart", "Franz Schubert"],
      category: "Music",
      difficulty: "medium",
      type: "multiple"
    },
    {
      question: "Which genre of music originated in New Orleans?",
      correct_answer: "Jazz",
      incorrect_answers: ["Blues", "Rock", "Country"],
      category: "Music",
      difficulty: "medium",
      type: "multiple"
    },
    {
      question: "Who sang 'Imagine'?",
      correct_answer: "John Lennon",
      incorrect_answers: ["Paul McCartney", "George Harrison", "Ringo Starr"],
      category: "Music",
      difficulty: "easy",
      type: "multiple"
    },
    {
      question: "Which instrument is played by blowing air through a reed?",
      correct_answer: "Saxophone",
      incorrect_answers: ["Trumpet", "Trombone", "French Horn"],
      category: "Music",
      difficulty: "medium",
      type: "multiple"
    },
    {
      question: "Who composed 'The Nutcracker'?",
      correct_answer: "Pyotr Ilyich Tchaikovsky",
      incorrect_answers: ["Igor Stravinsky", "Sergei Prokofiev", "Modest Mussorgsky"],
      category: "Music",
      difficulty: "medium",
      type: "multiple"
    }
  ],
  literature: [
    {
      question: "Who wrote '1984'?",
      correct_answer: "George Orwell",
      incorrect_answers: ["Aldous Huxley", "Ray Bradbury", "H.G. Wells"],
      category: "Literature",
      difficulty: "medium",
      type: "multiple"
    },
    {
      question: "Which novel begins with 'It was the best of times, it was the worst of times'?",
      correct_answer: "A Tale of Two Cities",
      incorrect_answers: ["Great Expectations", "Oliver Twist", "David Copperfield"],
      category: "Literature",
      difficulty: "hard",
      type: "multiple"
    },
    {
      question: "Who wrote 'Pride and Prejudice'?",
      correct_answer: "Jane Austen",
      incorrect_answers: ["Charlotte Brontë", "Emily Brontë", "Virginia Woolf"],
      category: "Literature",
      difficulty: "easy",
      type: "multiple"
    },
    {
      question: "Which author wrote 'The Great Gatsby'?",
      correct_answer: "F. Scott Fitzgerald",
      incorrect_answers: ["Ernest Hemingway", "John Steinbeck", "William Faulkner"],
      category: "Literature",
      difficulty: "medium",
      type: "multiple"
    },
    {
      question: "Who wrote 'To Kill a Mockingbird'?",
      correct_answer: "Harper Lee",
      incorrect_answers: ["Maya Angelou", "Toni Morrison", "Alice Walker"],
      category: "Literature",
      difficulty: "easy",
      type: "multiple"
    },
    {
      question: "Which novel features the character Holden Caulfield?",
      correct_answer: "The Catcher in the Rye",
      incorrect_answers: ["On the Road", "The Outsiders", "A Separate Peace"],
      category: "Literature",
      difficulty: "medium",
      type: "multiple"
    },
    {
      question: "Who wrote 'The Lord of the Rings'?",
      correct_answer: "J.R.R. Tolkien",
      incorrect_answers: ["C.S. Lewis", "George R.R. Martin", "Terry Pratchett"],
      category: "Literature",
      difficulty: "easy",
      type: "multiple"
    },
    {
      question: "Which author wrote 'One Hundred Years of Solitude'?",
      correct_answer: "Gabriel García Márquez",
      incorrect_answers: ["Isabel Allende", "Mario Vargas Llosa", "Jorge Luis Borges"],
      category: "Literature",
      difficulty: "hard",
      type: "multiple"
    },
    {
      question: "Who wrote 'The Handmaid's Tale'?",
      correct_answer: "Margaret Atwood",
      incorrect_answers: ["Ursula K. Le Guin", "Octavia Butler", "Doris Lessing"],
      category: "Literature",
      difficulty: "medium",
      type: "multiple"
    },
    {
      question: "Which novel is set in the fictional town of Maycomb?",
      correct_answer: "To Kill a Mockingbird",
      incorrect_answers: ["The Color Purple", "Beloved", "Their Eyes Were Watching God"],
      category: "Literature",
      difficulty: "medium",
      type: "multiple"
    }
  ]
};

// Utility function to decode HTML entities
const decodeHtml = (html) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

// Utility function to shuffle array
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Normalize question data from API
const normalizeQuestion = (question) => {
  const answers = shuffleArray([
    question.correct_answer,
    ...question.incorrect_answers
  ]);
  
  return {
    ...question,
    question: decodeHtml(question.question),
    correct_answer: decodeHtml(question.correct_answer),
    incorrect_answers: question.incorrect_answers.map(decodeHtml),
    answers: answers.map(decodeHtml),
    category: decodeHtml(question.category),
    difficulty: question.difficulty
  };
};

// Fetch questions from Open Trivia DB API with timeout
export const fetchQuestions = async (category = 'general', difficulty = 'medium', amount = 10) => {
  try {
    // Try to fetch from Open Trivia DB API first
    const categoryId = CATEGORIES[category] || CATEGORIES.general;
    const difficultyLevel = DIFFICULTY_LEVELS[difficulty] || DIFFICULTY_LEVELS.medium;
    
    const params = new URLSearchParams({
      amount: amount.toString(),
      category: categoryId.toString(),
      difficulty: difficultyLevel,
      type: 'multiple'
    });
    
    // Add timeout to prevent hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    const response = await fetch(`${API_BASE_URL}?${params}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.response_code !== 0) {
      throw new Error(`API error: ${data.response_code}`);
    }
    
    if (!data.results || data.results.length === 0) {
      throw new Error('No questions found');
    }
    
    console.log(`Successfully fetched ${data.results.length} questions from Open Trivia DB`);
    return data.results.map(normalizeQuestion);
    
  } catch (error) {
    console.warn('API request failed, using fallback questions:', error.message);
    
    // Use fallback questions if API fails
    const fallbackQuestions = FALLBACK_QUESTIONS.general || [];
    
    // Filter by difficulty if possible
    const filteredQuestions = fallbackQuestions.filter(q => 
      difficulty === 'any' || q.difficulty === difficulty
    );
    
    const questionsToReturn = filteredQuestions.length > 0 
      ? filteredQuestions 
      : fallbackQuestions;
    
    // Ensure we have enough questions by mixing categories if needed
    let finalQuestions = questionsToReturn;
    if (questionsToReturn.length < amount) {
      const additionalQuestions = Object.values(FALLBACK_QUESTIONS)
        .flat()
        .filter(q => difficulty === 'any' || q.difficulty === difficulty);
      finalQuestions = [...questionsToReturn, ...additionalQuestions];
    }
    
    // Return exactly the requested amount
    return shuffleArray(finalQuestions).slice(0, amount).map(normalizeQuestion);
  }
};

// Get available categories
export const getCategories = () => {
  return Object.keys(CATEGORIES).map(key => ({
    id: key,
    name: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    apiId: CATEGORIES[key]
  }));
};

// Get difficulty levels
export const getDifficultyLevels = () => {
  return Object.keys(DIFFICULTY_LEVELS).map(key => ({
    id: key,
    name: key.charAt(0).toUpperCase() + key.slice(1)
  }));
};

// Validate question data
export const validateQuestion = (question) => {
  return (
    question &&
    question.question &&
    question.correct_answer &&
    question.incorrect_answers &&
    Array.isArray(question.incorrect_answers) &&
    question.incorrect_answers.length >= 3
  );
};

// Calculate quiz statistics (lightning fast)
export const calculateQuizStats = (questions, answers) => {
  const totalQuestions = questions.length;
  const answeredQuestions = answers.length;
  
  if (answeredQuestions === 0) {
    return {
      totalQuestions,
      answeredQuestions: 0,
      correctAnswers: 0,
      accuracy: 0,
      averageTime: 0,
      score: 0,
      percentage: 0
    };
  }
  
  // Ultra-fast calculation with minimal operations
  let correctAnswers = 0;
  let totalTime = 0;
  
  for (let i = 0; i < answeredQuestions; i++) {
    const answer = answers[i];
    if (answer.isCorrect) correctAnswers++;
    totalTime += answer.timeSpent || 0;
  }
  
  return {
    totalQuestions,
    answeredQuestions,
    correctAnswers,
    accuracy: Math.round((correctAnswers / answeredQuestions) * 10000) / 100,
    averageTime: Math.round((totalTime / answeredQuestions) * 100) / 100,
    score: correctAnswers,
    percentage: Math.round((correctAnswers / totalQuestions) * 100)
  };
};

