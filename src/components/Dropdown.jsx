import React from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';
import '../components/Dropdown.css';
import Axios from 'axios';
import MetricsNameGraph from '../components/MetricsNameGraph';

const METRIC_URL = 'https://react.eogresources.com/graphql';

//------ Dropdown Component ----------
class Dropdown extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selectedOptions: []
    }
  }
  onClickDropboxHandle = (selectedMetrics) => {
    let metricList = [];
    let MS_PER_MINUTE = 60000;
    let time= Date.now() - 30 * MS_PER_MINUTE;
  
    selectedMetrics.map(option=>{
    let metric = '{metricName'+':"'+option+'", after:'+time+'}';
      metricList.push(metric);
    })
    
    let GET_MULTIPLE_MEASUREMENT = (input) => `{
        getMultipleMeasurements(input:[${input}]){
          measurements{
            metric
            at
            value
          }
        }
    }`;
    Axios.post(METRIC_URL,{query: GET_MULTIPLE_MEASUREMENT(metricList)})
     .then(result => {   
     this.setState({ selectedOptions: result.data.data != null && result.data.data != undefined ? result.data.data : []})
    })
    
  }
  render(){
    return(
      <div>
        <div className="dropdown">
          <Typeahead
            clearButton
            defaultSelected={this.props.metrics.slice(0, 2)}
            id="selections-example"
            labelKey="name"
            multiple
            options={this.props.metrics}
            placeholder="Select..."
            onChange={this.onClickDropboxHandle}
          />
      </div>
      <div className="graph">
        <MetricsNameGraph measurement={this.state.selectedOptions.getMultipleMeasurements} />
      </div>
    </div>   
    )
  }  
}

export default Dropdown;

