import Link from "next/link"
import { useState } from "react"

interface WorkNavProps {
  scrollTo: (sectionId: string) => void;
}

const WorkNav: React.FC<WorkNavProps> = ({ scrollTo }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative w-[98%] sm:w-[95%] md:w-[92%] lg:w-[90%] max-w-6xl bg-[#FFFBF5] border-[4px] sm:border-[6px] md:border-[8px] lg:border-[10px] border-black mx-auto mb-2">
      {/* Corner elements - L-shaped design - responsive sizes */}
      <div className="hidden sm:block absolute -top-[12px] -left-[12px] w-[25px] h-[25px] md:w-[35px] md:h-[35px] lg:w-[45px] lg:h-[45px]">
        <div className="absolute top-0 left-0 w-[25px] md:w-[35px] lg:w-[45px] h-[8px] md:h-[12px] lg:h-[15px] bg-black"></div>
        <div className="absolute top-0 left-0 w-[8px] md:w-[12px] lg:w-[15px] h-[25px] md:h-[35px] lg:h-[45px] bg-black"></div>
      </div>

      {/* Top-right corner */}
      <div className="hidden sm:block absolute -top-[15px] -right-[15px] w-[30px] h-[30px] md:w-[45px] md:h-[45px]">
        <div className="absolute top-0 right-0 w-[30px] md:w-[45px] h-[10px] md:h-[15px] bg-black"></div>
        <div className="absolute top-0 right-0 w-[10px] md:w-[15px] h-[30px] md:h-[45px] bg-black"></div>
      </div>

      {/* Bottom-left corner */}
      <div className="hidden sm:block absolute -bottom-[15px] -left-[15px] w-[30px] h-[30px] md:w-[45px] md:h-[45px]">
        <div className="absolute bottom-0 left-0 w-[30px] md:w-[45px] h-[10px] md:h-[15px] bg-black"></div>
        <div className="absolute bottom-0 left-0 w-[10px] md:w-[15px] h-[30px] md:h-[45px] bg-black"></div>
      </div>

      {/* Bottom-right corner */}
      <div className="hidden sm:block absolute -bottom-[15px] -right-[15px] w-[30px] h-[30px] md:w-[45px] md:h-[45px]">
        <div className="absolute bottom-0 right-0 w-[30px] md:w-[45px] h-[10px] md:h-[15px] bg-black"></div>
        <div className="absolute bottom-0 right-0 w-[10px] md:w-[15px] h-[30px] md:h-[45px] bg-black"></div>
      </div>

      {/* Content container with better responsive padding */}
      <div className="p-3 sm:p-4 md:p-6 lg:p-6">
        {/* Navigation - improved mobile layout */}
        <nav className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-4">
          <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-[#2D2D2D] mb-3 sm:mb-0">
            {/* Empty for now */}
          </div>

          {/* Mobile menu button - better positioning */}
          <button
            className="sm:hidden fixed top-4 right-4 p-2 z-50 bg-white/80 backdrop-blur-sm rounded-md border-2 border-black"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Navigation links - improved mobile menu */}
          <div
            className={`
            ${menuOpen ? "flex fixed inset-0 bg-white/95 z-40" : "hidden"} 
            sm:flex sm:relative sm:bg-transparent
            flex-col sm:flex-row 
            items-center justify-center sm:justify-start
            space-y-6 sm:space-y-0 sm:space-x-4 md:space-x-6 lg:space-x-8
            text-lg sm:text-base md:text-lg
            w-full sm:w-auto
          `}
          >
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Link href="/work" className="hover:underline font-medium">
              Work
            </Link>
            <Link href="/services" className="hover:underline">
              Services
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>

            {/* Resume button - responsive sizing */}
            <div className="relative inline-block mt-4 sm:mt-0">
              <div className="absolute top-[3px] left-[3px] w-full h-full bg-black rounded-md"></div>
              <button className="relative bg-[#222] text-white px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-md flex items-center justify-center text-sm sm:text-base font-medium">
                CV
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 ml-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 15L12 4M12 15L8 11M12 15L16 11M8 19H16C17.1046 19 18 18.1046 18 17V15"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Work page title with decorative element */}
        <div className="mb-4 sm:mb-6">
          <div className="relative">
            <div className="absolute -top-10 sm:-top-12 left-1 sm:left-2">
              <div className="bg-[#ff6b57] text-black font-bold px-3 sm:px-4 py-1 sm:py-2 rounded-full border-2 sm:border-3 border-black transform -rotate-3 text-xs sm:text-sm whitespace-nowrap">
                My work
              </div>
            </div>
            <h1 className="text-[32px] sm:text-[40px] md:text-[50px] lg:text-[60px] leading-[0.9] font-black text-[#2D2D2D] tracking-tighter font-family-clash">
              Mes Créations
            </h1>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl mt-4 font-normal text-[#3C3C3C] max-w-xl leading-tight">
            Découvrez mon univers créatif à travers mes différents projets.
          </p>
        </div>

        {/* Work navigation tabs */}
        <div className="flex flex-wrap gap-3 mb-4 sticky top-0 z-10 bg-[#FFFBF5] py-3 border-b-2 border-black">
          <button
            onClick={() => scrollTo("blog")}
            className="px-4 py-2 border-2 border-black rounded-full text-sm font-medium bg-[#FFD2BF] hover:bg-[#f67a45] hover:text-white transition-all transform hover:-translate-y-1"
          >
            Blog
          </button>
          <button
            onClick={() => scrollTo("photography")}
            className="px-4 py-2 border-2 border-black rounded-full text-sm font-medium bg-[#E9B949] hover:bg-[#f67a45] hover:text-white transition-all transform hover:-translate-y-1"
          >
            Photographie
          </button>
          <button
            onClick={() => scrollTo("projects")}
            className="px-4 py-2 border-2 border-black rounded-full text-sm font-medium bg-[#F67A45] hover:bg-[#f67a45] hover:text-white transition-all transform hover:-translate-y-1"
          >
            Projets d'école
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkNav;