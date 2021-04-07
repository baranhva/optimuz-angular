import {Injectable} from '@angular/core';
import {User} from '../../../shared/interface/user.interface';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {mapTo, tap} from 'rxjs/operators';
import {AbstractDataProviderService} from '../../../core/service/abstract-data-provider.service';
import produce from 'immer';

@Injectable({
  providedIn: 'root'
})
export class PatientService extends AbstractDataProviderService {

  private _patients: User[];
  private patients$: Subject<User[]> = new ReplaySubject(1);
  public readonly patients: Observable<User[]> = this.patients$.asObservable();

  constructor(private http: HttpClient) {
    super();
  }

  private fetchPatients(): Observable<User[]> {
    return this.http.get<User[]>(`/caretaker/patients`);
  }

  protected destroy(): void {
    this.setPatients(null);
  }

  private setPatients(patients: User[]) {
    this._patients = patients;
    this.patients$.next(patients);
  }

  protected init(): void {
    this.fetchPatients()
      .subscribe((patients: User[]) => {
        this.setPatients(patients);
        this.setDataIsInit();
      });
  }

  public createPatient(email: string, firstName: string, lastName: string): Observable<boolean> {
    return this.http.post<User>(`/caretaker/patients`, {email, firstName, lastName})
      .pipe(
        tap(this.addNewPatient),
        mapTo(true)
      );
  }

  private addNewPatient = (patient: User) => {
    this.setPatients(produce<User[]>(this._patients, (draft: User[]) => {
      draft.unshift(patient);
    }))
  };

}
