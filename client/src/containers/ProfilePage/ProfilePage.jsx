import { Link } from "react-router-dom"
import Button from "shared/Button/Button";

const ProfilePage = () => {
  return (
      <div>
          <div className="flex gap-2 p-4">
              <button className="px-4 py-2 text-white bg-indigo-700 rounded hover:bg-indigo-600">
                  <Link to="/admin/users/forget-password">
                      Olvidé la contraseña
                  </Link>
              </button>
              <button className="px-4 py-2 text-white bg-indigo-700 rounded hover:bg-indigo-600">
                  <Link to="/admin/users/new-password">Cambiar contraseña</Link>
              </button>
          </div>
          <div>
              <h2>Informacion del usuario:</h2>
          </div>
      </div>
  );
}

export default ProfilePage