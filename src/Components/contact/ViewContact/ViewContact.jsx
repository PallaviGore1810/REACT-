import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Spinner from '../../Spinner/Spinner';
import { ContactServices } from '../../ContactService/ContactServices';

const ViewContact = () => {

    let { contactId } = useParams();
    let [state, setState] = useState({
        loading: false,
        contact: {},
        errorMessage: ''
    })

    useEffect(() => {
        let promise = new Promise((res, rej) => {
            setState({ ...state, loading: true })
            let response = ContactServices.getContact(contactId)
            res(response)
        })
        promise.then((res1) => {
            setState({ ...state, loading: false, contact: res1.data })
            console.log(res1.data)
        }).catch(() => {
            setState({ ...state, loading: false, errorMessage: alert("Data not found!!") })
        })
    }, [contactId])
    let { loading, contact, errorMessage } = state
    return (
        <div>
            <section className='view-contact'>
                <div className="container p3">
                    <div className="row">
                        <p className='h3 text-warning'>View Contact</p>
                        <p className='fst-italic'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut aliquam cumque quod facere ipsam quidem amet natus corporis consequatur mollitia. Odio ipsa maxime vel aliquam corrupti unde laboriosam molestias eligendi!</p>
                    </div>
                </div>
            </section>

            {
                loading ? <Spinner /> : <React.Fragment>{
                    Object.keys(contact).length > 0 &&
                    <section className='view-contact my-3'>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4 my-3">
                                    <img src={contact.photo} className='img-fluid contact-img' alt="" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <ul className="list-group">
                                        <li className="list-group-item list-group-item-action">Name: <span className='fw-bold ms-1'>{contact.name}</span> </li>
                                        <li className="list-group-item list-group-item-action">Email: <span className='fw-bold ms-1'>{contact.email}</span> </li>
                                        <li className="list-group-item list-group-item-action">Contact: <span className='fw-bold ms-1'>{contact.contact}</span> </li>
                                        <li className="list-group-item list-group-item-action">Company: <span className='fw-bold ms-1'>{contact.company}</span> </li>
                                        <li className="list-group-item list-group-item-action">Title: <span className='fw-bold ms-1'>{contact.title}</span> </li>
                                        <li className="list-group-item list-group-item-action">Group: <span className='fw-bold ms-1'>{contact.groupId}</span> </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-2">
                                    <Link to={'/'} className='btn btn-warning my-3'>Back</Link>
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

export default ViewContact