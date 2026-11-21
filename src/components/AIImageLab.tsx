import React, { useState } from 'react';
import {
  Sparkles,
  Wand2,
  Download,
  Copy,
  RefreshCw,
  Check,
  Image as ImageIcon,
} from 'lucide-react';

interface AIImageLabProps {
  onShowToast: (msg: string) => void;
}

export const AIImageLab: React.FC<AIImageLabProps> = ({ onShowToast }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const samplePrompts = [
    'A futuristic cybernetic university campus in Jaipur with glowing neon domes and student drones, 8k render, octane style',
    'A cyberpunk student programmer coding neural networks with holographic matrices floating in ambient violet light',
    'Hyper-realistic golden hour portrait of an AI researcher working in a glass high-rise library surrounded by glowing data visualizers',
    'Vibrant anime style tech hackathon with students collaborating on neon mechanical robots in a sleek lab',
  ];

  const handleGenerate = () => {
    if (!prompt.trim()) {
      onShowToast('Please enter an image prompt first!');
      return;
    }

    setIsLoading(true);
    const seed = Math.floor(Math.random() * 100000);
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      prompt.trim()
    )}?width=1024&height=1024&nologo=true&seed=${seed}`;

    const img = new Image();
    img.src = url;
    img.onload = () => {
      setGeneratedImageUrl(url);
      setIsLoading(false);
      onShowToast('Image synthesized successfully!');
    };
    img.onerror = () => {
      setGeneratedImageUrl(url);
      setIsLoading(false);
    };
  };

  const handleCopyLink = () => {
    if (!generatedImageUrl) return;
    navigator.clipboard.writeText(generatedImageUrl);
    setCopied(true);
    onShowToast('Image URL copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Input Neubrutalist Card */}
      <div className="nb-card-lg rounded-2xl p-6 sm:p-8 bg-[#C9B6FF] text-[#171717]">
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#FFFDF5] border-2 border-[#171717] text-xs font-extrabold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 stroke-[2.5]" />
            <span>Generative AI Visual Lab</span>
          </span>

          <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight mb-2">
            AI Image Generator
          </h2>
          <p className="text-sm font-semibold text-[#171717]/80 max-w-lg mx-auto">
            Turn any idea, concept, or project diagram vision into high-definition digital artwork instantly.
          </p>
        </div>

        <div className="space-y-4">
          <textarea
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. A cyberpunk student programmer coding neural networks with holographic violet light..."
            className="nb-input w-full px-5 py-4 rounded-xl text-sm font-semibold resize-none"
          />

          {/* Quick Sample Prompts */}
          <div className="flex flex-wrap gap-2 justify-center">
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setPrompt(p)}
                className="nb-btn-sm text-xs px-3 py-1.5 rounded-lg bg-[#FFFDF5] text-[#171717] font-bold text-left max-w-xs truncate cursor-pointer"
              >
                {p}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isLoading}
            className="nb-btn nb-btn-primary w-full py-4 rounded-xl text-base font-black disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin stroke-[2.5]" />
                <span>Invoking AI Engine...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5 stroke-[2.5]" />
                <span>Generate High-Def Art</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Result Display Box */}
      <div className="aspect-square w-full max-w-lg mx-auto nb-card-lg rounded-2xl bg-[#FFFDF5] dark:bg-[#161B26] flex flex-col items-center justify-center overflow-hidden p-4 relative">
        {isLoading ? (
          <div className="flex flex-col items-center gap-4 text-center p-8">
            <div className="w-14 h-14 border-4 border-[#171717] dark:border-[#FFD84D] border-t-[#FFD84D] dark:border-t-[#171717] rounded-full animate-spin" />
            <p className="text-[#171717] dark:text-[#F4F1E8] font-black font-display text-lg">
              Synthesizing Visual Pixels...
            </p>
            <p className="text-xs font-semibold text-[#525252] dark:text-[#9AA6BE]">
              Rendering through distributed neural cluster
            </p>
          </div>
        ) : generatedImageUrl ? (
          <div className="relative w-full h-full rounded-xl overflow-hidden border-2 border-[#171717] flex flex-col items-center justify-center">
            <img
              src={generatedImageUrl}
              alt={prompt || 'AI generated result'}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-3 inset-x-3 flex items-center justify-between gap-2 p-3 rounded-xl bg-[#FFFDF5] text-[#171717] border-2 border-[#171717] shadow-[4px_4px_0px_#171717]">
              <span className="text-xs font-bold truncate flex-1">{prompt}</span>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="nb-btn-sm p-2 rounded-lg bg-[#FFD84D] text-[#171717] cursor-pointer"
                  title="Copy link"
                >
                  {copied ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : (
                    <Copy className="w-4 h-4 stroke-[2.5]" />
                  )}
                </button>
                <a
                  href={generatedImageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="uniflow-ai-art.jpg"
                  className="nb-btn-sm px-3 py-1.5 rounded-lg bg-[#B8F2E6] text-[#171717] text-xs font-extrabold inline-flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Download</span>
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center p-8">
            <div className="w-16 h-16 rounded-2xl bg-[#FFD84D] border-2 border-[#171717] shadow-[4px_4px_0px_#171717] text-[#171717] flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h4 className="text-lg font-black font-display text-[#171717] dark:text-[#F4F1E8] mb-1">
              Canvas is Ready
            </h4>
            <p className="text-[#525252] dark:text-[#9AA6BE] text-xs font-medium max-w-xs">
              Type your vision above and click Generate to see the artwork appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
