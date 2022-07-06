import React from 'react'; 

class Dropdown extends React.Component {
    // componentDidMount(){
    //     const dropDown = document.getElementById(this.props.btnTitle); 
    //     console.log(dropDown); 
    //     dropDown.addEventListener('click', ()=>{
    //         dropDown.classList.add('is-active');
    //     });
    // }
    saveAs(){

        // console.log('hello'); 
    }

    render(){
        const {btnTitle, options} = this.props;  
        
        return (
            <div>
                {/* <div className="dropdown" id={btnTitle}> */}
                <div className="dropdown is-hoverable">
                    <div className="dropdown-trigger">
                        <button className="button is-small" aria-haspopup="true" aria-controls="dropdown-menu" style={{background: 'rgb(75,75,75)',color: 'rgb(200,200,200)'}}>
                        <span>{btnTitle}</span>
                        <span className="icon is-small">
                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                            </span>
                        </button>
                    </div>
                    <div className="dropdown-menu" id="dropdown-menu" role="menu">
                        <div className="dropdown-content">
                        <a onClick={this.saveAs} className="dropdown-item" id="testItem">
                            {options[0]}
                        </a>
                        <a className="dropdown-item">
                            {options[1]}
                        </a>
                        <a href="#" className="dropdown-item is-active">
                            {options[2]}
                        </a>
                        <a href="#" className="dropdown-item">
                            Other dropdown item
                        </a>
                        <hr className="dropdown-divider"/>
                        <a href="#" className="dropdown-item">
                            With a divider
                        </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dropdown; 