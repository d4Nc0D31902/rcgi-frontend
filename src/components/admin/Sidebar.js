import React from "react";

import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      <nav id="sidebar">
        <ul className="list-unstyled components">
          <li>
            <Link to="/dashboard">
              <i className="fa fa-tachometer"></i> Dashboard
            </Link>
          </li>

          <li>
            <Link to="/admin/users">
              <i className="fa fa-users"></i> Users
            </Link>
          </li>
          <li>
            <a
              href="#courseSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fa fa-book"></i> Courses
            </a>

            <ul className="collapse list-unstyled" id="courseSubmenu">
              <li>
                <Link to="/admin/courses">
                  <i className="fa fa-clipboard"></i> All Courses
                </Link>
              </li>
              <li>
                <Link to="/admin/course">
                  <i className="fa fa-plus"></i> Create
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/admin/enrollments">
              <i className="fa fa-graduation-cap"></i> Enrollments
            </Link>
          </li>

          <li>
            <a
              href="#quizSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <i className="fa fa-book"></i> Quizzes
            </a>

            <ul className="collapse list-unstyled" id="quizSubmenu">
              <li>
                <Link to="/admin/quizzes">
                  <i className="fa fa-clipboard"></i> Results
                </Link>
              </li>
              <li>
                <Link to="/admin/retake">
                  <i className="fa fa-clipboard"></i> Retakes
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
