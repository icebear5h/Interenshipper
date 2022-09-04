import React, { Component } from 'react';


class InternshipPage extends Component {
    state = {  } 
    render() { 
        const internshipId = this.props.match.params.id
        return (
            <div>
                <h1 className="">{internshipId}</h1>
                
            </div>
        );
    }
}
 
export default InternshipPage;