import axios from "axios";
import { useEffect, useState } from "react";
import { managers } from "./type";
import PopupModal from "./PopupModel";

const Manager = () => {
  const username = localStorage.getItem("username");

  async function GetManagerTable() {
    try {
      const response = await axios.post("http://localhost:8000/manager/employees",{ username: username });
      setManagerData(response.data);
    }                                                             
    catch (e) {
      console.log("Error");
    }
  }
  
 
  function handleClick(event : any)
  {
    Setshow(!show)
    if(show !== true)
    {   
    const id  = event.target.id;
    setID(id);
  }
  }

  useEffect(() => {
    GetManagerTable();
  });

  const [ManagerData, setManagerData] = useState([]);
  const [show,Setshow] = useState(false);
  const [Id,setID]=useState(0);

  return (
    
    <table className="table">
      <thead>
        <tr>
          <th>EmployeeID</th>
          <th>Name</th>
          <th>Skills</th>
          <th>Profile</th>
          <th>Experience</th> 
          <th>Manager</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {ManagerData.map((x: managers) => {
          let string=(x.EmployeeID).toString();
          return (           
            
              <tr key={x.EmployeeID}>                
                <td>{x.EmployeeID}</td>
                <td>{x.Name}</td>
                <td>{x.Skills}</td>
                <td>{x.Profile}</td>
                <td>{x.Experience}</td>
                <td>{x.Manager}</td>
                <td>
                  <button id={string} className="btn btn-primary"  onClick={handleClick}>{x.Status}</button>
                  <PopupModal show={show} toggle={handleClick} id={Id}> </PopupModal>
                </td>
              </tr>            
          );
        })}
      </tbody>
    </table>
  );
};

export default Manager;