import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import SQLEditor from '@/components/sql-editor';

const PRACTICE_QUESTIONS = [
  {
    id: 1,
    title: "Select All Customers",
    category: "Beginner",
    difficulty: "Easy",
    type: "write-sql",
    description: "Write a query to select all columns from the customers table",
    expectedOutput: "All customer records with columns: id, name, email, phone, created_at",
    hint: "Use SELECT * to get all columns",
    initialCode: "-- Write your SQL query here\n\n",
    points: 10
  },
  {
    id: 2,
    title: "Filter by Date Range",
    category: "Beginner",
    difficulty: "Easy",
    type: "write-sql",
    description: "Select customers who registered between 2024-01-01 and 2024-12-31",
    expectedOutput: "Customer records for the year 2024",
    hint: "Use WHERE clause with BETWEEN operator",
    initialCode: "-- Select customers registered in 2024\nSELECT * FROM customers\n\n",
    points: 15
  },
  {
    id: 3,
    title: "Count Records",
    category: "Beginner",
    difficulty: "Easy",
    type: "write-sql",
    description: "Write a query to count total number of bookings in the database",
    expectedOutput: "Single row with count",
    hint: "Use COUNT() aggregate function",
    initialCode: "-- Count all bookings\n\n",
    points: 10
  },
  {
    id: 4,
    title: "JOIN Query",
    category: "Intermediate",
    difficulty: "Medium",
    type: "write-sql",
    description: "Write a query to get customer names and their booking details",
    expectedOutput: "Customer names with associated booking information",
    hint: "Use INNER JOIN between customers and bookings tables",
    initialCode: "-- Join customers with bookings\nSELECT c.name, b.booking_id, b.vehicle_id\nFROM \n\n",
    points: 25
  },
  {
    id: 5,
    title: "SQL Syntax - Multiple Choice",
    category: "Beginner",
    difficulty: "Easy",
    type: "multiple-choice",
    question: "What does SELECT * FROM users WHERE age > 18 do?",
    options: [
      "Selects all users older than 18",
      "Selects users with age equal to 18",
      "Counts users older than 18",
      "Deletes users older than 18"
    ],
    correctAnswer: 0,
    points: 5
  },
  {
    id: 6,
    title: "GROUP BY - Multiple Choice",
    category: "Intermediate",
    difficulty: "Medium",
    type: "multiple-choice",
    question: "Which clause is used to group rows that have the same values?",
    options: [
      "WHERE",
      "GROUP BY",
      "ORDER BY",
      "HAVING"
    ],
    correctAnswer: 1,
    points: 10
  },
  {
    id: 7,
    title: "INSERT Statement - True/False",
    category: "Beginner",
    difficulty: "Easy",
    type: "true-false",
    statement: "The INSERT statement is used to add new records to a table",
    isTrue: true,
    points: 5
  },
  {
    id: 8,
    title: "WHERE Clause - True/False",
    category: "Beginner",
    difficulty: "Easy",
    type: "true-false",
    statement: "WHERE clause can be used with SELECT, UPDATE, and DELETE statements",
    isTrue: true,
    points: 5
  },
  {
    id: 9,
    title: "Debug Query - Find the Error",
    category: "Intermediate",
    difficulty: "Medium",
    type: "debug",
    description: "This query has an error. Can you find and fix it?",
    buggyCode: "SELECT name, age FROM users WHERE age > 18 ODER BY name",
    hint: "Check the ORDER BY syntax",
    expectedBehavior: "Should order results by name",
    points: 15
  },
  {
    id: 10,
    title: "Optimize Performance",
    category: "Advanced",
    difficulty: "Hard",
    type: "optimization",
    description: "Optimize this slow query for better performance",
    slowQuery: "SELECT * FROM users WHERE YEAR(created_at) = 2024",
    hint: "Consider using index-friendly date comparisons",
    expectedOutcome: "Faster query execution using appropriate date format",
    points: 30
  }
];

