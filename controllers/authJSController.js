const express = require('express');
require('dotenv').config();
const ApiContracts = require('authorizenet').APIContracts;
const ApiControllers = require('authorizenet').APIControllers;
const SDKConstants = require('authorizenet').Constants;

const router = express.Router();

const authTransactionKey = process.env.AUTHORIZE_JS_TRANSACTION_KEY
const authUser = process.env.AUTHORIZE_JS_LOGIN_ID

const testTransactionKey = process.env.AUTHORIZE_JS_TEST_TRANSACTION_KEY
const testUser = process.env.AUTHORIZE_JS_TEST_LOGIN_ID

const chargeCreditCard = (data, cb) => {
    const merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(authUser);
    merchantAuthenticationType.setTransactionKey(authTransactionKey);

    let creditCard = new ApiContracts.CreditCardType();
    creditCard.setCardNumber(`${data.cardNumber}`);
    creditCard.setExpirationDate(`${data.expDate}`);
    creditCard.setCardCode(`${data.cardCode}`);

    const paymentType = new ApiContracts.PaymentType();
    paymentType.setCreditCard(creditCard);

    const billTo = new ApiContracts.CustomerAddressType();
    billTo.setFirstName(`${data.billFirstName}`);
    billTo.setLastName(`${data.billLastName}`);
    billTo.setAddress(`${data.billAddress}`);
    billTo.setCity(`${data.billCity}`);
    billTo.setState(`${data.billState}`);
    billTo.setZip(`${data.billZip}`);
    billTo.setCountry(`${data.billCountry}`);
    billTo.setEmail(`${data.email}`);
    billTo.setPhoneNumber(`${data.phone}`);

    const transactionRequestType = new ApiContracts.TransactionRequestType();
    transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
    transactionRequestType.setPayment(paymentType);
    transactionRequestType.setAmount(data.amount);
    transactionRequestType.setBillTo(billTo);
    transactionRequestType.setCurrencyCode('USD');

    const createRequest = new ApiContracts.CreateTransactionRequest();
    createRequest.setMerchantAuthentication(merchantAuthenticationType);
    createRequest.setTransactionRequest(transactionRequestType);

    console.log(JSON.stringify(createRequest.getJSON(), null, 2));

    ctrl = new ApiControllers.CreateTransactionController(createRequest.getJSON());
    ctrl.setEnvironment(SDKConstants.endpoint.production);

    ctrl.execute(function () {
        const apiResponse = ctrl.getResponse();
        const response = new ApiContracts.CreateTransactionResponse(apiResponse);

        if (response != null) {
            if (response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK) {
                if (response.getTransactionResponse().getMessages() != null) {
                    response.getTransactionResponse().getTransId();
                    response.getTransactionResponse().getResponseCode();
                    response.getTransactionResponse().getMessages().getMessage()[0].getCode();
                    response.getTransactionResponse().getMessages().getMessage()[0].getDescription();
                }
                else {
                    if (response.getTransactionResponse().getErrors() != null) {
                        response.getTransactionResponse().getErrors().getError()[0].getErrorCode();
                        response.getTransactionResponse().getErrors().getError()[0].getErrorText();
                    }
                }
            }
            else {
                console.log('Failed Transaction. ');
                if (response.getTransactionResponse() != null && response.getTransactionResponse().getErrors() != null) {
                    response.getTransactionResponse().getErrors().getError()[0].getErrorCode();
                    response.getTransactionResponse().getErrors().getError()[0].getErrorText();
                }
                else {
                    response.getMessages().getMessage()[0].getCode();
                    response.getMessages().getMessage()[0].getText();
                }
            }
        }
        cb(response);
    });
}

const refundTransaction = (transactionId, data, cb) => {
    const merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
    merchantAuthenticationType.setName(authUser);
    merchantAuthenticationType.setTransactionKey(authTransactionKey);

    let creditCard = new ApiContracts.CreditCardType();
    creditCard.setCardNumber(`${data.cardNumber}`);
    creditCard.setExpirationDate(`${data.expDate}`);
    creditCard.setCardCode(`${data.cardCode}`);

    const paymentType = new ApiContracts.PaymentType();
    paymentType.setCreditCard(creditCard);

    const billTo = new ApiContracts.CustomerAddressType();
    billTo.setFirstName(`${data.billFirstName}`);
    billTo.setLastName(`${data.billLastName}`);
    billTo.setAddress(`${data.billAddress}`);
    billTo.setCity(`${data.billCity}`);
    billTo.setState(`${data.billState}`);
    billTo.setZip(`${data.billZip}`);
    billTo.setCountry(`${data.billCountry}`);

    const transactionRequestType = new ApiContracts.TransactionRequestType();
    transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.REFUNDTRANSACTION);
    transactionRequestType.setPayment(paymentType);
    transactionRequestType.setAmount(data.amount);
    transactionRequestType.setRefTransId(transactionId);
    transactionRequestType.setBillTo(billTo);

    const createRequest = new ApiContracts.CreateTransactionRequest();
    createRequest.setMerchantAuthentication(merchantAuthenticationType);
    createRequest.setTransactionRequest(transactionRequestType);

    const ctrl = new ApiControllers.CreateTransactionController(createRequest.getJSON());
    ctrl.setEnvironment(SDKConstants.endpoint.production);

    ctrl.execute(() => {
        const apiResponse = ctrl.getResponse();
        const response = new ApiContracts.CreateTransactionResponse(apiResponse);

        if (response != null) {
            if (response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK) {
                if (response.getTransactionResponse().getMessages() != null) {
                    response.getTransactionResponse().getTransId();
                    response.getTransactionResponse().getResponseCode();
                    response.getTransactionResponse().getMessages().getMessage()[0].getCode();
                    response.getTransactionResponse().getMessages().getMessage()[0].getDescription();
                }
                else {
                    if (response.getTransactionResponse().getErrors() != null) {
                        response.getTransactionResponse().getErrors().getError()[0].getErrorCode();
                        response.getTransactionResponse().getErrors().getError()[0].getErrorText();
                    }
                }
            }
            else {
                if (response.getTransactionResponse() != null && response.getTransactionResponse().getErrors() != null) {

                    response.getTransactionResponse().getErrors().getError()[0].getErrorCode();
                    response.getTransactionResponse().getErrors().getError()[0].getErrorText();
                }
                else {
                    response.getMessages().getMessage()[0].getCode();
                    response.getMessages().getMessage()[0].getText();
                }
            }
        }
        cb(response);
    });
}


router.post('/authjs/charge', (req, res) => {
    chargeCreditCard(req.body, (response) => {
        res.json(response)
    });
});

router.post('/authjs/refund', (req, res) => {
    const transactionId = req.body.transactionId
    refundTransaction(transactionId, req.body, (response) => {
        res.json(response)
    });
});


module.exports = router;