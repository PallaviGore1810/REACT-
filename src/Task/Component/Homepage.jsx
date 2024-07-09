
import React, { useEffect, useState } from 'react'
import Spinner from '../../Components/Spinner/Spinner'
import axios from 'axios'

const Homepage = () => {
    let [state, setState] = useState({
        loading: false,
        weathers: [],
        errorMessage: ""
    })

    useEffect(() => {
        let promise = new Promise((res, rej) => {
            let response = axios.get("http://localhost:9000/weathers/")
            res(response)
        }).then((res1) => {
            setState({ ...state, loading: false, weathers: res1.data })
        }).catch(() => {
            setState({ ...state, loading: false, erroeMessage: alert("Data not found!") })
        })
    }, [])
    let { loading, weathers, errorMessage } = state
    console.log(weathers);

    return (
        <div>
            <h1 className='text-center'>Weather Forcasting</h1>
            {/* <h2>Home</h2> */}
            {/* <pre>{JSON.stringify(weathers)}</pre> */}
            <section className="main">
                <div className="container">
                    <div className="row">
                        {
                            loading ? <Spinner /> : <React.Fragment>{
                                weathers.length > 0 && weathers.map((weather) => {
                                    return (
                                        <div className="col-md-6">
                                            <div className="row">
                                                <div className="card my-3">
                                                    <div className="card-body">
                                                        <div className="card-title">{weather.city}</div>
                                                        <div className="row d-flex align-items-center">
                                                            <div className="col-md-4">
                                                                <img src={weather.photo} className='img-fluid' alt="" />
                                                            </div>
                                                            <div className="col-md-8">
                                                                <p className='h4'>{weather.city}</p>
                                                                <ul className="list-group">
                                                                    <li className="list-group-item list-group-item-action">Temperature: <span className='fw-bold ms-1' >{weather.temperature}</span> </li>
                                                                    <li className="list-group-item list-group-item-action">Humidity: <span className='fw-bold ms-1' >{weather.humidity}</span> </li>
                                                                    <li className="list-group-item list-group-item-action">Weather: <span className='fw-bold ms-1' >{weather.type}</span> </li>
                                                                </ul>
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
            </section>

        </div>
    )
}

export default Homepage