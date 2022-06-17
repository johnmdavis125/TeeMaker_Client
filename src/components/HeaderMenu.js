import React from 'react';
import DropDown from './Dropdown'; 

class HeaderMenu extends React.Component {
    componentDidMount() {
        const testItem = document.getElementById('testItem'); 
        testItem.addEventListener('click', () => {
            console.log('testItem clicked'); 
        })
    }

    render(){
        return (
            <div style={{display: 'flex'}}>
                <DropDown 
                    btnTitle={'title'}
                    options={['option1', 'option2', 'option3']}
                /> 
                <DropDown 
                    btnTitle={'title'}
                    options={['option1', 'option2', 'option3']}
                /> 
                <DropDown 
                    btnTitle={'title'}
                    options={['option1', 'option2', 'option3']}
                /> 
                <DropDown 
                    btnTitle={'title'}
                    options={['option1', 'option2', 'option3']}
                /> 
            </div>
        )
    }
}

export default HeaderMenu; 