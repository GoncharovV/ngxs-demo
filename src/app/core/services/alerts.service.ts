import { Inject, Injectable } from '@angular/core';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';

@Injectable({
    providedIn: 'root'
})
export class AlertsService {

    public constructor(
        @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
    ) {}

    public success(message: string) {
        this.showCommonAlert(message, TuiNotification.Success);
    }

    public warning(message: string) {
        this.showCommonAlert(message, TuiNotification.Warning);
    }

    public error(message: string) {
        this.showCommonAlert(message, TuiNotification.Error);
    }

    private showCommonAlert(message: string, status: TuiNotification) {
        this.alertService.open('', {
            label: message,
            status: status,
            autoClose: true,
        }).subscribe();
    }

}
