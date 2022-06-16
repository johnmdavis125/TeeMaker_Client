import React from 'react';
import 'bulma/css/bulma.min.css'; 
import HeaderMenu from './components/HeaderMenu';
import Dropdown from './components/Dropdown';

class App extends React.Component {
    render(){

        return(
            <div>App
                <HeaderMenu /> 
            </div>
        )
    }
}

export default App; 