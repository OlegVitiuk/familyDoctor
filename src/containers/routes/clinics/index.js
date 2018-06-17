import React from 'react'
import Clinic from "containers/components/Clinic";
import {connect} from "react-redux";

class Clinics extends React.Component {
    render(){
        return (
            <div className="clinics">
                <h1 className="clinics__list-title">Клініки в Києві</h1>
                <div className='clinics__list'>
                    {
                        this.props.clinics.map(clinic => (
                            <Clinic key={clinic["_id"]} clinic={clinic}/>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default connect(state => ({
    clinics: state.clinics,
}))(Clinics)