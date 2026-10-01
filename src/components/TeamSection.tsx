import React from 'react';
import { Crown, Code, User, Phone, MessageSquare, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const TeamSection: React.FC = () => {
  const { teamMembers, language } = useStore();

  const getAvatarIcon = (avatarType?: string, des?: string) => {
    const d = (des || '').toLowerCase();
    if (avatarType === 'crown' || d.includes('director') || d.includes('founder') || d.includes('managing')) {
      return <Crown className="w-6 h-6 text-amber-500" />;
    }
    if (avatarType === 'tech' || d.includes('developer') || d.includes('engineer')) {
      return <Code className="w-6 h-6 text-blue-500" />;
    }
    return <User className="w-6 h-6 text-stone-600" />;
  };

  return (
    <section id="owner-section" className="py-16 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-widest text-amber-900 font-semibold mb-1 flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-800" />
            <span>Meet The Leadership</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            {language === 'ur' ? '👥 ہماری ٹیم کے پروفائلز' : '👥 Team Profiles & Leadership'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Dedicated craftsmen and event coordinators committed to making your celebrations unforgettable.
          </p>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs flex flex-col justify-between text-center hover:border-amber-900/30 transition-all hover:shadow-lg"
            >
              <div>
                <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200/80 flex items-center justify-center mx-auto mb-4 shadow-xs">
                  {getAvatarIcon(member.avatarType, member.designation)}
                </div>

                <h3 className="font-serif text-xl font-bold text-stone-900">{member.name}</h3>
                <h4 className="text-xs font-semibold text-amber-900 uppercase tracking-wider mt-1">
                  {member.designation}
                </h4>

                {member.bio && (
                  <p className="text-xs text-stone-500 mt-2.5 leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>
                )}
              </div>

              <div className="pt-6 space-y-2 border-t border-stone-100 mt-6">
                {member.callNumber && (
                  <a
                    href={`tel:${member.callNumber.replace(/[^0-9]/g, '')}`}
                    className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-stone-600" />
                    <span>📞 Call: {member.callNumber}</span>
                  </a>
                )}

                {member.whatsappNumber && (
                  <a
                    href={`https://wa.me/${member.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(member.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/60 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                    <span>💬 WhatsApp</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
