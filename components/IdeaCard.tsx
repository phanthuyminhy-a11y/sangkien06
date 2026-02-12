
import React from 'react';
import { Idea } from '../types';

interface IdeaCardProps {
  idea: Idea;
  onClick: (idea: Idea) => void;
  onDelete: (id: string) => void;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea, onClick, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow cursor-pointer relative group" onClick={() => onClick(idea)}>
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-semibold px-2 py-1 rounded bg-indigo-50 text-indigo-600 uppercase tracking-wider">
          {idea.category}
        </span>
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(idea.id); }}
          className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-2">{idea.title}</h3>
      <p className="text-sm text-slate-600 line-clamp-2 mb-4">
        {idea.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {idea.tags.map((tag, idx) => (
          <span key={idx} className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default IdeaCard;
