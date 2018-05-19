import React from 'react';
import { Route, Link } from 'react-router-dom';
import Home from '../routes/home';
import Doctors from '../routes/doctors';
import Clinics from '../routes/clinics';
import Diagnostics from '../routes/diagnostics';
import Laboratories from '../routes/laboratories';
import TopHeader from '../components/TopHeader';
import Footer from '../components/Footer';
import FormContainer from '../forms';

const App = () => (
    <div>
        <FormContainer />
        <TopHeader />
        <main className="content">
            <Route exact path="/" component={Home} />
            <Route exact path="/doctors" component={Doctors} />
            <Route exact path="/clinics" component={Clinics} />
            <Route exact path="/diagnostics" component={Diagnostics} />
            <Route exact path="/laboratories" component={Laboratories} />
        </main>
        <Footer />
    </div>
);

export default App
