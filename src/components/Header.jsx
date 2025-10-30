import { useAuth } from '../context/authContext';

function Header() {
  const { user } = useAuth();
  return <div>Header {user}</div>;
}

export default Header;
