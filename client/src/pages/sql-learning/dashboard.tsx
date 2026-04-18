import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Zap, BookOpen, Target, Award } from 'lucide-react';

const progressData = [
  { day: 'Mon', points: 120 },
  { day: 'Tue', points: 180 },
  { day: 'Wed', points: 140 },
  { day: 'Thu', points: 200 },
  { day: 'Fri', points: 250 },
  { day: 'Sat', points: 220 },
  { day: 'Sun', points: 180 }
];

const questionTypes = [
  { name: 'Multiple Choice', value: 18, color: '#3b82f6' },
  { name: 'Write SQL', value: 15, color: '#8b5cf6' },
  { name: 'True/False', value: 7, color: '#ec4899' },
  { name: 'Debugging', value: 3, color: '#f59e0b' }
];

const achievements = [
  { id: 1, title: 'First Step', description: 'Complete your first lesson', unlocked: true, icon: '🎯' },
  { id: 2, title: 'Week Warrior', description: '7-day learning streak', unlocked: true, icon: '⚡' },
  { id: 3, title: 'Perfect Score', description: 'Get 100% on 5 challenges', unlocked: false, icon: '🌟' },
  { id: 4, title: 'SQL Master', description: 'Complete all courses', unlocked: false, icon: '👑' },
  { id: 5, title: 'Speed Demon', description: 'Complete 10 questions in 15 min', unlocked: true, icon: '🚀' },
  { id: 6, title: 'Bug Hunter', description: 'Fix 20 broken queries', unlocked: false, icon: '🔍' },
];

export default function Dashboard({ userStats }: any) {
  return (
    <div className="space-y-6">
      {/* Quick Start */}
      <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Ready to Learn?
          </CardTitle>
          <CardDescription className="text-blue-100">
            Continue your SQL learning journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              Continue Learning
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-blue-700">
              View Challenges
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        {/* Weekly Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Weekly Progress</CardTitle>
            <CardDescription>Points earned this week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="points" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Question Types */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Questions Breakdown</CardTitle>
            <CardDescription>By question type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={questionTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {questionTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { action: 'Completed lesson', course: 'Intermediate SQL - Subqueries', time: '2 hours ago', icon: '✓' },
              { action: 'Earned badge', course: 'Speed Demon', time: '5 hours ago', icon: '🚀' },
              { action: 'Completed challenge', course: 'Week 2 Challenge', time: 'Yesterday', icon: '🏆' },
              { action: 'Reached milestone', course: 'Answered 40 questions', time: '2 days ago', icon: '⭐' },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-center gap-4 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition">
                <span className="text-2xl">{activity.icon}</span>
                <div className="flex-1">
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.course}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Achievements
          </CardTitle>
          <CardDescription>
            {achievements.filter(a => a.unlocked).length} of {achievements.length} unlocked
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id} 
                className={`p-4 rounded-lg border text-center transition ${
                  achievement.unlocked 
                    ? 'bg-gradient-to-b from-yellow-50 to-amber-50 border-yellow-300' 
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <div className="text-4xl mb-2">{achievement.icon}</div>
                <p className="font-bold text-sm mb-1">{achievement.title}</p>
                <p className="text-xs text-gray-600">{achievement.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
