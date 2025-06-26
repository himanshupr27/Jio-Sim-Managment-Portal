import React, { useEffect, useState } from 'react'
import "../../css/Orders.css";
import { RxCrossCircled } from "react-icons/rx";
import { Country, State, City } from 'country-state-city';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
import { useNavigate } from 'react-router-dom';

const OrderDetails = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        id: '',
        aadharNumber: '',
        phoneNumber: ''
    })
    const [errors, setErrors] = useState({})
    const [profiledetails, setProfiledetails] = useState({
        emailId: '',
        firstName: '',
        lastName: '',
        gender: '',
        dob: '',
        address: {
            street: '',
            country: '',
            state: '',
            city: '',
            postalCode: ''
        },

    });
    const [orderDetails, setOrderDetails] = useState({
        deliveryAddress: {
            street: '',
            country: '',
            state: '',
            city: '',
            postalCode: ''
        },
        amount: 2775,
        razorpayId: ''
    });

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [diffaddress, setDiffaddress] = useState(false);
    const [phoneLabel, setPhoneLabel] = useState(false);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('pki-users')));
    }, [])

    useEffect(() => {
        setCountries(Country.getAllCountries());
    }, [])

    useEffect(() => {
        if (profiledetails.address.country) {
            const selectedCountry = countries.find(country => country.name === profiledetails.address.country);
            if (selectedCountry) {
                setStates(State.getStatesOfCountry(selectedCountry.isoCode));
            }
        } else {
            setStates([]);
        }
    }, [profiledetails.address.country, countries]);

    useEffect(() => {
        if (profiledetails.address.state) {
            const selectedCountry = countries.find(country => country.name === profiledetails.address.country);
            const selectedState = states.find(state => state.name === profiledetails.address.state);
            if (selectedCountry && selectedState) {
                setCities(City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode));
            }
        } else {
            setCities([]);
        }
    }, [profiledetails.address.state, countries, states]);

    useEffect(() => {
        if (orderDetails.deliveryAddress.country) {
            const selectedCountry = countries.find(country => country.name === orderDetails.deliveryAddress.country);
            if (selectedCountry) {
                setStates(State.getStatesOfCountry(selectedCountry.isoCode));
            }
        } else {
            setStates([]);
        }
    }, [orderDetails.deliveryAddress.country, countries]);

    useEffect(() => {
        if (orderDetails.deliveryAddress.state) {
            const selectedCountry = countries.find(country => country.name === orderDetails.deliveryAddress.country);
            const selectedState = states.find(state => state.name === orderDetails.deliveryAddress.state);
            if (selectedCountry && selectedState) {
                setCities(City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode));
            }
        } else {
            setCities([]);
        }
    }, [orderDetails.deliveryAddress.state, countries, states]);

    const handleInput = (e) => {
        const { name, value } = e.target;

        setProfiledetails((prevDetails) => {
            if (name in prevDetails.address) {
                return {
                    ...prevDetails,
                    address: {
                        ...prevDetails.address,
                        [name]: value,
                    },
                };
            }
            return {
                ...prevDetails,
                [name]: value,
            };
        });

        if (value.trim() === "") {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: true,
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: false,
            }));
        }
    };

    const handleInput2 = (e) => {
        const { name, value } = e.target;

        // Update only the delivery address in orderDetails
        setOrderDetails((prevDetails) => ({
            ...prevDetails,
            deliveryAddress: {
                ...prevDetails.deliveryAddress,
                [name]: value,
            },
        }));

        // Handle errors dynamically for delivery address
        if (value.trim() === "") {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [`delivery${name.charAt(0).toUpperCase() + name.slice(1)}`]: true,
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [`delivery${name.charAt(0).toUpperCase() + name.slice(1)}`]: false,
            }));
        }
    };

    const handleRadioChange = (e) => {
        if (e.target.value === "same-add") {
            setDiffaddress(false);
            setOrderDetails((prevDetails) => ({
                ...prevDetails,
                deliveryAddress: {
                    ...profiledetails.address,
                },
            }));
        } else {
            setDiffaddress(true);

            setOrderDetails((prevDetails) => ({
                ...prevDetails,
                deliveryAddress: {
                    street: "",
                    country: "",
                    state: "",
                    city: "",
                    postalCode: "",
                },
            }));
        }
    };

    const handelsubmit = async (e) => {
        e.preventDefault();
        const amount = 2775;
        try {

            const response = await axios.post(
                'http://localhost:2705/api/order/create_order',
                { amount: orderDetails.amount },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            // Handle success
            console.log(response.data);
            if (response.data.status === "created") {
                console.log("next");
                let options = {
                    "key": "rzp_test_VtabkGRGa9SEhd",
                    "amount": "277500",
                    "currency": "INR",
                    "name": "JIO PKI SIM",
                    "description": "Test Transaction",
                    "image": "https://example.com/your_logo",
                    "order_id": response.data.id,
                    "handler": async function (response) {
                        console.log(response);
                        console.log(response.razorpay_payment_id);
                        console.log(response.razorpay_order_id);
                        console.log(response.razorpay_signature);

                        const payment = {
                            payment_id: response.razorpay_payment_id, order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature
                        };

                        localStorage.setItem("payment", JSON.stringify(payment));

                        const response_profile = await axios.post(`http://localhost:2705/api/user/profile/user/${user.id}/create`, profiledetails)

                        console.log(response_profile);
                        localStorage.setItem("profile", JSON.stringify(response_profile.data.data));

                        orderDetails.razorpayId = response.razorpay_order_id;
                        const response_order = await axios.post(`http://localhost:2705/api/order/create_order/profile/${response_profile.data.data.id}`, orderDetails);

                        console.log(response_order);
                        localStorage.setItem("orders", JSON.stringify(response_order.data.data));

                        const sendEmail_response=await axios.post(`http://localhost:2705/email/sim_order_placed/${response_profile.data.data.id}`)
                        console.log(sendEmail_response);

                        navigate('/payment_sucessfull');
                    },
                    "prefill": {
                        "name": profiledetails.firstName + ' ' + profiledetails.lastName,
                        "email": profiledetails.emailid,
                        "contact": user.phoneNumber
                    },
                    "notes": {
                        "address": "JIO"
                    },
                    "theme": {
                        "color": "#3399cc"
                    }
                };
                const rzp1 = new Razorpay(options);
                rzp1.open();
                rzp1.on('payment.failed', function (response) {
                    console.log(response.error.code);
                    console.log(response.error.description);
                    console.log(response.error.source);
                    console.log(response.error.step);
                    console.log(response.error.reason);
                    console.log(response.error.metadata.order_id);
                    console.log(response.error.metadata.payment_id);
                    alert("oops payment failed");
                });

            }
        } catch (error) {
            // Handle error
            console.error("Error creating order:", error);
        }
        console.log(profiledetails);
        console.log(orderDetails);

    };

    return (
        <div className='order-details'>

            <div className="left-order-part">

                <h3 className='name-heading'>Welcome</h3>
                <p>You are one step away from completing the purchase.</p>
                <p className='order-note'><strong>Note:</strong> Please enter your billing inforamtion below to complete your digital signature SIM (PKI-SIM) purchase. Once you complete your purchase, you will be able to enter DSC application inforamtion which can be different than the billing information.</p>
                <p className='mobile-number'>Mobile Number : <strong>+{user.phoneNumber}</strong></p>

                <form className='order-form' onSubmit={handelsubmit}>
                    <div className='input-container'>
                        <div className={`input-box ${errors.firstName ? 'errors-bar' : ''}`}>
                            <input id="firstName" type="text" name="firstName" required="required" value={profiledetails.firstName} onChange={handleInput} />
                            <label htmlFor="firstName">First Name *</label>
                        </div>
                        {errors.firstName && <span className="error-message"><RxCrossCircled />Enter Your First Name</span>}
                    </div>
                    <div className='input-container'>
                        <div className={`input-box ${errors.lastName ? 'errors-bar' : ''}`}>
                            <input id="lastName" type="text" name="lastName" required="required" value={profiledetails.lastName} onChange={handleInput} />
                            <label htmlFor="lastName">Last Name *</label>
                        </div>
                        {errors.lastName && <span className="error-message"><RxCrossCircled />Enter Your Last Name</span>}
                    </div>
                    <div className='input-container'>
                        <div className={`input-box ${errors.emailId ? 'errors-bar' : ''}`}>
                            <input id="emailId" type="email" name="emailId" required="required" value={profiledetails.emailId} onChange={handleInput} />
                            <label htmlFor="street">Email ID *</label>
                        </div>
                        {errors.emailId && <span className="error-message"><RxCrossCircled />Enter Email ID</span>}
                    </div>
                    <div className='input-container'>
                        <div className={`input-box ${errors.gender ? 'errors-bar' : ''}`}>
                            <select id="gender" name="gender" required="required" value={profiledetails.gender} onChange={handleInput}>
                                <option></option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>TranGender</option>
                                <option>Others</option>
                            </select>
                            <label htmlFor="gender">Select Your Gender *</label>
                        </div>
                        {errors.gender && <span className="error-message"><RxCrossCircled />Select Gender</span>}
                    </div>
                    <div className='input-container'>
                        <div className={`input-box ${errors.dob ? 'errors-bar' : ''}`}>
                            <input id="dob" type="date" name="dob" required="required" value={profiledetails.dob} onChange={handleInput} />
                            <label htmlFor="gender">Select Date Of Birth</label>
                        </div>
                        {errors.dob && <span className="error-message"><RxCrossCircled />Select Your Date Of Birth</span>}
                    </div>

                    <div className='input-container'>
                        <div className={`input-box ${errors.street ? 'errors-bar' : ''}`}>
                            <input id="street" type="text" name="street" required="required" value={profiledetails.address.street} onChange={handleInput} />
                            <label htmlFor="street">Address*</label>
                        </div>
                        {errors.street && <span className="error-message"><RxCrossCircled />Enter street</span>}
                    </div>
                    {/*Country Dropdown*/}
                    <div className='input-container'>
                        <div className={`input-box ${errors.country ? 'errors-bar' : ''}`}>
                            <select id="country" name="country" value={profiledetails.address.country} onChange={handleInput}>
                                <option value="">Select Country</option>
                                {countries && countries.map(country => (
                                    <option key={country.isoCode} value={country.name}>{country.name}</option>
                                ))}
                            </select>
                        </div>
                        {errors.country && <span className="error-message"><RxCrossCircled />Enter Country</span>}
                    </div>
                    {/* State Dropdown */}
                    <div className='input-container'>
                        <div className={`input-box ${errors.state ? 'errors-bar' : ''}`}>
                            <select name="state" value={profiledetails.address.state} onChange={handleInput} disabled={!profiledetails.address.country}>
                                <option value="">Select State</option>
                                {states.map(state => (
                                    <option key={state.isoCode} value={state.name}>{state.name}</option>
                                ))}
                            </select>
                        </div>
                        {errors.state && <span className="error-message"><RxCrossCircled />Enter state</span>}
                    </div>
                    {/* District Dropdown */}
                    <div className='input-container'>
                        <div className={`input-box ${errors.city ? 'errors-bar' : ''}`}>
                            <select name="city" value={profiledetails.address.city} onChange={handleInput} disabled={!profiledetails.address.state}>
                                <option value="">Select City</option>
                                {cities.map(city => (
                                    <option key={city.isoCode} value={city.name}>{city.name}</option>
                                ))}
                            </select>
                        </div>
                        {errors.city && <span className="error-message"><RxCrossCircled />Enter City</span>}
                    </div>
                    <div className='input-container'>
                        <div className={`input-box ${errors.postalcode ? 'errors-bar' : ''}`}>
                            <input id="pincode" type="number" name="postalCode" required="required" value={profiledetails.address.postalCode} onChange={handleInput} />
                            <label htmlFor="pincode">Pincode</label>
                        </div>
                        {errors.postalcode && <span className="error-message"><RxCrossCircled />Enter Pincode</span>}
                    </div>

                    <strong><p className='dlv-heading'>Dilevery address of the PKI-SIM</p></strong>

                    <div className="dilevery-add">
                        <p>Do you want us to send PKI-SIM to :</p>
                        <input type="radio" id="same-add" name="dilever-add" value="same-add" onChange={handleRadioChange} />
                        <label htmlFor="same-add">Above address</label>
                        <input type="radio" id="different-add" name="dilever-add" value="different-add" onChange={handleRadioChange} />
                        <label htmlFor="different-add">Different address</label>
                    </div>
                    {diffaddress && (<>
                        {/* Street Input */}
                        <div className='input-container'>
                            <div className={`input-box ${errors.deliveryStreet ? 'errors-bar' : ''}`}>
                                <input
                                    id="dlyaddress"
                                    type="text"
                                    name="street"
                                    required="required"
                                    value={orderDetails.deliveryAddress.street}
                                    onChange={(e) => handleInput2(e)}
                                />
                                <label htmlFor="dlyaddress">Street*</label>
                            </div>
                            {errors.deliveryStreet && (
                                <span className="error-message"><RxCrossCircled />Enter Delivery Street</span>
                            )}
                        </div>

                        {/* Country Dropdown */}
                        <div className='input-container'>
                            <div className={`input-box ${errors.deliveryCountry ? 'errors-bar' : ''}`}>
                                <select
                                    id="dlycountry"
                                    name="country"
                                    value={orderDetails.deliveryAddress.country}
                                    onChange={(e) => handleInput2(e)}
                                >
                                    <option value="">Select Country</option>
                                    {countries && countries.map((country) => (
                                        <option key={country.isoCode} value={country.name}>
                                            {country.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {errors.deliveryCountry && (
                                <span className="error-message"><RxCrossCircled />Enter Country</span>
                            )}
                        </div>

                        {/* State Dropdown */}
                        <div className='input-container'>
                            <div className={`input-box ${errors.deliveryState ? 'errors-bar' : ''}`}>
                                <select
                                    name="state"
                                    value={orderDetails.deliveryAddress.state}
                                    onChange={(e) => handleInput2(e)}
                                    disabled={!orderDetails.deliveryAddress.country}
                                >
                                    <option value="">Select State</option>
                                    {states.map((state) => (
                                        <option key={state.isoCode} value={state.name}>
                                            {state.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {errors.deliveryState && (
                                <span className="error-message"><RxCrossCircled />Enter State</span>
                            )}
                        </div>

                        {/* City Dropdown */}
                        <div className='input-container'>
                            <div className={`input-box ${errors.deliveryCity ? 'errors-bar' : ''}`}>
                                <select
                                    name="city"
                                    value={orderDetails.deliveryAddress.city}
                                    onChange={(e) => handleInput2(e)}
                                    disabled={!orderDetails.deliveryAddress.state}
                                >
                                    <option value="">Select City</option>
                                    {cities.map((city) => (
                                        <option key={city.isoCode} value={city.name}>
                                            {city.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {errors.deliveryCity && (
                                <span className="error-message"><RxCrossCircled />Enter City</span>
                            )}
                        </div>

                        {/* Pincode Input */}
                        <div className='input-container'>
                            <div className={`input-box ${errors.deliveryPostalCode ? 'errors-bar' : ''}`}>
                                <input
                                    id="dlypincode"
                                    type="number"
                                    name="postalCode"
                                    required="required"
                                    value={orderDetails.deliveryAddress.postalCode}
                                    onChange={(e) => handleInput2(e)}
                                />
                                <label htmlFor="dlypincode">Pincode</label>
                            </div>
                            {errors.deliveryPostalCode && (
                                <span className="error-message"><RxCrossCircled />Enter Pincode</span>
                            )}
                        </div>
                    </>
                    )}


                    <p className='recaptcha'>Protected by reCAPTCHA and the Google <a href="">Privacy Policy</a> and <a href="">Terms of service</a> apply.</p>

                    <div className="captcha-box"></div>

                    <div className="order-submit-button-div">
                        <button type='submit' className='order-submit-button' onClick={handelsubmit}>Proceed</button>
                    </div>
                </form>
            </div>

            <div className="right-order-part">
                <div className="order-part-box">

                    <h4 className='product-summary-heading'>Product Summary</h4>

                    <ul>
                        <li>Class Type <span className='text-bold'>Class 2</span></li>
                        <li>User Type <span className='text-bold'>Individal</span></li>
                        <li>SIM Type <span className='text-bold'>PKI-SIM</span></li>
                        <li>Validity <span className='text-bold'>2 Years</span></li>
                    </ul>
                    <hr />
                    <din className="coupon-box">
                        <p>Have a coupon code?<span>Apply Coupon</span></p>
                        <p className='apply-coupon'>Apply coupon code EM10 to get 10%</p>
                    </din>
                    <hr />
                    <div className='price-details'>
                        <ul>
                            <li className='text-bold'>Price Details</li>
                            <li>SIM Cost<span>₹ 3500</span></li>
                            <li>Discount<span style={{ color: 'green' }}>-₹ 175</span></li>
                            <li>Digital Signature Cost<span>₹ 410</span></li>
                            <li className='text-bold'>Total Amount*<span className='text-bold'>₹ 3735</span></li>
                        </ul>
                    </div>
                    <div className='free-items'>
                        <ul>
                            <li className='text-bold' style={{ color: 'rgb(227, 159, 33)' }}>Free Items Added to Cart</li>
                            <li>Free AADHAAR eSign for 1 year<span>₹ 3500</span></li>
                            <li>Free eCmmerce Voucher<span>₹ 500</span></li>
                            <li>Free Digital Signature Replacment<span>₹ 1500</span></li>
                            <li>Product Discount<span>₹ 175</span></li>
                            <li className='text-bold' style={{ color: 'rgb(227, 159, 33)' }}>Total Free Item Added<span className='text-bold'>₹ 2775</span></li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default OrderDetails
