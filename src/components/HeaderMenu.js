import React from 'react';
import DropDown from './Dropdown'; 

class HeaderMenu extends React.Component {
    constructor(){
        super()
    }
    
    // componentDidMount(){
    //     const dropDown = document.getElementById('FileMenu'); 
    //     // dropDown.addEventListener('click', () => {
    //     //     console.log('clicked'); 
    //     // })
    //     console.log(dropDown); 
    // }

    render(){
        return (
            <div style={{display: 'flex'}}>
                <DropDown id="FileMenu" className="dropDown"
                    btnTitle={'File'}
                    options={['Save As', 'option2', 'option3']}
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