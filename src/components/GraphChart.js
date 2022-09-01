import react from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState,useEffect} from 'react';
import axios from 'axios';
import {Bar} from 'react-chartjs-2';
 
function GraphChart()
{
  const[graph,setGraph]=useState([]);
   
  const[getdata,setGetData]=useState([]);
 
 
  const collegeDetail = async () => {
    axios.get("http://localhost:4000/college")
    
     .then(response => {
        setGetData(response.data);
     });
     
   }
   useEffect(() => {
    collegeDetail();
  }, []);
 
  
  const selectChart = (e) =>
  {   
    axios.get(`http://localhost:4000/college`)
     .then(res => {
      const collegeData = res.data;
      let collegeName = [];
      let stateName = [];
      collegeData.forEach(element => {
        collegeName.push(element.name);
        stateName.push(element.state);
       });
        setGraph({
            labels: collegeName,
            datasets: [
              {
                label: 'States',
                backgroundColor:[
                    'green',
                    'red',
                    'blue',
                    '#FFBF00',
                    '#DE3163',
                    'orange',
                    '#40E0D0',
                    '#6495ED',
                    '#CCCCFF',
                    '#FFBF00',
                    '#DE3163',
                    '#9FE2BF',
                    '#CD5C5C'
                 ],
                borderWidth:0,
                data: stateName
              }
             ]
        });
      });
      
  }
  useEffect(() => {
    selectChart();
  }, []);
   
  return(
     <div className="container">
        <h4 className="text-center text-primary mt-2 mb-3">Graph Chart in ReactJS</h4> 
        <h6 className="text-center text-success mt-2 mb-3">CCollege by state</h6> 
        <div className="row mt-3">
           <div className="col-sm-3">
            
              <div className=""> 
               <table className=" table-bordered graphTable">
                
                <tr>
                    <th>College</th>
                    <th>State</th>
                </tr> 
                  { getdata.map((name)=>
                    <tr>
                      <td>{name.name}</td>
                      <td>${name.state}</td>
                    </tr>                  
                 )}   
               </table>     
             </div>
           </div>     
           <div className="col-sm-9">
           <Bar
             data={graph}
                options={{
                    title:{
                      display:true,
                      text:'State',
                      fontSize:20
                    },
                    legend:{
                      display:true,
                      position:'right'
                    }
                }}
                />
            </div>
             
        </div>     
     </div>    
    )
}
export default GraphChart;