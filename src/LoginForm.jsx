
import React, { useState } from 'react';

const LoginForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [residentialStreet1, setResidentialStreet1] = useState('');
    const [residentialStreet2, setResidentialStreet2] = useState('');
    const [permanentStreet1, setPermanentStreet1] = useState('');
    const [permanentStreet2, setPermanentStreet2] = useState('');
    const [sameAsResidential, setSameAsResidential] = useState(false);
    const [documents, setDocuments] = useState([]);
    const [error, setError] = useState('');


    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform validation checks
        if (
            !firstName ||
            !lastName ||
            !email ||
            !dob ||
            !residentialStreet1 ||
            !residentialStreet2 ||
            (sameAsResidential && (!permanentStreet1 || !permanentStreet2)) ||
            documents.length < 2
        ) {
            setError('Please upload at least two documents.');
            return;
        }

        // Date of birth validation
        const today = new Date();
        const selectedDate = new Date(dob);
        const minAgeDate = new Date();
        minAgeDate.setFullYear(today.getFullYear() - 18);

        if (selectedDate > minAgeDate) {
            setError('Minimum age should be 18 years.');
            return;
        }
        setError('Form submitted successfully!');

        // alert(`
        // Name : ${firstName + " " + lastName}
        // Email : ${email}   
        // DOB :${dob}
        // Residential :${residentialStreet1 + " " + residentialStreet2}
        // Permanent address : ${permanentStreet1 + " " + permanentStreet2}
        // Total ${documents.length} Documents uploaded`)
         sendData();
          
    };

    // Handle "Same as Residential" checkbox change
    const handleSameAsResidentialChange = (e) => {
        setSameAsResidential(e.target.checked);
        if (e.target.checked) {
            setPermanentStreet1(residentialStreet1);
            setPermanentStreet2(residentialStreet2);
        } else {
            setPermanentStreet1('');
            setPermanentStreet2('');
        }
    };

    // Handle document upload
    const handleDocumentUpload = (e) => {
        const files = Array.from(e.target.files);
        const updatedDocuments = files.map((file) => ({
            name: file.name,
            type: file.type,
            file,
        }));
        setDocuments((prevDocuments) => [...prevDocuments, ...updatedDocuments]);
    };

    // Handle document deletion
    const handleDocumentDelete = (index) => {
        const updatedDocuments = [...documents];
        updatedDocuments.splice(index, 1);
        setDocuments(updatedDocuments);
    };


    const sendData = async () => {
        const url = 'https://reactjsmachinetestapi.xicom.us/v1/user/document-submit';
        const data = {
          firstName: firstName,
          lastName: lastName,
          dob: dob,
          email: email,
          residentialAddress: residentialStreet1 + residentialStreet2,
          permanentAddress: permanentStreet1 +permanentStreet2,
          file: 'path/to/file.pdf' // Replace with the actual path or file data
        };
      
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
      
          if (response.ok) {
            console.log('Data sent successfully!');
          } else {
            console.log('Failed to send data:', response.statusText);
          }
        } catch (error) {
          console.log('Error:', error.message);
        }
      };

    return (
        <div>
            <h1 className='center'>Login Form</h1>
            <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className='flex'>
                    <div>
                        <label>
                            First Name<span className='red'>*</span>&nbsp; <br />
                            <input className='input'
                                type="text"
                                placeholder='Enter your first name here...'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            Last Name<span className='red'>*</span> <br />
                            <input
                                placeholder='Enter your last name here...'
                                type="text" className='input'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                </div>
                <br />

                {/* Email */}
                <div className='flex'>
                    <div>
                        <label>
                            Email<span className='red'>*</span> <br />
                            <input
                                type="email"
                                placeholder='ex: 1amanpce@gmail.com'
                                className='input'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div>
                        {/* Date of Birth */}
                        <label>
                            Date of Birth<span className='red'>*</span><br />
                            <input
                                type="date"
                                // placeholder='Date of Birth'
                                className='input'
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                </div>




                {/* Residential Address */}
                <p>Residential Address</p>

                <div className='flex'>
                    <div>
                        <label className='label'>
                            Street 1<span className='red'>*</span> <br />
                            <input
                                className='input'
                                type="text"
                                value={residentialStreet1}
                                onChange={(e) => setResidentialStreet1(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div>
                        <label className='label'>
                            Street 2<span className='red'>*</span> <br />
                            <input
                                type="text"
                                className='input'
                                value={residentialStreet2}
                                onChange={(e) => setResidentialStreet2(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                </div>




                {/* Same as Residential Checkbox */}
                <br />
                <label className='checkbox-lebel'>
                    <input
                        className='input-checkbox'
                        type="checkbox"
                        checked={sameAsResidential}
                        onChange={handleSameAsResidentialChange}
                    />
                    Same as Residential

                </label>

                {/* Permanent Address */}
                <p>Permanent Address</p>
                <div className='flex'>
                    <div>
                        <label className='label'>
                            Street 1<span className='red'>*</span> <br />
                            <input
                                type="text"
                                className='input'
                                value={permanentStreet1}
                                onChange={(e) => setPermanentStreet1(e.target.value)}
                                disabled={sameAsResidential}
                                required={!sameAsResidential}
                            />
                        </label>
                    </div>
                    <div>
                        <label className='label'>
                            Street 2<span className='red'>*</span> <br />
                            <input
                                type="text"
                                className='input'
                                value={permanentStreet2}
                                onChange={(e) => setPermanentStreet2(e.target.value)}
                                disabled={sameAsResidential}
                                required={!sameAsResidential}
                            />
                        </label>
                    </div>
                </div>






                {/* Upload Documents */}
                <p>Upload Documents</p>

                <label>
                    Select Files<span className='red'>*</span> (Minimum 2) Documents <br />
                    <input
                        className='input'
                        type="file"
                        multiple
                        accept=".jpg, .jpeg, .png, .pdf"
                        onChange={handleDocumentUpload}
                        required
                    />
                </label>

                {/* Display Uploaded Documents */}
                {
                    documents.length !== 0 ?
                        <p>Uploaded Documents</p> : <><br /></>
                }
                {/* <p>Uploaded Documents</p> */}
                {documents.map((document, index) => (
                    <div key={index} className='flex'>
                        <br />
                        <span>{index + 1}</span>
                        <span>File Name <br />{document.name}</span>
                        <span>Type of File <br /> {document.type}</span>
                        <button type="button" onClick={() => handleDocumentDelete(index)}>
                            <img src="https://img.icons8.com/?size=512&id=14237&format=png" alt="delete" />
                        </button>

                    </div>

                ))}

                {/* Submit Button */}
                <br />
                <div className='red'>{error}</div>
                <button type="submit" className='submit'>Submit</button>


            </form>
        </div>
    );
};

export default LoginForm;