console.log('Is Babel working?')

const App = () => (
    <div>
        <ShoppingApp />
    </div>
);

class ShoppingApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: undefined
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(nextPage, formData) {
        if (formData !== null) {
            formData.preventDefault();
            formData = formData.target;
            const data = {}
            for (let i = 0; i < formData.length - 1; i++) {
                data[formData[i].name]= formData[i].value;
            }
            console.log(data);
        }
        this.setState({ currentPage: nextPage });
    }

    render() {
        if (this.state.currentPage === undefined) {
            return (
                <button onClick={() => { this.handleClick(F1, null) }}>Click Here to Give Up All Your Info</button>
            )
        } else {
            return (
                <div>
                    <this.state.currentPage
                        handleClick={this.handleClick}
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
    return (
        <h1>Please Review Your Info Prior to Submitting Order
            <p>Some Info Here</p>
            <button onClick={() => {props.handleClick(undefined, null)}}>Click Here to Submit Order</button>
        </h1>
    )
}

ReactDOM.render(
    <ShoppingApp />,
    document.getElementById('app')
);