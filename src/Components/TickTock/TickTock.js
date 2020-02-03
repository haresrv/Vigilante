import React,{Component} from 'react';
import tachyons from 'tachyons';
import './TickTock.css';
import {epics} from './epics';

class TickTock extends Component {

constructor() {
    super();
      this.state = {
       pencil:true,
       epics:epics
    };
  }

  componentDidMount()
{
  
    if(this.props.authProps.role=="Admin")
        this.props.history.push("/admin")

}

handleSubTopicChange = (event,i,index) => {
      var ep=this.state.epics
      const {name,value} = event.target;
      ep[i].subtopics[index]=value
      this.setState({epics:ep},function(){
        console.log(JSON.stringify(this.state))
      })
}


rendersubtopics = (epic,i) => {
i=i*10;
      return  epic.subtopics.map((ex, index) => {
      return (
        
                  <ul name={((i+index)/10).toFixed(1)}>
                    <li><h5 className="fa fa-star-o"> {ex}</h5></li>            
                  </ul>                
        )
     })
    }

rendereditablesubtopics = (epic,i) => {
      i=i*10;
      return  epic.subtopics.map((ex, index) => {
      return (
                  <ul name={((i+index)/10).toFixed(1)}>
                    <li><p>
                    <input className="bg-green yellow tmie tc" name={((i+index)/10).toFixed(1)} id={((i+index)/10).toFixed(1)} type="text" defaultValue={ex}  onChange={(e)=>{this.handleSubTopicChange(e,i,index)}} style={{width:"250px",height:"35px"}}/>                    
                    </p></li>            
                  </ul>                
        )
     })
    }


renderCourseTree = () => {
      return this.state.epics.map((epic, i) => {
        return (
          <div className="bg-black b-- dashed f3 gold ma2 pa3">
            <ul>
              <li className="container">
                <h3 name={i}>{epic.chapter} {epic.topics} </h3>
                <div>
            {   this.state.pencil===true ?
              (<div>
                {this.rendereditablesubtopics(epic,i)}
                
                <button className="black" value="OK" style={{width:"150px",height:"35px"}}>Commit Changes</button>
                <button className="black" value="OK" style={{width:"150px",height:"35px"}}>Cancel</button>
                  </div>  )
              :
              (<div>
                {this.rendersubtopics(epic,i)}
                    <input className="bg-green yellow tmie tc" type="text"style={{width:"250px",height:"35px"}}/>                    
                  </div>  )
            }
          </div>
              </li>

            </ul>

          </div> )
      })
} 
 
 toggle=() =>{
  this.setState(prevState => ({ pencil: !prevState.pencil }));
 }

 // blink_me
  render(){
  return (
      <div style={{ height: "700px",background:"url(https://i.imgsafe.org/e2e1557.jpg) center center fixed",backgroundSize: "cover" }}>
          <div className="loginpage pa2 ma3" >
            <div className="loginform2" >
              
              <h1 className="tc ma0 white" style={{fontSize:"5em"}}>
                <span className="bg-black">Digital C</span>
                <span className="bg-black" style={{color:"#f24330"}} >ourse File</span>
                <a className="pencil bg-black grow" href="#" onClick={this.toggle}>
                  <span className="glyphicon glyphicon-pencil green" ></span>
                </a><br/>
                <span className="bg-black"  style={{color:"#f24330"}}>Lecture P</span>
                <span className="bg-black" >lan</span>
              </h1>

           
            </div>
          </div>

          <div>
            {  this.renderCourseTree() }
          </div>

              <span >
                <h7 className="tc bg-gold ma2 pa3 topcorner" >Click the Pencil to Edit Topics.</h7>
              </span>   
        </div>
       );
}
}

export default TickTock;
