import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { useAuthQuery } from '../../features/auth/auth-api-slice';
import { authSending } from '../../features/auth/auth-requested-slice';
import { setToken } from '../../features/auth/token-slice';
import Cookies from 'js-cookie';

function Auth(params: any) {
    const dispatch = useAppDispatch();
    const {data, isFetching, isSuccess} = useAuthQuery(params.credentials);

    if (!isFetching && isSuccess) {
        if (data.access_token) {
            Cookies.set('access_token', data.access_token, { expires: 1/12 });
            dispatch(setToken(data.access_token));
        }
        dispatch(authSending(false));
    }

    return (<div />)
}

export default Auth;