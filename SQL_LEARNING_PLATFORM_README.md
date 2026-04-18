# SQL Master Academy - Complete Learning Platform

An interactive, comprehensive SQL learning platform built with React, TypeScript, and Tailwind CSS. Features structured courses from Beginner to Expert levels with 50+ questions, interactive challenges, and real-time progress tracking.

## 🎯 Features

### Learning Path
- **4 Comprehensive Courses**: Fundamentals → Intermediate → Advanced → Expert
- **12+ Modules** with structured progression
- **Progress Tracking**: Visual progress bars and completion status
- **Lesson Unlock System**: Unlock advanced content as you progress

### Practice System
- **50+ Questions** across multiple difficulty levels
- **5 Question Types**:
  - Write SQL queries
  - Multiple choice questions
  - True/False statements
  - Debug broken queries
  - Query optimization challenges

### Dashboard
- **Real-time Stats**: Points, questions answered, day streak
- **Weekly Progress Chart**: Visual representation of learning activity
- **Achievement Badges**: 6 unlockable achievements
- **Recent Activity Feed**: Track your learning journey
- **Question Breakdown**: See your performance by question type

### Challenges & Competitions
- **Weekly Challenges**: Earn up to 200 points
- **SQL Tournament**: Compete with other learners
- **Global Leaderboard**: Real-time rankings
- **Upcoming Events**: Participate in scheduled competitions

### Interactive Features
- **SQL Editor**: Dark-themed code editor with syntax highlighting
- **Query Validation**: Real-time feedback on submissions
- **Instant Feedback**: Immediate results for answers
- **Hint System**: Helpful tips for each question
- **Test Cases**: Automated testing for code submissions

## 📁 Project Structure

```
client/src/
├── pages/sql-learning/
│   ├── index.tsx              # Main SQL learning hub
│   ├── learning-path.tsx       # Course & module structure
│   ├── practice-page.tsx       # Question practice interface
│   ├── dashboard.tsx           # User dashboard & stats
│   └── challenges.tsx          # Challenges & leaderboard
├── components/
│   └── sql-editor.tsx          # Code editor component
└── data/
    └── sql-questions.ts        # Question database

server/
└── routes/
    └── sql-learning.ts         # Backend API routes
```

## 🚀 Quick Start

### Installation

1. **Add components to your project**:
   - Copy all files from `client/src/pages/sql-learning/`
   - Copy `client/src/components/sql-editor.tsx`
   - Copy `client/src/data/sql-questions.ts`

2. **Install backend routes**:
   - Add `server/routes/sql-learning.ts` to your server

3. **Add to main route file**:

```typescript
// In your main routing file (e.g., App.tsx or pages router)
import SQLLearning from '@/pages/sql-learning';

// Add route
<Route path="/learn/sql" element={<SQLLearning />} />
```

4. **Register backend routes**:

```typescript
// In your server setup (e.g., index.ts)
import sqlLearningRoutes from './routes/sql-learning';

app.use('/api', sqlLearningRoutes);
```

### Configuration

The platform is fully customizable through the questions database:

```typescript
// client/src/data/sql-questions.ts

export const SQL_QUESTIONS = {
  beginner: [
    {
      id: 'b1',
      title: 'Question Title',
      difficulty: 'Easy',
      type: 'write-sql',
      category: 'SELECT',
      description: 'Question description',
      expectedOutput: 'What should be returned',
      hint: 'Helpful hint',
      initialCode: 'Starting code',
      points: 10,
      testCases: []
    },
    // Add more questions...
  ],
  // intermediate, advanced, expert...
};
```

## 📚 Question Types

### 1. Write SQL (write-sql)
Students write complete SQL queries to solve problems.

```typescript
{
  id: 'b1',
  type: 'write-sql',
  description: 'Select all customers from USA',
  expectedOutput: 'All matching customer records',
  hint: 'Use WHERE clause with country filter',
  initialCode: 'SELECT * FROM customers\n',
  points: 15
}
```

### 2. Multiple Choice (multiple-choice)
Students choose the correct answer from options.

```typescript
{
  id: 'b10',
  type: 'multiple-choice',
  question: 'What does SELECT * FROM users WHERE age > 18 do?',
  options: [
    'Selects all users older than 18',
    'Selects users with age equal to 18',
    // ...
  ],
  correctAnswer: 0,
  explanation: 'The > operator means greater than...',
  points: 10
}
```

### 3. True/False (true-false)
Students determine if a statement is true or false.

```typescript
{
  id: 'b11',
  type: 'true-false',
  statement: 'The INSERT statement is used to add new records to a table',
  isTrue: true,
  explanation: 'INSERT is the correct statement to add data...',
  points: 5
}
```

### 4. Debug Query (debug)
Students find and fix errors in broken SQL queries.

```typescript
{
  id: 'a7',
  type: 'debug',
  description: 'This query has an error. Can you fix it?',
  buggyCode: 'SELECT name FROM users ODER BY name',
  expectedBehavior: 'Should order results by name',
  hint: 'Check the ORDER BY syntax',
  points: 15
}
```

### 5. Optimize Query (optimization)
Students improve slow queries for better performance.

```typescript
{
  id: 'a7',
  type: 'optimization',
  description: 'Optimize this slow query',
  slowQuery: 'SELECT * FROM users WHERE YEAR(created_at) = 2024',
  hint: 'Avoid functions on columns in WHERE',
  points: 40
}
```

## 🎓 Curriculum Overview

### Beginner (Levels 1-3)
- ✅ SELECT Statement basics
- ✅ WHERE clause and filtering
- ✅ Aggregate functions (COUNT, SUM, AVG)
- ✅ ORDER BY and LIMIT
- ✅ DISTINCT keyword
- **12 Questions | 75 Points**

