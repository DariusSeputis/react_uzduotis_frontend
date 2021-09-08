import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { TeamContext } from '../App';

const Header = () => {
  const { teamInLocalStorage } = useContext(TeamContext);
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          {teamInLocalStorage ? (
            <li>
              <Link to='/my-account'>My account</Link>
            </li>
          ) : (
            <li>
              <Link to='/login'>Log in / Sign Up</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
