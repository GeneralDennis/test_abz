import React, { Component } from 'react'
import './index.css'
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default class About extends Component {
  render() {
    return (
      <div className="container about" id="about_me">
            <h2 className="title">Let's get acquainted</h2>
            <div className="block">
              <LazyLoadImage
                src="images/man-laptop-v1.svg" 
                alt="laptop-man"
                className='laptop_man'/>
              <div className="article">
                    <h3 className="article_title">I am cool frontend developer</h3>
                    <p className="article_text">
                        We will evaluate how clean your approach to writing CSS and javascript code is. You can use any CSS and javascript 3rd party libraries without any restriction.
                    </p>
                    <p className="article_text t2">
                        If 3rd party css/javascript libraries are added to the project via bower/npm/yarn you will get bonus points. If you use any task runner (gulp/webpack) you will get bonus points as well. Slice service directory page PSD mockup into HTML5/CSS3.
                    </p>
                    <a href="#sign_up" className='signup_butt'>Sign up now</a>
              </div>
            </div>
        </div>
    )
  }
}
