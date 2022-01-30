import React from 'react';
import { useNavigate } from 'react-router-dom';

const useRedirect = (url) => {
    useNavigate(url);
}

export default useRedirect;