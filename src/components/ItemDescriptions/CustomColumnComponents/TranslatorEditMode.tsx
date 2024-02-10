import React from 'react';
import { useGetTranslatorsQuery } from '../../../redux/reducers';

const TranslatorEditMode = () => {
    const { data, isLoading, isError } = useGetTranslatorsQuery({});
    console.log(data);
    return <div>TranslatorEditMode</div>;
};

export default TranslatorEditMode;
