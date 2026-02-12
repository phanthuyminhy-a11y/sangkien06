
import React, { useState } from 'react';
import { brainstormIdeas } from '../services/geminiService';
import { Idea } from '../types';

interface BrainstormViewProps {
  onSaveIdeas: (ideas: Idea[]) => void;
}

const BrainstormView: React.FC<BrainstormViewProps> = ({ onSaveIdeas }) => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Partial<Idea>[]>([]);

  const handleBrainstorm = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const results = await brainstormIdeas(topic);
      setSuggestions(results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const selectIdea = (suggestion: Partial<Idea>) => {
    const newIdea: Idea = {
      id: Math.random().toString(36).substr(2, 9),
      title: suggestion.title || 'Ý tưởng mới',
      description: suggestion.description || '',
      category: suggestion.category || 'General',
      tags: suggestion.tags || [],
      createdAt: Date.now()
    };
    onSaveIdeas([newIdea]);
    setSuggestions(prev => prev.filter(s => s.title !== suggestion.title));
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Khơi nguồn sáng tạo</h1>
        <p className="text-slate-600">Nhập một chủ đề, vấn đề hoặc lĩnh vực bạn quan tâm để nhận các gợi ý sáng kiến từ AI.</p>
      </div>

      <div className="flex gap-2 mb-12">
        <input 
          type="text" 
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleBrainstorm()}
          placeholder="Ví dụ: Giảm thiểu rác thải nhựa tại văn phòng..."
          className="flex-1 px-6 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-sm"
        />
        <button 
          onClick={handleBrainstorm}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold px-8 py-4 rounded-xl transition-colors shadow-lg shadow-indigo-200 flex items-center gap-2"
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          )}
          <span>Gợi ý</span>
        </button>
      </div>

      {suggestions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {suggestions.map((s, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-indigo-100 shadow-sm hover:border-indigo-300 transition-all">
              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{s.category}</span>
              <h3 className="text-xl font-bold text-slate-800 mt-1 mb-3">{s.title}</h3>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">{s.description}</p>
              <button 
                onClick={() => selectIdea(s)}
                className="w-full py-2.5 rounded-lg border border-indigo-600 text-indigo-600 font-medium hover:bg-indigo-600 hover:text-white transition-all text-sm flex items-center justify-center gap-2"
              >
                Lưu sáng kiến này
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrainstormView;
