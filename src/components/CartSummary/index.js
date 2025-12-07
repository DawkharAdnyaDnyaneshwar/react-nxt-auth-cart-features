import './index.css'

import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const orderTotal = cartList.reduce(
        (acc, eachItem) => acc + eachItem.quantity * eachItem.price,
        0,
      )

      const orderItems = cartList.length

      return (
        <div className="cart-summary-container">
          <div className="cart-summary-main-container">
            <div className="order-detail">
              <h3 className="order-total">
                Order Total:{' '}
                <span className="order-total-value">{orderTotal}/-</span>
              </h3>
              <p className="order-items">{orderItems} items in cart</p>
            </div>
            <button className="checkout-btn">Checkout</button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
