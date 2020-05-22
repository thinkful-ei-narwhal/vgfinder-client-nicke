/* eslint-disable jsx-a11y/anchor-has-content */
import React, { Component } from 'react'
import './Footer.css'
import { faGithub } from '@fortawesome/free-solid-svg-icons'

import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

export default class Footer extends Component {
  render() {
    return (
      <footer className="contact" id="anchor3">
        <h2 className="contact-color">Contact</h2>
        <address>
          <a href="https://github.com/UncleEnzo" target="_blank" rel="noopener noreferrer" className="fab font-awesome"
            aria-label="Github logo and link"></a>
          <a href="mailto:nevelson92@gmail.com" target="_blank" rel="noopener noreferrer" className="fas font-awesome"
            aria-label="Email logo and mailto link"><FontAwesomeIcon icon={faCoffee} /></a>
          <a href="https://www.linkedin.com/in/nicholas-evelson-0b098246" target="_blank" rel="noopener noreferrer"
            className="fab fa-linkedin font-awesome" aria-label="Linkedin logo and link"></a>
        </address>
      </footer>)
  }
}