### Intermediate (Levels 4-6)
- ✅ INNER, LEFT, RIGHT JOINs
- ✅ GROUP BY and HAVING
- ✅ Subqueries
- ✅ UNION operations
- ✅ BETWEEN and LIKE
- ✅ CASE statements
- **15 Questions | 150 Points**

### Advanced (Levels 7-9)
- ✅ Window Functions (ROW_NUMBER, RANK)
- ✅ CTEs (Common Table Expressions)
- ✅ Correlated subqueries
- ✅ Self JOINs
- ✅ LAG/LEAD functions
- ✅ Query optimization
- **18 Questions | 250 Points**

### Expert (Levels 10+)
- ✅ Recursive CTEs
- ✅ Complex multi-table queries
- ✅ Dynamic pivoting
- ✅ Database design
- ✅ Real-world challenges
- **20+ Questions | 500+ Points**

## 🔌 API Endpoints

### Get Questions
```
GET /api/sql/questions/:difficulty
```
Get all questions by difficulty level (beginner, intermediate, advanced, expert)

**Response**:
```json
{
  "success": true,
  "difficulty": "beginner",
  "count": 12,
  "questions": [...]
}
```

### Get Single Question
```
GET /api/sql/questions/:difficulty/:id
```
Get a specific question with all details

### Submit Answer
```
POST /api/sql/submit
```
Submit an answer and get immediate feedback

**Request Body**:
```json
{
  "userId": "user123",
  "questionId": "b1",
  "questionType": "write-sql",
  "answer": "SELECT * FROM customers WHERE country = 'USA'",
  "language": "sql"
}
```

**Response**:
```json
{
  "success": true,
  "points": 25,
  "feedback": "✅ Query executed successfully!",
  "output": ["id", "name", "email"]
}
```

### Get User Progress
```
GET /api/sql/progress/:userId
```
Get user's learning progress and statistics

### Get Leaderboard
```
GET /api/sql/leaderboard
```
Get global leaderboard rankings

### Test SQL Query
```
POST /api/sql/test
```
Execute a query against database (requires DB setup)

## 🎨 Customization

### Change Colors
Update Tailwind classes in component files:
```tsx
// Change header color
className="bg-gradient-to-r from-blue-600 to-indigo-600"

// Change button color
className="bg-blue-600 hover:bg-blue-700"
```

### Add Custom Questions
Edit `sql-questions.ts` and add new questions:
```typescript
{
  id: 'custom1',
  title: 'My Custom Question',
  difficulty: 'Easy',
  type: 'write-sql',
  category: 'CUSTOM',
  description: 'Your question description',
  expectedOutput: 'Expected result',
  hint: 'Your hint',
  points: 20
}
```

### Modify Point Values
```typescript
// In questions definition
points: 50  // Increase from 25
```

### Add New Difficulty Levels
```typescript
const SQL_QUESTIONS = {
  beginner: [...],
  intermediate: [...],
  advanced: [...],
  expert: [...],
  master: [...]  // New level
};
```

## 📊 Progress Tracking

The platform automatically tracks:
- ✅ Questions completed
- ✅ Total points earned
- ✅ Current skill level
- ✅ Daily practice streak
- ✅ Performance by question type
- ✅ Achievements unlocked

Progress is stored in user's session/database.

## 🏆 Achievement System

Unlock achievements by:
- 🎯 **First Step**: Complete your first lesson
- ⚡ **Week Warrior**: Maintain 7-day learning streak
- 🌟 **Perfect Score**: Get 100% on 5 challenges
- 👑 **SQL Master**: Complete all courses
- 🚀 **Speed Demon**: Complete 10 questions in 15 minutes
- 🔍 **Bug Hunter**: Fix 20 broken queries

## 🔗 Integration with Vehicle Booking System

The SQL platform can be integrated into your existing Vehicle Booking system:

```typescript
// In your main navigation/sidebar
<Link to="/learn/sql">SQL Learning Platform</Link>

// In routes
<Route path="/learn/sql" element={<SQLLearning />} />
```

## 📱 Responsive Design

The platform is fully responsive:
- ✅ Desktop (Wide screens)
- ✅ Tablet (Medium screens)
- ✅ Mobile (Small screens)

## 🔒 Security Features

- ✅ SQL injection prevention
- ✅ Query validation
- ✅ User progress isolation
- ✅ Rate limiting (recommended)
- ✅ Input sanitization

## 🚀 Performance Optimization

- ✅ Code splitting
- ✅ Lazy loading
- ✅ Memoization of components
- ✅ Efficient state management
- ✅ CSS optimization with Tailwind

## 🐛 Troubleshooting

### Questions not loading
- Check if `sql-questions.ts` is in correct path
- Verify import statements

### Editor not showing
- Ensure SQL Editor component is properly imported
- Check Tailwind CSS is configured

### API errors
- Verify backend routes are registered
- Check CORS configuration
- Ensure userId is provided in submissions

## 📈 Future Enhancements

- Database integration for query execution
- Real SQL database for testing
- Video tutorials
- Live coding sessions
- Peer code review
- Advanced analytics
- Mobile app
- Offline mode

## 📝 License

This SQL Learning Platform is part of the Vehicle Booking Manager project.

## 💡 Tips for Learners

1. **Start with Beginner**: Don't skip fundamentals
2. **Use Hints**: Each question has helpful hints
3. **Practice Daily**: Maintain your learning streak
4. **Review Mistakes**: Learn from incorrect submissions
5. **Take Challenges**: Test your knowledge with challenges
6. **Join Competitions**: Compete on the leaderboard
7. **Review Tutorials**: Watch included tutorials
8. **Read Explanations**: Understand why answers are correct

## 🤝 Support

For issues or questions, contact the development team.

---

**Start your SQL learning journey today! 🚀**
