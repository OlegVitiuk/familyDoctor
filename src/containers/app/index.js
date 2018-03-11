import React from 'react';
import { Route, Link } from 'react-router-dom';
import Home from '../routes/home';
import Doctors from '../routes/doctors';
import Clinics from '../routes/clinics';
import TopHeader from '../components/TopHeader';
import Footer from '../components/Footer';

const App = () => (
    <div>
        <TopHeader />
        <main>
            <Route exact path="/" component={Home} />
            <Route exact path="/doctors" component={Doctors} />
            <Route exact path="/clinics" component={Clinics} />
        </main>
        <Footer />
    </div>
);

export default App
