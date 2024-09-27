import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const adminAuthRedirect = () => {
  const navigate = useNavigate();
  const { adminToken } = useSelector((state) => state.admin);

  useEffect(() => {
    if (!adminToken) {
      navigate('/admin/login');
    }else{
      navigate('/admin/dashboard')
    }
  }, [adminToken, navigate]);
};

export default adminAuthRedirect;
