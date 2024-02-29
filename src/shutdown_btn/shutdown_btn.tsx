import { Component } from 'react';
import toastr from "toastr";

interface ShutdownButtonProps {
  imageUrl: string;
  
}

class ShutdownButton extends Component<ShutdownButtonProps> {
  sendShutdownRequest = () => {
    fetch("http://192.168.1.18:3000/shutdown", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ action: 'shutdown' }) // You might need to adjust this payload based on your server's requirements
    })
    .then(_response => {
      // Handle response as needed
      toastr.success('Richiesta inviata con successo.', "Invio richiesta di spegnimento", { closeButton: true, progressBar: true, timeOut: 5000, extendedTimeOut: 2000});
    })
    .catch(error => {
      // Handle error
      toastr.error('Invio richiesta di spegnimento fallita:', error, { closeButton: true, progressBar: true, timeOut: 5000, extendedTimeOut: 2000});
    });
  };

  render() {
    return (
      <div className='shutdown-button-container'>
      <button className="shutdown-button" onClick={this.sendShutdownRequest}>
        <img src={this.props.imageUrl} alt="Shutdown Button" />
      </button>
      </div>
    );
  }
}

export default ShutdownButton;
