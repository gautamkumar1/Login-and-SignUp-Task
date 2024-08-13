import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Verify = () => {
  const { token } = useParams();
  const navigateTo = useNavigate();
  const [verificationMessage, setVerificationMessage] = useState('Verifying email...');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `http://116.202.210.102:9000/verify/${token}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Remove Access-Control-Allow-Origin from client-side; it's a server-side header
            },
          }
        );

        if (response.ok) {
          setVerificationMessage('Email verified successfully.');
          console.log('Email verified successfully.');
          setTimeout(() => {
            console.log('Navigating to /login');
            navigateTo('/login');
          }, 2000); 
        } else {
          setVerificationMessage('Email verification failed.');
          console.log('Email verification failed with status:', response.status);
        }
      } catch (error) {
        console.error('Error during email verification:', error);
        setVerificationMessage('Email verification failed.');
      }
    };

    verifyEmail();
  }, [token, navigateTo]);

  return <div>{verificationMessage}</div>;
};

export default Verify;
