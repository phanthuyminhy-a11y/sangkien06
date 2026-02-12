
import React, { useState, useEffect } from 'react';
import { analyzeIdea, generateRoadmap } from '../services/geminiService';
import { Idea, Analysis, Milestone } from '../types';

interface AnalysisViewProps {
  idea: Idea;
  onUpdate: (updatedIdea: Idea) => void;
  onBack: () => void;
}

const AnalysisView: React.FC<AnalysisViewProps> = ({ idea, onUpdate, onBack }) => {
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [loadingRoadmap, setLoadingRoadmap] = useState(false);

  const triggerAnalysis = async () => {
    setLoadingAnalysis(true);
    try {
      const analysis = await analyzeIdea(idea);
      onUpdate({ ...idea, analysis });
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingAnalysis(false);
    }
  };

  const triggerRoadmap = async () => {
    setLoadingRoadmap(true);
    try {
      const roadmap = await generateRoadmap(idea);
      onUpdate({ ...idea, roadmap });
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingRoadmap(false);
    }
  };

  useEffect(() => {
    if (!idea.analysis) triggerAnalysis();
  }, [idea.id]);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <button onClick={onBack} className="flex items-center text-slate-500 hover:text-slate-800 mb-6 transition-colors">
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        Quay lại Dashboard
      </button>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 mb-10">
        <div className="bg-gradient-to-r from-indigo-600 to-violet-700 p-8 md:p-12 text-white">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex-1">
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                {idea.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight">{idea.title}</h1>
              <p className="text-indigo-100 text-lg max-w-2xl">{idea.description}</p>
            </div>
            <div className="flex gap-2">
              {idea.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-xs">#{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12">
          {/* Metrics Section */}
          {idea.analysis && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-slate-800">Tính khả thi</h4>
                  <span className="text-2xl font-black text-indigo-600">{idea.analysis.feasibilityScore}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full transition-all duration-1000" style={{ width: `${idea.analysis.feasibilityScore}%` }}></div>
                </div>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-slate-800">Tác động xã hội/kinh tế</h4>
                  <span className="text-2xl font-black text-emerald-600">{idea.analysis.impactScore}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full transition-all duration-1000" style={{ width: `${idea.analysis.impactScore}%` }}></div>
                </div>
              </div>
            </div>
          )}

          {/* SWOT Analysis */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-extrabold text-slate-900">Phân tích SWOT</h2>
              {loadingAnalysis && <span className="text-sm text-indigo-600 animate-pulse">Đang cập nhật phân tích...</span>}
            </div>
            
            {!idea.analysis ? (
              <div className="h-48 flex items-center justify-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <button onClick={triggerAnalysis} className="text-indigo-600 font-bold hover:underline">Chạy phân tích AI</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                  <h5 className="font-black text-blue-700 uppercase text-xs mb-3 tracking-widest">Điểm mạnh (Strengths)</h5>
                  <ul className="space-y-2">
                    {idea.analysis.strengths.map((s, i) => <li key={i} className="text-sm text-blue-900 flex gap-2"><span>•</span> {s}</li>)}
                  </ul>
                </div>
                <div className="p-6 bg-red-50 rounded-2xl border border-red-100">
                  <h5 className="font-black text-red-700 uppercase text-xs mb-3 tracking-widest">Điểm yếu (Weaknesses)</h5>
                  <ul className="space-y-2">
                    {idea.analysis.weaknesses.map((s, i) => <li key={i} className="text-sm text-red-900 flex gap-2"><span>•</span> {s}</li>)}
                  </ul>
                </div>
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <h5 className="font-black text-emerald-700 uppercase text-xs mb-3 tracking-widest">Cơ hội (Opportunities)</h5>
                  <ul className="space-y-2">
                    {idea.analysis.opportunities.map((s, i) => <li key={i} className="text-sm text-emerald-900 flex gap-2"><span>•</span> {s}</li>)}
                  </ul>
                </div>
                <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
                  <h5 className="font-black text-amber-700 uppercase text-xs mb-3 tracking-widest">Thách thức (Threats)</h5>
                  <ul className="space-y-2">
                    {idea.analysis.threats.map((s, i) => <li key={i} className="text-sm text-amber-900 flex gap-2"><span>•</span> {s}</li>)}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Roadmap Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-extrabold text-slate-900">Lộ trình triển khai</h2>
              {!idea.roadmap && !loadingRoadmap && (
                <button 
                  onClick={triggerRoadmap}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-indigo-100 transition-all"
                >
                  Tạo lộ trình AI
                </button>
              )}
              {loadingRoadmap && <span className="text-sm text-indigo-600 animate-pulse">Đang xây dựng lộ trình...</span>}
            </div>

            {idea.roadmap ? (
              <div className="relative space-y-8 before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-indigo-100">
                {idea.roadmap.map((m, idx) => (
                  <div key={idx} className="relative pl-10">
                    <div className="absolute left-0 top-1.5 w-6 h-6 bg-indigo-600 rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10"></div>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-bold text-slate-900 text-lg">{m.phase}</h4>
                        <span className="text-xs font-bold text-indigo-500 bg-indigo-50 px-2 py-1 rounded">{m.timeline}</span>
                      </div>
                      <ul className="space-y-3">
                        {m.tasks.map((task, tidx) => (
                          <li key={tidx} className="flex items-start gap-3 text-sm text-slate-700">
                            <div className="mt-1 flex-shrink-0 w-4 h-4 rounded-full border-2 border-indigo-400"></div>
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            ) : !loadingRoadmap && (
              <div className="h-32 flex items-center justify-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <p className="text-slate-400 italic">Nhấn nút "Tạo lộ trình AI" để bắt đầu lập kế hoạch.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisView;
