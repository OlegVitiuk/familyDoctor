import React from 'react';
import { Route, Link } from 'react-router-dom';
import Home from '../routes/home';
import Doctors from '../routes/doctors';
import Clinics from '../routes/clinics';
import TopHeader from '../components/TopHeader';
import Footer from '../components/Footer';
import FormContainer from '../forms';

const App = () => (
    <div>
        <FormContainer />
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
