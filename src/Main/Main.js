import React, { Component } from 'react'
import API from '../Utils/API'
import Modal from '../Modal/Modal'
import Users from '../Users/Users'
import Registration from '../Registration/Registration'
import About from '../About/About'
import './index.css'

class Main extends Component {
  constructor(props){
    super(props)

    this.load = this.load.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)

    this.state = {
      isLoaded: false,
      users: [],
      count: 6,
      page_num: null,
      total_pages: null,
      showModal: false
    }
  }
  openModal(){
    this.setState({ showModal: true})
  }
  closeModal(){
    this.setState({showModal: false})
    this.load(6)
    document.getElementById('users').scrollIntoView()
  }
  
  async load(count){
    try {
      let userData = await API.get('/users', {
        params: {
          page: 1,
          count: count
        }
      })
      this.setState({
        isLoaded: true,
        users: userData.data.users,
        count: this.state.count + 3,
        total_pages: userData.data.total_pages,
        page_num: userData.data.page
    })
    } catch (e) {
      console.log(`😱 Axios request failed: ${e}`)
    }
    
  }


  componentDidMount(){
    this.load(this.state.count)
    }
  render() {
    const { isLoaded, users, page, page_num, total_pages, count, error, token, showModal } = this.state;
    return (
      <div className='container'>
        <Modal
          showModal={showModal}
          closeModal={this.closeModal}
          className='modal'>
          <div className="modal_row">
            <h3>Congratulations</h3>
            <button className="x_butt">
              <img src="assets/cross.png" alt="cross button"/>
            </button>
          </div>
          <div className="modal_row">
            <p>You have successfully passed the registration</p>
          </div>
          <div className="modal_row">
            <button className="great_button">Great</button>
          </div>
        </Modal>
        <About />
        <Users
          error={error}
          isLoaded={isLoaded}
          users={users}
          load={this.load}
          page={page}
          page_num={page_num}
          total_pages={total_pages}
          count={count}
        />
        <Registration
          token={token}
          openModal={this.openModal}
        />
      </div>
    )
  }
}

export default Main