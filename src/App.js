import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRoute from './routes/AppRoute';
import Header from './components/Header';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <AppRoute />
            </BrowserRouter>
        </div>
    );
}

export default App;
