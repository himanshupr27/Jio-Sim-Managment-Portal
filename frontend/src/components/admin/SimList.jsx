import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from "../layouts/Loader"
import { ImCross, ImCheckmark } from "react-icons/im";


const SimList = ({ contentType }) => {
    const [simdata, setSimData] = useState();
    const [isloading ,setIsloading] = useState(true);
    useEffect(() => {
        const getsims = async () => {
            try {
                setIsloading(true);
                let response = null;
                if (contentType === 2) {
                    response = await axios.get("http://localhost:2705/api/sims/get/availablity/1");
                } else if (contentType === 3) {
                    response = await axios.get("http://localhost:2705/api/sims/get/active");
                } else if (contentType === 4) {
                    response = await axios.get("http://localhost:2705/api/sims/get/inactive");
                } else if (contentType === 5) {
                    response = await axios.get("http://localhost:2705/api/sims/get/all");
                }
                if (response) {
                    setSimData(response.data);
                }
                const timer = setTimeout(() => {
                    setIsloading(false);
                  }, 500);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getsims();

    }, [contentType]);
    console.log(simdata);

    return (
        <>
    {isloading ?<Loader/> :
        <div className="show-all-sims">
            <h1>Total Number Of SIM's : </h1>
            <hr></hr>
            <h4>List Of All SIM's : -</h4>
            <table>
                <tr>
                    <th>Id</th>
                    <th>Authority Name</th>
                    <th>Contact Number</th>
                    <th>CIID</th>
                    <th>IMSI</th>
                    <th>Issued Date</th>
                    <th>Status</th>
                    <th>Available</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                {simdata && simdata.map((data) => (
                    <tr key={data.sim_id}>
                        <td>{data.sim_id}</td>
                        <td>{data.profileName ? data.profileName: '-'}</td>
                        <td>{data.simNumber}</td>
                        <td>{data.ciid}</td>
                        <td>{data.imsi}</td>
                        <td>{data.issueDate ? new Date(data.issueDate).toISOString().split('T')[0] : '-'}</td>
                        <td>{data.status ? data.status: '-'}</td>
                        <td>{data.available ? <ImCheckmark style={{ color: 'green' }} /> : <ImCross style={{ color: 'red' }} />}</td>
                        <td><button type='button' className='edit'>Edit</button></td>
                        <td><button type='button' className='delete'>Delete</button></td>
                    </tr>
                ))}
            </table>
            <div>Pagination</div>
        </div>
        }
        </>
    )
}

export default SimList
