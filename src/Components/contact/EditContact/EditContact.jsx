import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ContactServices } from '../../ContactService/ContactServices'
import Spinner from '../../Spinner/Spinner'

const EditContact = () => {
    let { contactId } = useParams()
    let navigate = useNavigate()

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

    useEffect(() => {
        let promise = new Promise((res, rej) => {
            setState({ ...state, loading: true })
            let response = ContactServices.getContact(contactId);
            res(response)
        }).then((res1) => {
            setState({ ...state, loading: false, contact: res1.data })
        }).catch(() => {
            setState({ ...state, loading: false, errorMessage: alert('Data not found!') })
        })
    }, [contactId])

    let updateInput = (event) => {
        setState({
            ...state, contact: {
                ...state.contact,
                [event.target.name]: event.target.value
            }
        })
    }

    let { loading, contact, groups, errorMessage } = state

    let submitForm = (event) => {
        event.preventDefault()
        let promise = new Promise((res, rej) => {
            let response = ContactServices.updateContact(contact, contactId)
            res(response)
        })
        promise.then((res1) => {
            if (res1) {
                setState({ ...state, loading: false })
                navigate("/contacts/list", { replace: true })
            } else {
                navigate(`/contacts/edit/${contactId}`, { replace: false })
            }
        }).catch(() => {
            alert("Error!!")
        })
    }

    return (
        <div>
            {/* <pre>{JSON.stringify(contact)}</pre> */}

            {
                loading ? <Spinner /> : <React.Fragment>{
                    <section className='edit-contact'>
                        <div className="container p-3">
                            <div className="row">
                                <p className='fw-bold h4 text-primary'>Edit Contact</p>
                                <p className='fst-italic'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita necessitatibus consequuntur atque suscipit dicta placeat et ipsum quis rerum blanditiis qui eligendi ratione ullam, illo sit eveniet laboriosam voluptatibus veritatis!</p>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-md-4">
                                    <form action="" onSubmit={submitForm}>
                                        <div className="mb-2">
                                            <input type="text" name="name" onChange={updateInput} value={contact.name} placeholder='Name' id="" className='form-control' />
                                        </div>
                                        <div className="mb-2">
                                            <input type="text" name="photo" onChange={updateInput} value={contact.photo} placeholder='Photo URL' id="" className='form-control' />
                                        </div>
                                        <div className="mb-2">
                                            <input type="number" name="contact" onChange={updateInput} value={contact.contact} placeholder='Mobile' id="" className='form-control' />
                                        </div>
                                        <div className="mb-2">
                                            <input type="email" name="email" onChange={updateInput} value={contact.email} placeholder='Email' id="" className='form-control' />
                                        </div>
                                        <div className="mb-2">
                                            <input type="text" name="company" onChange={updateInput} value={contact.company} placeholder='Company' id="" className='form-control' />
                                        </div>
                                        <div className="mb-2">
                                            <input type="text" name="title" onChange={updateInput} value={contact.title} placeholder='Title' id="" className='form-control' />
                                        </div>
                                        <div className="mb-2">
                                            <input type="text" name="groupId" onChange={updateInput} value={contact.groupId} placeholder='Group' id="" className='form-control' />
                                        </div>
                                        <div className="mb-2">
                                            <input type="submit" name="" value={'Update'} placeholder='Name' id="" className='btn btn-primary' />
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
                }
                </React.Fragment>
            }
        </div>
    )
}

export default EditContact