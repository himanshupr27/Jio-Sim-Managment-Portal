import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from "../layouts/Loader"
import { ImCross } from "react-icons/im";

const EkycList = ({ contentType }) => {
    const [ekycdata, setEkycData] = useState();
    const [isloading, setIsloading] = useState(true);
    const [ViewBlock, setViewBlock] = useState(false);
    const [profileData, setProfielData] = useState({});
    const [ekycProfile, setEkycProfile] = useState({});
    const [Image, setImage] = useState({});
    useEffect(() => {
        const getorders = async () => {
            try {
                setIsloading(true);
                let response = null;
                if (contentType === 11) {
                    response = await axios.get("http://localhost:2705/api/kyc_record/get_by_status?status=APROVAL PENDING");
                } else if (contentType === 12) {
                    response = await axios.get("http://localhost:2705/api/kyc_record/get_by_status?status=EKYC PENDING");
                }
                else if (contentType === 13) {
                    response = await axios.get("http://localhost:2705/api/kyc_record/get_all");
                }
                else if (contentType === 14) {
                    response = await axios.get("http://localhost:2705/api/kyc_record/get_by_status?status=APROVED");
                }
                if (response) {
                    setEkycData(response.data);
                }
                const timer = setTimeout(() => {
                    setIsloading(false);
                }, 500);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getorders();

    }, [contentType,ViewBlock]);

    const handelVerify = async (data) => {
        setEkycProfile(data);
        try {
            const response = await axios.get(`http://localhost:2705/api/user/profile/get/${data.profile_id}`);
            setProfielData(response.data);
            setEkycProfile(data);
            console.log(response.data);
            // try {
            //     const imageResponse = await axios.get(`http://localhost:2705/api/kyc_record/get_files?fileName=${data.video}`, {
            //         responseType: 'blob'
            //     });
            //     console.log(imageResponse);
            //     const blob = await imageResponse.data;
            //     const imageUrl = URL.createObjectURL(blob);
            //     setImage(imageUrl);
            // } catch (error) {
            //     console.error('Error fetching image:', error);
            //     setImage(null);
            // }
            setImage({"profilepic":await getResources(data.profilepic),
                "panpic":await  getResources(data.panpic),
                "addresspic":await  getResources(data.addressproofpic),
                "video":await  getResources(data.video)
            })
            console.log(Image);
            setViewBlock(true);
        } catch (error) {
            console.log(error);
        }

    };

    const getResources=async(data)=>{
        try {
            const imageResponse = await axios.get(`http://localhost:2705/api/kyc_record/get_files?fileName=${data}`, {
                responseType: 'blob'
            });
            console.log(imageResponse);
            const blob = await imageResponse.data;
            const imageUrl = URL.createObjectURL(blob);
            return imageUrl;
        } catch (error) {
            console.error('Error fetching image:', error);
        }

    }
    const handelStatus=async(type,id)=>{
        console.log(id);
        try {
            const status = type === 1 ? "APROVED" : "REJECTED";
            const response = await axios.put(`http://localhost:2705/api/kyc_record/update/${id}`, {
                kycstatus: status,
            });
            console.log(profileData.id);
            const emailresponse = await axios.post(`http://localhost:2705/email/kYC_verifyied/${profileData.id}`);
            console.log('Response:', response.data);
            console.log('Email response:', emailresponse.data);
        } catch (error) {
            console.error('Error updating KYC status:', error);
        }
        setViewBlock(false);

    }
    console.log(ekycdata);
    return (
        <>
            {isloading ? <Loader /> :
                <div className="show-all-sims">
                    <h1>Total Number Of eKYC's : </h1>
                    <hr></hr>
                    <h4>List Of All eKYC's : -</h4>
                    <table>
                        <tr>
                            <th>Id</th>
                            <th>eKYC status</th>
                            <th>Profile Id</th>
                            <th>Verify/Veiw</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                        {ekycdata && ekycdata.map((data) => (
                            <tr key={data.id}>
                                <td>{data.id}</td>
                                <td>{data.kycstatus}</td>
                                <td>{data.profile_id}</td>
                                <td>{data.kycstatus === "APROVAL PENDING" ? <button type='button' onClick={() => { handelVerify(data) }} className='edit'>Verify</button> : <button type='button' className='edit'>Veiw</button>}</td>
                                <td><button type='button' className='edit'>Edit</button></td>
                                <td><button type='button' className='delete'>Delete</button></td>
                            </tr>
                        ))}
                    </table>
                    <div>Pagination</div>
                    {ViewBlock && <div className="edit-box">
                        <div className="view-container">
                            <h5>Profile Details</h5>
                            <ImCross onClick={() => { setViewBlock(false) }} />
                            <table>
                                <tr>
                                    <th>Field</th>
                                    <th>Value</th>
                                </tr>
                                <tr>
                                    <td>Full Name</td>
                                    <td>{profileData.fullName}</td>
                                </tr>
                                <tr>
                                    <td>Date Of Birth</td>
                                    <td>{profileData.dob}</td>
                                </tr>
                                <tr>
                                    <td>Gender</td>
                                    <td>{profileData.gender}</td>
                                </tr>
                                <tr>
                                    <td>Phone Number</td>
                                    <td>{profileData.phoneNumber}</td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td>
                                        {profileData.address.street},
                                        {profileData.address.city},
                                        {profileData.address.state},
                                        {profileData.address.country},
                                        {profileData.address.postalCode}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Aadhar Number</td>
                                    <td>{ekycProfile.aadhar}</td>
                                </tr>
                                <tr>
                                    <td>Pan Number</td>
                                    <td>{ekycProfile.pan}</td>
                                </tr>
                                <tr>
                                    <td>Profile pic</td>
                                    <td>
                                        {/* {ekycProfile.profilepic} */}
                                        <img src={Image.profilepic} style={{ height: "150px", width: "150px" }} />
                                    </td> </tr>
                                <tr>
                                    <td>PAN pic</td>
                                    <td>
                                        {/* {ekycProfile.panpic} */}
                                        <img src={Image.panpic} style={{ height: "150px", width: "250px" }} />

                                    </td>
                                </tr>
                                <tr>
                                    <td>Address Proof pic</td>
                                    <td>
                                        {/* {ekycProfile.addressproofpic} */}
                                        <img src={Image.addresspic} style={{ height: "150px", width: "250px" }} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>ekyc Video</td>
                                    <td>
                                        {/* {ekycProfile.video} */}
                                        <video src={Image.video} controls
                                            style={{ width: "100%" }} />
                                    </td> </tr>
                            </table>
                            <div className="btn-box">
                                <button className='submit-btn'onClick={()=>{handelStatus(1,ekycProfile.id)}}>ACCEPT</button>
                                <button className='cancle-btn'onClick={()=>{handelStatus(2,ekycProfile.id)}}>REJECT</button>
                            </div>
                        </div>
                    </div>}

                </div>
            }
        </>
    )
}

export default EkycList
