import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Flame, 
  Clock, 
  Medal, 
  Sparkles, 
  Users, 
  Search, 
  CheckCircle2, 
  Star, 
  ChevronUp, 
  User,
  ShieldCheck,
  Zap,
  Target
} from 'lucide-react';

export interface LeaderboardStudent {
  id: string;
  rank: number;
  name: string;
  city: string;
  school: string;
  streakDays: number;
  totalFocusHours: number;
  chaptersCompleted: number;
  badge: string;
  avatarColor: string;
  recentActivity: string;
}

const INITIAL_TOPPERS: LeaderboardStudent[] = [
  {
    id: 's-1',
    rank: 1,
    name: 'Aarav Sharma',
    city: 'New Delhi',
    school: 'DPS R.K. Puram',
    streakDays: 24,
    totalFocusHours: 86.5,
    chaptersCompleted: 12,
    badge: 'Centum Titan 🏆',
    avatarColor: 'from-amber-400 to-amber-600',
    recentActivity: 'Mastered 5-Mark Ray Optics Prism Derivation'
  },
  {
    id: 's-2',
    rank: 2,
    name: 'Sneha Kulkarni',
    city: 'Pune',
    school: 'DAV Public School',
    streakDays: 21,
    totalFocusHours: 74.0,
    chaptersCompleted: 12,
    badge: 'Organic Wizard 🧪',
    avatarColor: 'from-emerald-400 to-emerald-600',
    recentActivity: 'Completed Aldol & Cannizzaro Reaction Flowchart'
  },
  {
    id: 's-3',
    rank: 3,
    name: 'Devansh Verma',
    city: 'Kolkata',
    school: 'St. Xavier’s Collegiate',
    streakDays: 19,
    totalFocusHours: 68.5,
    chaptersCompleted: 11,
    badge: 'Derivations Pro ⚡',
    avatarColor: 'from-sky-400 to-sky-600',
    recentActivity: 'Solved Gauss’s Law & Electric Flux 5-Mark Proof'
  },
  {
    id: 's-4',
    rank: 4,
    name: 'Priyanka Nambiar',
    city: 'Kochi',
    school: 'Bhavan’s Vidya Mandir',
    streakDays: 17,
    totalFocusHours: 59.0,
    chaptersCompleted: 11,
    badge: 'Focus Machine 🔥',
    avatarColor: 'from-rose-400 to-rose-600',
    recentActivity: 'Revised Amines & Gabriel Phthalimide Synthesis'
  },
  {
    id: 's-5',
    rank: 5,
    name: 'Kabir Singhania',
    city: 'Kota',
    school: 'Allen Career Institute',
    streakDays: 15,
    totalFocusHours: 54.5,
    chaptersCompleted: 10,
    badge: 'Archery Marksman 🎯',
    avatarColor: 'from-purple-400 to-purple-600',
    recentActivity: 'Practiced AC Resonance & LCR Circuit Derivation'
  },
  {
    id: 's-6',
    rank: 6,
    name: 'Tanvi Deshmukh',
    city: 'Indore',
    school: 'St. Mary’s Convent',
    streakDays: 14,
    totalFocusHours: 51.0,
    chaptersCompleted: 10,
    badge: 'Optics Ace 🔭',
    avatarColor: 'from-teal-400 to-emerald-600',
    recentActivity: 'Drew Astronomical Telescope & Ray Diagrams'
  },
  {
    id: 's-7',
    rank: 7,
    name: 'Ananya Iyer',
    city: 'Bengaluru',
    school: 'National Public School',
    streakDays: 14,
    totalFocusHours: 49.0,
    chaptersCompleted: 9,
    badge: 'Concept Queen 👑',
    avatarColor: 'from-amber-500 to-rose-500',
    recentActivity: 'Memorized 5 Reactions Proving D-Glucose Structure'
  },
  {
    id: 's-8',
    rank: 8,
    name: 'Rohan Mehra',
    city: 'Chandigarh',
    school: 'St. John’s High School',
    streakDays: 13,
    totalFocusHours: 45.0,
    chaptersCompleted: 9,
    badge: 'Formula Ace 📌',
    avatarColor: 'from-cyan-400 to-blue-600',
    recentActivity: 'Practiced Semiconductor Full-Wave Rectifier Circuit'
  },
  {
    id: 's-9',
    rank: 9,
    name: 'Riya Sengupta',
    city: 'Patna',
    school: 'Loyola High School',
    streakDays: 12,
    totalFocusHours: 41.5,
    chaptersCompleted: 8,
    badge: 'Board Sprinter 🚀',
    avatarColor: 'from-emerald-500 to-teal-600',
    recentActivity: 'Completed 45m Focus Session on Wave Optics'
  },
  {
    id: 's-10',
    rank: 10,
    name: 'Aditya Patel',
    city: 'Ahmedabad',
    school: 'DPS Bopal',
    streakDays: 11,
    totalFocusHours: 38.0,
    chaptersCompleted: 8,
    badge: 'Electro Ace ⚡',
    avatarColor: 'from-indigo-400 to-purple-600',
    recentActivity: 'Mastered Moving Coil Galvanometer Sensitivity'
  }
];

