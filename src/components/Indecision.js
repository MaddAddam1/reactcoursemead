import React, { Component } from 'react';
import { ReactDOM } from 'react-dom';

import OptionModal from './ModalOption';


class IndecisionApp extends Component{
    constructor(props){
        super(props);

        this.state = {

            options: props.options,
            selectedOption: undefined

        };
    }
//------------------------------Lifecycle methods--------------------------------
    componentDidMount = () => {
        const json = localStorage.getItem('options');
        const options = JSON.parse(json);

        this.setState(() => ({ options: options }));
    }
    componentDidUpdate = (prevProps, prevState) => {

        if(prevState.options.length !== this.state.options.length){
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
            console.log('Component updated, saving data...');   
        }        
    }
    componentWillUnmount = () => {
        console.log('Component unmounted');
    }
//-----------------------Functions---------------------------------------------------
    deleteOptions = () => {
        this.setState(() => ({ options: [] }));
    }
//-----
    handlePick = () => {
        const randNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randNum];
        this.setState(() => ({
            selectedOption: option
        }))
    }
//-----
    addOption = (option) => {
        if (!option) {
            return 'Enter a valid option';
        } else if (this.state.options.indexOf(option) > -1){
            return 'This option already exists';
        }

        this.setState((prevState) => ( { options: prevState.options.concat(option) } ));
       
    }
//-----
    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option)
        }));
    }

    handleOptionModal = () => {
        this.setState(() => ({ selectedOption: undefined }))
    }
//----------------------------------------------------------------------------------
    render () {
        const subtitle = 'Put your life in the hands of a computer';

        return (
            <div style={{margin: 10}}>
                <Header subtitle={subtitle}/>
                <div className="container">
                
                    <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick}/>

                    <Options 
                    options={this.state.options}
                    handleDeleteOptions={this.deleteOptions}
                    handleDeleteOption={this.handleDeleteOption} 
                    />

                    <AddOption addOption={this.addOption} />
                    <OptionModal
                        handleOptionModal={this.handleOptionModal}
                        selectedOption={this.state.selectedOption}
                    />
                </div>
            </div>
        );
    }
}

IndecisionApp.defaultProps = {
    options: [],
}
//===========================================================================================================
const Header = (props) => {
        return (
        
            <div className="header">
                <div className="container">
                    <h1 className="header__title">{props.title}</h1>
                    {props.subtitle && <h2 className="header__subtitle">{props.subtitle}</h2> }
                </div>       
            </div>
        );
}

Header.defaultProps = {
    title: 'Indecision'
    
}
//===========================================================================================================

const Action = (props) => {
        return (
        
            <div style={{margin: 10}}>
                <button className="todo__button"
                onClick={props.handlePick}
                disabled={!props.hasOptions}>What should I do?</button>       
            </div>           
        );
}
//===========================================================================================================
const Options = (props) => {
        return (

            <div style={{margin: 10}}>
                <button onClick={props.handleDeleteOptions}>Remove All</button>
             
                {props.options.map((option) => 
                    <Option 
                        key={option} 
                        optionText={option}
                        handleDeleteOption={props.handleDeleteOption}
                    />)}
            </div>
        );
}
//===========================================================================================================
const Option = (props) => {
        return (
            <div style={{margin: 10}}>
                {props.optionText}
               
                <button 
                style={{margin: 10}}
                onClick={(e) => {
                    props.handleDeleteOption(props.optionText)
                }}>
                Remove
                </button>

            </div>
        );
}
//===========================================================================================================
class AddOption extends Component {
    constructor(props){
        super(props);
        this.AddOption = this.AddOption.bind(this);

        this.state = {
            error: undefined,
        }
    }

    AddOption(e) {
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        const error = this.props.addOption(option);
        
        this.setState(() => ( { error } ));
           
    }

    render (){

        return (

            <div style={{margin: 10}}>
            {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.AddOption}>
                    <input type='text' name='option'/>
                    <button style={{margin: 10}}>Add Option</button>
                </form>
            </div>
        );
    }
}
//===========================================================================================================


export default IndecisionApp;

