import React from 'react';
import AddOptions from './AddOption';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import OptionModal from './OptionModal';



class IndecisionApp extends React.Component{
    state = {
        options: [],
        selectedOption: undefined
    }
  
    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        this.setState(() => ({
            selectedOption: option
          }));
    };
    handleDeleteOptions = () => {
        this.setState(() => ({options : []}) );
    };
    handleDeleteOption = (optionToDelete) => {
        this.setState((prevState) => ({
            options : prevState.options.filter((option) => optionToDelete !== option )
        }));
    };
    handleAddOPtions = (option) => {
        if(!option){
            return 'Please enter a valid value';
        }
        else if(this.state.options.indexOf(option) > -1)
        {
            return 'Item already exists';
        }
        this.setState((prevState) => ({ options: prevState.options.concat([option]) }) );
    };
    handleClearSelectedOption = () => {
        this.setState(() => ({ selectedOption: undefined }));
      }

    componentDidMount(){
        try
        {
        const json = localStorage.getItem('options');
        const options = JSON.parse(json);
        if(options){
            this.setState(() => ({ options }));
        }
    }
    catch(e)
    {}

    }
    componentDidUpdate(prevProps, prevState){
        
        if(prevState.options.length !== this.state.options.length)
        {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }
    
    render(){
        const subtitle = 'Put your life in the hands of a computer.';
        
        return(
            <div>
            <Header subtitle={subtitle} />
            <div className="container">
            <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick}/>
            <div className="widget">
            <Options 
            options={this.state.options} 
            handleDeleteOptions={this.handleDeleteOptions} 
            handleDeleteOption={this.handleDeleteOption}
            />
            <AddOptions handleAddOPtions={this.handleAddOPtions}/>
            </div>
            </div>
            <OptionModal
            selectedOption={this.state.selectedOption}
            handleClearSelectedOption={this.handleClearSelectedOption}
            />
            </div>
        );
    }
}

export default IndecisionApp;