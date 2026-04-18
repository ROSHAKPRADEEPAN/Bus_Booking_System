import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Lock } from 'lucide-react';

const CHALLENGES = [
  {
    id: 1,
    title: "Weekly Challenge",
    description: "5 questions covering this week's topics",
    difficulty: "Medium",
    timeLimit: "30 minutes",
    reward: 200,
    attempts: "3 attempts",
    locked: false,
    status: "In Progress"
  },
  {
    id: 2,
    title: "SQL Tournament",
    description: "Compete with other learners - Real-time leaderboard",
    difficulty: "Hard",
    timeLimit: "45 minutes",
    reward: 500,
    attempts: "Unlimited",
    locked: false,
    status: "Available"
  },
  {
    id: 3,
    title: "Database Design Challenge",
    description: "Design an optimal database schema",
    difficulty: "Expert",
    timeLimit: "60 minutes",
    reward: 1000,
    attempts: "Unlimited",
    locked: true,
    status: "Locked"
  },
  {
    id: 4,
    title: "Performance Optimization",
    description: "Optimize complex queries for speed",
    difficulty: "Hard",
    timeLimit: "45 minutes",
    reward: 750,
    attempts: "Unlimited",
    locked: true,
    status: "Locked"
  },
  {
    id: 5,
    title: "Real-World Project",
    description: "Build a complete SQL project from scratch",
    difficulty: "Expert",
    timeLimit: "No limit",
    reward: 2000,
    attempts: "Unlimited",
    locked: true,
    status: "Locked"
  }
];

const LEADERBOARD = [
  { rank: 1, name: 'Alex Chen', points: 4850, level: 'Expert', streak: 15 },
  { rank: 2, name: 'Maria Garcia', points: 4620, level: 'Advanced', streak: 12 },
  { rank: 3, name: 'James Wilson', points: 4400, level: 'Advanced', streak: 10 },
  { rank: 4, name: 'You', points: 1250, level: 'Intermediate', streak: 7, isUser: true },
  { rank: 5, name: 'Sara Ahmed', points: 1180, level: 'Intermediate', streak: 5 },
  { rank: 6, name: 'David Kim', points: 980, level: 'Intermediate', streak: 4 },
];

export default function ChallengesPage() {
  return (
    <div className="space-y-6">
      {/* Leaderboard */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Global Leaderboard
          </CardTitle>
          <CardDescription>Top SQL learners this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {LEADERBOARD.map((entry) => (
              <div 
                key={entry.rank}
                className={`flex items-center gap-4 p-4 rounded-lg border ${
                  entry.isUser 
                    ? 'bg-blue-50 border-blue-300 shadow-sm' 
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center w-8">
                  {entry.rank <= 3 ? (
                    <span className="text-xl">
                      {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'}
                    </span>
                  ) : (
                    <span className="font-bold text-gray-600">{entry.rank}</span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{entry.name}</p>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">{entry.level}</Badge>
                    <span className="text-xs text-orange-600 font-medium">🔥 {entry.streak} day streak</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-blue-600">{entry.points}</p>
                  <p className="text-xs text-gray-600">points</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Challenges Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Active Challenges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CHALLENGES.map((challenge) => (
            <Card 
              key={challenge.id} 
              className={`border-none shadow-md overflow-hidden transition hover:shadow-lg cursor-pointer ${
                challenge.locked ? 'opacity-60' : ''
              }`}
            >
              <div className={`h-2 ${
                challenge.difficulty === 'Medium' ? 'bg-blue-500' :
                challenge.difficulty === 'Hard' ? 'bg-orange-500' : 'bg-red-500'
              }`} />
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-lg">{challenge.title}</CardTitle>
                  {challenge.locked ? (
                    <Lock className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  )}
                </div>
                <CardDescription>{challenge.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-gray-600 text-xs">Difficulty</p>
                    <p className="font-semibold text-gray-800">{challenge.difficulty}</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <p className="text-gray-600 text-xs">Time Limit</p>
                    <p className="font-semibold text-gray-800">{challenge.timeLimit}</p>
                  </div>
                  <div className="bg-blue-50 p-2 rounded">
                    <p className="text-gray-600 text-xs">Reward</p>
                    <p className="font-semibold text-blue-600">+{challenge.reward} pts</p>
                  </div>
                  <div className="bg-green-50 p-2 rounded">
                    <p className="text-gray-600 text-xs">Attempts</p>
                    <p className="font-semibold text-green-600">{challenge.attempts}</p>
                  </div>
                </div>

                {challenge.status === 'In Progress' && (
                  <div className="bg-blue-50 border border-blue-200 rounded p-2">
                    <p className="text-sm text-blue-700 font-medium">📊 3/5 Questions Completed</p>
                  </div>
                )}

                <Button 
                  className="w-full" 
                  variant={challenge.locked ? "outline" : "default"}
                  disabled={challenge.locked}
                >
                  {challenge.locked ? 'Locked' : challenge.status === 'In Progress' ? 'Continue' : 'Start Challenge'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>🎯 Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: 'April 15', event: 'SQL Speedrun Tournament', prize: '₹5000' },
              { date: 'April 22', event: 'Database Design Bootcamp', prize: '₹7500' },
              { date: 'May 1', event: 'Monthly Challenge Championship', prize: '₹10000' },
            ].map((event, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
                <div>
                  <p className="font-semibold">{event.event}</p>
                  <p className="text-sm text-gray-600">{event.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-yellow-600 font-bold">{event.prize}</p>
                  <Button size="sm" variant="outline">Register</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
