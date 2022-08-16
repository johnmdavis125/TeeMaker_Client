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
        const rawArr = string.split('\n'); // rawArr.length = number of rows in csv data
        const titleArr = []; 
        const wordArr = []; 
        console.log('data - should contain titles'); 
        for (let i = 0; i < rawArr.length; i++){
            console.log(rawArr[i]); 
        }

        for (let i = 0; i < rawArr.length; i++){
            const subArr = rawArr[i].split(','); 
            const title = subArr[0]; 
            titleArr.push(title); 
            subArr.shift();
            
            const arr = subArr.join(','); 
            wordArr.push(arr); 
            
        }

        console.log('titleArr', titleArr); 
        
        // get rid of /r suffix
        for (let i = 0; i < wordArr.length; i++){
            if (i !== wordArr.length - 1){
                wordArr[i] = wordArr[i].slice(0, wordArr[i].length - 1); 
            }
        }
        
        // wordArr should now be the same as if the title column wasn't included...print to console to make sure
        console.log('data - should not contain titles'); 
        console.log('wordArr', wordArr); 
        // refactor titleArr to be passed as props
        
        this.props.setWordSearchWordArr({wordArr})
        // this.props.setWordSearchTitleArr
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