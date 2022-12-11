import React, { Component } from 'react';
import { getUser } from '../services/userService';
import Card from './common/card';


class InternshipPage extends Component {
    state = {
        user:null
    }
    async componentDidMount () {
        const user = await getUser();
        //console.log(user);
        this.setState({user});
    }
    render() { 
        const user = this.state.user;
        return (
            <React.Fragment>
                <h1>{user?.name}'s Interest List</h1>
                {user?.interestList?.length  === 0 && (
                    <React.Fragment>
                        <p>Its empty! Come find some on our internships catalog.</p>
                    </React.Fragment>
                )}
                {user?.interestList?.length !== 0 && (
                    <React.Fragment>
                    {user?.interestList?.map((item,idx) => (
                        <Card key={`cardItem_${idx}${item._id}`} internshipId={item}/>
                    ))}
                    </React.Fragment>
                )}
                
            </React.Fragment>
        );
    }
}
 
export default InternshipPage;