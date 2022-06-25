import { NavLink } from 'react-router-dom';

export const Header = () => {
  const linkColor = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? 'green' : 'black',
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: 20 }}>
      <div>
        <NavLink to="/" style={linkColor}>
          Home
        </NavLink>
      </div>
      <div>
        <ul style={{ display: 'flex', gap: 5 }}>
          <li>
            <NavLink to="/bookmarks" style={linkColor}>
              Bookmarks
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
