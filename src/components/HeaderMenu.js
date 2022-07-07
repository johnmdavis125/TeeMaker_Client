import React from 'react';
import DropDown from './Dropdown'; 

class HeaderMenu extends React.Component {
    render(){
        return (
            <div style={{display: 'flex'}}>
                <DropDown id="FileMenu" className="dropDown"
                    btnTitle={'File'}
                    options={['Save As', 'Import File', 'option3']}
                /> 
                <DropDown className="Menu2"
                    btnTitle={'title2'}
                    options={['option1', 'option2', 'option3']}
                /> 
                <DropDown className="Menu3"
                    btnTitle={'title3'}
                    options={['option1', 'option2', 'option3']}
                /> 
                <DropDown className="Menu4"
                    btnTitle={'title4'}
                    options={['option1', 'option2', 'option3']}
                /> 
            </div>
        )
    }
}

export default HeaderMenu; 