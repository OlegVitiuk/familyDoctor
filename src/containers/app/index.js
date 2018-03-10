import React from 'react';
import { Route, Link } from 'react-router-dom';
import Home from '../home';
import Doctors from '../doctors';
import Clinics from '../clinics';
import TopHeader from '../components/TopHeader';

const App = () => (
    <div>
        <TopHeader />

        {/*<Link to="/">Home</Link>*/}
{/*<Link to="/doctors">Doctor</Link>*/}

        <main>
            <Route exact path="/" component={Home} />
            <Route exact path="/doctors" component={Doctors} />
            <Route exact path="/clinics" component={Clinics} />
        </main>
    </div>
);

export default App
