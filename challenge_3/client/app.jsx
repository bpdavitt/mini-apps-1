console.log('Is Babel working?');

const App = () => (
    <div>
        <ShoppingApp />
    </div>
);

const validateData = (page, data) => {
    if (page === F1) {
        if (!data.email.includes('@')) {
            alert('Please enter a valid email address');
            return false;
        }
    }
    if (page === F2) {
        
    }
    if (page === F3) {
        if (isNaN(Number(data.cardNumber))) {
            console.log(data.cardNumber)
            alert('Please enter a valid card number');
            return false;
        }
        if (isNaN(Number(data.cvv))) {
            alert('Please enter a valid CVV');
            return false;
        }
        if (isNaN(Number(data.billZip))) {
            alert('Please enter a valid zip code');
            return false;
        }
    }
    return true;
}

class ShoppingApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: undefined,
            id_user: undefined,
            allInfo: undefined
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleRequest = this.handleRequest.bind(this);
    }

    handleClick(nextPage, formData) {
        if (formData !== null) {
            formData.preventDefault();
            formData = formData.target;
            const data = {}
            for (let i = 0; i < formData.length - 1; i++) {
                data[formData[i].name]= formData[i].value;
            }
            if (!validateData(this.state.currentPage, data)) {
                return;
            }
            console.log(data);
            this.handleRequest(nextPage, data);
        } else {
            this.setState({ currentPage: nextPage });
        }
    }

    handleRequest(nextPage, data) {
        if (this.state.currentPage === F1) {
            axios.post('/users', data)
            .then((response) => {
                console.log('within AXIOS user post')
                console.log(response.data)
                let responseData = response.data.split(':');
                let id_user = responseData[1];
                console.log(id_user);
                this.setState({currentPage: nextPage, id_user: id_user})
            })
            .catch(() => {
                console.log('Error occurred when posting user Data');
            })
        } else if (this.state.currentPage === F2) {
            data.id_users = this.state.id_user;
            axios.post('/contacts', data)
            .then((response) => {
                console.log('within AXIOS contact post')
                console.log(response.data)
                this.setState({currentPage: nextPage})
            })
            .catch(() => {
                console.log('Error occurred when posting contact Data');
            })
        } else if (this.state.currentPage === F3) {
            data.id_users = this.state.id_user;
            axios.post('/billing', data)
            .then(() => {
                return axios.get(`/summary`, {
                    params: {id_users: this.state.id_user}
                })
            })
            .then((fullResponse) => {
                console.log(fullResponse.data[0]);
                this.setState({currentPage: nextPage, allInfo: fullResponse.data[0]})
            })
            .catch(() => {
                console.log('Error occurred when posting billing Data');
            })
        }
    }

    render() {
        if (this.state.currentPage === undefined) {
            return (
                <h1>Thanks For Shopping With Us, Click the Button Below to Start Checkout
                    <div></div>
                    <button onClick={() => { this.handleClick(F1, null) }}>Click Here to Give Up All Your Info</button>
                </h1>
            )
        } else {
            return (
                <div>
                    <this.state.currentPage
                        handleClick={this.handleClick}
                        id_user={this.state.id_user}
                        allInfo={this.state.allInfo}
                    />
                </div>
            )
        }
    }
}

const F1 = props => {

    return (
        <h1>Please Enter Your Name, Email, and Password
            <form onSubmit={(event) => {props.handleClick(F2, event)}}>
                <input type="text" name="name" placeholder="Name" />
                <input type="text" name="email" placeholder="Email " />
                <input type="text" name="password" placeholder="Password" />
                <button type="submit">Click Here To Continue</button>
            </form>
        </h1>
    )

}

const F2 = props => {
    return (
        <h1>Please Enter Your Address and Phone
            <form onSubmit={(event) => {props.handleClick(F3, event)}}>
                <input type="text" name="address1" placeholder="Address Line 1" />
                <input type="text" name="address2" placeholder="Address Line 2" />
                <input type="text" name="city" placeholder="City" />
                <input type="text" name="state" placeholder="State" />
                <input type="text" name="zip" placeholder="Zip Code" />
                <input type="text" name="phone" placeholder="Phone Number" />
                <button type="submit">Click Here To Continue</button>
            </form>
        </h1>
    )
}

const F3 = props => {
    return (
        <h1>Please Enter Your Credit Card Info
            <form onSubmit={(event) => {props.handleClick(Confirmation, event)}}>
                <input type="text" name="cardNumber" placeholder="Credit Card Number" />
                <input type="text" name="expiration" placeholder="Credit Card Expiration" />
                <input type="text" name="cvv" placeholder="CVV Number" />
                <input type="text" name="billZip" placeholder="Billing Zip Code" />
                <button type="submit">Click Here To Continue</button>
            </form>
        </h1>
    )
}

const Confirmation = props => {
    
    let infoString = '';
    for (let keys in props.allInfo) {
        infoString += `${keys}: ${props.allInfo[keys]} \n`
    }
    
    return (
        <h1>Please Review Your Info Prior to Submitting Order
            <p id="resultString">{infoString}</p>
            <button onClick={() => {props.handleClick(undefined, null)}}>Click Here to Submit Order</button>
        </h1>
    )
}

ReactDOM.render(
    <ShoppingApp />,
    document.getElementById('app')
);