import React from 'react';
import Auth from '@aws-amplify/auth';

class changer extends React.Component {

componentDidMount()
{
    
    if(this.props.authProps.role=="Admin")
        this.props.history.push("/admin")

}
    render() {
        const btnstyle = {
            backgroundColor: '#0e8675',
            color: 'white',
            width: '150px'
        };
        return (
            <div className="container" style={{"position":"relative","top":"50px",marginLeft: this.props.expanded ? 180 : 64}}>
                <h1><center>Uploading Student gradesheet</center></h1>
                <form action=" https://ays0znz8z3.execute-api.us-east-1.amazonaws.com/navya/navya" method="get" encType="multipart/form-data">
                    <div className="Semester">
                     <label for="Semester" className="Semester">Semester:</label>
                         <div className="Semesters">
                             <select>
                                 <option value="01">1</option>
                                 <option value="02">2</option>
                                 <option value="03">3</option>
                                 <option value="04">4</option>
                                 <option value="05">5</option>
                                 <option value="06">6</option>
                                 <option value="07">7</option>
                                 <option value="08">8</option>
                            </select> 
                        </div>
                    </div>
            <a href="C:\Users\hp\Desktop\gradesheet" target="_blank">Document of grades</a><br/>
            <h3>Comments</h3>
            <input type="text" value="u" name="type" hidden></input>
            <input type="text" name="usrname" placeholder="Enter Comments"></input>
             <br />
            <center><button type="submit" class="btn" style={btnstyle}>Submit</button></center>
            </form>
            </div>


        );
    }
}
export default changer;