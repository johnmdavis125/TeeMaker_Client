import React from 'react'; 

class Dropdown extends React.Component {
    constructor(props){
        super(props)
        this.state = {file: {}};
        this.fileReader = new FileReader(); 
    } 
    saveAs(){
        console.log('saveAs'); 
    }
    csvFileToArray = (string) => {
        const arr = string.split('\n');
        for (let i = 0; i < arr.length; i++){
            console.log(arr[i]); 
        }
        this.props.setWordSearchWordArr({arr})
    }
    handleChange = (e) => {
        console.log('handle change'); 
        this.setState({file: e.target.files[0]}); 
        requestAnimationFrame(() => console.log(this.state.file)); 
        requestAnimationFrame(() => {
            if (this.state.file){
                console.log('file exists');
                this.fileReader.readAsText(this.state.file); 
    
                this.fileReader.onload = (event) => {
                    const result = event.target.result;
                    console.log(`result: ${result}`); 
                    this.csvFileToArray(result); 
                }  
                requestAnimationFrame(() => this.props.buildWordSearch());   
                
            }
        })
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
                            <input
                                className='dropdown-item'
                                type={"file"}
                                accept={".csv"}
                                onChange={this.handleChange}
                            />                  
                        <a href="#" className="dropdown-item is-active">
                            {options[3]}
                        </a>
                        <a onClick={() => this.props.combinePageANDPuzzle(this.props.numPuzzles)} className="dropdown-item">
                            Combine and Export Pages
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