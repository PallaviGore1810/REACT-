import React, { useEffect, useState } from 'react'
import { Link, json, useParams } from 'react-router-dom'
import Spinner from '../../Spinner/Spinner'
import { ContactServices } from '../../ContactService/ContactServices'

const ContactList = () => {
    // let [contactId] = useParams()
    let [query, setQuery] = useState({
        text: ''
    })
    let [state, setState] = useState({
        loading: false,
        contacts: [],
        filteredContact: [],
        errorMessage: ""
    })



    useEffect(() => {
        let promise = new Promise((res, rej) => {
            setState({ ...state, loading: true })
            let response = ContactServices.getAllContacts()
            res(response)
            rej("error")
        }).then((res1) => {
            setState({ ...state, loading: false, contacts: res1.data, filteredContact: res1.data })
        }).catch((rej1) => {
            setState({ ...state, loading: false, errorMessage: alert("data not found!!!") })
        })
    }, [])

    //Delete Contact
    let deleteContact = (contactId) => {
        let promise = new Promise((res, rej) => {
            let deleteContact = ContactServices.deleteContact(contactId)
            res(deleteContact)
        }).then((res1) => {
            if (res1) {
                let promise = new Promise((res, rej) => {
                    setState({ ...state, loading: true })
                    let response = ContactServices.getAllContacts()
                    res(response)
                    rej("error")
                }).then((res1) => {
                    setState({ ...state, loading: false, contacts: res1.data })
                }).catch(() => {
                    setState({ ...state, loading: false, errorMessage: alert("data not found!!!") })
                })
            }
        })

    }

    let { loading, contacts, filteredContact, errorMessage } = state
    console.log(contacts)

    //search contact 

    let searchContact = (event) => {
        setQuery({ ...query, text: event.target.value })
        let theContact = state.contacts.filter((contact) => {
            return contact.name.toLowerCase().includes(event.target.value.toLowerCase())
        })
        console.log(theContact);
        setState({ ...state, filteredContact: theContact })
    }

    return (
        <div>
            {/* <pre>{JSON.stringify(contacts)}</pre> */}
            {/* <pre>{JSON.stringify(query.text)}</pre> */}
            <section className='contact-search p-3'>
                <div className="container">
                    <div className="grid">
                        <div className="row">
                            <p className='h3'>Contact Manager <Link to={'/contacts/add'} className='btn btn-primary'><i className='fa fa-plus-circle me-2' />NEW</Link></p>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem laudantium vitae quod in distinctio. Reiciendis impedit excepturi fugit explicabo qui incidunt consequatur at. Provident ratione dicta, odio deserunt iure porro?</p>
                        </div>
                        <div className="row">,
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-8 mb-2">
                                        <input type="text" name="text" value={query.text} onChange={searchContact} placeholder='Search Names' id="" className='form-control' />
                                    </div>
                                    <div className="col mb-2">
                                        {/* <input type="submit" value="Search" className='btn btn-outline-dark' /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='contact-card'>
                <div className="container">
                    <div className="row">
                        {
                            loading ? <Spinner /> : <React.Fragment> {
                                filteredContact.length > 0 && filteredContact.map((contact) => {
                                    return (
                                        <div className="col-md-6" >
                                            <div className="row">
                                                <div className="card my-3">
                                                    <div className="card-body">
                                                        <div className="row d-flex align-items-center">
                                                            <div className="col-md-4">
                                                                <img src={contact.photo} alt="" className='img-fluid' />
                                                            </div>
                                                            <div className="col-md-7">
                                                                <ul className="list-group">
                                                                    <li className="list-group-item list-group-item-action">Name:<span className='fw-bold ms-1'>{contact.name}</span></li>
                                                                    <li className="list-group-item list-group-item-action">Email:<span className='fw-bold ms-1'>{contact.email}</span></li>
                                                                    <li className="list-group-item list-group-item-action">Contact:<span className='fw-bold ms-1'>{contact.contact}</span></li>
                                                                </ul>
                                                            </div>
                                                            <div className="col-md-1 d-flex flex-column p-1">
                                                                <Link to={`/contacts/view/${contact.id}`} className='btn btn-warning my-1'><i className='fa fa-eye' /></Link>
                                                                <Link to={`/contacts/edit/${contact.id}`} className='btn btn-primary my-1'><i className='fa fa-pen' /></Link>
                                                                <button className='btn btn-danger my-1' onClick={() => { deleteContact(contact.id) }}><i className='fa fa-trash' /></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            </React.Fragment>
                        }
                    </div>
                </div>
            </section >
        </div >
    )
}

export default ContactList