import cartApi from '../../service/cartApi'
import userApi from '../../service/userApi'
import { useTranslate } from '../../core/Translate'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import useFormValidate from '../../core/useFormValidate'
import withPriceFormat from '../../hoc/withPriceFormat'
import { cartDerement, cartIncrement, cartUpdate, CartAction } from '../../redux/reducer/cartReducer'

export default function Checkout() {
    let { t } = useTranslate()
    const state = useSelector(state => state)
    let { cart, auth } = state
    let dispatch = useDispatch()
    let history = useHistory()

    useEffect(() => {
        if (auth.user) {
            Promise.all([
                userApi.getAddressDefault(),
                userApi.getPaymentDefault()
            ])
                .then(([address, payment]) => {
                    console.log(address)
                    setForm({
                        ...form,
                        ...address.data,
                        ...payment.data
                    })
                })
        }
    }, [])

    let { form, inputChange, submit, error, setForm } = useFormValidate({
        first_name: '',
        last_name: '',
        email: '',
        company: '',
        country: '',
        address_line1: '',
        address_line2: '',
        city: '',
        postcode: '',
        phone: '',
        shipping_option: cart.shipping_option,
        shipping_diff_address: false,
        ship_country: '',
        ship_address1: '',
        ship_address2: '',
        ship_city: '',
        ship_post_code: '',

        payment_option: cart.payment_option,
        payment_card_number: '',
        payment_card_name: '',
        payment_card_month: '',
        payment_card_year: '',
        payment_card_cvv: '',
        note: '',

    }, {
        rule: {
            first_name: { required: true },
            last_name: { required: true },
            email: { required: true, pattern: 'email' },
            phone: { required: true },
            city: { required: true },
            // shipping: { required: true },
            // payment_option: { required: true },

            ship_country: { required: true },
            ship_city: { required: true },
            ship_post_code: { required: true },

            payment_card_number: { required: true },
            payment_card_name: { required: true },
            payment_card_cvv: { required: true },


        },
        message: {}
    })

    let shipping_price = new Intl.NumberFormat('vn').format(cart.shipping_price)

    let amount = new Intl.NumberFormat('vn').format(cart.amount)

    let tax = new Intl.NumberFormat('vn').format(cart.tax * cart.amount / 100)

    let total = new Intl.NumberFormat('vn').format(cart.amount + cart.shipping_price + cart.tax * cart.amount / 100)


    let yearNow = (new Date()).getFullYear()

    async function _btnPlaceOrderClick() {
        let exclude = {}

        if (!form.shipping_diff_address) {
            exclude = {
                ship_country: 1,
                ship_city: 1,
                ship_post_code: 1

            }
        }

        if (form.payment_option !== 'credit_card') {
            exclude = {
                ...exclude,
                payment_card_cvv: 1,
                payment_card_name: 1,
                payment_card_number: 1,

            }
        }

        error = submit({ exclude })
        if (Object.keys(error).length === 0) {

            let result = await cartApi.order(form)

            if (result.error) {
                dispatch(CartAction.error(result.error))
            } else {
                dispatch(CartAction.clearCart())
                history.push(`/order-completed/${result.data._id}`)
            }

        }
    }

    function _shippingChange(e) {
        let { value } = e.target,
            price = parseInt(e.target.dataset.price)

        dispatch(cartUpdate({
            shipping_option: value,
            shipping_price: price
        }))
    }

    function _paymentChange(e) {
        let { value } = e.target

        dispatch(cartUpdate({
            payment_option: value,
        }))
    }

    if (cart.num === 0) return <Redirect to="catalog" />


    return (
        <section className="pt-7 pb-12">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        {/* Heading */}
                        <h3 className="mb-4">{t('Checkout')}</h3>
                        {/* Subheading */}
                        {
                            !auth.user && <p className="mb-10">
                                {t('Already have an account?')} <Link className="font-weight-bold text-reset" to="/auth">{t('Click here to login')}</Link>
                            </p>
                        }

                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-7">
                        {/* Form */}
                        <form>
                            {/* Heading */}
                            <h6 className="mb-7">{t('Billing Details')}</h6>
                            {/* Billing details */}
                            <div className="row mb-9">
                                <div className="col-12 col-md-6">
                                    {/* First Name */}
                                    <InputGroup name="first_name" title={t('First Name *')} form={form} inputChange={inputChange} error={error} />
                                </div>
                                <div className="col-12 col-md-6">
                                    {/* Last Name */}
                                    <InputGroup name="last_name" title={t('Last Name *')} form={form} inputChange={inputChange} error={error} />
                                </div>
                                <div className="col-12">
                                    {/* Email */}
                                    <InputGroup name="email" title={t('Email *')} form={form} inputChange={inputChange} error={error} />
                                </div>
                                <div className="col-12">
                                    {/* Company Name */}
                                    <InputGroup name="company" title={t('Company name')} form={form} inputChange={inputChange} error={error} />

                                </div>
                                <div className="col-12">
                                    {/* Country */}
                                    <InputGroup name="country" title={t('Country')} form={form} inputChange={inputChange} error={error} />
                                </div>
                                <div className="col-12">
                                    {/* Address Line 1 */}
                                    <InputGroup name="address_line1" title={t('Address Line 1')} form={form} inputChange={inputChange} error={error} />

                                </div>
                                <div className="col-12">
                                    {/* Address Line 2 */}
                                    <InputGroup name="address_line2" title={t('Address Line 2')} form={form} inputChange={inputChange} error={error} />

                                </div>
                                <div className="col-12 col-md-6">
                                    {/* Town / City */}
                                    <InputGroup name="city" title={t('Town / City *')} form={form} inputChange={inputChange} error={error} />
                                </div>
                                <div className="col-12 col-md-6">
                                    {/* ZIP / Postcode */}
                                    <InputGroup name="postcode" title={t('ZIP / Postcode')} form={form} inputChange={inputChange} error={error} />
                                </div>
                                <div className="col-12">
                                    {/* Mobile Phone */}
                                    <InputGroup name="phone" title={t('Mobile Phone *')} form={form} inputChange={inputChange} error={error} />
                                </div>
                            </div>
                            {/* Heading */}
                            <h6 className="mb-7">{t('Shipping Details')}</h6>
                            {/* Shipping details */}
                            <div className="table-responsive mb-6">
                                <table className="table table-bordered table-sm table-hover mb-0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="custom-control custom-radio">
                                                    <input className="custom-control-input" id="checkoutShippingStandard" name="shipping_option" type="radio" data-price={30000} checked={form.shipping_option === 'standard' || form.shipping_option === ''} value="standard" onClick={_shippingChange} onChange={inputChange} />
                                                    <label className="custom-control-label text-body text-nowrap" htmlFor="checkoutShippingStandard">
                                                        {t('Standard Shipping')}
                                                    </label>
                                                </div>
                                            </td>
                                            <td>{t('Delivery in 5 - 7 working days')}</td>
                                            <td>30,000 vnđ</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="custom-control custom-radio">
                                                    <input className="custom-control-input" id="checkoutShippingExpress" name="shipping_option" type="radio" data-price={40000} checked={form.shipping_option === 'express'} value="express" onClick={_shippingChange} onChange={inputChange} />
                                                    <label className="custom-control-label text-body text-nowrap" htmlFor="checkoutShippingExpress">
                                                        {t('Express Shipping')}
                                                    </label>
                                                </div>
                                            </td>
                                            <td>{t('Delivery in 3 - 5 working days')}</td>
                                            <td>40,000 vnđ</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="custom-control custom-radio">
                                                    <input className="custom-control-input" id="checkoutShippingShort" name="shipping_option" type="radio" data-price={50000} checked={form.shipping_option === 'shipping'} value="shipping" onClick={_shippingChange} onChange={inputChange} />
                                                    <label className="custom-control-label text-body text-nowrap" htmlFor="checkoutShippingShort">
                                                        {t(' 1 - 2 Shipping')}
                                                    </label>
                                                </div>
                                            </td>
                                            <td>{t('Delivery in 1 - 2 working days')}</td>
                                            <td>50,000 vnđ</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="custom-control custom-radio">
                                                    <input className="custom-control-input" id="checkoutShippingFree" name="shipping_option" type="radio" data-price={0} checked={form.shipping_option === 'free'} value="free" onClick={_shippingChange} onChange={inputChange} />
                                                    <label className="custom-control-label text-body text-nowrap" htmlFor="checkoutShippingFree">
                                                        {t('Free Shipping')}
                                                    </label>
                                                </div>
                                            </td>
                                            <td>{t(`Living won't the He one every subdue meat replenish face was you morning firmament darkness.`)}</td>
                                            <td>0 vnđ</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {/* Address */}
                            <div className="mb-9">
                                {/* Checkbox */}
                                <div className="custom-control custom-checkbox">
                                    <input className="custom-control-input" id="checkoutShippingAddress" type="checkbox" checked={form.shipping_diff_address} onChange={inputChange} name="shipping_diff_address" />
                                    <label className="custom-control-label font-size-sm" data-toggle="collapse" data-target="#checkoutShippingAddressCollapse" htmlFor="checkoutShippingAddress">
                                        {t('Ship to a different address?')}
                                    </label>
                                </div>
                                {/* Collapse */}
                                <div className="collapse" id="checkoutShippingAddressCollapse">
                                    <div className="row mt-6">
                                        <div className="col-12">
                                            {/* Country */}
                                            <InputGroup name="ship_country" title={t('Country *')} form={form} inputChange={inputChange} error={error} />
                                        </div>
                                        <div className="col-12">
                                            {/* Address Line 1 */}
                                            <InputGroup name="ship_address1" title={t('Address Line 1 *')} form={form} inputChange={inputChange} error={error} />
                                        </div>
                                        <div className="col-12">
                                            {/* Address Line 2 */}
                                            <InputGroup name="ship_address2" title={t('Address Line 2')} form={form} inputChange={inputChange} error={error} />
                                        </div>
                                        <div className="col-6">
                                            {/* Town / City */}
                                            <InputGroup name="ship_city" title={t('Town / City *')} form={form} inputChange={inputChange} error={error} />
                                        </div>
                                        <div className="col-6">
                                            {/* Town / City */}
                                            <InputGroup name="ship_post_code" title={t('ZIP / Postcode *')} form={form} inputChange={inputChange} error={error} />
                                        </div>
                                        <div className="col-12">
                                            {/* Button */}
                                            <button className="btn btn-sm btn-outline-dark" type="submit">
                                                {t('Save Address')}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Heading */}
                            <h6 className="mb-7">{t('Payment')}</h6>
                            {/* List group */}
                            <div className="list-group list-group-sm mb-7">
                                <div className="list-group-item">
                                    {/* Radio */}
                                    <div className="custom-control custom-radio">
                                        {/* Input */}
                                        <input className="custom-control-input" id="checkoutPaymentCard" name="payment_option" value="credit_card" checked={form.payment_option === 'credit_card'} onClick={_paymentChange} onChange={inputChange} type="radio" data-toggle="collapse" data-action="show" data-target="#checkoutPaymentCardCollapse" />
                                        {/* Label */}
                                        <label className="custom-control-label font-size-sm text-body text-nowrap" htmlFor="checkoutPaymentCard">
                                            {t('Credit Card')} <img className="ml-2" src="/img/brands/color/cards.svg" alt="..." />
                                        </label>
                                    </div>
                                </div>
                                <div className="list-group-item collapse py-0" id="checkoutPaymentCardCollapse">
                                    {/* Form */}
                                    <div className="form-row py-5">
                                        <div className="col-12">
                                            <InputGroup className={'mb-4'} name="payment_card_number" title={t('Card Number *')} form={form} inputChange={inputChange} error={error} />
                                        </div>
                                        <div className="col-12">
                                            <InputGroup className={'mb-4'} name="payment_card_name" title={t('Name on Card *')} form={form} inputChange={inputChange} error={error} />
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <div className="form-group mb-md-0">
                                                <label className="sr-only" htmlFor="checkoutPaymentMonth">{t('Month')}</label>
                                                <select className="custom-select custom-select-sm" name="payment_card_month" onChange={inputChange} value={form.payment_month} id="checkoutPaymentMonth">
                                                    <option value="1">{t('January')}</option>
                                                    <option value="2" >{t('February')}</option>
                                                    <option value="3" >{t('March')}</option>
                                                    <option value="4" >{t('April')} </option>
                                                    <option value="5" >{t('May')}</option>
                                                    <option value="6" >{t('June')}</option>
                                                    <option value="7" >{t('July')}</option>
                                                    <option value="8" >{t('August')}</option>
                                                    <option value="9" >{t('September')}</option>
                                                    <option value="10" >{t('October')}</option>
                                                    <option value="11" >{t('November')} </option>
                                                    <option value="12" >{t('December')}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <div className="form-group mb-md-0">
                                                <label className="sr-only" htmlFor="checkoutPaymentCardYear">{t('Year')}</label>
                                                <select className="custom-select custom-select-sm" name="payment_card_year" onChange={inputChange} value={form.payment_card_year} id="checkoutPaymentCardYear">
                                                    {
                                                        [].map.bind([...Array(50)])((e, i) => <option value={yearNow - 50 / 2 + i} key={i}>{yearNow - 50 / 2 + i}</option>)
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <div className="input-group input-group-merge">
                                                <input className="form-control form-control-sm" id="checkoutPaymentCardCVV" type="text" placeholder="CVV *" name="payment_card_cvv" value={form.payment_card_cvv} onChange={inputChange} />
                                                <div className="input-group-append">
                                                    <span className="input-group-text" data-toggle="popover" data-placement="top" data-trigger="hover" data-content={t('The CVV Number on your credit card or debit card is a 3 digit number on VISA, MasterCard and Discover branded credit and debit cards.')}>
                                                        <i className="fe fe-help-circle" />
                                                    </span>
                                                </div>
                                                {
                                                    error.payment_card_cvv && <p className="text-error">{error.payment_card_cvv}</p>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="list-group-item">
                                    {/* Radio */}
                                    <div className="custom-control custom-radio">
                                        {/* Input */}
                                        <input className="custom-control-input" id="checkoutPaymentPaypal" name="payment_option" value="paypal" checked={form.payment_option === 'paypal'} onClick={_paymentChange} onChange={inputChange} type="radio" data-toggle="collapse" data-action="hide" data-target="#checkoutPaymentCardCollapse" />
                                        {/* Label */}
                                        <label className="custom-control-label font-size-sm text-body text-nowrap" htmlFor="checkoutPaymentPaypal">
                                            <img src="/img/brands/color/paypal.svg" alt="..." />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {/* Notes */}
                            <textarea className="form-control form-control-sm mb-9 mb-md-0 font-size-xs" rows={5} placeholder={t('Order Notes (optional)')} defaultValue={""} />
                        </form>
                    </div>
                    <div className="col-12 col-md-5 col-lg-4 offset-lg-1">
                        {/* Heading */}
                        <h6 className="mb-7">{t('Order Items')} ({cart.num})</h6>
                        {/* Divider */}
                        <hr className="my-7" />
                        {/* List group */}
                        <ul className="list-group list-group-lg list-group-flush-y list-group-flush-x mb-7">
                            {
                                cart.list.map(e => <React.Fragment key={e._id}>{withPriceFormat(CartItem, e)}</React.Fragment>)
                            }
                        </ul>
                        {/* Card */}
                        <div className="card mb-9 bg-light">
                            <div className="card-body">
                                <ul className="list-group list-group-sm list-group-flush-y list-group-flush-x">
                                    <li className="list-group-item d-flex">
                                        <span>{t('Subtotal')}</span> <span className="ml-auto font-size-sm">{amount} vnđ</span>
                                    </li>
                                    <li className="list-group-item d-flex">
                                        <span>{t('Tax')}</span> <span className="ml-auto font-size-sm">{tax} vnđ</span>
                                    </li>
                                    <li className="list-group-item d-flex">
                                        <span>{t('Shipping')}</span> <span className="ml-auto font-size-sm">{shipping_price} vnđ</span>
                                    </li>
                                    <li className="list-group-item d-flex font-size-lg font-weight-bold">
                                        <span>{t('Total')}</span> <span className="ml-auto">{total} vnđ</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* Disclaimer */}
                        <p className="mb-7 font-size-xs text-gray-500">
                            {t('Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.')}
                        </p>
                        {/* Button */}
                        <button className="btn btn-block btn-dark" onClick={_btnPlaceOrderClick}>
                            {t('Place Order')}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}


function CartItem({ name, images, real_price_text, _id, cartNum }) {
    let dispatch = useDispatch()

    return (
        <li className="list-group-item">
            <div className="row align-items-center">
                <div className="col-4">
                    {/* Image */}
                    <a href="product.html">
                        <img src={images?.[0]?.medium_url} alt="..." className="img-fluid" />
                    </a>
                </div>
                <div className="col">
                    {/* Title */}
                    <p className="mb-4 font-size-sm font-weight-bold">
                        <a className="text-body" href="product.html">{name}</a> <br />
                        <span className="text-muted">{real_price_text} vnđ</span>
                    </p>
                    {/* Text */}
                    {/* <div className="font-size-sm text-muted">
                        Size: M <br />
                        Color: Red
                    </div> */}
                    <div>
                        <button className="cartItem-button" onClick={() => dispatch(cartDerement(_id))}>-</button>
                        <input type="text" className="cartItem-num" value={cartNum} />
                        <button className="cartItem-button" onClick={() => dispatch(cartIncrement(_id))}>+</button>
                    </div>
                </div>
            </div>
        </li>
    )
}

function InputGroup({ form, name, title, type = "text", placeholder, inputChange, error, className }) {
    if (!placeholder) placeholder = title

    let randomID = 'id-' + (Math.round(Math.random() * 100000))

    className = className ? `form-group ${className}` : 'form-group'

    return (
        <div className={className}>
            <label htmlFor={randomID}>{title}</label>
            <input className="form-control form-control-sm" id={randomID} name={name} type={type} placeholder={placeholder} value={form[name]} onChange={inputChange} />
            {
                error[name] && <p className="error-text">{error[name]}</p>
            }
        </div>
    )
}