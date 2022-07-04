import React from 'react'; 

class Zoom extends React.Component {
    constructor(props){
        super(props)
        this.state = {zoomFactor: 1}
        // this.zoomOut = this.zoomOut.bind(this); 
    }
    zoomOut = () => {
        this.setState({zoomFactor: this.state.zoomFactor - 0.1}) 
        console.log(this.state.zoomFactor); 
        this.props.zoomOut(this.state.zoomFactor); 
    }

    render(){
        

        return (
            <div>
                <button onClick={() => console.log('buttonClick')}>Zoom +</button>
                <button onClick={this.zoomOut}>Zoom -</button>
            </div>
        )
    }
}

export default Zoom; 