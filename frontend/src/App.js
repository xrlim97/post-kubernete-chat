import './App.css';
import { useWebSocket } from './data/ws';
import { useState } from 'react';

function App() {
  const [text, setText] = useState("");

  const [ msg, isConnected, sendMessage ] = useWebSocket();

  function sendMessageToWebSocker(event) {
    if (event.key === 'Enter') {
      sendMessage(text);
      setText("");
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Simple Chat one unique group
        </p>
        <input type="text" placeholder='Write down and press enter to send message' value={text} onChange={e=>setText(e.target.value)} onKeyDown={sendMessageToWebSocker} />
        <ConnectionMessage isConnected={isConnected} />
        <ListOfMessages msg={msg} />
      </header>
    </div>
  );
}

function ConnectionMessage(props) {
  if (props.isConnected === true) {
    return (
      <p>
        Is Connected to Socket
      </p>
    )

  } else {
    return (
      <p>
        Is not connected to Socket
      </p>
    )

  }
}

function ListOfMessages(props) {
  if (props.msg.length === 0) {
    return (
      <p></p>
    );
  }
  return (
      props.msg.map(msg => <p>{msg}</p>)
  );
}

export default App;
