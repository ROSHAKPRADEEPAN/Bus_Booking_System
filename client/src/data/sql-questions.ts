// SQL Learning Platform - Questions Database
// Organized by difficulty level: Beginner → Intermediate → Advanced → Expert

export const SQL_QUESTIONS = {
  beginner: [
    {
      id: 'b1',
      title: 'Select All Rows',
      difficulty: 'Easy',
      type: 'write-sql',
      category: 'SELECT',
      description: 'Write a query to select all columns from the customers table',
      expectedOutput: 'All customer records with all columns',
      hint: 'Use SELECT * FROM table_name',
      initialCode: '-- Select all customers\n\n',
      points: 10,
      testCases: [
        { input: 'SELECT * FROM customers', expected: true },
      ]
    },
    {
      id: 'b2',
      title: 'Select Specific Columns',
      difficulty: 'Easy',
      type: 'write-sql',
      category: 'SELECT',
      description: 'Select only name and email columns from the customers table',
      expectedOutput: 'Customer names and email addresses',
      hint: 'List column names separated by commas',
      initialCode: 'SELECT FROM customers',
      points: 10,
      testCases: []
    },
    {
      id: 'b3',
      title: 'WHERE Clause Basic Filter',
      difficulty: 'Easy',
      type: 'write-sql',
      category: 'WHERE',
      description: 'Find all customers from USA',
      expectedOutput: 'Only customers with country = USA',
      hint: 'Use WHERE country = "USA"',
      initialCode: 'SELECT * FROM customers\n\n',
      points: 15,
      testCases: []
    },
    {
      id: 'b4',
      title: 'Comparison Operators',
      difficulty: 'Easy',
      type: 'write-sql',
      category: 'WHERE',
      description: 'Find all bookings with price greater than $100',
      expectedOutput: 'Bookings with price > 100',
      hint: 'Use the > operator in WHERE clause',
      initialCode: 'SELECT * FROM bookings\n\n',
      points: 15,
      testCases: []
    },
    {
      id: 'b5',
      title: 'Logical AND Operator',
      difficulty: 'Easy',
      type: 'write-sql',
      category: 'WHERE',
      description: 'Find customers from USA who are older than 25',
      expectedOutput: 'Customers matching both conditions',
      hint: 'Use AND to combine two conditions',
      initialCode: 'SELECT * FROM customers\nWHERE\n\n',
      points: 20,
      testCases: []
    },
    {
      id: 'b6',
      title: 'COUNT Aggregate Function',
      difficulty: 'Easy',
      type: 'write-sql',
      category: 'AGGREGATE',
      description: 'Count total number of customers in the database',
      expectedOutput: 'Single number showing total count',
      hint: 'Use COUNT(*)',
      initialCode: 'SELECT \nFROM customers',
      points: 15,
      testCases: []
    },
    {
      id: 'b7',
      title: 'DISTINCT Keyword',
      difficulty: 'Easy',
      type: 'write-sql',
      category: 'SELECT',
      description: 'Get all unique countries from customers table',
      expectedOutput: 'List of unique country values',
      hint: 'Use SELECT DISTINCT',
      initialCode: 'SELECT FROM customers',
      points: 15,
      testCases: []
    },
    {
      id: 'b8',
      title: 'ORDER BY Clause',
      difficulty: 'Easy',
      type: 'write-sql',
      category: 'ORDER BY',
      description: 'Select all customers and sort by name in ascending order',
      expectedOutput: 'Customers sorted alphabetically by name',
      hint: 'Use ORDER BY name ASC',
      initialCode: 'SELECT * FROM customers\n\n',
      points: 15,
      testCases: []
    },
    {
      id: 'b9',
      title: 'LIMIT Clause',
      difficulty: 'Easy',
      type: 'write-sql',
      category: 'LIMIT',
      description: 'Get the first 10 customers from the database',
      expectedOutput: 'Exactly 10 customer records',
      hint: 'Use LIMIT 10',
      initialCode: 'SELECT * FROM customers\nORDER BY id\n',
      points: 10,
      testCases: []
    },
    {
      id: 'b10',
      title: 'Multiple Choice - SQL Syntax',
      difficulty: 'Easy',
      type: 'multiple-choice',
      category: 'BASICS',
      question: 'What does SELECT * FROM users WHERE age > 18 do?',
      options: [
        'Selects all users older than 18',
        'Selects users with age equal to 18',
        'Counts users older than 18',
        'Deletes users older than 18'
      ],
      correctAnswer: 0,
      points: 10,
      explanation: 'The > operator means "greater than", not "greater than or equal to"'
    },
    {
      id: 'b11',
      title: 'True/False - INSERT Statement',
      difficulty: 'Easy',
      type: 'true-false',
      category: 'BASICS',
      statement: 'The INSERT statement is used to add new records to a table',
      isTrue: true,
      points: 5,
      explanation: 'INSERT is the correct statement to add data to tables'
    },
    {
      id: 'b12',
      title: 'True/False - WHERE Clause Use',
      difficulty: 'Easy',
      type: 'true-false',
      category: 'WHERE',
      statement: 'WHERE clause can only be used with SELECT statements',
      isTrue: false,
      points: 5,
      explanation: 'WHERE can be used with SELECT, UPDATE, and DELETE statements'
    },
  ],

  intermediate: [
    {
      id: 'i1',
      title: 'INNER JOIN Basic',
      difficulty: 'Medium',
      type: 'write-sql',
      category: 'JOINS',
      description: 'Get customer names with their booking details using INNER JOIN',
      expectedOutput: 'Combined data from customers and bookings tables',
      hint: 'Use INNER JOIN ... ON to match records',
      initialCode: 'SELECT c.name, b.booking_id\nFROM customers c\n\nJOIN bookings b\nON c.id = b.customer_id',
      points: 25,
      testCases: []
    },
    {
      id: 'i2',
      title: 'LEFT JOIN Query',
      difficulty: 'Medium',
      type: 'write-sql',
      category: 'JOINS',
      description: 'Show all customers and their bookings (including those without bookings)',
      expectedOutput: 'All customers with NULL values for those without bookings',
      hint: 'Use LEFT JOIN to keep all records from left table',
      initialCode: 'SELECT \nFROM customers c\n\nJOIN bookings b',
      points: 25,
      testCases: []
    },
    {
      id: 'i3',
      title: 'GROUP BY and COUNT',
      difficulty: 'Medium',
      type: 'write-sql',
      category: 'AGGREGATE',
      description: 'Count bookings per customer',
      expectedOutput: 'Customer names with their booking count',
      hint: 'Use GROUP BY customer_id with COUNT(*)',
      initialCode: 'SELECT c.name, COUNT(b.id) as booking_count\nFROM customers c\n\nGROUP BY',
      points: 25,
      testCases: []
    },
    {
      id: 'i4',
      title: 'Subquery in WHERE',
      difficulty: 'Medium',
      type: 'write-sql',
      category: 'SUBQUERIES',
      description: 'Find customers who have booked vehicles priced over $200',
      expectedOutput: 'List of qualifying customers',
      hint: 'Use a subquery in the WHERE clause',
      initialCode: 'SELECT * FROM customers\nWHERE id IN (\n  SELECT customer_id FROM bookings\n  \n)',
      points: 30,
      testCases: []
    },
    {
      id: 'i5',
      title: 'HAVING Clause',
      difficulty: 'Medium',
      type: 'write-sql',
      category: 'AGGREGATE',
      description: 'Find customers with more than 3 bookings',
      expectedOutput: 'Customer names with booking count > 3',
      hint: 'Use HAVING with COUNT() for aggregate filtering',
      initialCode: 'SELECT c.name, COUNT(b.id) as bookings\nFROM customers c\nJOIN bookings b ON c.id = b.customer_id\nGROUP BY c.id\n',
      points: 25,
      testCases: []
    },
    {
      id: 'i6',
      title: 'UNION Operations',
      difficulty: 'Medium',
      type: 'write-sql',
      category: 'SET OPERATIONS',
      description: 'Combine names of customers and vehicle owners',
      expectedOutput: 'Single list of unique names from both tables',
      hint: 'Use UNION to combine results from two queries',
      initialCode: 'SELECT name FROM customers\nUNION\nSELECT name FROM owners',
      points: 20,
      testCases: []
    },
    {
      id: 'i7',
      title: 'BETWEEN Operator',
      difficulty: 'Medium',
      type: 'write-sql',
      category: 'WHERE',
      description: 'Find all bookings with prices between $100 and $500',
      expectedOutput: 'Bookings within the price range (inclusive)',
      hint: 'Use BETWEEN ... AND syntax',
      initialCode: 'SELECT * FROM bookings\nWHERE price\n',
      points: 15,
      testCases: []
    },
    {
      id: 'i8',
      title: 'LIKE Pattern Matching',
      difficulty: 'Medium',
      type: 'write-sql',
      category: 'WHERE',
      description: 'Find all customers whose email contains "gmail"',
      expectedOutput: 'Gmail users only',
      hint: 'Use LIKE with % wildcard',
      initialCode: 'SELECT * FROM customers\nWHERE email LIKE ',
      points: 15,
      testCases: []
    },
    {
      id: 'i9',
      title: 'CASE Statement',
      difficulty: 'Medium',
      type: 'write-sql',
      category: 'FUNCTIONS',
      description: 'Categorize bookings as cheap, medium, or expensive (prices: <100, 100-300, >300)',
      expectedOutput: 'Booking details with category column',
      hint: 'Use CASE WHEN THEN ELSE END',
      initialCode: 'SELECT *,\n  CASE\n    WHEN price < 100 THEN \'Cheap\'\n    \n  END as category\nFROM bookings',
      points: 25,
      testCases: []
    },
    {
      id: 'i10',
      title: 'Multiple Choice - JOIN Types',
      difficulty: 'Medium',
      type: 'multiple-choice',
      category: 'JOINS',
      question: 'What is the difference between INNER JOIN and LEFT JOIN?',
      options: [
        'INNER JOIN returns only matching records, LEFT JOIN returns all from left table plus matches',
        'INNER JOIN returns all records, LEFT JOIN returns only matches',
        'They are the same',
        'INNER JOIN is faster than LEFT JOIN'
      ],
      correctAnswer: 0,
      points: 15,
      explanation: 'INNER JOIN filters to only matching rows, while LEFT JOIN keeps all rows from the left table'
    },
  ],

  advanced: [
    {
      id: 'a1',
      title: 'Window Function - ROW_NUMBER',
      difficulty: 'Hard',
      type: 'write-sql',
      category: 'WINDOW FUNCTIONS',
      description: 'Rank customers by total booking amount',
      expectedOutput: 'Customers with their rank based on spending',
      hint: 'Use ROW_NUMBER() OVER (ORDER BY total_spent DESC)',
      initialCode: 'SELECT customer_id,\n  ROW_NUMBER() OVER (ORDER BY\n',
      points: 35,
      testCases: []
    },
    {
      id: 'a2',
      title: 'CTE (Common Table Expression)',
      difficulty: 'Hard',
      type: 'write-sql',
      category: 'ADVANCED SQL',
      description: 'Use a CTE to find high-value customers (those who spent > average)',
      expectedOutput: 'List of above-average spenders',
      hint: 'Use WITH ... AS syntax',
      initialCode: 'WITH avg_spending AS (\n  SELECT AVG(total) as avg_total FROM bookings\n)\nSELECT *\nFROM customers c\n',
      points: 35,
      testCases: []
    },
    {
      id: 'a3',
      title: 'Recursive CTE',
      difficulty: 'Hard',
      type: 'write-sql',
      category: 'ADVANCED SQL',
      description: 'Generate numbers from 1 to 10 using recursive CTE',
      expectedOutput: 'Numbers 1 through 10',
      hint: 'Use recursive CTE with UNION ALL',
      initialCode: 'WITH RECURSIVE numbers AS (\n  SELECT 1 as n\n  UNION ALL\n  SELECT n + 1 FROM numbers WHERE n < 10\n)\nSELECT * FROM numbers',
      points: 40,
      testCases: []
    },
    {
      id: 'a4',
      title: 'Correlated Subquery',
      difficulty: 'Hard',
      type: 'write-sql',
      category: 'SUBQUERIES',
      description: 'Find customers with booking amount above their average',
      expectedOutput: 'Customer bookings exceeding their personal average',
      hint: 'Use a subquery that references outer query table',
      initialCode: 'SELECT * FROM bookings b1\nWHERE amount > (\n  SELECT AVG(amount) FROM bookings b2\n  \n)',
      points: 35,
      testCases: []
    },
    {
      id: 'a5',
      title: 'Self Join',
      difficulty: 'Hard',
      type: 'write-sql',
      category: 'JOINS',
      description: 'Find employees and their managers (employee-manager relationship)',
      expectedOutput: 'Employees with their manager names',
      hint: 'Join table with itself using table aliases',
      initialCode: 'SELECT e.name as employee, m.name as manager\nFROM employees e\nLEFT JOIN employees m\nON e.manager_id = m.id',
      points: 30,
      testCases: []
    },
    {
      id: 'a6',
      title: 'Window Function - LAG/LEAD',
      difficulty: 'Hard',
      type: 'write-sql',
      category: 'WINDOW FUNCTIONS',
      description: 'Compare each booking price with previous booking by customer',
      expectedOutput: 'Bookings with price comparison to previous booking',
      hint: 'Use LAG(price, 1) OVER (PARTITION BY customer_id ORDER BY date)',
      initialCode: 'SELECT customer_id, price,\n  LAG(price) OVER (PARTITION BY\n',
      points: 35,
      testCases: []
    },
    {
      id: 'a7',
      title: 'Query Optimization Challenge',
      difficulty: 'Hard',
      type: 'optimization',
      description: 'Optimize this slow query',
      slowQuery: 'SELECT * FROM customers WHERE YEAR(created_at) = 2024',
      expectedOptimization: 'Use date range instead of function for index usage',
      hint: 'Avoid functions on columns in WHERE - use range instead',
      points: 40,
      explanation: 'WHERE YEAR(created_at) = 2024 prevents index usage. Better: WHERE created_at >= \'2024-01-01\' AND created_at < \'2025-01-01\''
    },
    {
      id: 'a8',
      title: 'EXCEPT Set Operation',
      difficulty: 'Hard',
      type: 'write-sql',
      category: 'SET OPERATIONS',
      description: 'Find customers who have never booked a vehicle',
      expectedOutput: 'Customers without any bookings',
      hint: 'Use EXCEPT operator',
      initialCode: 'SELECT id FROM customers\nEXCEPT\nSELECT DISTINCT customer_id FROM bookings',
      points: 30,
      testCases: []
    },
  ],

  expert: [
    {
      id: 'e1',
      title: 'Complex Multi-Table Query',
      difficulty: 'Expert',
      type: 'write-sql',
      category: 'COMPLEX',
      description: 'Get customers with total booking amount, avg booking price, booking count, and their rank',
      expectedOutput: 'Comprehensive customer analytics with ranking',
      hint: 'Combine window functions, aggregates, and JOINs',
      initialCode: 'SELECT \n  c.id, c.name,\n  COUNT(b.id) as booking_count,\n  SUM(b.amount) as total_amount,\n  AVG(b.amount) as avg_amount,\n  RANK() OVER (ORDER BY SUM(b.amount) DESC) as rank\n',
      points: 50,
      testCases: []
    },
    {
      id: 'e2',
      title: 'Dynamic Pivoting',
      difficulty: 'Expert',
      type: 'write-sql',
      category: 'ADVANCED',
      description: 'Create a pivot table showing bookings by month',
      expectedOutput: 'Months as columns with booking counts',
      hint: 'Use CASE with aggregation or PIVOT if available',
      initialCode: 'SELECT YEAR(booking_date) as year,\n  SUM(CASE WHEN MONTH(booking_date) = 1 THEN 1 ELSE 0 END) as jan,\n  SUM(CASE WHEN MONTH(booking_date) = 2 THEN 1 ELSE 0 END) as feb,\n',
      points: 50,
      testCases: []
    },
    {
      id: 'e3',
      title: 'Database Design Challenge',
      difficulty: 'Expert',
      type: 'design',
      category: 'DATABASE DESIGN',
      description: 'Design an optimal database schema for a vehicle booking system',
      expectedOutput: 'ER diagram with normalized tables',
      hint: 'Consider 3NF, relationships, and integrity constraints',
      points: 100,
      considerations: [
        'Customer management (users/owners)',
        'Vehicle catalog with specifications',
        'Booking/rental system',
        'Payments and transactions',
        'Reviews and ratings',
        'At least 3NF compliance',
        'Referential integrity'
      ]
    },
  ]
};

export const SQL_TUTORIALS = [
  {
    id: 1,
    title: 'What is SQL?',
    duration: '5 min',
    level: 'Beginner',
    content: 'SQL (Structured Query Language) is a standardized language for managing relational databases.',
    videoUrl: '#'
  },
  {
    id: 2,
    title: 'SELECT Statement Deep Dive',
    duration: '15 min',
    level: 'Beginner',
    content: 'Learn the complete syntax of SELECT and how to retrieve data effectively.',
    videoUrl: '#'
  },
  {
    id: 3,
    title: 'Mastering JOINs',
    duration: '20 min',
    level: 'Intermediate',
    content: 'Understand INNER, LEFT, RIGHT, and FULL JOINs with real examples.',
    videoUrl: '#'
  },
  {
    id: 4,
    title: 'Window Functions - Advanced Analytics',
    duration: '25 min',
    level: 'Advanced',
    content: 'Use ROW_NUMBER, RANK, LAG, LEAD for powerful analytics.',
    videoUrl: '#'
  },
];

export const SQL_TEMPLATES = [
  { id: 1, name: 'Basic SELECT', code: 'SELECT * FROM table_name;' },
  { id: 2, name: 'Filtered Query', code: 'SELECT * FROM table_name WHERE condition;' },
  { id: 3, name: 'Multiple Conditions', code: 'SELECT * FROM table_name WHERE condition1 AND condition2;' },
  { id: 4, name: 'ORDER BY', code: 'SELECT * FROM table_name ORDER BY column_name ASC;' },
  { id: 5, name: 'INNER JOIN', code: 'SELECT * FROM table1 INNER JOIN table2 ON table1.id = table2.table1_id;' },
  { id: 6, name: 'GROUP BY', code: 'SELECT column, COUNT(*) FROM table_name GROUP BY column;' },
  { id: 7, name: 'Subquery', code: 'SELECT * FROM table_name WHERE id IN (SELECT table1_id FROM table2);' },
  { id: 8, name: 'CTE', code: 'WITH cte_name AS (SELECT * FROM table_name) SELECT * FROM cte_name;' },
];
