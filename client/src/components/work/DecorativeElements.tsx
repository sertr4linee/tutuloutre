import Image from 'next/image';
import { memo } from 'react';

const DecorativeElements = memo(() => {
  return (
    <>
      {/* Floating decorative elements */}
      <div className="fixed z-10 top-[15%] right-[5%] w-[80px] h-[80px] md:w-[120px] md:h-[120px] animate-float">
        <Image
          src="/stars.svg"
          alt="Decorative star"
          width={120}
          height={120}
          className="w-full h-full"
          style={{
            filter: "drop-shadow(2px 4px 0px rgba(0,0,0,0.5))",
            animationDuration: "8s",
          }}
          priority={false}
        />
      </div>

      <div
        className="fixed z-10 bottom-[10%] left-[8%] w-[60px] h-[60px] md:w-[100px] md:h-[100px] animate-bounce"
        style={{ animationDuration: "6s" }}
      >
        <Image
          src="/stars.svg"
          alt="Decorative star"
          width={100}
          height={100}
          className="w-full h-full"
          style={{
            filter: "drop-shadow(2px 4px 0px rgba(0,0,0,0.5)) hue-rotate(340deg)",
            opacity: 0.9,
          }}
          priority={false}
        />
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </>
  );
});

DecorativeElements.displayName = 'DecorativeElements';

export default DecorativeElements;