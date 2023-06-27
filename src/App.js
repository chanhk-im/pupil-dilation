import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRoute from './routes/AppRoute';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <AppRoute />
            </BrowserRouter>
        </div>
    );
}

export default App;
