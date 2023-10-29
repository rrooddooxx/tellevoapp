import { Injectable } from '@angular/core';
import { ActionSheetButton, ActionSheetController } from '@ionic/angular';
import { TripsAgreementRepository } from './../../../../providers/db-api/repositories/trips-agreement.repository';

@Injectable()
export class ActionSheetFactory {
  constructor(
    private readonly actionSheetCtrl: ActionSheetController,
    private readonly tripsAgreementRepository: TripsAgreementRepository
  ) {}
  public async getActionSheet(userID: number): Promise<ActionSheetButton[]> {
    const bookTrip = () => {
      console.log('book');
    };
    return [
      {
        text: 'Reservar',
        data: {
          action: 'book-trip',
        },
        handler: bookTrip,
      },
      {
        text: 'Cancelar',
        role: 'cancel',
        data: {
          action: 'cancel',
        },
      },
    ];
  }
}
