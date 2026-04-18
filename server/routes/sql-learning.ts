// SQL Learning Platform Backend API Routes
// Handles questions, progress tracking, and submissions

import express, { Request, Response } from 'express';
import { SQL_QUESTIONS, SQL_TUTORIALS } from '../data/sql-questions';

const router = express.Router();

// In-memory database (for demo - use real DB in production)
const userProgress: Map<string, any> = new Map();
const submissions: any[] = [];

// Get all questions by difficulty
router.get('/api/sql/questions/:difficulty', (req: Request, res: Response) => {
  const { difficulty } = req.params;
  const level = difficulty.toLowerCase();
  
  if (level in SQL_QUESTIONS) {
    res.json({
      success: true,
      difficulty: level,
      count: (SQL_QUESTIONS as any)[level].length,
      questions: (SQL_QUESTIONS as any)[level]
    });
  } else {
    res.status(400).json({ success: false, error: 'Invalid difficulty level' });
  }
});

// Get single question
router.get('/api/sql/questions/:difficulty/:id', (req: Request, res: Response) => {
  const { difficulty, id } = req.params;
  const level = difficulty.toLowerCase();
  
  if (!(level in SQL_QUESTIONS)) {
    return res.status(400).json({ success: false, error: 'Invalid difficulty level' });
  }

  const question = (SQL_QUESTIONS as any)[level].find((q: any) => q.id === id);
  
  if (question) {
    res.json({ success: true, question });
  } else {
    res.status(404).json({ success: false, error: 'Question not found' });
  }
});

// Get all tutorials
router.get('/api/sql/tutorials', (req: Request, res: Response) => {
  res.json({
    success: true,
    tutorials: SQL_TUTORIALS
  });
});

// Submit answer
router.post('/api/sql/submit', (req: Request, res: Response) => {
  const { userId, questionId, questionType, answer, language } = req.body;

  // Validate submission
  if (!userId || !questionId || !answer) {
    return res.status(400).json({ 
      success: false, 
      error: 'Missing required fields' 
    });
  }

  let result: any = {
    success: true,
    questionId,
    points: 0,
    feedback: ''
  };

  // Process different question types
  switch (questionType) {
    case 'write-sql':
      result = validateSQLQuery(answer, questionId);
      break;
    case 'multiple-choice':
      result = validateMultipleChoice(answer, questionId);
      break;
    case 'true-false':
      result = validateTrueFalse(answer, questionId);
      break;
    case 'debug':
      result = validateDebugQuery(answer, questionId);
      break;
    case 'optimization':
      result = validateOptimization(answer, questionId);
      break;
    default:
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid question type' 
      });
  }

  // Save submission
  submissions.push({
    userId,
    questionId,
    type: questionType,
    answer,
    result,
    timestamp: new Date(),
    language
  });

  // Update user progress
  updateUserProgress(userId, questionId, result);

  res.json(result);
});

// Validate SQL query
function validateSQLQuery(query: string, questionId: string): any {
  const upperQuery = query.toUpperCase();

  // Basic validation
  if (!upperQuery.includes('SELECT')) {
    return {
      success: false,
      points: 0,
      feedback: '❌ Query must contain SELECT statement'
    };
  }

  // Check for common SQL injection attempts
  if (query.includes('DROP') || query.includes('DELETE') || query.includes('TRUNCATE')) {
    return {
      success: false,
      points: 0,
      feedback: '❌ Dangerous SQL operations detected'
    };
  }

  // Find question to check expected keywords
  let expectedKeywords: string[] = [];
  for (const level of Object.values(SQL_QUESTIONS)) {
    const q = (level as any[]).find((q: any) => q.id === questionId);
    if (q) {
      if (q.category === 'JOINS') expectedKeywords = ['JOIN', 'ON'];
      if (q.category === 'WHERE') expectedKeywords = ['WHERE'];
      if (q.category === 'AGGREGATE') expectedKeywords = ['COUNT', 'SUM', 'AVG'];
      if (q.category === 'GROUP BY') expectedKeywords = ['GROUP BY'];
      break;
    }
  }

  // Check for required keywords
  let allFound = true;
  for (const keyword of expectedKeywords) {
    if (!upperQuery.includes(keyword)) {
      allFound = false;
      break;
    }
  }

  if (expectedKeywords.length > 0 && !allFound) {
    return {
      success: false,
      points: 0,
      feedback: `❌ Missing expected keywords: ${expectedKeywords.join(', ')}`
    };
  }

  // Success
  return {
    success: true,
    points: 25,
    feedback: '✅ Query executed successfully! Well done!',
    output: ['id', 'name', 'email']
  };
}

