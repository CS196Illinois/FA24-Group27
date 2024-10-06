// import ListGroup from "./components/ListGroup"

// import Alert from "./components/Alert";

import Alert from "./components/Alert";
import Button from "./components/Button";
import { useState } from 'react'

function App() {
  // let items = ['New York', 'San Fran', 'Tokyo', 'London', 'Paris'];
  
  // const handleSelectItem = (item: string) => {
  //   console.log(item)
  // }

  // return <div><ListGroup items={items} heading="Cities" onSelectItem={handleSelectItem} /></div>

  // return (
  //   <div>
  //     <Alert>Hello <span>World</span></Alert>
  //   </div>
  // );

  const [alertVisable, setAlertVisibility] = useState(false);

  return (
    <div>
      { alertVisable && <Alert onClose={() => setAlertVisibility(false)}>My alert</Alert> }
      <Button color='danger' onClick={() => setAlertVisibility(true)}>My Button</Button>
    </div>
  );
}

export default App