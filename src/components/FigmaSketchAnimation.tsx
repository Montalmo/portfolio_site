import React from 'react';

const FigmaSketchAnimation: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60 select-none">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <style>{`
            .sketch-item {
              stroke-dasharray: 1000;
              stroke-dashoffset: 1000;
              stroke: rgba(139, 92, 246, 0.5);
              stroke-width: 1.5;
              fill: transparent;
              filter: drop-shadow(0 0 2px rgba(139, 92, 246, 0.3));
              animation: sketch-cycle 12s ease-in-out infinite;
            }

            @keyframes sketch-cycle {
              0% { stroke-dashoffset: 1000; opacity: 0; }
              2% { opacity: 1; }
              25% { stroke-dashoffset: 0; opacity: 1; }
              75% { stroke-dashoffset: 0; opacity: 1; }
              85% { opacity: 0; }
              100% { stroke-dashoffset: 1000; opacity: 0; }
            }

            .float-1 { animation: float 15s ease-in-out infinite; }
            .float-2 { animation: float 18s ease-in-out infinite reverse; }
            .float-3 { animation: float 22s ease-in-out infinite; }
            
            .cycle-slow { animation-duration: 20s; }
            .cycle-medium { animation-duration: 15s; }
            .cycle-fast { animation-duration: 10s; }

            @keyframes float {
              0%, 100% { transform: translate(0, 0) rotate(0deg); }
              33% { transform: translate(10px, -15px) rotate(1deg); }
              66% { transform: translate(-5px, 10px) rotate(-1deg); }
            }
            
            .delay-1 { animation-delay: 0.2s; }
            .delay-2 { animation-delay: 0.5s; }
            .delay-3 { animation-delay: 0.8s; }
            .delay-4 { animation-delay: 1.1s; }
            .delay-5 { animation-delay: 1.4s; }
          `}</style>
        </defs>

        {/* Component: Button */}
        <g className="float-1 delay-1">
          <rect x="150" y="150" width="160" height="48" rx="24" className="sketch-item cycle-medium" />
          <line x1="190" y1="174" x2="270" y2="174" className="sketch-item cycle-medium" />
        </g>

        {/* Component: Input */}
        <g className="float-2 delay-2">
          <rect x="1000" y="120" width="240" height="48" rx="8" className="sketch-item cycle-slow" />
          <line x1="1020" y1="144" x2="1100" y2="144" className="sketch-item cycle-slow" />
          <circle cx="1220" cy="144" r="6" className="sketch-item cycle-slow" />
        </g>

        {/* Component: Card/Frame */}
        <g className="float-3 delay-3">
          <rect x="1150" y="450" width="200" height="260" rx="16" className="sketch-item cycle-medium" />
          <rect x="1175" y="480" width="150" height="100" rx="8" className="sketch-item cycle-medium" />
          <line x1="1175" y1="600" x2="1325" y2="600" className="sketch-item cycle-medium" />
          <line x1="1175" y1="625" x2="1285" y2="625" className="sketch-item cycle-medium" />
          <rect x="1175" y="655" width="80" height="30" rx="15" className="sketch-item cycle-medium" />
        </g>

        {/* Component: Small Elements */}
        <g className="float-1 delay-4">
          <circle cx="250" cy="550" r="40" className="sketch-item cycle-fast" />
          <rect x="220" y="610" width="60" height="12" rx="6" className="sketch-item cycle-fast" />
        </g>

        <g className="float-2 delay-5">
          <rect x="120" y="400" width="200" height="120" rx="12" className="sketch-item cycle-slow" />
          <circle cx="160" cy="435" r="20" className="sketch-item cycle-slow" />
          <line x1="195" y1="435" x2="280" y2="435" className="sketch-item cycle-slow" />
          <line x1="195" y1="455" x2="260" y2="455" className="sketch-item cycle-slow" />
        </g>

        {/* Floating Lines/Connectors */}
        <path d="M400,200 Q500,150 600,250" className="sketch-item cycle-medium delay-2" style={{ animationDuration: '4s' }} />
        <path d="M800,600 Q900,650 1000,550" className="sketch-item cycle-slow delay-4" style={{ animationDuration: '5s' }} />
        
        {/* Figma Cursors (Optional but adds to the theme) */}
        <g className="float-1" transform="translate(150, 200)">
          <path d="M0,0 L16,5 L9,9 L5,16 Z" className="sketch-item cycle-fast" strokeWidth="1.5" />
          <rect x="16" y="5" width="45" height="18" rx="4" className="sketch-item cycle-fast" />
        </g>
      </svg>
    </div>
  );
};

export default FigmaSketchAnimation;
