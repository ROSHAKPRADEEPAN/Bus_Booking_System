import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Lock, Play, BookOpen } from 'lucide-react';

const COURSES = [
  {
    id: 1,
    title: "SQL Fundamentals",
    description: "Learn the basics of SQL databases and queries",
    difficulty: "Beginner",
    progress: 100,
    lessons: 12,
    completedLessons: 12,
    color: "bg-green-500",
    modules: [
      { id: 1, title: "What is SQL & Databases", progress: 100, locked: false },
      { id: 2, title: "SELECT Statement Basics", progress: 100, locked: false },
      { id: 3, title: "WHERE Clause & Filtering", progress: 100, locked: false },
      { id: 4, title: "ORDER BY & LIMIT", progress: 100, locked: false },
    ]
  },
  {
    id: 2,
    title: "Intermediate SQL",
    description: "Master JOINs, subqueries, and advanced filtering",
    difficulty: "Intermediate",
    progress: 65,
    lessons: 15,
    completedLessons: 10,
    color: "bg-blue-500",
    modules: [
      { id: 5, title: "INNER JOIN & Relationships", progress: 100, locked: false },
      { id: 6, title: "LEFT, RIGHT & FULL JOINs", progress: 100, locked: false },
      { id: 7, title: "Subqueries & EXISTS", progress: 30, locked: false },
      { id: 8, title: "UNION & Set Operations", progress: 0, locked: false },
      { id: 9, title: "GROUP BY & HAVING", progress: 0, locked: true },
    ]
  },
  {
    id: 3,
    title: "Advanced SQL",
    description: "Window functions, CTEs, and performance optimization",
    difficulty: "Advanced",
    progress: 0,
    lessons: 18,
    completedLessons: 0,
    color: "bg-purple-500",
    modules: [
      { id: 10, title: "Window Functions", progress: 0, locked: true },
      { id: 11, title: "Common Table Expressions (CTE)", progress: 0, locked: true },
      { id: 12, title: "Query Optimization", progress: 0, locked: true },
      { id: 13, title: "Indexes & Performance", progress: 0, locked: true },
    ]
  },
  {
    id: 4,
    title: "Expert Mastery",
    description: "Complex scenarios and real-world database problems",
    difficulty: "Expert",
    progress: 0,
    lessons: 20,
    completedLessons: 0,
    color: "bg-red-500",
    modules: [
      { id: 14, title: "Transaction Control", progress: 0, locked: true },
      { id: 15, title: "Database Design", progress: 0, locked: true },
      { id: 16, title: "Real-World Challenges", progress: 0, locked: true },
    ]
  }
];

export default function LearningPath() {
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Learning Path</h2>
        <p className="text-gray-600">Follow our structured curriculum to master SQL</p>
      </div>

      {COURSES.map((course) => (
        <Card key={course.id} className="overflow-hidden border-l-4" style={{ borderLeftColor: 'var(--color)' }}>
          <CardHeader 
            className="cursor-pointer hover:bg-gray-50 transition"
            onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold">{course.title}</h3>
                  <Badge variant={course.difficulty === 'Beginner' ? 'secondary' : course.difficulty === 'Intermediate' ? 'default' : 'destructive'}>
                    {course.difficulty}
                  </Badge>
                  {course.progress === 100 && (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  )}
                </div>
                <p className="text-gray-600 mb-3">{course.description}</p>
                <Progress value={course.progress} className="h-2 mb-2" />
                <p className="text-sm text-gray-500">
                  {course.completedLessons} of {course.lessons} lessons completed
                </p>
              </div>
              <Button variant="outline" size="sm" className="ml-4">
                {course.progress === 100 ? 'Review' : 'Continue'}
              </Button>
            </div>
          </CardHeader>

          {expandedCourse === course.id && (
            <CardContent className="border-t bg-gray-50 pt-6">
              <div className="space-y-3">
                {course.modules.map((module) => (
                  <div 
                    key={module.id} 
                    className="flex items-center gap-4 p-4 bg-white rounded-lg border hover:border-blue-300 hover:shadow-md transition cursor-pointer"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {module.locked ? (
                          <Lock className="w-4 h-4 text-gray-400" />
                        ) : module.progress === 100 ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : (
                          <Play className="w-4 h-4 text-blue-500" />
                        )}
                        <span className="font-medium">{module.title}</span>
                      </div>
                      <Progress value={module.progress} className="h-1.5" />
                    </div>
                    <Button 
                      variant={module.locked ? "outline" : "default"} 
                      size="sm"
                      disabled={module.locked}
                    >
                      {module.locked ? 'Locked' : module.progress === 100 ? 'Review' : 'Start'}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
}
