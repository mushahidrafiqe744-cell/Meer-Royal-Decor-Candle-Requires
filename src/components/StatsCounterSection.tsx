import React, { useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Users, Award, HeartHandshake, Sparkles } from 'lucide-react';

export const StatsCounterSection: React.FC = () => {
  const { language } = useStore();
  const [followers, setFollowers] = useState(0);
  const [mentors, setMentors] = useState(0);
  const [members, setMembers] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 40;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setFollowers(Math.floor(165 * progress));
      setMentors(Math.floor(100 * progress));
      setMembers(Math.floor(3 * progress));

      if (step >= steps) {
        setFollowers(165);
        setMentors(100);
        setMembers(3);
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-10 bg-white border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center max-w-4xl mx-auto">
          
          <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 shadow-xs space-y-1 hover:border-amber-900/30 transition-all">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center mx-auto mb-2">
              <Users className="w-5 h-5" />
            </div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tabular-nums">
              {followers}+
            </div>
            <div className="text-xs uppercase tracking-wider font-semibold text-amber-900">
              {language === 'ur' ? 'فالورز / مطمئن کسٹمرز' : 'Followers & Happy Clients'}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 shadow-xs space-y-1 hover:border-amber-900/30 transition-all">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center mx-auto mb-2">
              <Award className="w-5 h-5" />
            </div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tabular-nums">
              {mentors}+
            </div>
            <div className="text-xs uppercase tracking-wider font-semibold text-amber-900">
              {language === 'ur' ? 'مینٹرز اور پارٹنرز' : 'Mentors & Collaborations'}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 shadow-xs space-y-1 hover:border-amber-900/30 transition-all">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center mx-auto mb-2">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tabular-nums">
              {members}+
            </div>
            <div className="text-xs uppercase tracking-wider font-semibold text-amber-900">
              {language === 'ur' ? 'کور ٹیم ممبرز' : 'Core Team Members'}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