export default function PracticePage() {
  const [selectedQuestion, setSelectedQuestion] = useState(PRACTICE_QUESTIONS[0]);
  const [code, setCode] = useState(selectedQuestion.initialCode || '');
  const [showOutput, setShowOutput] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<any>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<any>({});
  const [filter, setFilter] = useState('all');

  const handleQuestionSelect = (question: any) => {
    setSelectedQuestion(question);
    setCode(question.initialCode || '');
    setShowOutput(false);
    setSubmissionResult(null);
  };

  const handleSubmit = () => {
    // Simulate submission
    if (selectedQuestion.type === 'write-sql') {
      setSubmissionResult({
        success: code.toUpperCase().includes('SELECT'),
        message: code.toUpperCase().includes('SELECT') 
          ? '✓ Query executed successfully!' 
          : '✗ Query contains errors',
        output: ['id', 'name', 'email', 'contact']
      });
    } else if (selectedQuestion.type === 'multiple-choice') {
      const isCorrect = selectedAnswers[selectedQuestion.id] === selectedQuestion.correctAnswer;
      setSubmissionResult({
        success: isCorrect,
        message: isCorrect ? '✓ Correct answer!' : '✗ Wrong answer',
      });
    } else if (selectedQuestion.type === 'true-false') {
      const isCorrect = selectedAnswers[selectedQuestion.id] === selectedQuestion.isTrue;
      setSubmissionResult({
        success: isCorrect,
        message: isCorrect ? '✓ Correct!' : '✗ Incorrect',
      });
    }
    setShowOutput(true);
  };

  const filteredQuestions = filter === 'all' 
    ? PRACTICE_QUESTIONS 
    : PRACTICE_QUESTIONS.filter(q => q.category.toLowerCase() === filter.toLowerCase());

  return (
    <div className="grid grid-cols-4 gap-6">
      {/* Question List */}
      <div className="col-span-1">
        <Card className="border-none shadow-md h-fit max-h-[80vh] overflow-y-auto">
          <CardHeader className="sticky top-0 bg-white border-b">
            <CardTitle className="text-lg">Questions</CardTitle>
            <div className="flex gap-2 mt-3 flex-wrap">
              <button 
                onClick={() => setFilter('all')}
                className={`text-xs px-3 py-1 rounded-full transition ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                All ({PRACTICE_QUESTIONS.length})
              </button>
              <button 
                onClick={() => setFilter('beginner')}
                className={`text-xs px-3 py-1 rounded-full transition ${filter === 'beginner' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
              >
                Beginner
              </button>
              <button 
                onClick={() => setFilter('intermediate')}
                className={`text-xs px-3 py-1 rounded-full transition ${filter === 'intermediate' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                Intermediate
              </button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-2 p-4">
              {filteredQuestions.map((question) => (
                <button
                  key={question.id}
                  onClick={() => handleQuestionSelect(question)}
                  className={`w-full text-left p-3 rounded-lg border-2 transition ${
                    selectedQuestion.id === question.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <p className="font-medium text-sm mb-1">{question.title}</p>
                  <div className="flex gap-2 items-center">
                    <Badge variant="outline" className="text-xs">{question.type}</Badge>
                    <span className="text-xs text-yellow-600">+{question.points} pts</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Question Content */}
      <div className="col-span-3 space-y-4">
        <Card className="border-none shadow-md">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{selectedQuestion.title}</CardTitle>
                <div className="flex gap-3 mt-2">
                  <Badge variant={
                    selectedQuestion.difficulty === 'Easy' ? 'secondary' :
                    selectedQuestion.difficulty === 'Medium' ? 'default' : 'destructive'
                  }>
                    {selectedQuestion.difficulty}
                  </Badge>
                  <Badge variant="outline">{selectedQuestion.type}</Badge>
                  <span className="text-yellow-600 font-semibold">+{selectedQuestion.points} points</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Description */}
            {(selectedQuestion.description || selectedQuestion.question || selectedQuestion.statement) && (
              <div>
                <h3 className="font-semibold mb-2">Problem Statement</h3>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                  {selectedQuestion.description || selectedQuestion.question || selectedQuestion.statement}
                </p>
              </div>
            )}

            {/* Expected Output for SQL */}
            {selectedQuestion.expectedOutput && (
              <div>
                <h3 className="font-semibold mb-2">Expected Output</h3>
                <p className="text-gray-700 bg-blue-50 p-4 rounded-lg border border-blue-200">
                  {selectedQuestion.expectedOutput}
                </p>
              </div>
            )}

            {/* Hint */}
            {selectedQuestion.hint && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Hint:</strong> {selectedQuestion.hint}
                </AlertDescription>
              </Alert>
            )}

            {/* SQL Editor for write-sql questions */}
            {selectedQuestion.type === 'write-sql' && (
              <div>
                <h3 className="font-semibold mb-2">Write Your SQL Query</h3>
                <SQLEditor 
                  value={code} 
                  onChange={setCode}
                  height={250}
                />
              </div>
            )}

            {/* Multiple Choice */}
            {selectedQuestion.type === 'multiple-choice' && (
              <div>
                <h3 className="font-semibold mb-3">Select the correct answer:</h3>
                <div className="space-y-2">
                  {selectedQuestion.options.map((option: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedAnswers({...selectedAnswers, [selectedQuestion.id]: idx})}
                      className={`w-full p-3 text-left rounded-lg border-2 transition ${
                        selectedAnswers[selectedQuestion.id] === idx
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* True/False */}
            {selectedQuestion.type === 'true-false' && (
              <div>
                <h3 className="font-semibold mb-3">Is this statement true or false?</h3>
                <div className="flex gap-3">
                  {['True', 'False'].map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedAnswers({...selectedAnswers, [selectedQuestion.id]: idx === 0})}
                      className={`px-6 py-3 rounded-lg border-2 font-semibold transition ${
                        selectedAnswers[selectedQuestion.id] === (idx === 0)
                          ? 'border-blue-500 bg-blue-50 text-blue-600'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Debug Query */}
            {selectedQuestion.type === 'debug' && (
              <div>
                <h3 className="font-semibold mb-2">Original (Broken) Query:</h3>
                <pre className="bg-red-50 p-4 rounded-lg border border-red-200 text-red-700 whitespace-pre-wrap font-mono text-sm mb-3">
                  {selectedQuestion.buggyCode}
                </pre>
                <h3 className="font-semibold mb-2">Fix the query:</h3>
                <SQLEditor 
                  value={code} 
                  onChange={setCode}
                  height={200}
                />
              </div>
            )}

            {/* Output/Results */}
            {showOutput && submissionResult && (
              <Alert className={submissionResult.success ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}>
                <div className="flex items-start gap-2">
                  {submissionResult.success ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                  )}
                  <div>
                    <p className={submissionResult.success ? 'text-green-800 font-semibold' : 'text-red-800 font-semibold'}>
                      {submissionResult.message}
                    </p>
                    {submissionResult.output && (
                      <p className="text-sm mt-2 opacity-75">Output: {submissionResult.output.join(', ')}</p>
                    )}
                  </div>
                </div>
              </Alert>
            )}

            {/* Submit Button */}
            <Button 
              onClick={handleSubmit} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold"
            >
              Submit Answer
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
