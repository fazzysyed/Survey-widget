import React from 'react';

class Likert extends React.Component {
  render() {
    return (
      <div style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <div style={{justifyContent: 'center', alignItems: 'center'}}>
          <div className="ring-data" style={{float:'left' }}>
          <p className= {this.props.minimize ? "ring-text-tab" : "ring-text"}
            >
            {this.props.text}
          </p>
          <div onClick={this.props.onPress}>
            <img className={this.props.minimize ? "ring-image-tab" : "ring-image"}
              src={this.props.image}
             
            />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Likert;
