import React, { Component} from 'react';
import Portal from '../Portal/portal';
import './index.css';
import './cross.png'
class Modal extends Component {
  render(){
  const { showModal, closeModal }  = this.props
   return (
     <div>
       { showModal &&
         <Portal>
           <div className="modalOverlay">
             <div className="modalWindow">
               <div className="modal_row">
                 <h3>Congratulations</h3>
                 <button
                   className='x_butt'
                   onClick={closeModal}
                 > x 
                 </button>
               </div>
               <div className="modal_row">
                <p>You have successfully passed the registration</p>
               </div>
               <div className="modal_row">
                 <button className='great_button' onClick={closeModal}>Great</button>
               </div>
             </div>
           </div>
         </Portal>
       }
     </div>
   );
      }
 };
 
 export default Modal;