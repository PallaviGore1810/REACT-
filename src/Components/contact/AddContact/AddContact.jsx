import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ContactServices } from '../../ContactService/ContactServices'


const AddContact = () => {
    let navigate=useNavigate()
    let [state, setState] = useState({
        loading: false,
        contact: {
            name: "",
            photo: "",
            contact: "",
            email: "",
            company: "",
            title: "",
            groupId: ""
        },
        groups: [],
        errorMessage: ""
    })

    let updateInput = (event) => {
        setState({
            ...state, contact: {
                ...state.contact,
                [event.target.name]: event.target.value
            }
        })
    }

    let {loading, contact, groups, errorMessage} = state

    let submitForm=(event)=>{
        event.preventDefault()
        let promise=new Promise((res,rej)=>{
            let response=ContactServices.createContact(contact)
            res(response)
        }).then((res1)=>{
            if(res1){
                setState({...state,loading:false})
                navigate("/contacts/list",{replace:true})
            }else{
                navigate("/contacts/add",{replace:false})
            }
        }).catch(()=>{
            alert("Error!!")
        })
    }

    return (
        <div>
            {/* <pre>{JSON.stringify(contact)}</pre> */}
            <section className='add-contact'>
                <div className="container p-3">
                    <div className="row">
                        <p className='fw-bold h4 text-success'>Add Contact</p>
                        <p className='fst-italic'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita necessitatibus consequuntur atque suscipit dicta placeat et ipsum quis rerum blanditiis qui eligendi ratione ullam, illo sit eveniet laboriosam voluptatibus veritatis!</p>
                    </div>
                    <div className="row d-flex align-items-center">
                        <div className="col-md-4">
                            <form action="" onSubmit={submitForm}>
                                <div className="mb-2">
                                    <input type="text" name="name" value={contact.name} onChange={updateInput} required={true} placeholder='Name' id="" className='form-control' />
                                </div>
                                <div className="mb-2">
                                    <input type="text" name="photo" value={contact.photo} onChange={updateInput} required={true} placeholder='Photo URL' id="" className='form-control' />
                                </div>
                                <div className="mb-2">
                                    <input type="number" name="contact" value={contact.contact} onChange={updateInput} required={true} placeholder='Mobile' id="" className='form-control' />
                                </div>
                                <div className="mb-2">
                                    <input type="email" name="email" value={contact.email} onChange={updateInput} required={true} placeholder='Email' id="" className='form-control' />
                                </div>
                                <div className="mb-2">
                                    <input type="text" name="company" value={contact.company} onChange={updateInput} required={true} placeholder='Company' id="" className='form-control' />
                                </div>
                                <div className="mb-2">
                                    <input type="text" name="title" value={contact.title} onChange={updateInput} required={true} placeholder='Title' id="" className='form-control' />
                                </div>
                                <div className="mb-2">
                                    <input type="text" name="groupId" value={contact.groupId} onChange={updateInput} required={true} placeholder='Group' id="" className='form-control' />
                                </div>
                                <div className="mb-2">
                                    <input type="submit" name="" value={'Add'} placeholder='Name' id="" className='btn btn-success' />
                                    <Link to={'/'} className='btn btn-danger ms-2'>Cancel</Link>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-8">
                            <img src={contact.photo} alt="" className='img-fluid contact-img' />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AddContact