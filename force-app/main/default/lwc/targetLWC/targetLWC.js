import { LightningElement, wire } from 'lwc';
import { subscribe,unsubscribe,APPLICATION_SCOPE ,MessageContext } from 'lightning/messageService';
import customMC from "@salesforce/messageChannel/MyMessageChannel__c";

export default class TargetLWC extends LightningElement {
  subscription = null;
  messageFromSource;

  @wire(MessageContext)
  messageContext;

  connectedCallback() {
    this.subscribeToMessageChannel();
  }

  get subscribed() {
    return this.subscription ? 'connected with ' : 'disconnected from ';
  }

  subscribeToMessageChannel() {
    if (!this.subscription) {
      this.subscription = subscribe(
        this.messageContext,
        customMC,
        (message) => this.handleMessage(message),
        { scope: APPLICATION_SCOPE },
      );
    }
  }

  handleMessage(message) {
    this.messageFromSource = message.messageToSend;
  }

  unsubscribeToMessageChannel() {
    unsubscribe(this.subscription);
    this.subscription = null;
  }

  disconnectedCallback() {
    this.unsubscribeToMessageChannel();
  }
}