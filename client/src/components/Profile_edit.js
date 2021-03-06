import React, {useState,useEffect} from 'react';
import './style.css'
import {Link} from 'react-router-dom';
import Navbar from './Navbar.js'
import axios from 'axios';


function Profile_edit() {

    const [email,setEmail] = useState(null);
    const [name,setName] = useState(null);
    const [mobile_no,setMobile] = useState(null);
    const [username,setUsername] = useState(null);
    const [selectedFile,setselectedFile] = useState(null);
    const [isSelected, setIsSelected] = useState(false);
    const [uploadedFile, setuploadedFile] = useState(null);

	const changeHandler = (event) => {
		setselectedFile(event.target.files[0]);
		setIsSelected(true);
	};

    const handleSubmission = async () => {
		const formData = new FormData();
		formData.append('File', selectedFile);
        const localstorage_user = JSON.parse(localStorage.getItem('user'));
        try{
            const res = await axios.post('http://localhost:3000/profile_user/image/' + localstorage_user._id,formData,{

                headers : {
                    'Content-Type': 'multipart/form-data',
                }
            });
            const {fileName,filePath} = res.data;
            setuploadedFile({fileName,filePath});
            alert("Profile image Uploaded Successfully");
            

        }
        catch(e)
        {
            console.log(e);
        }
       
	};

    const handleInputChange = (e) => {
        const {id , value} = e.target;

        if(id === "email"){
            setEmail(value);
        }
        if(id === "name"){
            setName(value);
        }
        if(id === "username"){
            setUsername(value);
        }
        if(id === "mobile_no"){
            setMobile(value);
        }

    }






 
    const handleSubmit  = (e) => {

        e.preventDefault();
        const localstorage_user = JSON.parse(localStorage.getItem('user'))
        const formData = new FormData();
        formData.append(
            "myFile",
            selectedFile,
            selectedFile.name
        )

        
        fetch('http://localhost:3000/profile_user/' + localstorage_user._id, {
            method: "PUT",
            headers : { 
              'Content-Type': 'application/json',
               'Accept': 'application/json',
               'x-auth-token': localstorage_user.token
            },
            body: JSON.stringify( {  // you will get user information from login form
  
              "username":username,
              "name" : name,
              "mobile_no" : mobile_no,
              "email" : email,
              formData
                  
            } )
          })
          .then(res => res.json())
          .then(
              (data) => {

                alert("Edited Successfully");
                window.location.href = '/profile';


              },
              (error) => {
                console.log(error);
              }
          )

       
    }

    useEffect(() => {
        try{
        const localstorage_user = JSON.parse(localStorage.getItem('user'))
        fetch("http://localhost:3000/profile_user/"+localstorage_user._id, {
          method: 'get',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'x-auth-token': localstorage_user.token
              
          }
    
      })
            .then(res => res.json())
            .then(
                (data) => {
                    //console.log(data);
                    setMobile(data[0].mobile_no);
                    setUsername(data[0].username);
                    setName(data[0].name);
                },

            )
            
          }
            catch(e)
            {
                console.log("Invalid User Token")
            }
            
      }, [])
  
    return(
        <div>
        <Navbar />
        <div className="form">
            <div className="form-body">
            

                <div className="name">
                    <label className="form__label" for="name">Name </label>
                    <input  type="name" id="name" className="form__input" value={name} onChange = {(e) => handleInputChange(e)} />
                </div>

                <div className="username">
                    <label className="form__label" for="username">User Name </label>
                    <input  type="username" id="username" className="form__input" value={username} onChange = {(e) => handleInputChange(e)} />
                </div>

                <div className="mobile_no">
                    <label className="form__label" for="mobile_no">Mobile No. </label>
                    <input  type="mobile_no" id="mobile_no" className="form__input" value={mobile_no} onChange = {(e) => handleInputChange(e)} />
                </div>


                <div className="file">
                    <label className="form__label" for="file">Upload Image</label>
                    <input  type="file" id="file" name='file' className="form__input" onChange={changeHandler} 
                        style={{display:"inline"}} />
                </div>

                <button onClick={handleSubmission} style={{display:"inline"}}>Upload</button>


            </div>
            <div className="footer">
            <Link to = "/profile"><a href="#"></a><button type="submit" class="btn">Back</button></Link> &nbsp;&nbsp;
            <button onClick={(e)=>handleSubmit(e)} type="submit" class="btn">Edit </button>
            </div>
        </div>
        </div>
       
    )       
}

export default Profile_edit;

