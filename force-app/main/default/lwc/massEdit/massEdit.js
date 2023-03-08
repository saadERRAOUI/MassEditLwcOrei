import { api, track } from 'lwc';
import LightningModal from 'lightning/modal';

export default class MyModal extends LightningModal {
    @api content;
    @track fired = false;

    handleOkay() {
        this.close('okay');
    }
}