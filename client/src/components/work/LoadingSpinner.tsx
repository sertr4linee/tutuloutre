import { memo } from 'react';
import GradientBackground from "@/components/ui/background";

const LoadingSpinner = memo(() => {
  return (
    <main className="relative min-h-screen overflow-hidden flex items-center justify-center">
      <GradientBackground />
      <div className="relative z-30">
        <div className="relative">
          <div className="bg-[#FFFBF5] border-4 border-black p-8 rounded-lg shadow-brutal relative">
            <div className="flex items-center space-x-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-5 h-5 bg-[#f67a45] border-2 border-black"
                  style={{
                    animation: `bounce 0.6s ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
            <div className="absolute -bottom-2 -right-2 w-full h-full border-4 border-black bg-black -z-10" />
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
      `}</style>
    </main>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner;