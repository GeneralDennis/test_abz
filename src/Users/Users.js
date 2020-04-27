import React, { Component } from 'react'
import Spinner from '../spinner/spinner'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './index.css'
class Users extends Component {

  handleLoad(){
    this.props.load(this.props.count)
  }
  render() {
    const { isLoaded, users, total_pages, page_num, error } = this.props
    let button, page;
    
    if(total_pages > page_num) {
      button = 
        <button
          onClick={() => this.handleLoad()}
          className="signup_button centr"
        >
          Show more
        </button>
    } else if (total_pages === page_num) {
      button = null
    }
    
    page = 
    <div className="users" id="users">
      <h2 className="title">Our cheerful users</h2>
      <p className="attention">Attention! Sorting users by registration date</p>
      <div className="users_cards">
        {users.map(user => (
          <div className="card" key={user.registration_timestamp + user.name}>
            <LazyLoadImage
              src={user.photo}
              alt={user.name}
              className="avatar"/>
            { user.name.length > 15 ? 
                <div className='tooltip-name'>
                  <span className='tooltipname'>{user.name}</span>
                  <h3 className="user_name cut">{user.name}</h3>
                </div>
                : <h3 className="user_name">{user.name}</h3>
            }
            <p className="user_position">{user.position}</p>
            { user.email.length > 25 ? 
                <div className='tooltip-email'>
                  <span className='tooltipemail'>{user.email}</span>
                  <p className="user_email cut">{user.email}</p>
                </div>
                : <p className="user_email">{user.email}</p>
            }
            <p className="user_phone">{user.phone}</p>
          </div>
        ))}
        {button}
    </div>
  </div>
    if(error) {
      return <div className='container'>Error: {error.message}</div>
    } else if(!isLoaded) {
      return <div className='container'><Spinner /></div>
    } else {
      return (
        <div>
          {page}
        </div>
      )
    }
  }
}
export default Users