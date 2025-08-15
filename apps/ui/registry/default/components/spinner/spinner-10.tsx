"use client"

interface AnimatedSpinnerProps {
  size?: string
  className?: string
}

export default function DemoOne() {
   return (
    <div className="w-full flex items-center justify-center">
      <AnimatedSpinner />
    </div>
  )
}


export function AnimatedSpinner({ size = "10rem", className = "" }: AnimatedSpinnerProps) {
  return (
    <>
      <style jsx>{`
        @property --deg {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: true;
        }

        @property --p {
          syntax: "<percentage>";
          initial-value: 0%;
          inherits: true;
        }

        @property --line-width {
          syntax: "<length>";
          initial-value: 1rem;
          inherits: true;
        }

        .animated-spinner {
          --size: ${size};
          --color: #ffeb3b;
          --color-2: #9c27b0;
          --color-3: #03a9f4;
          width: var(--size);
          background: conic-gradient(
            from var(--deg),
            var(--color),
            var(--color-2),
            var(--color-3),
            transparent var(--p)
          );
          mask: radial-gradient(
            circle,
            transparent calc(var(--size) / 2 - var(--line-width, 1rem)),
            black calc(var(--size) / 2 - var(--line-width, 1rem))
          );
          filter: drop-shadow(1rem 0 2rem var(--color-3));
          border-radius: 50%;
          aspect-ratio: 1;
          animation: rotate 1.1s ease infinite, line-width 3.3s ease infinite;
        }

        @keyframes rotate {
          from {
            --p: 20%;
          }
          50% {
            --p: 50%;
          }
          70% {
            --p: 30%;
          }
          90% {
            --p: 10%;
          }
          to {
            --p: 20%;
            --deg: -360deg;
          }
        }

        @keyframes line-width {
          from, 20%, 70%, to {
            --line-width: 1rem;
          }
          
          50% {
            --line-width: .1rem;
          }
        }
      `}</style>
      <div className={`animated-spinner ${className}`} />
    </>
  )
}
