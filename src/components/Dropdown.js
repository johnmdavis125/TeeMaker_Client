import React from 'react'; 

class Dropdown extends React.Component {
    constructor(){
        super()
        this.state = {file: {}};
        this.fileReader = new FileReader(); 
    } 
    saveAs(){
        console.log('hello'); 
    }
    handleChange = (e) => {
        console.log('handle change'); 
        this.setState({file: e.target.files[0]}); 
        requestAnimationFrame(() => console.log(this.state.file)); 
    }
    handleSubmit = (e) => {
        e.preventDefault(); 
        console.log('handle submit'); 

        if (this.state.file){
            console.log('file exists');
            this.fileReader.readAsText(this.state.file); 

            this.fileReader.onload = function(event){
                const result = event.target.result;
                console.log(`result: ${result}`); 
            }    
        }
    }
    render(){
        const {btnTitle, options} = this.props;  
        
        return (
            <div>
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
                        
                        <form className='dropdown-item'>
                            <input
                                type={"file"}
                                accept={".png"}
                                onChange={this.handleChange}
                            />
                            <button onClick={(e) => this.handleSubmit(e)}>
                                {options[1]}
                            </button>
                        </form>
                                                
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