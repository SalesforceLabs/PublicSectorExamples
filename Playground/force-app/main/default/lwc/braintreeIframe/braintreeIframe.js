import { OmniscriptBaseMixin } from 'vlocity_ins/omniscriptBaseMixin';
import { dispatchOmniEvent } from 'vlocity_ins/omniscriptUtils';
import { api, LightningElement } from 'lwc';

export default class BrainTreeIframe extends OmniscriptBaseMixin(LightningElement
) {
//    get brainTreeUrl() {
//        let path;
//        if (this.omniJsonDef) path = this.omniGetMergeField(this.omniJsonDef.propSetMap.formulaPath);
//        return `https://vlocity-braintree-demo.herokuapp.com?${(path)? path: 'https://vlocity-braintree-demo.herokuapp.com?amount=100&clientToken=sandbox_hrtqy2qx_9nd32f8m28kjm56b&checkout=yes'}`
//    }

    get brainTreeUrl() {
        let path;
        //if (this.omniJsonDef) path = this.omniGetMergeField(this.omniJsonDef.propSetMap.formulaPath);
        return 'https://vlocity-braintree-demo.herokuapp.com?clientToken=sandbox_hrtqy2qx_9nd32f8m28kjm56b&checkout=yes&Amount=100&amount=100';
    }

    @api height = '400';
    @api width = '100%';
    @api params;

    @api
    get amount() {
        return this.amount_data;
    }
    set amount(val) {
        //  Note that we get null if there data is not yet present in the OS
        if (val === null) {
           console.log("Got null amount data");
            return    
        }
        this.amount_data = val;        
    }

    connectedCallback() {
        window.addEventListener('message', this.handleBraintreeResponse.bind(this), false);
    }

    handleBraintreeResponse(evt) {
        if (evt.data.name === 'VlocityCreditCardTransaction') {
            const transaction = evt.data.transaction;
            const nonce = evt.data.nonce;
            const input = {};
            console.log("Braintree VlocityCreditCardTransaction");
            console.log(evt);
            input['Braintree'] = {};
            input.Braintree['transaction'] = transaction.transaction;  
            input['CreditCard'] = {};
            input.CreditCard['noncetest'] = nonce;
            input.CreditCard['paymentNonce'] = nonce;

            const detail = {
                apiResponse: input,
            };
            dispatchOmniEvent(this, detail, 'omniactionbtn');
        }
    } 
}