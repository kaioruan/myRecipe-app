import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { User } from 'phosphor-react';
import { verifyPageTitle } from '../services/Helpers';

function HeaderSimple() {
  const [pageTitle, setPageTitle] = useState('');

  const history = useHistory();
  const path = history.location.pathname;

  useEffect(() => {
    verifyPageTitle(path, setPageTitle);
  }, [path]);

  return (
    <header className="bg-red-600 p-3 pl-1">
      <section className="flex space-x-[2rem]">
        <div className="">
          <Link to="/profile">
            <User size={ 35 } className="text-white" />
          </Link>
        </div>
        <h2
          data-testid="page-title"
          className="mt-2 w-[15rem]
          text-white text-center font-bold"
        >
          {pageTitle}
        </h2>
      </section>
    </header>
  );
}

export default HeaderSimple;
