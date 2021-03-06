import React,{Component} from 'react';
import tachyons from 'tachyons';
import { Button, ButtonGroup } from '@trendmicro/react-buttons';
import './AdminLog.css';

class AdminLog extends Component {

constructor() {
    super();
      this.state = {
    };
  }


render(){
  return (   <div className="sm" style={{marginTop:"50px"}}>

          <div className="sandbox sandbox-correct-pronounciation" style={{marginTop:"-80px"}}>
              <h6 className="heading heading-correct-pronounciation">
                  <var>Admin Page</var>
              </h6>
          </div>

<div className="flex">
<table className="col-md-2">
  <tr>
    
    <img className="pull-right" src="https://cms.cb.amrita.edu/images/amrita_round_2019.png" style={{width:"44%", marginTop:"40px",pointerEvents: "none"}} alt="Amrita Vishwa Vidyapeetham Logo"/>
    
  </tr>
</table>

<table className="col-md-4 ma2">

  <tr>
        <Button style={{width:"160px"}} btnStyle="flat" id="register" className="ma2 pa3 link" onClick={()=>{this.props.history.push('/register')}}>
            <strong>Register a new faculty</strong>
         </Button>

        <Button style={{width:"160px"}} disabled={true} btnStyle="flat" id="cm" className="ma2 pa3 link" onClick={()=>{}}>
            <strong>Assign New Course Mentors</strong>
         </Button>

        <Button style={{width:"160px"}} disabled={true} btnStyle="flat" id="tt" className="ma2 pa3 link" onClick={()=>{}}>
            <strong>Time Table Management</strong>
         </Button>
                          
          
  </tr>

</table>
</div>
<div id="login_footer">
		Copyright © 2020 Amrita University. All rights not reserved.
		Powered by <a href="#">AmritaVidya</a>
		

		</div>

             </div>
             
         );
  }
}

export default AdminLog;
