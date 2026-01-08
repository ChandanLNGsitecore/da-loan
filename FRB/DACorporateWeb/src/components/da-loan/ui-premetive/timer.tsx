interface TimerProps {
  readonly className?: string;
}

export function Timer({ className }: TimerProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="14 14 36 36"
      enableBackground="new 0 0 64 64"
      className={className}
    >
      <style>
        {`
          @keyframes rotate-minute-hand {
            from {
              transform: rotate(0deg);
            }
            to { 
              transform: rotate(360deg);
            }
          }
            
          @keyframes rotate-hour-hand {
            from { 
              transform: rotate(0deg); 
            }
            to {
              transform: rotate(360deg);
            }
          }
            
          .minute-hand {
            animation: rotate-minute-hand 4s linear infinite;
            transform-origin: 32px 32px; 
          }
          
          .hour-hand {
            animation: rotate-hour-hand 12s linear infinite;
            transform-origin: 32px 32px;
          }
        `}
      </style>
      <g>
        <g></g>

        <circle
          fill="#FFFFFF"
          stroke="#305D4CFF"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          cx="32"
          cy="32"
          r="17.5"
        />
      </g>

      <g>
        <line
          fill="#E6E9EC"
          stroke="#305D4CFF"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          x1="32"
          y1="18"
          x2="32"
          y2="19.75"
        />

        <line
          fill="#E6E9EC"
          stroke="#305D4CFF"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          x1="32"
          y1="44.25"
          x2="32"
          y2="46"
        />

        <line
          fill="#E6E9EC"
          stroke="#305D4CFF"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          x1="46"
          y1="32"
          x2="44.25"
          y2="32"
        />

        <line
          fill="#E6E9EC"
          stroke="#305D4CFF"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          x1="19.75"
          y1="32"
          x2="18"
          y2="32"
        />
      </g>

      <g>
        <line
          className="minute-hand"
          fill="#E6E9EC"
          stroke="#305D4CFF"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          x1="32"
          y1="23.25"
          x2="32"
          y2="32"
        />

        <line
          className="hour-hand"
          fill="#E6E9EC"
          stroke="#305D4CFF"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          x1="32"
          y1="27"
          x2="32"
          y2="32"
        />
      </g>
    </svg>
  );
}
