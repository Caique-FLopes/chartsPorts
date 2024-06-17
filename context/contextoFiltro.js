import React, { createContext, useState } from 'react';

export const FiltroContext = createContext();

export const FiltroProvider = ({ children }) => {
    const [filtroAtraso, setFiltroAtraso] = useState('0 a 30');

    return (
        <FiltroContext.Provider value={{ filtroAtraso, setFiltroAtraso }}>
            {children}
        </FiltroContext.Provider>
    );
};