// Validate multiple choice
function validateMultipleChoice(answer: number, questionId: string): any {
  for (const level of Object.values(SQL_QUESTIONS)) {
    const q = (level as any[]).find((q: any) => q.id === questionId);
    if (q && q.type === 'multiple-choice') {
      const isCorrect = answer === q.correctAnswer;
      return {
        success: isCorrect,
        points: isCorrect ? q.points : 0,
        feedback: isCorrect ? '✅ Correct!' : `❌ Wrong! The correct answer is: ${q.options[q.correctAnswer]}`,
        explanation: q.explanation
      };
    }
  }
  return { success: false, points: 0, feedback: 'Question not found' };
}

// Validate true/false
function validateTrueFalse(answer: boolean, questionId: string): any {
  for (const level of Object.values(SQL_QUESTIONS)) {
    const q = (level as any[]).find((q: any) => q.id === questionId);
    if (q && q.type === 'true-false') {
      const isCorrect = answer === q.isTrue;
      return {
        success: isCorrect,
        points: isCorrect ? q.points : 0,
        feedback: isCorrect ? '✅ Correct!' : `❌ Wrong! The statement is ${q.isTrue ? 'TRUE' : 'FALSE'}`,
        explanation: q.explanation
      };
    }
  }
  return { success: false, points: 0, feedback: 'Question not found' };
}

// Validate debug query
function validateDebugQuery(answer: string, questionId: string): any {
  const upperAnswer = answer.toUpperCase();

  // Check if query fixes the issue
  if (!upperAnswer.includes('ORDER BY') && questionId.includes('debug')) {
    return {
      success: false,
      points: 0,
      feedback: '❌ The original query had a typo in ORDER BY. Fix it!'
    };
  }

  return {
    success: true,
    points: 20,
    feedback: '✅ Great debugging! You found and fixed the error.',
  };
}

// Validate optimization
function validateOptimization(answer: string, questionId: string): any {
  const upperAnswer = answer.toUpperCase();

  // Check if optimization uses date range instead of function
  if (!upperAnswer.includes('BETWEEN') && !upperAnswer.includes('>=') && !upperAnswer.includes('<=')) {
    return {
      success: false,
      points: 0,
      feedback: '❌ Consider using date ranges instead of functions for better performance'
    };
  }

  return {
    success: true,
    points: 30,
    feedback: '✅ Excellent optimization! This query will use indexes efficiently.',
  };
}

// Update user progress
function updateUserProgress(userId: string, questionId: string, result: any): void {
  if (!userProgress.has(userId)) {
    userProgress.set(userId, {
      userId,
      completedQuestions: [],
      totalPoints: 0,
      questionsAnswered: 0,
      level: 'Beginner',
      createdAt: new Date()
    });
  }

  const progress = userProgress.get(userId);

  if (result.success && !progress.completedQuestions.includes(questionId)) {
    progress.completedQuestions.push(questionId);
    progress.questionsAnswered++;
  }

  if (result.success) {
    progress.totalPoints += result.points || 0;
  }

  // Update level based on points
  if (progress.totalPoints > 1000) progress.level = 'Expert';
  else if (progress.totalPoints > 500) progress.level = 'Advanced';
  else if (progress.totalPoints > 200) progress.level = 'Intermediate';
}

// Get user progress
router.get('/api/sql/progress/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;

  if (userProgress.has(userId)) {
    res.json({
      success: true,
      progress: userProgress.get(userId)
    });
  } else {
    res.json({
      success: true,
      progress: {
        userId,
        completedQuestions: [],
        totalPoints: 0,
        questionsAnswered: 0,
        level: 'Beginner',
        createdAt: new Date()
      }
    });
  }
});

// Get leaderboard
router.get('/api/sql/leaderboard', (req: Request, res: Response) => {
  const leaderboard = Array.from(userProgress.values())
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .slice(0, 100)
    .map((entry, index) => ({
      rank: index + 1,
      ...entry
    }));

  res.json({
    success: true,
    leaderboard
  });
});

// Test SQL query (would connect to actual database)
router.post('/api/sql/test', (req: Request, res: Response) => {
  const { query, database } = req.body;

  // In production, this would execute against actual database
  // For now, return mock response
  try {
    if (!query || !query.includes('SELECT')) {
      return res.status(400).json({
        success: false,
        error: 'Invalid query'
      });
    }

    res.json({
      success: true,
      executionTime: '45ms',
      rowsAffected: 25,
      rows: [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
      ]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Query execution failed'
    });
  }
});

export default router;
