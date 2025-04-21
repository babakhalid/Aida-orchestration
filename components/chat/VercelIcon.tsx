interface VercelIconProps {
    size?: number;
  }
  
  export const VercelIcon: React.FC<VercelIconProps> = ({ size = 16 }) => {
    return (
      <svg
        height={size}
        strokeLinejoin="round"
        viewBox="0 0 16 16"
        width={size}
        style={{ color: "currentcolor" }}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 1L16 15H0L8 1Z"
          fill="currentColor"
        ></path>
      </svg>
    );
  };