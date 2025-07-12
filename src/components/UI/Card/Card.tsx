import { ReactNode } from '@lynx-js/react';
import './Card.css';

interface CardProps {
  children: ReactNode;
  className?: string;
  style?: any;
}

export const Card = ({ children, className = '', style }: CardProps) => {
  return (
    <view className={`card ${className}`} style={style}>
      {children}
    </view>
  );
};