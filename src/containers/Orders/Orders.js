import React, {Component} from "react";
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';

class Orders extends Component{

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json' )
            .then(res => {
                const fetchedOrders = [];
                for(let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({orders: fetchedOrders, loading: false});
            })
            .catch(error => console.log(error));
    }

    render() {
        let ordersOutput = this.state.orders.map(order => {
            return <Order
                key={order.id}
                ingredients={order.ingredients}
                price={order.price}
                customer={order.customer.name}
            />
        });
        if(this.state.orders.length === 0) {
            ordersOutput = <p>No orders. Please, back to main page and build your burger!</p>;
        }
        return(
            <div>
                {ordersOutput}
            </div>
        );
    }
}

export default Orders;