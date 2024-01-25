import React from 'react';
import { useSelector } from "react-redux";

const useGetToken = () => {
    const userProfile = useSelector((state) => state.user);

    return userProfile?.user?.accessToken;
};

export default useGetToken;