import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredCartList = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({cartList: filteredCartList})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const increasedQuantity = cartList.map(eachItem => {
      if (eachItem.id === id) {
        return {...eachItem, quantity: eachItem.quantity + 1}
      }
      return eachItem
    })

    this.setState({cartList: increasedQuantity})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const decreasedQuantity = cartList
      .map(eachItem => {
        if (eachItem.id === id) {
          if (eachItem.quantity > 1) {
            return {...eachItem, quantity: eachItem.quantity - 1}
          }
          return null
        }
        return eachItem
      })
      .filter(eachItem => eachItem !== null)

    this.setState({cartList: decreasedQuantity})
  }

  addCartItem = product => {
    const {cartList} = this.state
    if (cartList.find(eachItem => product.id === eachItem.id) !== undefined) {
      this.incrementCartItemQuantity(product.id)
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
      }))
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          removeAllCartItems: this.removeAllCartItems,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
