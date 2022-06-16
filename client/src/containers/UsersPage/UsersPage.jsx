import BgGlassmorphism from 'components/BgGlassmorphism/BgGlassmorphism';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';



const UsersPage = () => {
  return (
      <div
          className={`nc-PageAbout overflow-hidden relative `}
          data-nc-id="PageAbout"
      >
          <Helmet>
              <title>Lista de usuarios</title>
          </Helmet>



          <div className="container py-4 space-y-16 lg:py-4 lg:space-y-28">
              <div className='py-4'>
                  <h1 className='text-2xl text-gray-800'>Lista de usuarios</h1>
              </div>
              <Link
                  to="users/add-user"
                  className="bg-indigo-700 text-white py-1 px-4 rounded hover:bg-indigo-500"
              >
                  Agregar usuario
              </Link>
          </div>

      </div>
  );
}

export default UsersPage