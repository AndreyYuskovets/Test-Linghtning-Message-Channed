import { LightningElement,track, wire } from 'lwc';
import { publish,MessageContext  } from 'lightning/messageService';
import customMC from "@salesforce/messageChannel/MyMessageChannel__c";

export default class SourceLWC extends LightningElement {
    @track myMessage = 'start';
    @wire(MessageContext)
    messageContext;

    connectedCallback() {
      publish(this.messageContext, customMC, { messageToSend: this.myMessage });
    }

    handleChange(event) {
        this.myMessage = event.target.value;
    }

}