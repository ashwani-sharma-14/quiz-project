interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export  const dummyQuestions: Question[] = [
  {
    id: 1,
    question:
      "Given a coin which gives HEADS with probability 1/4 and TAILS with 3/4. The coin is tossed k times. What is the probability that we get at least k/2 HEADS is less than or equal to?",
    options: ["(1/2) k/5", "(1/2) k/2", "(1/3) k/2", "(1/5) k/2"],
    correctAnswer: "A",
  },
  {
    id: 2,
    question:
      "Out of all the 2-digit integers between 1 and 100, a 2-digit number has to be selected at random. What is the probability that the selected number is not divisible by 7?",
    options: ["13/90", "12/90", "78/90", "77/90"],
    correctAnswer: "D",
  },
  {
    id: 3,
    question:
      "If the difference between expectation of the square of a random variable (E[X²]) and the square of the expectation of the random variable (E[X])² is denoted by R, then?",
    options: ["R = 0", "R < 0", "R >= 0", "R > 0"],
    correctAnswer: "C",
  },
  {
    id: 4,
    question:
      "Let X be a random variable following normal distribution with mean +1 and variance 4. Let Y be another normal variable with mean -1 and variance unknown. If P(X <= -1) = P(Y >= 2), the standard deviation of Y is?",
    options: ["3", "2", "sqrt(2)", "1"],
    correctAnswer: "B",
  },
  {
    id: 5,
    question:
      "The probability that a given positive integer lying between 1 and 100 (both inclusive) is NOT divisible by 2, 3 or 5 is ______.",
    options: ["0.259", "0.459", "0.325", "0.225"],
    correctAnswer: "A",
  },
  {
    id: 6,
    question: "Were you a bird, you ______________ in the sky.",
    options: ["would fly", "shall fly", "should fly", "shall have flown"],
    correctAnswer: "A",
  },
  {
    id: 7,
    question:
      "Choose the most appropriate word from the options given below to complete the following sentence. If you are trying to make a strong impression on your audience, you cannot do so by being understated, tentative or_____________.",
    options: ["Hyperbolic", "Restrained", "Argumentative", "Indifferent"],
    correctAnswer: "D",
  },
  {
    id: 8,
    question:
      "Choose the most appropriate word from the options given below to complete the following sentence: If we manage to ____________ our natural resources, we would leave a better planet for our children.",
    options: ["uphold", "restrain", "cherish", "conserve"],
    correctAnswer: "D",
  },
  {
    id: 9,
    question:
      "Choose the most appropriate word from the options given below to complete the following sentence. He could not understand the judges awarding her the first prize, because he thought that her performance was quite __________.",
    options: ["superb", "medium", "mediocre", "exhilarating"],
    correctAnswer: "C",
  },
  {
    id: 10,
    question:
      "Which of the following options is the closest in meaning to the sentence below?\nShe enjoyed herself immensely at the party.",
    options: [
      "She had a terrible time at the party",
      "She had a horrible time at the party",
      "She had a terrific time at the party",
      "She had a terrifying time at the party",
    ],
    correctAnswer: "C",
  },
];
