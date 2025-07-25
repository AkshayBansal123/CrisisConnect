
import React from 'react';
import {Link} from 'react-router-dom';
const Navbar = ({ brand, links = [], onSearch }) => {
  return (
    <div>
<nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">{brand}</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {links.map((link, index) => (
            <li key={index} className={`nav-item ${link.active ? 'active' : ''}`}>
              <Link className={`nav-link ${link.disabled ? 'disabled' : ''}`} to={link.href}>
                {link.text} {link.active && <span className="sr-only">(current)</span>}
              </Link>
            </li>
          ))}
        </ul>

        <form className="form-inline my-2 my-lg-0" onSubmit={onSearch}>
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
    </div>
    
  );
};

export default Navbar;