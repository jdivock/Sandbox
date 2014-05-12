/** @jsx React.DOM */

/* jshint ignore:start */
var Step1 = React.createClass({
  
    // transferPropsTo() will take any props passed to CheckLink
    // and copy them to <a>
    handleMakeChange: function(makeValue) {
        this.setState({
            makeValue: makeValue
        });
    },


    getInitialState: function() {
        return {
            makeValue: 'make',
            modelValue: 'model'
        };
    },
    render: function() {
      return (
      <div>
        <div>{this.state.makeValue}</div>
      
        <Make src="http://echopark.com/api/account/reviews/getvehiclemakes" value={this.state.makeValue} onMakeChange={this.handleMakeChange} />
        <Model />
    
      </div>
    )     
    }
});

var Make = React.createClass({
  componentDidMount: function() {
      $.get(this.props.src, function(result) {
         
          this.setState ({
            makes: result.VehicleMakes
          });

      }.bind(this));
  },
  getInitialState: function() {
        return {
            makes: [{Make: 'Make', Id: '-1'}],
        };
    },
  handleChange: function(event) {
        this.props.onMakeChange(
            event.target.value
        );
  },
  render: function(){
    var value = this.props.value;

    var options =  this.state.makes.map(function(value){
              return <option value={value.Id}>{value.Make}</option>;
          });

    return <select value={this.props.value}>
            <option value=''>Make</option>
            {options}
          </select>
  }
});

var Model = React.createClass({
  getInitialState: function() {
    return { modelValue: "test"};
  },
  handleChange: function(event) {
    this.setState({modelValue: event.target.value});
  },
  render: function(){
    var value = this.state.modelValue;
    return <input type="text" value={value} onChange={this.handleChange} />;
  }
});

React.renderComponent(
  <Step1 makeValue="hi">
    Click here!
  </Step1>,
  document.getElementById('example')
);

/* jshint ignore:end */