interface ToppersLeaderboardProps {
  onOpenTimerModal?: () => void;
  userFocusMinutes?: number;
}

export const ToppersLeaderboard: React.FC<ToppersLeaderboardProps> = ({ 
  onOpenTimerModal,
  userFocusMinutes = 45 
}) => {
  const [timeFilter, setTimeFilter] = useState<'weekly' | 'today' | 'allTime'>('weekly');
  const [students, setStudents] = useState<LeaderboardStudent[]>(INITIAL_TOPPERS);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Current user's editable nickname
  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem('topper_user_name') || 'You (Future Topper)';
  });
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(userName);

  // Live dynamic study updates generator to keep competitive engagement
  useEffect(() => {
    const interval = setInterval(() => {
      // Pick random student and increment minor focus minute or trigger recent activity
      setStudents((prev) => {
        const randomIndex = Math.floor(Math.random() * prev.length);
        const updated = [...prev];
        const student = { ...updated[randomIndex] };
        
        const activities = [
          'Completed 45-min unbroken focus session on Physics derivations! 🔥',
          'Hit Bullseye in MSN Line Archery 5-minute study break 🎯',
          'Answered Daily Challenge board question correctly ✨',
          'Practiced Series LCR circuit resonance proof for 5 marks ⚡',
          'Reviewed Aldehydes & Ketones reaction flowchart 🧪',
          'Drew Lens Maker’s formula ray diagram with proper arrows 📐',
          'Revised Gabriel Phthalimide synthesis in Amines notes 📝',
          'Practiced Semiconductor Full-Wave Rectifier circuit 🔌',
          'Completed 3 full-length 45-minute focus cycles today 🚀',
          'Avoided CBSE exam traps in Reimer-Tiemann mechanism 🛡️'
        ];
        
        student.recentActivity = activities[Math.floor(Math.random() * activities.length)];
        student.totalFocusHours = +(student.totalFocusHours + 0.1).toFixed(1);
        updated[randomIndex] = student;
        return updated;
      });
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      setUserName(nameInput.trim());
      localStorage.setItem('topper_user_name', nameInput.trim());
      setIsEditingName(false);
    }
  };

  const filteredStudents = students.filter(
    (s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           s.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
           s.school.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const topThree = students.slice(0, 3);

  const userHours = (userFocusMinutes / 60).toFixed(1);

  return (
    <section id="leaderboard" className="py-20 bg-[#070a10] border-t border-slate-800 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>National Study Streaks &amp; Focus Leaderboard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Class 12 Toppers Leaderboard
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Study streaks and continuous focus hours tracked across Class 12 board aspirants nationwide. Study for 45 minutes to rise up the ranks!
          </p>

          {/* Simple Metric Explanations for Easy Understanding */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300">
            <span className="inline-flex items-center gap-1.5 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800">
              <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span><strong>Streak:</strong> Consecutive days with ≥ 45m study</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800">
              <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span><strong>Total Focus:</strong> Real study hours logged</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800">
              <Target className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span><strong>Chapters:</strong> Core chapters finished out of 12</span>
            </span>
          </div>

          {/* Time Filter Tabs */}
          <div className="mt-6 inline-flex p-1.5 bg-slate-900 border border-slate-800 rounded-2xl gap-1.5 shadow-inner">
            <button
              onClick={() => setTimeFilter('weekly')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition cursor-pointer ${
                timeFilter === 'weekly'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              This Week's Streaks
            </button>
            <button
              onClick={() => setTimeFilter('today')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition cursor-pointer ${
                timeFilter === 'today'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Today's Live Focus
            </button>
            <button
              onClick={() => setTimeFilter('allTime')}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition cursor-pointer ${
                timeFilter === 'allTime'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All-Time Centum Legends
            </button>
          </div>
        </div>

        {/* Top 3 Podium Visual Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-4xl mx-auto items-end">
          
          {/* #2 Rank: Silver */}
          <div className="order-2 md:order-1 bg-slate-900/80 border border-slate-700/80 rounded-3xl p-5 text-center relative shadow-xl hover:border-slate-500 transition transform hover:-translate-y-1">
            <div className="w-8 h-8 rounded-full bg-slate-300 text-slate-950 font-black text-xs flex items-center justify-center mx-auto mb-2 border-2 border-white shadow">
              #2
            </div>
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${topThree[1].avatarColor} text-slate-950 font-black text-xl flex items-center justify-center mx-auto shadow-lg mb-2`}>
              {topThree[1].name.charAt(0)}
            </div>
            <h4 className="font-bold text-white text-base truncate">{topThree[1].name}</h4>
            <p className="text-xs text-slate-400">{topThree[1].city} • {topThree[1].school}</p>
            <div className="mt-3 flex items-center justify-center gap-3 text-xs">
              <span className="font-bold text-amber-300 flex items-center gap-1 font-mono">
                <Flame className="w-3.5 h-3.5 fill-amber-400" />
                {topThree[1].streakDays}d Streak
              </span>
              <span className="text-slate-400 font-mono flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                {topThree[1].totalFocusHours}h
              </span>
            </div>
            <div className="mt-2 text-[10px] bg-slate-950 px-2.5 py-1 rounded-full text-slate-400 border border-slate-800">
              {topThree[1].badge}
            </div>
          </div>

          {/* #1 Rank: Gold Champion */}
          <div className="order-1 md:order-2 bg-gradient-to-b from-amber-500/15 via-slate-900 to-slate-900 border-2 border-amber-400/50 rounded-3xl p-6 text-center relative shadow-2xl transform hover:-translate-y-1 transition ring-2 ring-amber-400/20">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-1 shadow-md">
              <Trophy className="w-3.5 h-3.5" />
              <span>Rank #1 National</span>
            </div>
            <div className={`w-18 h-18 rounded-2xl bg-gradient-to-br ${topThree[0].avatarColor} text-slate-950 font-black text-2xl flex items-center justify-center mx-auto shadow-xl my-3 border-2 border-amber-300`}>
              {topThree[0].name.charAt(0)}
            </div>
            <h4 className="font-black text-white text-lg truncate">{topThree[0].name}</h4>
            <p className="text-xs text-amber-200/80">{topThree[0].city} • {topThree[0].school}</p>
            <div className="mt-3 flex items-center justify-center gap-4 text-xs">
              <span className="font-bold text-amber-300 flex items-center gap-1 font-mono bg-amber-400/10 px-2 py-0.5 rounded-lg border border-amber-400/30">
                <Flame className="w-4 h-4 fill-amber-400" />
                {topThree[0].streakDays} Days Streak
              </span>
              <span className="text-emerald-400 font-bold font-mono flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/30">
                <Clock className="w-4 h-4 text-emerald-400" />
                {topThree[0].totalFocusHours} Hours
              </span>
            </div>
            <div className="mt-2.5 text-xs bg-amber-400/20 px-3 py-1 rounded-full text-amber-300 font-bold border border-amber-400/40 inline-block">
              {topThree[0].badge}
            </div>
          </div>

          {/* #3 Rank: Bronze */}
          <div className="order-3 md:order-3 bg-slate-900/80 border border-slate-700/80 rounded-3xl p-5 text-center relative shadow-xl hover:border-slate-500 transition transform hover:-translate-y-1">
            <div className="w-8 h-8 rounded-full bg-amber-700 text-white font-black text-xs flex items-center justify-center mx-auto mb-2 border-2 border-amber-500 shadow">
              #3
            </div>
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${topThree[2].avatarColor} text-slate-950 font-black text-xl flex items-center justify-center mx-auto shadow-lg mb-2`}>
              {topThree[2].name.charAt(0)}
            </div>
            <h4 className="font-bold text-white text-base truncate">{topThree[2].name}</h4>
            <p className="text-xs text-slate-400">{topThree[2].city} • {topThree[2].school}</p>
            <div className="mt-3 flex items-center justify-center gap-3 text-xs">
              <span className="font-bold text-amber-300 flex items-center gap-1 font-mono">
                <Flame className="w-3.5 h-3.5 fill-amber-400" />
                {topThree[2].streakDays}d Streak
              </span>
              <span className="text-slate-400 font-mono flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                {topThree[2].totalFocusHours}h
              </span>
            </div>
            <div className="mt-2 text-[10px] bg-slate-950 px-2.5 py-1 rounded-full text-slate-400 border border-slate-800">
              {topThree[2].badge}
            </div>
          </div>

        </div>

        {/* Current User Personal Ranking Card */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-slate-900 to-emerald-500/15 border-2 border-amber-500/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-950 font-black text-lg flex items-center justify-center shrink-0 shadow">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="truncate">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm sm:text-base truncate">
                  {userName}
                </span>
                <button
                  onClick={() => setIsEditingName(!isEditingName)}
                  className="text-[11px] text-amber-400 underline font-semibold hover:text-white cursor-pointer"
                >
                  {isEditingName ? 'Cancel' : 'Change Name'}
                </button>
              </div>
              <p className="text-xs text-slate-300">
                Current Focus: <strong className="text-amber-300 font-code">{userHours} hrs</strong> • Active Session: 45 min unpaused
              </p>
            </div>
          </div>

          {isEditingName && (
            <form onSubmit={handleSaveName} className="flex gap-2 w-full sm:w-auto animate-fadeIn">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Enter your student name..."
                className="px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-300 cursor-pointer"
              >
                Save
              </button>
            </form>
          )}

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onOpenTimerModal}
              className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Start Study Session</span>
            </button>
          </div>
        </div>

        {/* Live Search & Table */}
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
          
          <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-white text-sm">
                Student Ranks (Live Activity Feed)
              </span>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search topper or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Rank</th>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Streak</th>
                  <th className="py-3 px-4">Total Focus</th>
                  <th className="py-3 px-4">Chapters</th>
                  <th className="py-3 px-4">Recent Live Milestone</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-300">
                      <span className={`w-6 h-6 rounded-md flex items-center justify-center font-black ${
                        student.rank === 1 ? 'bg-amber-400 text-slate-950' :
                        student.rank === 2 ? 'bg-slate-300 text-slate-950' :
                        student.rank === 3 ? 'bg-amber-700 text-white' :
                        'bg-slate-800 text-slate-400'
                      }`}>
                        #{student.rank}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${student.avatarColor} text-slate-950 font-bold flex items-center justify-center text-xs shrink-0`}>
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-white text-xs">{student.name}</div>
                          <div className="text-[10px] text-slate-400">{student.city} • {student.school}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-300 whitespace-nowrap">
                      <span className="flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {student.streakDays} Days
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-emerald-400 font-semibold whitespace-nowrap">
                      {student.totalFocusHours} hrs
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 font-semibold whitespace-nowrap">
                      {student.chaptersCompleted} / 12
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                      <span className="inline-flex items-center gap-1 bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800 text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {student.recentActivity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </section>
  );
};
