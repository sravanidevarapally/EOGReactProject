import React from 'react';
import Axios from 'axios';

import Dropdown from './Dropdown';

const graphUrl = 'https://react.eogresources.com/graphql';

//----- Dashboard component -------------
class Dashboard extends React.Component{   
    constructor(props){
        super(props)

        this.state = {
            metricsList: []
        }
    }
    componentDidMount(){
        let GET_METRICS = '{getMetrics}';

        Axios.post(graphUrl,{query: GET_METRICS})
        .then(response => {
            this.setState({ metricsList: response.data.data.getMetrics })
        })
    }
    render(){
        return(
            <div variant="dashboard">
                {/* {----- Dropdown list component ----- } */}
                <Dropdown title="Select..." metrics={this.state.metricsList} />
            </div>
        );
    }
}

export default Dashboard;