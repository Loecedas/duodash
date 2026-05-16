import React from 'react';
import type { Course } from '../../types';
import { AppIcon, type AppIconName, type IconMode } from '../icons/AppIcon';

const CHART_COLORS = ['#58cc02', '#ce82ff', '#ff9600', '#ff4b4b', '#1cb0f6', '#ffc800'];

// 汉化映射表（强制兜底）
const FORCE_CN_MAP: Record<string, string> = {
  'en': '英语',
  'english': '英语',
  'zh': '中文',
  'chinese': '中文',
  'zc': '粤语',
  'zh-hk': '粤语',
  'chinese (cantonese)': '粤语',
};

interface CourseListProps {
  courses: Course[];
  seq: number;
  iconMode: IconMode;
}

export function CourseList({ courses, seq, iconMode }: CourseListProps): React.ReactElement {
  const sortedCourses = [...courses].sort((a, b) => b.xp - a.xp);
  const totalCourseXp = sortedCourses.reduce((acc, c) => acc + c.xp, 0);
  const maxCourseXp = sortedCourses[0]?.xp ?? 0;

  const getCourseIcon = (course: Course): AppIconName => {
    if (course.subject === 'chess') return 'chess';
    if (course.subject === 'math') return 'math';
    if (course.subject === 'music') return 'music';
    return 'books';
  };

  return (
    <div className={`bg-white rounded-2xl shadow-sm border-2 border-b-4 border-gray-200 animate-seq seq-${seq}`}>
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">
        <h2 className="text-gray-700 font-bold text-lg">科目分布</h2>
        {courses.length > 0 && (
          <span className="text-xs text-gray-500">
            共 {courses.length} 门课程 · {totalCourseXp.toLocaleString()} XP
          </span>
        )}
      </div>

      {courses.length > 0 ? (
        <div className="p-4">
          <div className="flex flex-wrap gap-3">
            {sortedCourses.map((course, idx) => {
              const percent = totalCourseXp > 0 ? ((course.xp / totalCourseXp) * 100).toFixed(1) : '0';
              const relativeWidth = maxCourseXp > 0 ? (course.xp / maxCourseXp) * 100 : 0;
              const color = CHART_COLORS[idx % CHART_COLORS.length];

              const isSubject = !!(course.subject && !['language', 'none'].includes(course.subject.toLowerCase()));
              const flagCode = !isSubject ? course.learningLanguage : undefined;
              const iconName = isSubject ? getCourseIcon(course) : undefined;

              return (
                <div
                  key={course.id}
                  className="flex-1 min-w-[200px] sm:min-w-[240px] bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex-shrink-0">
                      <AppIcon 
                        name={iconName} 
                        flag={flagCode}
                        mode={iconMode} 
                        className="w-5 h-5" 
                        style={{ color }} 
                      />
                    </div>
                    <span className="font-bold text-gray-700 text-sm truncate">
                      {FORCE_CN_MAP[course.title.toLowerCase()] || course.title}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-xl font-black" style={{ color }}>{course.xp.toLocaleString()}</span>
                    <span className="text-xs text-gray-400">XP</span>
                    <span className="text-xs text-gray-500 ml-auto">{percent}%</span>
                  </div>

                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{ width: `${relativeWidth}%`, backgroundColor: color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-gray-500 text-sm text-center py-6">暂无课程数据</div>
      )}
    </div>
  );
}

export default CourseList;
