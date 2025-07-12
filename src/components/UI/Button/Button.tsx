import { ReactNode } from '@lynx-js/react';
import './Button.css';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  style?: any;
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  style 
}: ButtonProps) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <view 
      className={`btn btn-${variant} btn-${size} ${className} ${disabled ? 'disabled' : ''}`}
      bindtap={handleClick}
      style={style}
    >
      {children}
    </view>
  );
};