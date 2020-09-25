import React from 'react';
import './Track.css';

class Track extends React.Component {
  render() {
    const renderAction = () => this.props.isRemoval ? <button className="Track-action">-</button> : <button className="Track-action">+</button>;

    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.item.name}</h3>
          <p>{this.props.item.artist} | {this.props.item.album}</p>
        </div>
        {renderAction}
      </div>
    )
  }
}

export default Track;