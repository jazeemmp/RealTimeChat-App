import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const userAuthRedirect = () => {
  const navigate = useNavigate();
  const { userToken } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userToken) {
      navigate('/login');
    }
  }, [userToken, navigate]);
};

export default userAuthRedirect;
