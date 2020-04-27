import React, { Component } from 'react'
import './radio.css'
import './index.css'

class Registration extends Component {
    constructor(props) {
        super(props)

        this.onChange = this.onChange.bind(this)
        this.onRadioChange = this.onRadioChange.bind(this)
        this.fileSet = this.fileSet.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.fileInput = React.createRef()
        this.openModal = this.openModal.bind(this)

        this.state = {
            name: null,
            email: null,
            phone: null,
            photo: 'Upload your photo',
            position: '1',
            token: null,
            errors: { email: '', name: '', phone: '', file: '' },
            emailValid: false,
            nameValid: false,
            phoneValid: false,
            fileValid: false,
            formValid: false
        }

    }
    componentDidMount() {
        this.getToken()
    }
    openModal() {
            this.props.openModal()
        }
    getToken() {
        fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token')
            .then(res => res.json())
            .then((result) => {

                    this.setState({
                        token: result.token
                    })
                },
                (error) => {
                    this.setState({
                        error
                    })
                })
    }

    loadToServer(profileData) {
       
        var formData = new FormData();
        formData.append('position_id', profileData.position);
        formData.append('name', profileData.name);
        formData.append('email', profileData.email);
        formData.append('phone', profileData.phone);
        formData.append('photo', this.fileInput.current.files[0])

        fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
                method: 'POST',
                body: formData,
                headers: {
                    'Token': this.state.token,
                }
            })
            .then(function(response) {
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    this.openModal()
                    this.setState({
                        name: null,
                        email: null,
                        phone: null,
                        photo: 'Upload your photo',
                        position: '1',

                    })
                } else {
                    console.log('fail with server', data)
                }
            })
            .catch(error => {
                console.log('network error', error)
            })
    }
    validateErrors(errors) {
        let valid = true;
        Object.values(errors).forEach(
            (val) => val.length > 0 && (valid = false)
        )
        return valid

    }

    onSubmit(e) {
        e.preventDefault()
        const profileData = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            position: this.state.position,
            photo: this.fileInput.current.files[0]
        }
        if (this.validateErrors(this.state.errors)) {
            this.loadToServer(profileData)

        } else {
            console.error('Invalid form')
        }
    }

    fileSet() {
        let { errors, fileValid } = this.state
        console.log(this.fileInput.current.files[0].type, this.fileInput.current.files[0].size)
        if (!['image/jpeg'].includes(this.fileInput.current.files[0].type) || this.fileInput.current.files[0].size > 5 * 1024 * 1024) {
            fileValid = false
            console.log('File format must be jpeg/jpg and file must be up to 5 Mb')
            errors.file = 'File format must be jpeg/jpg and file must be up to 5 Mb'
        } else {
            fileValid = true
            errors.file = ''
        }

        this.setState({ photo: this.fileInput.current.files[0].name, fileValid: fileValid }, this.validateForm)
    }

    onChange(e) {
        const { name, value } = e.target;
        let { errors, emailValid, nameValid, phoneValid } = this.state;

        const validEmailRegex =
            RegExp(/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/);

        const validPhoneRegex = RegExp(/^[+]{0,1}380([0-9]{9})$/)

        switch (name) {
            case 'name':
                nameValid = value.length >= 2
                errors.name =
                    nameValid ? '' : 'Name must be not less 2 characters long!'
                break;
            case 'email':
                emailValid = validEmailRegex.test(value)
                errors.email =
                    emailValid ? '' : "Email not valid!";
                break;
            case 'phone':
                phoneValid = validPhoneRegex.test(value)
                errors.phone =
                    phoneValid ? '' : 'Phone number not valid!'
                break;
            default:
                break;
        }
        this.setState({
            errors,
            [name]: value,
            emailValid: emailValid,
            nameValid: nameValid,
            phoneValid: phoneValid
        }, this.validateForm);
    }

    validateForm() {
        let { emailValid, nameValid, phoneValid, fileValid } = this.state
        this.setState({ formValid: emailValid && nameValid && phoneValid && fileValid })
    }
    onRadioChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value });
    }

    render() {
        const { position, photo, errors } = this.state
        let radioButtons = 
        <div
            className='position'
            id="sign_up">
        <label
            htmlFor='lawyer'
            className="radio"
        >
            <input
                id='lawyer'
                type="radio"
                name='position'
                value='1'
                onChange={ this.onRadioChange }
                checked={ position === '1'}
            />
            <span>Lawyer</span>
        </label>
        <label
            htmlFor='content_manager'
            className="radio" >
            <input
                id='content_manager'
                type="radio"
                name='position'
                value='2'
                onChange={ this.onRadioChange }
                checked={ position === '2' }
            />
            <span>Content Manager</span>
        </label> 
        <label
            htmlFor='security'
            className="radio" >
            <input
                id = 'security'
                type = "radio"
                name = 'position'
                value = '3'
                onChange = { this.onRadioChange }
                checked = { position === '3' }
            /> 
            <span>Security</span>
        </label>
        <label
            htmlFor = 'designer'
            className = "radio" >
            <input
                id = 'designer'
                type = "radio"
                name = 'position'
                value = '4'
                onChange = { this.onRadioChange }
                checked = { position === '4' }
            />
            <span>Designer</span>
            </label> </div>

        let register = 
        <form onSubmit = { this.onSubmit }
                className = "centr" >
            <div className = "field" >
                <label htmlFor = "name" > Name </label>
                <input
                    type = "text"
                    autoComplete = 'off'
                    placeholder = "Your name"
                    name = "name"
                    onChange = { this.onChange }
                    minLength = '2'
                    maxLength = '60'
                    className = {errors.name.length > 0 ? 'error_border' : ''}
                    required /> 
                { errors.name.length > 0 ?
                <p className = "help_text error" > { errors.name } </p> :
                <p className = "help_text hid" >Name is valid</p>
                }
            </div>
            <div className = "field" >
                <label htmlFor = "email" > Email </label>
                <input
                    type = "email"
                    autoComplete = 'off'
                    placeholder = "Your email"
                    name = 'email'
                    onChange = { this.onChange }
                    minLength = '2'
                    maxLength = '100'
                    className = {errors.email.length > 0 ? 'error_border' : ''}
                    required />
                {errors.email.length > 0 ?
                    <p className = "help_text error" > { errors.email } </p> :
                    <p className = "help_text hid" > Email is valid </p>}
            </div>
            <div className = "field">
                <label htmlFor = "phone" > Phone number </label>
                <input
                    type = "tel"
                    autoComplete = 'off'
                    name = 'phone'
                    placeholder = "+380 XX XXX XX XX"
                    onChange = { this.onChange }
                    className = {errors.phone.length > 0 ? 'error_border' : ''}
                    required />
                { errors.phone.length > 0 ?
                    <p className = "help_text mb21 error" > { errors.phone } </p> :
                    <p className = "help_text mb21 hid" > Phone number is valid </p>}
            </div>
            <div className = "field position" >
                <p> Select your position </p>
                { radioButtons }
                <p className = "photo" > Photo </p>
                <input
                    type = "file"
                    name = 'photo'
                    id = 'photo'
                    ref = { this.fileInput }
                    onChange = { this.fileSet }
                    required />
                <label
                    htmlFor = "photo"
                    className = "file_label" >
                        { photo }
                    <span> Browse </span>
                </label >
                { errors.file.length > 0 ?
                <p className = "help_text error" > { errors.file } </p> :
                <p className = "help_text hid" >File is valid</p>
                }
            </div>

            <button type = 'submit'
                    className = 'signup_button centr'
                    disabled = {!this.state.formValid}
            >Sign up now</button>
        </form>
    return ( 
        <div
            className = "container register"
            id = 'sign_in' >
            <h2 className = "title" > Register to get a work </h2>
            <p className = "attention" > Attention!After successful registration and alert, update the list of users in the block from the top </p>
            { register }
        </div>
        )
    }
}
export default Registration