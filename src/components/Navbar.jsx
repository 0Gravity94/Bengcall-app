import React from "react";

function NavbarUser() {
  return (
    <div id="navbar-user" className="w-full shadow-md shadow-SecondaryBlue">
      <div className="navbar bg-white">
        <div className="flex-1 ml-6">
          <a className="btn btn-ghost normal-case text-3xl font-extrabold">
            <span className="text-PrimaryBlue">Beng</span>
            <span className="text-PrimaryRed">Call</span>
          </a>
        </div>
        <div className="flex gap-6 mr-6">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#669BBC"
              className="w-8 h-8"
            >
              <path
                fillRule="evenodd"
                d="M12 6.75a5.25 5.25 0 016.775-5.025.75.75 0 01.313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 011.248.313 5.25 5.25 0 01-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 112.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0112 6.75zM4.117 19.125a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z"
                clipRule="evenodd"
              />
              <path d="M10.076 8.64l-2.201-2.2V4.874a.75.75 0 00-.364-.643l-3.75-2.25a.75.75 0 00-.916.113l-.75.75a.75.75 0 00-.113.916l2.25 3.75a.75.75 0 00.643.364h1.564l2.062 2.062 1.575-1.297z" />
              <path
                fillRule="evenodd"
                d="M12.556 17.329l4.183 4.182a3.375 3.375 0 004.773-4.773l-3.306-3.305a6.803 6.803 0 01-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 00-.167.063l-3.086 3.748zm3.414-1.36a.75.75 0 011.06 0l1.875 1.876a.75.75 0 11-1.06 1.06L15.97 17.03a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost rounded-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#669BBC"
                className="w-8 h-8"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content p-2 bg-white rounded-box w-44 border shadow-md"
            >
              <li className="text-PrimaryBlue">
                <a className="w-full flex justify-center">My Profile</a>
              </li>
              <li className="text-PrimaryBlue">
                <a className="w-full flex justify-center">History</a>
              </li>
              <li className="text-PrimaryBlue">
                <a className="w-full flex justify-center">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavbarAdmin() {
  return (
    <div id="navbar-admin" className="w-full shadow-md shadow-SecondaryBlue">
      <div className="navbar bg-white">
        <div className="flex-1 ml-6">
          <a className="btn btn-ghost normal-case text-3xl font-extrabold">
            <span className="text-PrimaryBlue">Beng</span>
            <span className="text-PrimaryRed">Call</span>
          </a>
        </div>
        <div className="mr-6">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="#C1121F"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export { NavbarUser, NavbarAdmin };
