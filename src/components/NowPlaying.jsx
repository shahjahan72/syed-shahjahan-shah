import { Music } from 'lucide-react';

const NowPlaying = () => {
    return (
        <div className="flex items-center gap-4 p-4 rounded-xl glass-card w-full h-full relative overflow-hidden group">
            <div className="absolute inset-0 bg-green-500/5 group-hover:bg-green-500/10 transition-colors" />
            <div className="w-12 h-12 bg-green-500/20 rounded-md flex items-center justify-center shrink-0">
                <Music className="text-green-500 animate-pulse" />
            </div>
            <div className="min-w-0">
                <p className="text-[10px] text-white/50 uppercase tracking-wider font-bold">Now Listening</p>
                <p className="text-sm font-medium truncate text-white">Coding Lo-Fi Beats</p>
                <div className="flex gap-0.5 mt-1 items-end h-3">
                    <div className="w-1 bg-green-500 h-full animate-[bounce_1s_infinite]"></div>
                    <div className="w-1 bg-green-500 h-2/3 animate-[bounce_1.2s_infinite]"></div>
                    <div className="w-1 bg-green-500 h-full animate-[bounce_0.8s_infinite]"></div>
                </div>
            </div>
        </div>
    );
};

export default NowPlaying;
