import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import './Card.css';
// import { slide as Menu } from 'react-burger-menu';
import {courses} from './courses';
import tachyons from 'tachyons';
// import TickTock from './Components/TickTock/TickTock';
import Tracker from './Components/Tracker/Tracker';
import EnrolledCourses from './Components/EnrolledCourses/EnrolledCourses';
import Notes from './Components/Notes/Notes';
import CheckboxTrees from './Components/CheckboxTrees/CheckboxTrees';

class App extends Component {

constructor() {
    super();
      this.state = {
      isFlipped: false,      
      role:'faculty',
      route:"home",
      expanded:false,
      selected:"home"
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
  }

   showSettings (event) {
    event.preventDefault();
  }


  change=(ex,i)=>{
    if(i==1)
    this.setState({expanded:ex})
    else
      this.setState({selected:ex})
  }

  render(){
    const {expanded}=this.state
  return (   <div className="App outer-container">
              <Tracker change={this.change}/>
              {this.state.selected=="home"?
              
  (           <div>
                <main id={"page-wrapper"} style={{marginLeft: expanded ? 240 : 64}}>
                  <EnrolledCourses/>
                </main>
               </div> 
) 
              :this.state.selected=="timetable"?
              (
               <div>
                <main id={"page-wrapper"} style={{marginLeft: expanded ? 240 : 64}}>
                <CheckboxTrees />
                </main>
               </div> 

              )
              :this.state.selected=="notes"?
                <Notes/>
              :
                <p>HI  </p>  

            }
             </div>
             
  );
}
}
// <TickTock />
export default App;
