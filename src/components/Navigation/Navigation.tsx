import { NAVIGATION_ITEMS } from '../../utils/constants';
import './Navigation.css';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export const Navigation = ({ currentView, onViewChange }: NavigationProps) => {
  return (
    <view className="navigation">
      <view className="navigation-container">
        {NAVIGATION_ITEMS.map(({ id, icon, label }) => (
          <view
            key={id}
            className={`navigation-item ${currentView === id ? 'active' : ''}`}
            bindtap={() => onViewChange(id)}
          >
            <text className="navigation-icon">{icon}</text>
            <text className="navigation-label">{label}</text>
          </view>
        ))}
      </view>
    </view>
  );
};